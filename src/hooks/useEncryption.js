import { useCallback } from "react";
import { encrypt, decrypt } from "../utils/encryption";

function useEncryption(key) {
  const encryptData = useCallback((data) => encrypt(data, key), [key]);
  const decryptData = useCallback((data) => decrypt(data, key), [key]);

  return { encrypt: encryptData, decrypt: decryptData };
}

export default useEncryption;
