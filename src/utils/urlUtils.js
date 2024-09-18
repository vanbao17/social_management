import CryptoJS from "crypto-js";
export const getParams = (location, string) => {
  const searchParams = new URLSearchParams(location.search);
  const encryptedIdShop = searchParams.get(string);
  return encryptedIdShop;
};
export const getDataParams = (location, string) => {
  const secretKey = "Phamvanbao_0123";
  const searchParams = new URLSearchParams(location.search);
  const encryptedIdShop = searchParams.get(string);
  const bytes = CryptoJS.AES.decrypt(encryptedIdShop, secretKey);
  const idShopString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(idShopString);
};
