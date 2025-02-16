import React from "react";
import { cn } from "../../utils/fn_utils.ts";

// navbar
// `--> images
import FlipkartPlus from "../../assets/img/home/flipkart-plus.png";
import Plus from "../../assets/img/home/plus.png";
// `--> svg
import { FaShoppingCart } from "react-icons/fa";

// `--> login tooltip svg
import People from "../../assets/login-tooltip-svg/people.svg?react";
import PlusSvg from "../../assets/login-tooltip-svg/plusSvg.svg?react";
import BoxUpaArrow from "../../assets/login-tooltip-svg/boxUpArrow.svg?react";
import Heart from "../../assets/login-tooltip-svg/heart.svg?react";
import Reward from "../../assets/login-tooltip-svg/reward.svg?react";
import Gift from "../../assets/login-tooltip-svg/gift.svg?react";
import { MdOutlineLogout } from "react-icons/md";
// `--> more tooltip svg
import Notification from "../../assets/more-tooltip-svg/notification.svg?react";
import LineZig from "../../assets/more-tooltip-svg/lineZig.svg?react";
import QuestionMark from "../../assets/more-tooltip-svg/questionMark.svg?react";
import Download from "../../assets/more-tooltip-svg/download.svg?react";

import { Link, useNavigate } from "react-router";
import SearchInput from "./nav_comp/SearchInput";
import LoginButton from "../comp_util/button/LoginButton";
import LeftRightButton from "../comp_util/button/LeftRightButton";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import TippyPopup from "../comp_util/tooltip-popup/TippyPopup.tsx";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsLoggedInStore,
  useOpenModelStore,
  useUserStore,
} from "../../../store/authStore.ts";
import { handleLogout } from "../../utils/fetch_handler.tsx";
import SellerStarterPopup from "../popup/seller/SellerStarterPopup.tsx";

interface NavbarProps {
  className?: string;
}
const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedInStore((state) => state.isLoggedIn);
  const user = useUserStore((state) => state.user);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const openModel = useOpenModelStore((state) => state.openModel);

  const moreTippyList = [
    {
      name: "Notification Preferences",
      LeftIcon: Notification,
      onClick: () => {
        navigate("/communication-preferences");
      },
    },
    {
      name: "24x7 Customer Care",
      LeftIcon: QuestionMark,
      onClick: () => {
        navigate("/helpcentre");
      },
    },
    {
      name: "Advertise",
      LeftIcon: LineZig,
      onClick: () => {
        navigate("/advertise");
      },
    },
    {
      name: "Download App",
      LeftIcon: Download,
      onClick: () => {
        navigate("/mobile-apps");
      },
    },
  ];
  const rightNavList = [
    {
      name: user?.role === "seller" ? "Dashboard" : "Become a seller",
      onClick: () => {
        if (user?.role === "seller") {
          navigate("/seller/dashboard");
        }
        if (user?.role === "user") {
          setOpenModel("seller_starter_popup");
        }
      },
      isRight: false,
    },
    {
      name: (
        <Tippy
          className="tippy-class max-w-[240px] min-w-[240px]"
          content={<TippyPopup tippyList={moreTippyList} />}
          placement="bottom"
          interactive={true}
        >
          <div>More</div>
        </Tippy>
      ),
      onClick: () => {},
      rightClassName: "group-hover:rotate-180 transition",
      className: "group",
    },
    {
      name: "Cart",
      onClick: () => {
        navigate("/viewcart");
      },
      LeftIcon: FaShoppingCart,
      isRight: false,
    },
  ];

  React.useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const loginTippyList = [
    {
      name: (
        <div
          onClick={() => {
            navigate("/?signup=true");
          }}
          className="flex justify-between  font-semibold py-1"
        >
          New customer?{" "}
          <span
            className="text-[var(--site-color)] hover:underline"
            onClick={() => {
              // openModel("signup")
            }}
          >
            Sign Up
          </span>
        </div>
      ),

      className: "w-full block",
      isShow: !isLoggedIn,
    },
    {
      name: "My Profile",
      LeftIcon: People,
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      name: "Flipkart Plus Zone",
      LeftIcon: PlusSvg,
      onClick: () => {
        navigate("/plus");
      },
    },
    {
      name: "Orders",
      LeftIcon: BoxUpaArrow,
      onClick: () => {
        navigate("/orders");
      },
    },
    {
      name: "Wishlist",
      LeftIcon: Heart,
      onClick: () => {
        navigate("/wishlist");
      },
    },
    {
      name: "Rewards",
      LeftIcon: Reward,
      onClick: () => {
        navigate("/rewards");
      },
    },
    {
      name: "Gift Cards",
      LeftIcon: Gift,
      onClick: () => {
        navigate("/the-gift-card-store");
      },
    },
    {
      name: "Logout",
      LeftIcon: MdOutlineLogout,
      leftIconProps: { size: 18, color: "var(--site-color)" },
      onClick: () => {
        handleLogout({ baseURL, accessToken, setAccessToken, navigate });
      },
      isShow: isLoggedIn,
    },
  ];

  return (
    <>
      {openModel === "seller_starter_popup" && <SellerStarterPopup />}
      <div
        className={cn("bg-[var(--site-color)] sticky top-0 z-50", className)}
      >
        <div className="py-2 px-4 flex min-[676px]:justify-center  gap-x-4 ">
          {/* left */}
          {/* flipkar logo */}
          <div className="child-flex">
            {/* top */}
            <Link to={"/"}>
              <img
                className={cn("w-[4.6875rem] max-w-[4.6875rem]")}
                src={FlipkartPlus}
                alt="nav-flipkar-plus"
              />
            </Link>
            {/* down */}
            <div className="select-none">
              <Link
                className="skew gap-x-1 text-[var(--site-gray)] hover:underline hover:border-white"
                to={"#"}
              >
                <p>
                  Explore{" "}
                  <span className="text-[var(--site-yellow)]">&nbsp;Plus</span>
                </p>

                <img className="w-[10px] align-bottom" src={Plus} alt="" />
              </Link>
            </div>
          </div>
          {/* input */}
          <div className="flex max-w-[512px] w-full gap-x-9 items-center">
            <SearchInput />
            <Tippy
              className="tippy-class max-w-[240px] min-w-[240px]"
              content={<TippyPopup tippyList={loginTippyList} />}
              placement="bottom"
              interactive={true}
            >
              <div>
                <LoginButton
                  className={"px-2"}
                  name={
                    isLoggedIn ? (
                      <LeftRightButton
                        name="Account"
                        className="group"
                        nameClassName="text-[var(--site-color)] font-medium"
                        rightClassName="text-[var(--site-color)] w-10 group-hover:rotate-180 transition"
                      />
                    ) : (
                      "Login"
                    )
                  }
                  isDottedText={true}
                />
              </div>
            </Tippy>
          </div>
          {/* right */}
          <div className="flex gap-x-2  *:px-4">
            {rightNavList?.map((item) => {
              // if (item?.isShow === false) return null;
              return (
                <LeftRightButton
                  key={typeof item?.name === "string" ? item?.name : Date.now()}
                  {...item}
                  nameClassName="truncate"
                  isDottedText={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
