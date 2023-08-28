import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useUserContext } from "../../contexts/UserContext";
import { debouncedFetchPeople } from "../../utils/utils";
import { User } from "src/types/types.t";
import { ClipLoader } from "react-spinners";

const SearchBar = () => {
  const userContext = useUserContext();
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput(e.target.value);
    setLoading(true);
    debouncedFetchPeople(e.target.value, userContext?.user?.token)
      .then((res: any) => setSearchResult(res))
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  return (
    <div className="h-full w-full flex flex-col items-start ">
      <div className="xl:w-[450px] lg:w-[300px] h-full">
        <div className="w-full h-full px-3">
          <div className="w-full h-full p-3">
            <div className=" relative flex items-center justify-center bg-[#16181c] rounded-full">
              <AiOutlineSearch
                size={20}
                className="absolute left-4 text-[#71767b]"
              />
              <input
                value={input}
                onChange={handleSearch}
                type="text"
                placeholder="Search"
                className="w-full bg-transparent p-[12px] pl-[45px] outline-none border-none rounded-full placeholder:text-[#71767b]"
              />
            </div>
            {loading ? (
              <div className="mt-3 px-6 py-3 flex items-center justify-center bg-[#16181c] rounded-[20px]">
                <ClipLoader size={26} color="#fff" />
              </div>
            ) : searchResult.length > 0 ? (
              <div className="mt-3 px-6 py-3 bg-[#16181c] rounded-[20px]">
                {searchResult.map((s) => (
                  <div className="flex items-start my-[15px]">
                    <div className="w-[15%]">
                      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img
                          className="h-full w-full object-cover object-center"
                          src={s.profilePicture}
                          alt={s.username}
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 justify-between items-start">
                      <div>
                        <h2 className="text-[15px] font-[600]">
                          {s.username
                            .split("_")
                            .map(
                              (word) => word[0].toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </h2>
                        <p className="text-[15px] text-[#71767b]">
                          @{s.username}
                        </p>
                      </div>
                      <div>
                        <button className="px-[15px] py-[5px] bg-white text-[#0f1419] text-[14px] font-[700] rounded-full">
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {/* {(searchResult.length === 0 && loading) ? (
              <div className="mt-3 p-6 bg-[#16181c] rounded-[20px]">
                {searchResult.map((s) => {
                  return <div>{s.username}</div>;
                })}
              </div>
            ) : (
              <div className="mt-3 p-6 bg-[#16181c] rounded-[20px]">{}</div>
            )} */}
            <div className="mt-3 p-6 bg-[#16181c] rounded-[20px]">
              <h1
                className="text-[20px] font-[800] tracking-normal"
                style={{ fontFamily: "'TwitterChirp', sans-serif" }}
              >
                Subscribe to Premium!
              </h1>
              <p className="text-[15px] font-[700] tracking-normal my-2">
                Subscribe to unlock new features and if eligible, receive a
                share of ads revenue.
              </p>
              <button className="px-4 py-[6px] bg-[#1d9bf0] rounded-[25px] font-[600] mt-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
