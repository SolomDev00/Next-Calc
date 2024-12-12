import { Outlet } from "react-router-dom";
import Navbar from "../components/website-navbar";
import { useEffect, useState } from "react";
import HomeLoading from "../components/website-loading";
import Footer from "../components/website-footer";

const RootLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="root-layout">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <HomeLoading />
        </div>
      ) : (
        <>
          <Navbar />
          <main className="w-full">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default RootLayout;
