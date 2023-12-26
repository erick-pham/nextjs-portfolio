/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { auth } from "../../../auth";

export const GET = auth((req) => {
  if (req.auth) {
    return Response.json({ data: "Protected data" });
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 });
});
