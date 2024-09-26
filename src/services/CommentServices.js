import axios from "axios";
const token = localStorage.getItem("token");
export const getCommentPost = async (IDPost) => {
  try {
    const responseCommentPost = await axios.post(
      "https://baokun.site/api/v1/getCommentsPost",
      { IDPost },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseCommentPost.data;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
export const getCountCommentPost = async (IDPost) => {
  try {
    const responseCommentPost = await axios.post(
      "https://baokun.site/api/v1/getCountCommentPost",
      { IDPost },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseCommentPost;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
export const getCountLikePost = async (IDPost) => {
  try {
    const responseCommentPost = await axios.post(
      "https://baokun.site/api/v1/getCountLikePost",
      { IDPost },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseCommentPost;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
export const getDateComment = async (IDPost) => {
  try {
    const responseCommentPost = await axios.post(
      "https://baokun.site/api/v1/getDateComment",
      { IDPost },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseCommentPost;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
export const getDateLike = async (IDPost) => {
  try {
    const responseCommentPost = await axios.post(
      "https://baokun.site/api/v1/getDateLike",
      { IDPost },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseCommentPost;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
