import classnames from "classnames/bind";
import styles from "./ItemNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const cx = classnames.bind(styles);
function ItemNav({ child, data }) {
  const [state, setState] = useState(false);
  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("title")}
        onClick={async () => {
          if (data.child.length != 0) {
            setState(!state);
          } else {
            if (data.action != null) {
              await localStorage.clear();
              window.location.href = "/login";
            } else {
              window.location.href = data.path;
            }
          }
        }}
      >
        {child}
        {data.child.length != 0 ? (
          <FontAwesomeIcon icon={faChevronDown} />
        ) : (
          <></>
        )}
      </div>
      {state == true ? (
        <div className={cx("drop_down")}>
          <ul>
            {data.child.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.path}>{item.title_child}</a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ItemNav;
