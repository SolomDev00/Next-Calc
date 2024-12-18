import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "../views";
import ForbiddenPage from "../views/errors/403-Forbidden";
import ErrorHandler from "../views/errors/500-Server";
import RedirectPage from "../views/middlewares/307-Redirect";
import RootLayout from "../views/Layout";
import NotFoundPage from "../views/errors/404-NotFound";
import SignInPage from "../views/auth/Login";
import SignUpPage from "../views/auth/Register";
import RecentCharts from "../views/pages/RecentCharts";
import ChartsByEng from "../views/pages/ChartsByEng";
import LinearGraph from "../views/pages/LinearGraph";

const routers = createHashRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="/graphs" element={<LinearGraph />} />
        <Route path="/eng-charts" element={<ChartsByEng />} />
        <Route path="/recent-charts" element={<RecentCharts />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
      {/* 307 Redirect */}
      <Route path="/307" element={<RedirectPage />} />
      {/* 403 Forbidden */}
      <Route path="/403" element={<ForbiddenPage />} />
      {/* Page Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default routers;
