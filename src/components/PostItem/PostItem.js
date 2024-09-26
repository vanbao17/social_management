import classnames from "classnames/bind";
import styles from "./PostItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBug,
  faClose,
  faComment,
  faEllipsisV,
  faFile,
  faPen,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import Comments from "../Comments/Comments";
import images from "../../assets/images";
import { formatNewDate } from "../../utils/formatDate";
import { getFilePost } from "../../services/FileServices";
import { chose } from "../../utils/choseUtils";
import { deletePost } from "../../services/postServices";
const cx = classnames.bind(styles);
function PostItem({ fixedComment, handleComment, dataPostItem, updatePost }) {
  const [stateAction, setStateAction] = useState(false);
  const [stateLike, setStateLike] = useState(null);
  const [indLike, setIndLike] = useState(0);
  const [indComment, setIndComment] = useState();
  const [limitText, setLimitText] = useState(100);
  const [filePost, setFilePost] = useState([]);
  const handleLoadImage = (url) => {};

  const countText = (string, index) => {
    const filter = string.split(" ");
    const filterText = filter.slice(0, index);
    return filterText.join(" ");
  };
  const handleText = () => {
    if (limitText == 100) {
      setLimitText(dataPostItem.Content.length);
    } else {
      setLimitText(100);
    }
  };
  const fetchFilePost = async () => {
    const IDPost = dataPostItem.ID;
    const responseFilePost = await getFilePost(IDPost);
    setFilePost(responseFilePost.data);
  };
  const handleDeletePost = async () => {
    const IDPost = dataPostItem.ID;
    const responseDeletePost = chose();
    if (responseDeletePost == true) {
      await deletePost(IDPost);
      window.location.reload();
    }
  };
  useEffect(() => {
    if (dataPostItem != undefined) {
      fetchFilePost();
    }
  }, [dataPostItem]);

  return (
    <div className={cx("wrapper", fixedComment == true ? "fixed" : "")}>
      <div className={cx("title_post")}>
        <div
          className={cx("infor")}
          onClick={() => {
            window.location.href = `/personal?sinhvien=${dataPostItem.MSV}`;
          }}
        >
          <div
            className={cx("image_user")}
            onClick={() => {
              handleLoadImage(dataPostItem.Image_user);
            }}
          >
            {dataPostItem != undefined ? (
              <img
                src={
                  dataPostItem.Image_user == null
                    ? images.default_image
                    : dataPostItem.Image_user
                }
              />
            ) : (
              <></>
            )}
          </div>
          <div className={cx("name_time")}>
            <p className={cx("name")}>
              {dataPostItem != undefined ? dataPostItem.Name : ""}
            </p>
            <span className={cx("time_public")}>
              {dataPostItem != undefined
                ? formatNewDate(dataPostItem.Create_at)
                : ""}
            </span>
          </div>
        </div>
        <div className={cx("action")}>
          <div
            className={cx("icon_action")}
            onClick={() => {
              setStateAction(!stateAction);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisV} className={cx("icon")} />
          </div>
          {stateAction == true ? (
            <ul className={cx("action_dropdown")}>
              <li onClick={handleDeletePost}>
                <FontAwesomeIcon icon={faTrash} />
                <span>Xóa bài viết</span>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={cx("content_post")}>
        {dataPostItem != undefined ? (
          <div className={cx("text")}>
            {countText(dataPostItem.Content, limitText) + "..."}
            <span className={cx("see_more")} onClick={handleText}>
              {" "}
              {dataPostItem.Content.length > 100
                ? limitText == 100
                  ? "Xem thêm"
                  : "Thu gọn"
                : ""}
            </span>
          </div>
        ) : (
          <></>
        )}

        <div className={cx("upload")}>
          {filePost.map((file, index) => {
            if (file.FileType == "image") {
              return (
                <img
                  onClick={() => {
                    handleLoadImage(file.Path);
                  }}
                  key={index}
                  src={file.Path}
                  alt={file.filename}
                ></img>
              );
            }
            if (file.FileType == "file") {
              return (
                <a
                  key={index}
                  className={cx("file")}
                  href={file.Path}
                  target="_blank"
                >
                  <div>
                    <div className={cx("icon_file")}>
                      <FontAwesomeIcon icon={faFile} />
                    </div>
                    <span>{file.filename}</span>
                  </div>
                </a>
              );
            }
            if (file.FileType == "video") {
              return (
                <video className={cx("video")} autoPlay controls={true}>
                  <source src={file.Path} type="video/mp4" />
                </video>
              );
            }
            return;
          })}
        </div>
        <div className={cx("container_comment")}>
          <Comments IDPost={dataPostItem.ID} />
        </div>
      </div>
    </div>
  );
}

export default PostItem;
