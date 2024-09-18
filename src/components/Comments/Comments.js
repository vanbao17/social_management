import classnames from "classnames/bind";
import styles from "./Comments.module.scss";
import { useContext, useEffect, useRef, useState } from "react";

import CommentItem from "../CommentItem/CommentItem";
import { getCommentPost } from "../../services/CommentServices";
const cx = classnames.bind(styles);

function Comments({ IDPost, socket }) {
  const [seeMore, setSeeMore] = useState(false);
  const [cm, setCm] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getCommentPost(IDPost);
        setCm(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [IDPost]);
  // const handleDeleteSuccess = async (id) => {
  //   const filter = await cm.filter((comment) => comment.id != id);
  //   setCm(filter);
  // };

  return (
    <div className={cx("wrapper")}>
      {seeMore === false ? (
        <>
          {cm[0] && (
            <CommentItem
              IDPost={IDPost}
              socket={socket}
              // deleteSuccesss={handleDeleteSuccess}
              idRoot={cm[0].id}
              root={cm[0]}
            />
          )}
          {cm.length > 1 && (
            <span
              className={cx("see_more")}
              onClick={() => {
                setSeeMore(true);
              }}
            >
              Hiển thị thêm
            </span>
          )}
        </>
      ) : (
        <>
          {cm.map((comment) => (
            <CommentItem
              IDPost={IDPost}
              socket={socket}
              // deleteSuccesss={handleDeleteSuccess}
              key={comment.id}
              idRoot={comment.id}
              root={comment}
            />
          ))}
          <span
            className={cx("see_more")}
            onClick={() => {
              setSeeMore(false);
            }}
          >
            Thu gọn
          </span>
        </>
      )}
    </div>
  );
}

export default Comments;
