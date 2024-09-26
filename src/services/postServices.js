import axios from "axios";
import { formatNormalDate } from "../utils/formatDate";
const token = localStorage.getItem("token");
export const getPosts = async () => {
  try {
    const rs = await axios.get("https://baokun.site/api/v1/getPosts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return rs;
  } catch (error) {
    console.log(error);
  }
};
export const getPostWithId = async (IDPost) => {
  try {
    const response = await axios.post(
      "https://baokun.site/api/v1/getPostWithId",
      { IDPost },
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
export const deletePost = async (IDPost) => {
  try {
    const response = await axios.post(
      "https://baokun.site/api/v1/deletePost",
      {
        IDPost,
      },
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
export const getCommentCount = async (dates, IDPost) => {
  try {
    const response = await axios.post(
      "https://baokun.site/api/v1/getCommentCount",
      {
        dates,
        IDPost,
      },
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
export const getLikeCount = async (dates, IDPost) => {
  try {
    const response = await axios.post(
      "https://baokun.site/api/v1/getLikeCount",
      {
        dates,
        IDPost,
      },
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
export const getDate = (arr) => {
  const newArr = arr.map((date) => formatNormalDate(date.created_at));
  return newArr;
};
