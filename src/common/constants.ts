import type { Label } from "./interface";

export const PRODUCT_STATUS = {
  NEW: "NEW",
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
};

export const PRODUCT_STATUS_LABEL: Label[] = [
  {
    code: "NEW",
    label: "New",
  },
  {
    code: "ACTIVE",
    label: "Active",
  },
  {
    code: "DELETED",
    label: "Deleted",
  },
];

export const ORDER_STATUS = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  CANNCEL: "CANNCEL",
};

export const ORDER_STATUS_LABEL = [
  {
    value: "PENDING",
    label: "Chờ xử lý",
  },
  {
    value: "CANNCEL",
    label: "Đã hủy",
  },
  {
    value: "SUCCESS",
    label: "Thành công",
  },
];

export const PRODUCT_ITEM_STATUS = {
  NEW: "NEW",
  SELLING: "SELLING",
  SOLD: "SOLD",
  DELETED: "DELETED",
};

export const PRODUCT_ITEM_STATUS_LABEL = [
  {
    value: "NEW",
    label: "New",
  },
  {
    value: "SELLING",
    label: "Selling",
  },
  {
    value: "SOLD",
    label: "Sold",
  },
  {
    value: "DELETED",
    label: "Deleted",
  },
];

export const PRODUCT_ITEM_STATUS_TEXT_VI = {
  NEW: "Mới",
  SELLING: "Đang bán",
  SOLD: "Đã bán",
  DELETED: "Đã xóa",
};

export const Currencies = [
  {
    value: "VND",
    label: "VND",
  },
  // {
  //   value: "USD",
  //   label: "USD",
  // },
];

export const PRODUCT_ITEM_TYPES = {
  ACCOUNT_GAME: "ACCOUNT_GAME",
  CARD_GAME: "CARD_GAME",
};

export const PRODUCT_ITEM_TYPES_LABEL = [
  {
    value: "ACCOUNT_GAME",
    label: "Tài khoản game",
  },
  {
    value: "CARD_GAME",
    label: "Card game",
  },
];

export const GENDERS = [
  {
    value: "",
    label: "NONE",
  },
  {
    value: "MALE",
    label: "Nam",
  },
  {
    value: "Female",
    label: "Nữ",
  },
];
