import CryptoJS from "crypto-js";

// Function to encrypt text using AES encryption
export function encrypt(text, key) {
  // Use CryptoJS AES encryption to encrypt the text with the provided key
  // Convert the result to a string for easy storage or transmission
  return CryptoJS.AES.encrypt(text, key).toString();
}

// Function to decrypt ciphertext using AES decryption
export function decrypt(ciphertext, key) {
  // Use CryptoJS AES decryption to decrypt the ciphertext with the provided key
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  // Convert the decrypted bytes to a UTF-8 string
  return bytes.toString(CryptoJS.enc.Utf8);
}
