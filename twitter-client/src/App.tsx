import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useUserContext } from "./contexts/UserContext";

function App() {
  const userContext = useUserContext();
  console.log(userContext?.user);

  return (
    <div className="h-full">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            userContext?.isAuthenticated ? (
              <HomeLayout />
            ) : (
              <div className="h-full w-full">
                <Outlet />
              </div>
            )
          }
        >
          <Route
            index
            element={
              userContext?.isAuthenticated ? (
                <Home />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/friends"
            element={
              userContext?.isAuthenticated ? (
                <Friends />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              userContext?.isAuthenticated ? (
                <Profile />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
        </Route>
        <Route
          path="/register"
          element={
            userContext?.isAuthenticated ? <Navigate to="/" /> : <Register />
          }
        />
        <Route
          path="/login"
          element={
            userContext?.isAuthenticated ? <Navigate to="/" /> : <Login />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
