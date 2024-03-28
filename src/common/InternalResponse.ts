import type { IActionResponse } from "@/types/base";

export class InternalResponse<T> {
  constructor(data?: {
    data?: T | undefined;
    message?: string;
    success?: boolean;
  }) {
    this.data = data?.data || null;
    this.message = data?.message || "Success";
    this.success = data?.success === undefined ? true : data.success;
  }

  data: T | null | undefined = null;
  message = "";
  success = true;

  toJSON(): IActionResponse<T | null> {
    return {
      message: this.message,
      success: this.success,
      data: this.data,
    };
  }
}
