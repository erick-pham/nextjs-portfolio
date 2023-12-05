import { Product } from "@/models/product";
import { waitFor } from "./utils";

export const getProductList = async () => {
  let originData: Product[] = [];
  for (let i = 0; i < 100; i++) {
    originData.push({
      id: i.toString(),
      name: `Product ${i}`,
      createdAt: new Date().toISOString(),
      status: "NEW",
    });
  }

  await waitFor(3000);

  return originData;
};
