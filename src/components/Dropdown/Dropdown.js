import classnames from "classnames/bind";
import styles from "./Dropdown.module.scss";
const cx = classnames.bind(styles);
function Dropdown({ children, width, top, left, right, bottom }) {
  return (
    <div
      style={{
        width: width,
        top: top,
        left: left,
        right: right,
        bottom: bottom,
      }}
      className={cx("wrapper")}
    >
      {children}
    </div>
  );
}

export default Dropdown;
