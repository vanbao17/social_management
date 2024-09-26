import classnames from "classnames/bind";
import styles from "./DataMining.module.scss";
const cx = classnames.bind(styles);
function DataMining() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h2>Những thứ có thể data mining</h2>
      </div>
      <ul className={cx("list_cate")}>
        <li>
          <a>
            <span>Lượt truy cập</span>
          </a>  
        </li>
        <li>
          <a>
            <span>Posts</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DataMining;
