import { createContext, useContext, useState } from "react";
import { loginSchema, registerSchema } from "../schemas/schemas";
import { toast } from "react-hot-toast";

import axios from "axios";

type UserContextData = {
  login: (email: string, password: string) => void;
  register: (
    username: string,
    email: string,
    password: string,
    confirm: string,
    profilePicture: File | null
  ) => Promise<any>;
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
};

type User = {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  displayName: string;
  bio: string;
  followers: [];
  followings: [];
  __v: 0;
  token: string;
  createdAt: string;
  updatedAt: string;
};

const UserContext = createContext<UserContextData | null>(null);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user")!)
  );

  const login = async (email: string, password: string) => {
    try {
      await loginSchema.validate({ email }, { abortEarly: false });
      if (password) {
        let res = await axios.post("http://localhost:8080/api/v1/user/login", {
          email,
          password,
        });
        if (res.data.success === true) {
          setUser(res.data.data);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          toast.success("Logged In successfully");
          return true;
        } else {
          toast.error("Something went wrong while registering");
          return false;
        }
      } else {
        toast.error("Password is required");
        return false;
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.error ||
          error.errors[0] ||
          "Pta ni kya hogya Login Karte time!"
      );
    }
  };
  const register = async (
    email: string,
    password: string,
    username: string,
    confirm: string,
    profilePicture: File | null
  ) => {
    try {
      await registerSchema.validate(
        { username, email, password, confirm },
        { abortEarly: false }
      );
      if (profilePicture) {
        let formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profilePicture", profilePicture);
        let res = await axios.post(
          "http://localhost:8080/api/v1/user/register",
          formData
        );
        if (res.data.success === true) {
          setUser(res.data.data);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          toast.success("Registered successfully");
          toast.loading("Redirecting to homepage.", {
            duration: 300,
          });
          return true;
        } else {
          toast.error("Something went wrong while registering");
          return false;
        }
      } else {
        toast.error("Profile Picture is required");
        return false;
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.error ||
          error.errors[0] ||
          "Pta ni kya hogya Register Karte time!"
      );
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = user ? true : false;

  return (
    <UserContext.Provider
      value={{ login, register, isAuthenticated, user, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => {
  return useContext(UserContext);
};
