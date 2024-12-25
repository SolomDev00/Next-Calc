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
import LinearGraph from "../views/pages/LinearGraph";
import MatrixGraph from "../views/pages/MatrixGraph";
import TreeGraph from "../views/pages/TreeGraph";
import CaesarCipher from "../views/pages/CaesarCipher";
import CalcGraph from "../views/pages/CalcGraph";

const routers = createHashRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="/v2" element={<CalcGraph />} />
        <Route path="/tree" element={<TreeGraph />} />
        <Route path="/cipher" element={<CaesarCipher />} />
        <Route path="/matrix" element={<MatrixGraph />} />
        <Route path="/linear" element={<LinearGraph />} />
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
