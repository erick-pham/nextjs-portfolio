// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { waitFor } from "@/common/utils";
import { Questionnaire } from "@/types/questionnaire";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;
    const totalCount = 100;
    let listProducts: Questionnaire[] = [];

    for (let i = 0; i < totalCount; i++) {
      listProducts.push({
        id: i.toString(),
        name: `Question ${i}`,
        createdAt: new Date().toISOString(),
        status: "NEW",
        description: `description ${i}`,
        thumbnail: "",
      });
    }

    const offset = limit * (page - 1);
    const totalPages = Math.ceil(listProducts.length / limit);
    const paginatedItems = listProducts.slice(offset, limit * page);

    await waitFor(500);

    return NextResponse.json(
      {
        data: paginatedItems,
        totalCount: totalCount,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
};
