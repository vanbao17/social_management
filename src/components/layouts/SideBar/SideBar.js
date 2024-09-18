import classnames from "classnames/bind";
import styles from "./SideBar.module.scss";
import ItemNav from "../../ItemNav/ItemNav";
const cx = classnames.bind(styles);
function SideBar() {
  const data_nav = [
    {
      title: "Trang chủ",
      child: [],
      component: <div className={cx("item_nav")}>Trang chủ</div>,
      action: null,
      path: "/",
    },
    {
      title: "Sinh viên",
      child: [
        {
          title_child: "Danh sách sinh viên",
          path: "/ds_sinh_vien",
        },
        {
          title_child: "Nhập danh sách sinh viên",
          path: "/nhap_ds_sinh_vien",
        },
      ],
      component: <div className={cx("item_nav")}>Sinh viên</div>,
      action: null,
    },
    {
      title: "Posts",
      child: [
        {
          title_child: "Quản lý post",
          path: "/quan_ly_post",
        },
        {
          title_child: "Danh sách báo cáo",
          path: "/ds_bao_cao",
        },
      ],
      component: <div className={cx("item_nav")}>Posts</div>,
      action: null,
    },
    {
      title: "Files",
      child: [],
      component: <div className={cx("item_nav")}>Files</div>,
      action: null,
      path: "/",
    },
    {
      title: "Đăng xuất",
      child: [],
      component: <div className={cx("item_nav")}>Đăng xuất</div>,
      action: "logout",
      path: "/",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>LifeLink</div>
      <div className={cx("list_nav")}>
        {data_nav.map((item, index) => {
          return <ItemNav child={item.component} data={item}></ItemNav>;
        })}
      </div>
    </div>
  );
}

export default SideBar;
