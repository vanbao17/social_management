import classnames from "classnames/bind";
import styles from "./UserUploadPage.module.scss";
import { useState } from "react";
import ImportFileStudent from "../../components/ImportFileStudent/ImportFileStudent";
import ImportBasicStudent from "../../components/ImportBasicStudent/ImportBasicStudent";
const cx = classnames.bind(styles);
function UserUploadPage() {
  const [stateNav, setStateNav] = useState(false);
  const handleState = () => {
    setStateNav(!stateNav);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h2>Nhập danh sách sinh viên</h2>
      </div>
      <div className={cx("nav")}>
        <ul>
          <li
            className={cx(stateNav == false ? "active" : "")}
            onClick={handleState}
          >
            Nhập thủ công
          </li>
          <li
            className={cx(stateNav == true ? "active" : "")}
            onClick={handleState}
          >
            Nhập bằng file
          </li>
        </ul>
        <div className={cx("line")}></div>
      </div>
      <div className={cx("content_nav")}>
        {stateNav == true ? <ImportFileStudent /> : <ImportBasicStudent />}
      </div>
    </div>
  );
}

export default UserUploadPage;
