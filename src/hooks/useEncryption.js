import CryptoJS from "crypto-js";

export default function useEncryption(key) {
  const encrypt = (text) => {
    try {
      return CryptoJS.AES.encrypt(text, key).toString();
    } catch (error) {
      console.error("Encryption failed:", error);
      return "";
    }
  };

  const decrypt = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption failed:", error);
      return "";
    }
  };

  return { encrypt, decrypt };
}
