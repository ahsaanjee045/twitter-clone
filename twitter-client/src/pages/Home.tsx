import AddPost from "../components/AddPost/AddPost";
import Post from "../components/Post/Post";

const Home = () => {
  return (
    <div className="h-full w-full">
      <div className="px-6 pb-2 pt-4 border-b-[0.7px] border-b-neutral-600">
        <AddPost />
      </div>
      <div className="pt-3 pb-5 w-full">
        <Post />
        <Post  />
        <Post  />
        <Post  />
      </div>
    </div>
  );
};

export default Home;
