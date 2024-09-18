import classnames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { useState, useEffect } from "react";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
import axios from "axios";
import {
  getCountPageViews,
  getCountPosts,
  getCountStudents,
  getTrafficCountByDate,
} from "../../services/adminServices";
import { formatIndex } from "../../utils/formatIndex";
import LineChart from "../../components/LineChart/LineChart";
import { getLast7Days } from "../../utils/dateUtils";
const cx = classnames.bind(styles);
function Dashboard() {
  const user = getUserInfoFromToken();
  const [countPageViews, setCountPageViews] = useState(0);
  const [dates, setDates] = useState([]);
  const [traffic, setTraffic] = useState([]);

  useEffect(() => {
    const dts = getLast7Days();
    setDates(dts);
    const fetchData = async () => {
      const rsPageViews = await getCountPageViews();
      const rsStudents = await getCountStudents();
      const rsPosts = await getCountPosts();

      setCountPageViews({
        pageviews: rsPageViews.data["count(*)"],
        users: rsStudents.data["count(*)"],
        posts: rsPosts.data["count(*)"],
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchTraffic = async () => {
      const rsTrafficPageViews = await getTrafficCountByDate(dates);
      setTraffic(rsTrafficPageViews.data);
    };
    fetchTraffic();
  }, [dates]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h2>Dashboard</h2>
      </div>
      <div className={cx("statistics")}>
        <div className={cx("box", "access")}>
          <div className={cx("title_box")}>Lượt truy cập</div>
          <p>{formatIndex(countPageViews.pageviews)}</p>
        </div>
        <div className={cx("box", "users")}>
          <div className={cx("title_box")}>Lượng người dùng</div>
          <p>{formatIndex(countPageViews.users)}</p>
        </div>
        <a className={cx("box", "posts")} href="/quan_ly_post">
          <div className={cx("title_box")}>Tổng số bài post</div>
          <p>{formatIndex(countPageViews.posts)}</p>
        </a>
      </div>
      <div className={cx("traffic")}>
        <h3>Lượng truy cập</h3>
        <div className={cx("container_linechart")}>
          <LineChart datas={traffic} dates={dates} title={"lượng truy cập"} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
