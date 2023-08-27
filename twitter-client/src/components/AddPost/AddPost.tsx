import { HiOutlinePhotograph } from "react-icons/hi";
import { useUserContext } from "../../contexts/UserContext";

const AddPost = () => {
  const userContext = useUserContext();
  return (
    <div className="flex items-start justify-between">
      <div className="h-[40px] w-[40px] overflow-hidden flex items-center justify-center text-[18px] rounded-full bg-pink-700">
        <img
          src={userContext?.user?.profilePicture}
          className="h-full w-full"
          alt=""
        />
      </div>
      <div className="flex-1">
        <div className="flex-1 mx-3 my-2 border-b-neutral-600 border-b-[0.7px]">
          <textarea
            placeholder="What is happening?!"
            className="mb-1 py-2 px-1 w-full bg-transparent border-none outline-none placeholder:text-[18px] resize-none overflow-y-auto"
          ></textarea>
        </div>
        <div className="flex-1 mx-3 flex justify-between mt-2 items-center">
          <div>
            <label htmlFor="postPicture">
              <HiOutlinePhotograph
                size={36}
                className="transition duration-300 p-2 rounded-full text-[#1d9bf0] cursor-pointer hover:bg-[#1d9cf01e]"
              />
            </label>
            <input type="file" hidden name="postPicture" id="postPicture" />
          </div>
          <div>
            <button className="px-4 py-[6px] bg-[#1d9bf0] rounded-[25px] font-[600] mt-2 ">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
