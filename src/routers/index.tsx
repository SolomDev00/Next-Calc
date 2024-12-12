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
import ChartSelector from "../views/pages/Charts";

const routers = createHashRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="/charts" element={<ChartSelector />} />
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