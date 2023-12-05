export const waitFor = (seconds: number) =>
  new Promise((r) => setTimeout(() => r(true), seconds));
