import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";
import { useUserContext } from "../../contexts/UserContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userContext = useUserContext();

  let title =
    pathname === "/"
      ? "Home"
      : pathname === "/friends"
      ? "Friends"
      : userContext?.user?.username
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ");

  return (
    <div className="px-6 py-[10px] border-b-[0.5px] border-[#2f3336] ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10">
          {pathname === "/profile" && (
            <div onClick={() => navigate(-1)} className="cursor-pointer ">
              <IoArrowBack size={21} />{" "}
            </div>
          )}
          <div>
            <h1 className="text-[18px] font-[700] flex items-center gap-3">
              {title}
            </h1>
            {pathname === "/profile" && (
              <p className="leading-none text-[12px] text-neutral-500 ">
                0 posts
              </p>
            )}
          </div>
        </div>
        <div className="lg:hidden relative flex items-center justify-center bg-[#16181c] rounded-full">
          <AiOutlineSearch
            size={20}
            className="absolute left-4 text-[#71767b]"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent p-[12px] pl-[45px] outline-none border-none rounded-full placeholder:text-[#71767b]"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
