import axios from "axios";
const token = localStorage.getItem("token");
export const login = async (msv, password) => {
  try {
    const rs = await axios.post("https:/baokun.site/api/v1/login", {
      msv,
      password,
    });
    return rs;
  } catch (error) {
    if (error.response) {
      // Lỗi từ phía server trả về (status code 400)
      console.log("Lỗi từ server:", error.response.data.msg);
      return error.response.data.msg; // Trả về thông báo lỗi từ server
    } else {
      console.log("Lỗi không xác định:", error.message);
      return "Bạn không có quyền hoặc lỗi gì đó vui lòng nhập lại";
    }
  }
};
export const getCountPageViews = async () => {
  try {
    const rs = await axios("https:/baokun.site/api/v1/getCountPageViews", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return rs;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
export const getCountStudents = async () => {
  try {
    const rs = await axios("https:/baokun.site/api/v1/getCountStudents", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return rs;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
export const getCountPosts = async () => {
  try {
    const rs = await axios("https:/baokun.site/api/v1/getCountPosts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return rs;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
export const getTrafficCountByDate = async (dates) => {
  try {
    const rs = await axios.post(
      "https:/baokun.site/api/v1/getTrafficCountByDate",
      { dates },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return rs;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
