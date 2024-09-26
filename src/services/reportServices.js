import axios from "axios";
const token = localStorage.getItem("token");
export const getReports = async () => {
  try {
    const rs = await axios.get("https://baokun.site/api/v1/getReports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return rs;
  } catch (error) {
    console.log(error);
  }
};
