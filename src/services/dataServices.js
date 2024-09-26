import axios from "axios";
const token = localStorage.getItem("token");
export const insertData = async (dataArray) => {
  try {
    const rs = await axios.post(
      "https://baokun.site/api/v1/insert-data",
      {
        dataArray,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return rs;
  } catch (error) {
    if (error.response) {
      return error.response.data.msg;
    } else {
      return "Bạn không có quyền hoặc lỗi gì đó vui lòng nhập lại";
    }
  }
};
export const checkData = async (dataArray) => {
  try {
    const rs = await axios.post(
      "https://baokun.site/api/v1/check-data",
      {
        dataArray,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return rs;
  } catch (error) {
    if (error.response) {
      return error.response.data.msg;
    } else {
      return "Bạn không có quyền hoặc lỗi gì đó vui lòng nhập lại";
    }
  }
};
