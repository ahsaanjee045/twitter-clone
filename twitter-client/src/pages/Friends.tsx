import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { fetchAllPeoples } from "../utils/utils";
import { User } from "src/types/types.t";

const Friends = () => {
  const [peoples, setPeoples] = useState<User[]>([]);
  const userContext = useUserContext();

  useEffect(() => {
    if (userContext?.user?.token) {
      fetchAllPeoples(userContext.user.token)
        .then((res) => setPeoples(res))
        .catch(console.log);
    }
  }, []);

  return (
    <div className="py-3 w-full h-full">
      <div className="px-6 pb-6 py-3 flex w-full border-b-[0.7px] border-b-neutral-700">
        <h1 className="text-[20px] font-[800] leading-6 ">
          People You May Now
        </h1>
      </div>
      <div className="px-6 w-full pt-4">
        {peoples.map((people) => {
          return (
            <div className="my-3 px-2 py-2 flex gap-4 w-full max-h-[120px]">
              <div className="basis-[50px] flex">
                <div className="self-start">
                  <img
                    className="h-[50px] w-[50px] rounded-full object-cover object-center"
                    src={people.profilePicture}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[15px] font-[700]">
                      {people.username
                        .split("_")
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(" ")}
                    </p>
                    <p className="text-[15px] text-[#71767b]">
                      @{people.username}
                    </p>
                  </div>
                  <div>
                    <button className="px-[15px] py-[5px] bg-white text-[#0f1419] text-[14px] font-[700] rounded-full">
                      Follow
                    </button>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-[15px] text-[#E7E9EA]">
                    {people.bio.length > 130
                      ? people.bio.slice(0, 130) + "..."
                      : people.bio || "No Bio Found"}
                    {/* Main kaun hoon, kaun nahin, jaanne ke liye, READY AH?  
                   Main kaun hoon, kaun nahin, jaanne ke liye, READY AH? */}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
