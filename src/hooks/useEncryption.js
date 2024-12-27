import CryptoJS from "crypto-js";

export default function useEncryption(key) {
  // Encryption function
  const encrypt = (text) => {
    try {
      // Use AES encryption from CryptoJS to encrypt the text
      return CryptoJS.AES.encrypt(text, key).toString();
    } catch (error) {
      // Log error and return empty string if encryption fails
      console.error("Encryption failed:", error);
      return "";
    }
  };

  // Decryption function
  const decrypt = (ciphertext) => {
    try {
      // Use AES decryption from CryptoJS to decrypt the ciphertext
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      // Convert the decrypted bytes to a UTF-8 string
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      // Log error and return empty string if decryption fails
      console.error("Decryption failed:", error);
      return "";
    }
  };

  // Return an object with encrypt and decrypt functions
  return { encrypt, decrypt };
}
