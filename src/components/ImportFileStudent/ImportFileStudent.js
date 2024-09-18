import classnames from "classnames/bind";
import styles from "./ImportFileStudent.module.scss";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { excelDateToJSDate } from "../../utils/formatDate";
import { checkData, insertData } from "../../services/dataServices";
import Popup from "../Popup/Popup";
const cx = classnames.bind(styles);
function ImportFileStudent() {
  const inputFile = useRef();
  const [worksheet, setWorkSheets] = useState(null);
  const [filename, setFileName] = useState(null);
  const [dataCheck, setDataCheck] = useState(null);
  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      });
      const dt = [];
      const rows = worksheet.filter((w) => w[0] >= 0);
      rows.forEach((r) => {
        const msv = r[1];
        const name = r[2] + " " + r[3];
        const dob = excelDateToJSDate(r[4]);
        const lsh = file.name;
        dt.push({
          msv: msv + "",
          name: name,
          dob: dob,
          lsh: lsh.split(".xlsx")[0],
          gender: 1,
        });
      });
      setWorkSheets(dt);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleInsertData = async () => {
    if (worksheet == null) {
      alert("Bỏ file vô đê");
    } else {
      const rs = await insertData(worksheet);
      if (rs.status == 200) {
        alert("oke");
        setWorkSheets(null);
        setFileName(null);
        setDataCheck(null);
      } else {
        alert(rs);
      }
    }
  };
  const checkDt = async () => {
    if (worksheet == null) {
      alert("Bỏ file vô đê");
    } else {
      const rs = await checkData(worksheet);
      if (rs.status == 200) {
        setDataCheck(rs.data);
      } else {
        alert(rs);
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("container_file")}
        onClick={() => {
          inputFile.current.click();
        }}
      >
        {filename != null ? filename : "Nhập file tại đây"}

        <input
          accept=".xlsx, .xls"
          onChange={handleUploadFile}
          ref={inputFile}
          type="file"
          hidden
        ></input>
      </div>

      <div className={cx("btn_submit")}>
        <button onClick={handleInsertData}>
          <span>Nhập sinh viên</span>
        </button>
        <button onClick={checkDt}>
          <span>Kiểm tra </span>
        </button>
      </div>
      <div className={cx("list_data")}>
        {worksheet != null ? <h4>Đây là dữ liệu trong file</h4> : <></>}
        <table>
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Tên sinh viên</th>
              <th>Ngày sinh</th>
              <th>Lớp sinh hoạt</th>
            </tr>
          </thead>
          <tbody>
            {worksheet != null ? (
              worksheet.map((student) => {
                return (
                  <tr>
                    <td>{student.msv} </td>
                    <td>{student.name}</td>
                    <td>{student.dob}</td>
                    <td>{student.lsh}</td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      {dataCheck != null ? (
        <Popup>
          <div className={cx("container_check_result")}>
            <h3>Kết quả kiểm tra dữ liệu</h3>
            <span>
              Có {dataCheck.length + "/" + worksheet.length} dữ liệu bị trùng
              trong dữ liệu hệ thống
            </span>
            <div className={cx("container_list")}>
              <table>
                <thead>
                  <tr>
                    <th>Mã sinh viên</th>
                    <th>Tên sinh viên</th>
                    <th>Ngày sinh</th>
                    <th>Lớp sinh hoạt</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCheck.map((student) => {
                    return (
                      <tr>
                        <td>{student.MSV} </td>
                        <td>{student.Name}</td>
                        <td>{student.Dob}</td>
                        <td>{student.LSH}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className={cx("container_actions")}>
              {dataCheck.length / worksheet.length < 1 ? (
                <button onClick={handleInsertData}>
                  <span>Nhập dữ liệu</span>
                </button>
              ) : (
                <></>
              )}
              <button
                onClick={() => {
                  setDataCheck(null);
                }}
              >
                <span> Đóng</span>
              </button>
            </div>
          </div>
        </Popup>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ImportFileStudent;
