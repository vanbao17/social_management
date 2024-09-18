import classnames from "classnames/bind";
import styles from "./Posts.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/postServices";
import ItemPostList from "../../components/ItemPostList/ItemPostList";
import { descPost, descPost2 } from "../../utils/postUtils";
const cx = classnames.bind(styles);
function Posts() {
  const [posts, setPosts] = useState([]);
  const [stateDesc, setStateDesc] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      const rs = await getPosts();
      setPosts(rs.data);
    };
    fetchPosts();
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
        <h2>Danh sách bài viết</h2>
        <div
          className={cx("filter")}
          onClick={() => {
            setStateDesc(!stateDesc);
          }}
        >
          {stateDesc == false ? <span>Mới nhất</span> : <span>Cũ nhất</span>}
        </div>
      </div>
      <div className={cx("list")}>
        {posts.map((post) => {
          return <ItemPostList data={post} />;
        })}
      </div>
    </div>
  );
}

export default Posts;
