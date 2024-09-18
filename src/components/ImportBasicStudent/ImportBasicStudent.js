import classnames from "classnames/bind";
import styles from "./ImportBasicStudent.module.scss";
import { useState } from "react";
import Select from "react-select";
import { addStudents } from "../../services/studentServices";
const cx = classnames.bind(styles);
function ImportBasicStudent() {
  const options = [
    { value: "21T3", label: "21T3" },
    { value: "21T2", label: "21T2" },
    { value: "21T1", label: "21T1" },
  ];
  const genders = [
    { value: 1, label: "Nam" },
    { value: 0, label: "Nữ" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [dataUser, setDataUser] = useState({
    msv: null,
    name: null,
    dob: null,
    gender: null,
    lsh: null,
  });
  const handleInputOnchange = (keyword, value) => {
    setDataUser((prev) => ({ ...prev, [keyword]: value }));
  };
  const handleInsertData = async () => {
    const rs = await addStudents(
      dataUser.msv,
      dataUser.name,
      dataUser.dob,
      dataUser.gender,
      dataUser.lsh
    );
    console.log(rs);

    if (rs != undefined && rs.status == 200) {
      setDataUser({
        msv: null,
        name: null,
        dob: null,
        gender: null,
        lsh: null,
      });
      window.location.reload();
    } else {
      alert(
        "Mã sinh viên có trùng hoặc định dạng ngày không đúng theo mẫu yyyy/mm/dd"
      );
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container_input")}>
        <label for="msv">Mã sinh viên: </label>
        <input
          onChange={(e) => {
            handleInputOnchange("msv", e.target.value);
          }}
          className={cx("msv")}
          name="msv"
          id="msv"
          type="text"
        ></input>
      </div>
      <div className={cx("container_input")}>
        <label for="name">Tên sinh viên: </label>
        <input
          onChange={(e) => {
            handleInputOnchange("name", e.target.value);
          }}
          className={cx("name")}
          name="name"
          id="name"
          type="text"
        ></input>
      </div>
      <div className={cx("container_input")}>
        <label for="dob">Ngày sinh: </label>
        <input
          onChange={(e) => {
            handleInputOnchange("dob", e.target.value);
          }}
          className={cx("dob")}
          name="dob"
          id="dob"
          type="text"
        ></input>
      </div>
      <div className={cx("container_input")}>
        <label for="gender">Giới tính: </label>
        <Select
          defaultValue={dataUser.gender}
          onChange={(e) => {
            setDataUser((prev) => ({ ...prev, gender: e.value }));
          }}
          options={genders}
        />
      </div>
      <div className={cx("container_input")}>
        <label for="lsh">Lớp sinh hoạt: </label>
        <Select
          defaultValue={dataUser.lsh}
          onChange={(e) => {
            setDataUser((prev) => ({ ...prev, lsh: e.value }));
          }}
          options={options}
        />
      </div>
      <div className={cx("btn_submit")}>
        <button onClick={handleInsertData}>
          <span>Thêm sinh viên</span>
        </button>
      </div>
    </div>
  );
}

export default ImportBasicStudent;
