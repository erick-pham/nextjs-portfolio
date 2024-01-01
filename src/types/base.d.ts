import type { Session } from "@auth/core/types";
export type Maybe<T> = T | null | undefined;
export type Nullable<T> = T | null;
import type { NextRequest } from "next/server";
export interface ILabel {
  code: string;
  label: string;
}

export type PageProps = {
  params: Record<string, string>;
  searchParams: ISearchParam & Record<string, string>;
};

export type ISearchParam = {
  limit: number;
  page: number;
  searchTerm?: string;
};

export type IListItem<T> = {
  data: T[];
  success: boolean;
  totalCount: number;
};

export type IActionResponse<T> = {
  message: string;
  success: boolean;
  data?: T | string;
};

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"] & {
      /** The user's postal address. */
      address: string;
    };
  }
}
