import classnames from "classnames/bind";
import styles from "./Files.module.scss";
import { useEffect, useState } from "react";
import FileUsagePieChart from "../../components/FileUsagePieChart/FileUsagePieChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { getAll, getFileKey } from "../../services/FileServices";
const cx = classnames.bind(styles);
function Files() {
  const [datas, setDatas] = useState(null);
  const [key, setKey] = useState(null);
  const [size, setSize] = useState(null);
  const [sizePage, setSizePage] = useState(null);
  const handleFetchData = async (key) => {
    const rs = await getFileKey(key);
    setDatas(rs.data);
  };
  const handleSum = (arr) => {
    let sum = 0;
    arr.map((a) => (sum += a));
    return sum;
  };
  const fetchFiles = async () => {
    const rsFiles = await getAll();
    const newArr = rsFiles.data.map((file) => file.Size);
    const sum = handleSum(newArr);
    setSize(sum);
  };
  useEffect(() => {
    fetchFiles();
    if (key != null) {
      handleFetchData(key);
    }
  }, [key]);
  useEffect(() => {
    if (datas != null) {
      const newArr = datas.map((file) => file.Size);
      const sum = handleSum(newArr);
      setSizePage(sum);
    }
  }, [datas]);
  return (
    <div className={cx("wrapper")}>
      <h2>Quản lý files</h2>
      <div className={cx("container_nav")}>
        <div
          className={cx("box1", key == null ? "active" : "")}
          onClick={() => {
            setKey(null);
            setDatas(null);
          }}
        >
          <span>Chung</span>
        </div>
        <div
          className={cx("box1", key == "image" ? "active" : "")}
          onClick={() => {
            setKey("image");
          }}
        >
          <span>Hình ảnh</span>
        </div>
        <div
          onClick={() => {
            setKey("video");
          }}
          className={cx("box1", key == "video" ? "active" : "")}
        >
          <span>Video</span>
        </div>
        <div
          onClick={() => {
            setKey("file");
          }}
          className={cx("box1", key == "file" ? "active" : "")}
        >
          <span>File khác</span>
        </div>
      </div>
      {datas == null ? (
        <div className={cx("chart_circle")}>
          <FileUsagePieChart currentUsage={size} maxCapacity={5000} />
        </div>
      ) : datas.length != 0 ? (
        <div className={cx("list_media")}>
          <h3>Danh sách dữ liệu {sizePage / 1000 + "/5GB"}</h3>
          <ul className={cx("list")}>
            {datas.map((data) => {
              return (
                <li>
                  <p>{data.ID}</p>
                  <a href={data.Path}>
                    <strong>{data.filename}</strong>
                  </a>
                  <p>{data.Created_at}</p>
                  <p>{data.Size}</p>
                  <p>{data.Unit}</p>
                  <p>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className={cx("temp_data")}>Không có dữ liệu</div>
      )}
    </div>
  );
}

export default Files;
