import { compare, hash } from "bcryptjs";
import CryptoJS from "crypto-js";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export const isPasswordValid = async (
  password: string,
  hashedPassword: string | null | undefined,
): Promise<boolean> => {
  const isValid: boolean = await compare(password, hashedPassword || "");
  return isValid;
};

/**
 *
 * @param text Value to be encrypted
 * @param key Key used to encrypt value must be 32 bytes for AES256 encryption algorithm
 *
 * @returns Encrypted value using key
 */
export const symmetricEncrypt = (text: string, key: string): string => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

/**
 *
 * @param text Value to decrypt
 * @param key Key used to decrypt value must be 32 bytes for AES256 encryption algorithm
 */
export const symmetricDecrypt = (cipherText: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
