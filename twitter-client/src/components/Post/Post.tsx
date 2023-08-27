import { MdVerified } from "react-icons/md";
const Post = () => {
  return (
    <div className="flex gap-2 my-5 pb-3 px-6 border-b-[0.7px] border-b-neutral-700">
      <div className="w-[15%]">
        <div className="h-[45px] w-[45px]">
          <img
            className="h-full w-full rounded-full"
            src="https://pbs.twimg.com/profile_images/1692780873546952704/vXjQc2Og_400x400.jpg"
            alt=""
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-[5px]">
          <p className="text-[15px] text-[#e7e9ea] font-[700]">
            Shah Rukh Khan{" "}
            <span>
              <MdVerified className="inline mr-2 text-sky-600" />
            </span>
            <span className="text-[#71767b] text-[14px] font-normal">
              @iamsrk
            </span>
            <span className="text-[#71767b] text-[14px] font-normal">
              {" "}
              <span className="">.</span> Aug 25
            </span>{" "}
          </p>
          <div>...</div>
        </div>
        <div className="mb-6">
          <p>
            ये तो शुरुआत है…. The Many Faces of Justice… ये तीर है… अभी ढाल
            बाक़ी है.. . ये अंत है अभी काल बाक़ी है …ये पूछता है ख़ुद से
            कुछ….अभी जवाब बाक़ी है…
            <br />
            <br />
            #Jawan releasing worldwide on 7th September 2023, in Hindi, Tamil &
            Telugu.
          </p>
        </div>
        <div className="max-h-[550px] h-[510px]  max-w-full">
          <div className="h-full w-full">
            <img
              className="h-full object-contain rounded-3xl border-[0.7px] border-neutral-700 object-left-top"
              src="https://pbs.twimg.com/media/F4Z-IgdaUAMeT68?format=webp&name=small"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
