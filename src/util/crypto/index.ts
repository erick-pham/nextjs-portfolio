import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export const generateKey = (
  size: number = 16,
  format: BufferEncoding = "hex",
): string => {
  return randomBytes(size).toString(format);
};

export const generateSecretHash = (key: string): string => {
  const salt = randomBytes(8).toString("hex");
  const buffer = scryptSync(key, salt, 64);
  return `${buffer.toString("hex")}.${salt}`;
};

export const compareKeys = (
  storedKey: string,
  suppliedKey: string,
): boolean => {
  const [hashedPassword, salt] = storedKey.split(".");

  const buffer = scryptSync(suppliedKey, salt, 64);
  return timingSafeEqual(Buffer.from(hashedPassword, "hex"), buffer);
};
