import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import publicRoutes from "./routes/routes";
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
import { Fragment } from "react";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((item, index) => {
            let Layout = DefaultLayout;
            if (item.layout) {
              Layout = item.layout;
            } else {
              if (item.layout === null) {
                Layout = Fragment;
              }
            }
            const Page = item.component;
            return (
              <Route
                key={index}
                path={item.path}
                element={
                  <Layout>
                    <Page data={item.path}></Page>
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
