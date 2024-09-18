import { jwtDecode } from "jwt-decode";

export const getUserInfoFromToken = () => {
  const token = localStorage.getItem("token");
  const currentTime = Date.now() / 1000;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return null;
      }

      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    window.location.href = "/login";
  }
  return null;
};
