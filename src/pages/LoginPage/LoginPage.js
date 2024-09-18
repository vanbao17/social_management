import classnames from "classnames/bind";
import styles from "./LoginPage.module.scss";
import { useRef } from "react";
import { login } from "../../services/adminServices";
const cx = classnames.bind(styles);
function LoginPage() {
  const refUserName = useRef();
  const refPassword = useRef();
  const handleLogin = async () => {
    if (refUserName.current.value != "" && refPassword.current.value != "") {
      const rs = await login(
        refUserName.current.value,
        refPassword.current.value
      );
      if (rs.status == 200) {
        await localStorage.setItem("token", rs.data.token);
        window.location = "/";
      } else {
        alert(rs);
      }
    } else {
      alert("Nhập đầy đủ vào -.-");
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h2>LifeLink</h2>
        <div className={cx("container_input")}>
          <label for="username">Username</label>
          <input
            ref={refUserName}
            type={"text"}
            className={cx("username")}
            placeholder="Nhập mã sinh viên"
            name={"username"}
          ></input>
        </div>
        <div className={cx("container_input")}>
          <label for="username">Password</label>
          <input
            ref={refPassword}
            type={"password"}
            className={cx("password")}
            name={"password"}
            placeholder="Nhập mật khẩu"
          ></input>
        </div>
        <div className={cx("button_submit")}>
          <button onClick={handleLogin}>
            <span>Đăng nhập</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
