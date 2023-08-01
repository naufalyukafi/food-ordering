import { Outlet, ScrollRestoration } from "react-router-dom";
import Layouts from "../layout/BaseLayout";

const RootPage = () => {
  return (
    <Layouts>
      <Outlet />
      <ScrollRestoration />
    </Layouts>
  );
};

export default RootPage;
