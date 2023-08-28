import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import LinkComponent from "../LinkComponent/LinkComponent";
import { useUserContext } from "../../contexts/UserContext";

const Sidebar = () => {
  const userContext = useUserContext();
  const { pathname } = useLocation();

  const links = useMemo(() => {
    return [
      {
        icon: AiFillHome,
        to: "/",
        label: "Home",
        active: pathname === "/",
      },
      {
        icon: FaUserFriends,
        to: "/friends",
        label: "Peoples",
        active: pathname === "/friends",
      },
      {
        icon: AiOutlineUser,
        to: "/profile",
        label: "Profile",
        active: pathname === "/profile",
      },
    ];
  }, [pathname]);

  return (
    <div className="h-full w-full flex flex-col items-end ">
      <div className="w-[225px] h-full">
        <div className="w-full h-full px-3">
          <div className="w-full h-[calc(100%-60px)]">
            <div className="w-[80px] h-[80px] p-3">
              <img className="h-full" src={"/src/assets/logo.png"} alt="" />
            </div>
            <div className="mt-[20px]">
              <nav className="flex flex-col">
                {links.map((link) => {
                  return <LinkComponent key={link.label} {...link} />;
                })}
              </nav>
            </div>
          </div>
          <div className="w-full h-[60px] flex items-start justify-start">
            <button
              className="bg-[#1d9bf0] px-6 py-2 rounded-full"
              onClick={userContext?.logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
