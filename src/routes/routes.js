import configs from "../configs/configs";
import Dashboard from "../pages/Dashboard/Dashboard";
import DetailPost from "../pages/DetailPost/DetailPost";
import InforPost from "../pages/InforPost/InforPost";
import LoginPage from "../pages/LoginPage/LoginPage";
import Posts from "../pages/Posts/Posts";
import Reports from "../pages/Reports/Reports";
import Students from "../pages/Students/Students";
import UserUploadPage from "../pages/UserUploadPage/UserUploadPage";

const publicRoutes = [
  {
    path: configs.dashboard,
    component: Dashboard,
  },
  {
    path: configs.sinhviens,
    component: Students,
  },
  {
    path: configs.qlposts,
    component: Posts,
  },
  {
    path: configs.detailPost,
    component: DetailPost,
  },
  {
    path: configs.qlreports,
    component: Reports,
  },
  {
    path: configs.nhap_ds_sv,
    component: UserUploadPage,
  },
  {
    path: configs.thong_tin_post,
    component: InforPost,
  },
  {
    path: configs.login,
    component: LoginPage,
    layout: null,
  },
];
export default publicRoutes;
