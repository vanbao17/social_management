import classnames from "classnames/bind";
import styles from "./Reports.module.scss";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/postServices";
import { descPost, descPost2 } from "../../utils/postUtils";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ItemPostList from "../../components/ItemPostList/ItemPostList";
import { getReports } from "../../services/reportServices";
const cx = classnames.bind(styles);
function Reports() {
  const [posts, setPosts] = useState([]);
  const [stateDesc, setStateDesc] = useState(false);
  useEffect(() => {
    const fetchReports = async () => {
      const rs = await getReports();
      setPosts(rs.data);
    };
    fetchReports();
  }, []);
  useEffect(() => {
    const desc = async () => {
      let newPosts = [];
      if (stateDesc == true) {
        newPosts = await descPost(posts);
      } else {
        newPosts = await descPost2(posts);
      }
      setPosts(newPosts);
    };
    desc();
  }, [stateDesc]);
  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("title")}
        onClick={() => {
          window.location.reload();
        }}
      >
        <FontAwesomeIcon icon={faRotateLeft} />
        <span>Làm mới</span>
      </div>
      <div className={cx("container_filter")}>
        <h2>Danh sách báo cáo bài viết</h2>
        <div
          className={cx("filter")}
          onClick={() => {
            setStateDesc(!stateDesc);
          }}
        >
          {stateDesc == false ? <span>Mới nhất</span> : <span>Cũ nhất</span>}
        </div>
        <div className={cx("filter")} onClick={() => {}}>
          <span>Kiểm tra tự động</span>
        </div>
      </div>
      <div className={cx("list")}>
        {posts.map((post) => {
          return <ItemPostList data={post} report={false} />;
        })}
      </div>
    </div>
  );
}

export default Reports;
