import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
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
                type="text"
                placeholder="Search"
                className="w-full bg-transparent p-[12px] pl-[45px] outline-none border-none rounded-full placeholder:text-[#71767b]"
              />
            </div>
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
              <button className="px-4 py-[6px] bg-[#1d9bf0] rounded-[25px] font-[600] mt-2">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
