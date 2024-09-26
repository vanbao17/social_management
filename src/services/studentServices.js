import axios from "axios";
const token = localStorage.getItem("token");
export const getStudents = async () => {
  try {
    const rs = await axios.get("https://baokun.site/api/v1/students", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return rs;
  } catch (error) {
    console.log(error);
  }
};
export const addStudents = async (msv, name, dob, gender, lsh) => {
  try {
    const rs = await axios.post(
      "https://baokun.site/api/v1/addStudents",
      { msv, name, dob, gender, lsh },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return rs;
  } catch (error) {
    console.log(error);
  }
};
export const lockAccount = async (ID) => {
  try {
    const rs = await axios.post(
      "https://baokun.site/api/v1/lockAccount",
      {
        ID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return rs;
  } catch (error) {
    console.log(error);
  }
};
export const unLockAccount = async (ID) => {
  try {
    const rs = await axios.post(
      "https://baokun.site/api/v1/unLockAccount",
      {
        ID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return rs;
  } catch (error) {
    console.log(error);
  }
};
export const deleteAccount = async (ID) => {
  try {
    const rs = await axios.post(
      "https://baokun.site/api/v1/deleteAccount",
      {
        ID,
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
      return "Đã xảy ra lỗi, vui lòng thử lại!";
    }
  }
};
export const changePassword = async (newPass, ID) => {
  try {
    const rs = await axios.post(
      "https://baokun.site/api/v1/changePassword",
      {
        newPass,
        ID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return rs;
  } catch (error) {
    console.log(error);
  }
};
export const addRole = async (ID, role) => {
  try {
    const rs = await axios.post(
      "https://baokun.site/api/v1/addRole",
      {
        ID,
        role,
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
      return "Đã xảy ra lỗi, vui lòng thử lại!";
    }
  }
};
export const deleteRole = async (ID) => {
  try {
    const rs = await axios.post(
      "https://baokun.site/api/v1/deleteRole",
      {
        ID,
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
      return "Đã xảy ra lỗi gì rồi! kiểm tra lại đi";
    }
  }
};
export const searchUser = async (msv) => {
  try {
    const response = await axios.post(
      "https://baokun.site/api/v1/searchUser",
      { msv },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
