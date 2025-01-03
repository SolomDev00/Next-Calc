import "./Navbar.style.css";
import { Link, useLocation } from "react-router-dom";
import LogoImg from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { SoArrowDown, SoSquareArrowUpRight, SoXmarkCircle } from "solom-icon";
import { Link as ScrollLink } from "react-scroll";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Button from "../ui/Button";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        setScrolling(false);
      } else {
        setScrolling(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    if (firstLoad) {
      setFirstLoad(false);
      setScrolling(true);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [firstLoad]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    if (!showMenu) {
      document.body.classList.add("menu-open");
      document.body.classList.remove("menu-closed");
    } else {
      document.body.classList.add("menu-closed");
      document.body.classList.remove("menu-open");
    }
  };

  const handleNavLinkClick = () => {
    setShowMenu(false);
    document.body.classList.remove("menu-open");
    document.body.classList.add("menu-closed");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (showMenu && target && !target.closest(".mobile-menu")) {
        setShowMenu(false);
        document.body.classList.remove("menu-open");
        document.body.classList.add("menu-closed");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  useEffect(() => {
    const location = window.location.pathname;
    if (location === "/") {
      setShowMenu(false);
    }
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`header ${
        scrolling ? "bg-transparent" : "bg-primary"
      } duration-200 ${scrolling ? "bg-transparent" : "bg-primary"} ${
        showMenu ? "menu-open" : ""
      }`}
      style={{
        display: `${scrolling === true ? "" : "none"}`,
        background: `${window.scrollY < 10 ? "transparent" : ""}`,
        animation: `${window.scrollY > 50 ? "fadeUpNav 0.4s ease-out" : ""}`,
        position: "fixed",
        top: 0,
        width: "100%",
        height: "78px",
        zIndex: "3000",
      }}
    >
      <div
        className={`menu__wrapper duration-200 ${
          scrolling ? "bg-transparent" : "text-primary"
        }`}
        style={{
          background: `${window.scrollY < 10 ? "transparent" : ""}`,
          animation: `${window.scrollY > 50 ? "fadeUpNav 0.4s ease-out" : ""}`,
        }}
      >
        <div className="w-full navbar flex flex-row items-center justify-between">
          <Link to="/" title={"NextCalc"} aria-label="home" className="logo">
            <img className={`ml-0`} src={LogoImg} alt="logo" />
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              to="/"
              className={`text-lg font-medium ${
                isActive("/")
                  ? "bg-indigo-500 text-white px-5 py-1 rounded text-sm duration-150"
                  : "bg-violet-200 text-white px-5 py-1 rounded text-sm"
              }`}
            >
              Version 1.1
            </Link>
            <Link
              to="/v2"
              className={`text-lg font-medium ${
                isActive("/v2")
                  ? "bg-indigo-500 text-white px-5 py-1 rounded text-sm duration-150"
                  : "bg-violet-200 text-white px-5 py-1 rounded text-sm"
              }`}
            >
              Version 2.2
            </Link>
          </nav>
          <div>
            <SignedOut>
              <SignInButton>
                <Button className="py-2 px-8 flex items-center gap-2">
                  Login <SoSquareArrowUpRight className="w-5 h-5" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton userProfileMode="modal" />
            </SignedIn>
          </div>
        </div>
        <button
          aria-label="Toggle menu"
          className="burger-menu z-20"
          type="button"
          onClick={toggleMenu}
        >
          {showMenu ? (
            <SoXmarkCircle className={"text-red-600 w-6 h-6"} />
          ) : (
            <SoArrowDown className={"text-white w-5 h-5"} />
          )}
        </button>
        {showMenu && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu">
              <nav>
                <ul className="text-center">
                  <li className="text-primary text-xl hover:text-secondary duration-150">
                    <ScrollLink
                      to="landing"
                      smooth={true}
                      duration={500}
                      onClick={handleNavLinkClick}
                    >
                      Main
                    </ScrollLink>
                  </li>
                  <li className="text-primary text-xl hover:text-secondary duration-150">
                    <ScrollLink
                      to="about"
                      smooth={true}
                      duration={500}
                      onClick={handleNavLinkClick}
                    >
                      About
                    </ScrollLink>
                  </li>
                  <li className="text-primary text-xl hover:text-secondary duration-150">
                    <ScrollLink
                      to="services"
                      smooth={true}
                      duration={500}
                      onClick={handleNavLinkClick}
                    >
                      Services
                    </ScrollLink>
                  </li>
                  <li className="text-primary text-xl hover:text-secondary duration-150">
                    <ScrollLink
                      to="pricing"
                      smooth={true}
                      duration={500}
                      onClick={handleNavLinkClick}
                    >
                      Pricing
                    </ScrollLink>
                  </li>
                  <li className="text-primary text-xl hover:text-secondary duration-150">
                    <ScrollLink
                      to="help"
                      smooth={true}
                      duration={500}
                      onClick={handleNavLinkClick}
                    >
                      Help
                    </ScrollLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
