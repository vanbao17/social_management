import classnames from "classnames/bind";
import styles from "./ItemPostList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import { formatNewDate } from "../../utils/formatDate";
import { chose } from "../../utils/choseUtils";
import { deletePost } from "../../services/postServices";
import images from "../../assets/images";
const cx = classnames.bind(styles);
function ItemPostList({ data, deleteSuccess, report = null }) {
  const [stateDropdown, setStateDropdown] = useState(false);
  const handleDeletePost = async () => {
    const IDPost = data.IDPost;
    const responseDeletePost = await chose();
    if (responseDeletePost == true) {
      await deletePost(IDPost);
      window.location.reload();
    }
  };
  return (
    <div className={cx("item")}>
      <div className={cx("infor")}>
        <img
          className={cx("image_user")}
          src={data.image_user == null ? images.default_image : data.image_user}
        ></img>
        <div className={cx("name_content")}>
          <strong>{data.Name}</strong>
          <div className={cx("preview_post")}>{data.Content}</div>
        </div>
      </div>
      {report != null ? (
        <div className={cx("timeSamp")}>Lý do: {data.NameType}</div>
      ) : (
        <></>
      )}
      <div className={cx("timeSamp")}>{formatNewDate(data.create_at)}</div>
      <div className={cx("action")}>
        <div
          className={cx("icon")}
          onClick={() => {
            setStateDropdown(!stateDropdown);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        {stateDropdown == true ? (
          <Dropdown width={"200px"} right={"0"}>
            <ul className={cx("list_option")}>
              <li>
                <a href={`/thong_tin_post?id=${data.IDPost}`}>Xem thông tin</a>
              </li>
              <li>
                <a href={`/post?id=${data.IDPost}`}>Xem bài viết</a>
              </li>
              {report != null ? (
                <li onClick={handleDeletePost}>
                  <a>Khóa tài khoản</a>
                </li>
              ) : (
                <></>
              )}
              <li onClick={handleDeletePost}>
                <a>Xóa bài viết</a>
              </li>
            </ul>
          </Dropdown>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ItemPostList;
