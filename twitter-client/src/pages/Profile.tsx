import bg from "../assets/Landscape.jpg";
import { SlCalender } from "react-icons/sl";
import { useMemo } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const userContext = useUserContext();

  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  return (
    <div className="h-full w-full bg-black">
      {/* banner */}
      <div className="max-h-[150px] h-[150px] w-full">
        <img
          className="h-full w-full object-cover brightness-[56%] "
          src={bg}
          alt=""
        />
      </div>
      {/* Profile Info */}
      <div className="bg-black px-5">
        <div className=" flex h-[69px] justify-between">
          <div className="h-[120px] w-[120px] bg-purple-800 flex items-center justify-center text-[60px] rounded-full border-[4px] border-black -translate-y-14">
            {userContext?.user?.username[0].toUpperCase()}
          </div>
          <div className="pt-4">
            <button className="px-4 py-1 border-[1px] text-[15px] font-[500] border-neutral-300 rounded-3xl">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="py-[8px] mb-[4px]">
          <h1 className="text-[20px] font-[800] tracking-normal">
            {userContext?.user?.username
              .split("_")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ")}
          </h1>
          <p className="text-[#71767b] text-[15px] font-normal">
            @{userContext?.user?.username}
          </p>
        </div>
        {userContext?.user?.createdAt && (
          <div className="flex gap-2 items-center pb-3">
            <div>
              <SlCalender className="text-[#71767b]" size={15} />
            </div>
            <div>
              <p className="text-[14px] text-[#71767b] leading-none mt-[2px]">
                Joined{" "}
                {months[new Date(userContext?.user?.createdAt).getMonth()]}{" "}
                {new Date(userContext?.user?.createdAt).getFullYear()}
              </p>
            </div>
          </div>
        )}
        <div className="flex gap-6 pb-4">
          <p>
            {userContext?.user?.followers.length}{" "}
            <span className="text-[14px] text-[#71767b]">Followers</span>
          </p>
          <p>
            {userContext?.user?.followings.length}{" "}
            <span className="text-[14px] text-[#71767b]">Following</span>
          </p>
        </div>
      </div>
      {/* Post header */}
      <div className="w-full flex pt-1 pb-[4px] border-b-[0.7px] border-b-neutral-700 px-7 bg-black">
        <div className="">
          <p className="pt-2 pb-[2px] px-2">Post</p>
          <div className="h-[4px] w-full bg-[#1d9bf0] rounded-full"></div>
        </div>
      </div>
      <div className="py-12 px-5 flex flex-col items-center justify-center">
        <p className="text-[30px] font-bold">No Posts yet!</p>
        <button
          onClick={() => navigate("/")}
          className="py-[4px] px-6 bg-[#1d9bf0] mt-3 rounded-full"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
