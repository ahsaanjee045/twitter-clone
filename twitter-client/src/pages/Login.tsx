import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useUserContext } from "../contexts/UserContext";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const userContext = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: React.FormEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await userContext?.login(email, password);
      if (result) {
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#5b708366] items-center justify-center w-full h-full">
      <div className="max-w-[500px] w-full min-h-[550px] max-h-[600px] h-full bg-black rounded-[50px] px-5 py-[35px] flex flex-col">
        <div className="flex  justify-center items-center">
          <div className="flex items-center justify-center w-[60px] h-[60px]">
            <img src={logo} alt="twitter-clone logo" />
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center mt-4 w-full">
          <h1 className="text-[31px] font-[700] tracking-wider text-left w-full px-[20px]">
            Login to your account
          </h1>
          <form
            className="flex px-[20px] mt-1 flex-col  w-full h-full"
            onSubmit={handleSubmit}
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="mt-3 py-3 px-3 bg-transparent border-[0.7px] border-neutral-700 rounded-[5px]"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="mt-3 py-3 px-3 bg-transparent border-[0.7px] border-neutral-700 rounded-[5px]"
              placeholder="Password"
            />
            <button
              disabled={loading}
              type="submit"
              className="mt-4 w-full bg-white text-black py-3 rounded-3xl text-[17px] font-[600] cursor-pointer"
            >
              {loading ? <ClipLoader color="#000000" size={40} /> : "Login"}
            </button>
            <p className="mt-4 px-4 text-[14px] font-[500]">
              Don't Have an Account?{" "}
              <Link className="text-[#1d9bf0]" to={"/register"}>
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
