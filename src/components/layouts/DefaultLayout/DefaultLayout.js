import classnames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import SideBar from "../SideBar/SideBar";
const cx = classnames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container_side_bar")}>
        <SideBar></SideBar>
      </div>
      <div className={cx("container_content")}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
