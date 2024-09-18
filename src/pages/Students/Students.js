import classnames from "classnames/bind";
import styles from "./Students.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faEllipsisV,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import {
  addRole,
  changePassword,
  deleteAccount,
  deleteRole,
  getStudents,
  lockAccount,
  searchUser,
  unLockAccount,
} from "../../services/studentServices";
import { formatDate, formatDatePass } from "../../utils/formatDate";
import Popup from "../../components/Popup/Popup";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS
import { chose } from "../../utils/choseUtils";
const cx = classnames.bind(styles);
function Students() {
  const [stateDropBox, setStateDropBox] = useState(null);
  const [stateChangePass, setStateChangePass] = useState(null);
  const [stateAddRole, setStateAddRole] = useState(null);
  const refPass = useRef();
  const [students, setStudents] = useState([]);
  const fetchStudents = async () => {
    const rs = await getStudents();
    setStudents(rs.data);
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  const handleAccount = async (ID, state) => {
    let rs = 0;
    if (state == 0) {
      rs = await lockAccount(ID);
    } else {
      rs = await unLockAccount(ID);
    }
    if (rs.status == 200) {
      const newStudents = await students.map((student) => {
        if (student.ID == ID) {
          student.State = state;
        }
        return student;
      });
      setStudents(newStudents);
      setStateDropBox(null);
    } else {
      alert(rs);
    }
  };
  const handleChangePassword = async (state = null) => {
    let rs = 0;
    if (state == null) {
      rs = await changePassword(refPass.current.value, stateChangePass.ID);
    } else {
      rs = await changePassword(
        formatDatePass(stateChangePass.Dob),
        stateChangePass.ID
      );
    }
    if (rs.status == 200) {
      setStateChangePass(null);
    } else {
      alert("lỗi gì đó rồi ");
    }
  };
  const handleDeleteAcc = async (ID) => {
    confirmAlert({
      title: "Bạn chắc chứ ? ",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const rs = await deleteAccount(ID);
            if (rs.status == 200) {
              const filter = await students.filter(
                (student) => student.ID != ID
              );
              setStudents(filter);
            } else {
              alert(rs);
            }
          },
        },
        {
          label: "No",
          onClick: () => console.log("Bạn đã chọn No"),
        },
      ],
    });
  };
  const handleAddRole = async (role, ID) => {
    const check = await chose();
    if (check == true) {
      const rs = await addRole(ID, role);
      if (rs.status == 200) {
        const newStudents = await students.map((student) => {
          if (student.ID == ID) {
            student.Role = role;
          }
          return student;
        });
        setStudents(newStudents);
        setStateAddRole(null);
        setStateDropBox(null);
      } else {
        alert(rs);
      }
    }
  };
  const handleDeleteRole = async (ID) => {
    const check = await chose();
    if (check == true) {
      const rs = await deleteRole(ID);
      if (rs.status == 200) {
        const newStudents = await students.map((student) => {
          if (student.ID == ID) {
            student.Role = "";
          }
          return student;
        });
        setStudents(newStudents);
        setStateAddRole(null);
        setStateDropBox(null);
      } else {
        alert(rs);
      }
    }
  };
  const handleSearchStudents = async (msv) => {
    if (msv != "") {
      const rs = await searchUser(msv);
      setStudents(rs.data);
    } else {
      fetchStudents();
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("actions")}>
        <div className={cx("search")}>
          <div className={cx("container_search")}>
            <FontAwesomeIcon icon={faSearch} />
            <input
              onChange={(e) => {
                handleSearchStudents(e.target.value);
              }}
              type="text"
              placeholder="Bạn tìm gì ?"
            ></input>
          </div>
        </div>
        <div className={cx("filter")}>
          <span>Lọc</span>
        </div>
      </div>
      <h2>Danh sách sinh viên</h2>
      <div className={cx("list")}>
        <table>
          <thead>
            <tr>
              <th>MSV</th>
              <th>Tên sinh viên</th>
              <th>Ngày sinh</th>
              <th>Lớp sinh hoạt</th>
              <th>Trạng thái</th>
              <th>Quyền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr
                  key={index}
                  className={cx(index % 2 == 0 ? "bg" : "non_bg")}
                >
                  <td>{student.MSV}</td>
                  <td>{student.Name}</td>
                  <td>{formatDate(student.Dob)}</td>
                  <td>{student.LSH}</td>
                  <td>{student.State == 1 ? "Hoạt động" : "Khóa"}</td>
                  <td>{student.Role}</td>
                  <td className={cx("icon")}>
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      className={cx("faEllipsisV")}
                      onClick={() => {
                        if (stateDropBox == student.MSV) {
                          setStateDropBox(null);
                        } else {
                          setStateDropBox(student.MSV);
                        }
                      }}
                    />
                    {stateDropBox == student.MSV ? (
                      <ul className={cx("drop_box")}>
                        <li>Xem chi tiết</li>
                        {student.State == 1 ? (
                          <li
                            onClick={() => {
                              handleAccount(student.ID, 0);
                            }}
                          >
                            Khóa tài khoản
                          </li>
                        ) : (
                          <li
                            onClick={() => {
                              handleAccount(student.ID, 1);
                            }}
                          >
                            Mở khóa
                          </li>
                        )}

                        <li
                          onClick={() => {
                            setStateChangePass({
                              ID: student.ID,
                              Dob: formatDate(student.Dob),
                            });
                            setStateDropBox(null);
                          }}
                        >
                          Đổi mật khẩu
                        </li>
                        <li
                          onClick={() => {
                            if (student.Role == null) {
                              setStateAddRole(student.ID);
                            } else {
                              handleDeleteRole(student.ID);
                            }
                          }}
                        >
                          {student.Role == null ? "Thêm quyền" : "Gỡ quyền"}
                        </li>
                        <li
                          onClick={() => {
                            handleDeleteAcc(student.ID);
                          }}
                        >
                          Xóa tài khoản
                        </li>
                      </ul>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {stateAddRole != null ? (
        <Popup width="30%">
          <div className={cx("change_pass")}>
            <div className={cx("title")}>
              <h3>Thêm quyền</h3>
              <FontAwesomeIcon
                icon={faClose}
                onClick={() => {
                  setStateAddRole(null);
                }}
              />
            </div>
            <ul className={cx("list_role")}>
              <li
                onClick={() => {
                  handleAddRole("moderator", stateAddRole);
                }}
              >
                Moderator
              </li>
              <li
                onClick={() => {
                  handleAddRole("admin", stateAddRole);
                }}
              >
                Admin
              </li>
            </ul>
          </div>
        </Popup>
      ) : (
        <></>
      )}
      {stateChangePass != null ? (
        <Popup width="30%">
          <div className={cx("change_pass")}>
            <div className={cx("title")}>
              <h3>Đổi mật khẩu</h3>
              <FontAwesomeIcon
                icon={faClose}
                onClick={() => {
                  setStateChangePass(null);
                }}
              />
            </div>
            <div className={cx("container_input")}>
              <input ref={refPass} type="text"></input>
            </div>
            <div className={cx("buttons")}>
              <button
                onClick={() => {
                  handleChangePassword(false);
                }}
              >
                <span>Đổi về mặc định</span>
              </button>
              <button
                onClick={() => {
                  handleChangePassword(null);
                }}
              >
                <span>Xong</span>
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

export default Students;
