import classnames from "classnames/bind";
import styles from "./CommentItem.module.scss";
import { useEffect, useState } from "react";
import images from "../../assets/images";
// import { deleteNoti } from "../../services/UserServices";
const cx = classnames.bind(styles);
function CommentItem({ root, onClick, socket, IDPost }) {
  const [seeMoreComment, setSeeMoreComment] = useState(false);
  const [stateReply, setStateReply] = useState();

  return (
    <div
      onClick={onClick}
      className={cx("wrapper")}
      style={{ marginLeft: root.level * 30 + "px" }}
    >
      <div className={cx("item")}>
        <div
          className={cx("image_user")}
          onClick={() => {
            window.location.href = `/personal?sinhvien=${root.MSV}`;
          }}
        >
          <img
            src={
              root.image_user == null ? images.default_image : root.image_user
            }
          ></img>
        </div>
        <div className={cx("name_content")}>
          <div className={cx("text")}>
            <p className={cx("name")}>{root.author}</p>
            <span className={cx("content")}>{root.text}</span>
          </div>
          <div
            className={cx("container_reply")}
            style={
              stateReply == true
                ? {
                    padding: "12px",
                    width: `calc(100% - ${root.level * 30 + 20}px)`,
                  }
                : { padding: "0" }
            }
          ></div>
        </div>
      </div>
      {root.replies != undefined ? (
        root.replies.length >= 2 && root.level == 0 ? (
          seeMoreComment == false ? (
            <span
              style={{
                marginLeft: 50 + "px",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSeeMoreComment(true);
              }}
            >
              Xem bình luận
            </span>
          ) : (
            <p>
              <div className={cx("container_list_reply")}>
                {root.replies.map((cm) => {
                  return (
                    <CommentItem
                      IDPost={IDPost}
                      socket={socket}
                      idRoot={cm.id}
                      root={cm}
                    />
                  );
                })}
              </div>
              <span
                style={{
                  marginLeft: 50 + "px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSeeMoreComment(false);
                }}
              >
                Thu gọn
              </span>
            </p>
          )
        ) : (
          <div className={cx("container_list_reply")}>
            {root.replies.map((cm) => {
              return (
                <CommentItem
                  IDPost={IDPost}
                  socket={socket}
                  idRoot={cm.id}
                  root={cm}
                />
              );
            })}
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default CommentItem;
