import classnames from "classnames/bind";
import styles from "./InforPost.module.scss";
import { useLocation } from "react-router-dom";
import { getParams } from "../../utils/urlUtils";
import { useEffect, useState } from "react";
import {
  getCountCommentPost,
  getCountLikePost,
} from "../../services/CommentServices";
import { formatIndex } from "../../utils/formatIndex";
import LineChart from "../../components/LineChart/LineChart";
import { getCommentCount, getLikeCount } from "../../services/postServices";
import { getLast7Days } from "../../utils/dateUtils";
const cx = classnames.bind(styles);
function InforPost() {
  const location = useLocation();
  const IDPost = parseInt(getParams(location, "id"));

  const [countLike, setCountLike] = useState(0);
  const [countComment, setCountComment] = useState(0);
  const [dates, setDates] = useState([]);
  const [dataComments, setDataComment] = useState([]);
  const [dataLikes, setDataLikes] = useState([]);
  useEffect(() => {
    const test = getLast7Days();
    setDates(test);
    const fetchData = async () => {
      const rsCountLike = await getCountLikePost(IDPost);
      const rsCountComment = await getCountCommentPost(IDPost);

      setCountLike(rsCountLike.data[0]["count(*)"]);
      setCountComment(rsCountComment.data[0]["count(*)"]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCountComment = async () => {
      const rs = await getCommentCount(dates, IDPost);
      setDataComment(rs.data);
    };
    fetchCountComment();
  }, [countComment]);
  useEffect(() => {
    const fetchCountLike = async () => {
      const rs = await getLikeCount(dates, IDPost);
      setDataLikes(rs.data);
    };
    fetchCountLike();
  }, [countLike]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("title")}>
          <h2>Thông tin của post</h2>
        </div>
        <div className={cx("header_box")}>
          <div className={cx("box")}>
            <h3>Lượt like</h3>
            <p>{formatIndex(countLike)}</p>
          </div>
          <div className={cx("box")}>
            <h3>Lượt bình luận</h3>
            <p>{formatIndex(countComment)}</p>
          </div>
        </div>
        <div className={cx("container_chart")}>
          <h3 className={cx("title")}>Likes</h3>
          <LineChart dates={dates} datas={dataLikes} title={"like"} />
          <h3 className={cx("title")}>Comments</h3>
          <LineChart dates={dates} datas={dataComments} title={"comment"} />
        </div>
      </div>
    </div>
  );
}

export default InforPost;
