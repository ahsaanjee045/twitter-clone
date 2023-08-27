import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import SearchBar from "../components/SearchBar/SearchBar";
import Header from "../components/Header/Header";
import LinkComponent from "../components/LinkComponent/LinkComponent";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";

const HomeLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="h-full flex">
      <div className="xl:w-[350px] lg:w-[300px] hidden lg:flex border-r-[0.5px] border-[#2f3336]">
        <Sidebar />
      </div>
      <div className="flex-1 relative overflow-x-hidden overflow-y-auto main-section">
        {/* {Header} */}
        <Header />
        <Outlet />
        <div className="fixed bottom-0 w-full lg:hidden px-6 py-4 border-t-[0.5px] border-[#2f3336] ">
          <div className="flex justify-center gap-[80px] items-center">
            <div className="text-[18px] font-[700]">
              <LinkComponent
                icon={AiFillHome}
                to="/"
                label="Home"
                active={pathname === "/"}
              />
            </div>
            <div className="text-[18px] font-[700]">
              {" "}
              <LinkComponent
                icon={AiOutlineUser}
                to="/friends"
                label="Friends"
                active={pathname === "/friends"}
              />
            </div>
            <div className="text-[18px] font-[700]">
              <LinkComponent
                icon={FaUserFriends}
                to="/profile"
                label="Profile"
                active={pathname === "/profile"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-[500px] lg:w-[300px] hidden lg:flex border-l-[0.5px] border-[#2f3336]">
        <SearchBar />
      </div>
    </div>
  );
};

export default HomeLayout;
