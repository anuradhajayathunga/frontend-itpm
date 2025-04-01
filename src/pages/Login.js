import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import context from "../context";
import Header from "../components/Header";
// import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { fetchUserDetails } = useContext(context);

  const handleOneChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  console.log("data login", data);
  return (
    <>
      <Header />
      <div id="login" className="bg-green/30">
        <div className="full-width flex">
          <div className="hidden flex-[1.2] lg:block">
            <img
              className="ml-[200px] w-[850px]"
              src="assets/signin.png"
              alt="Agon"
            />
          </div>
          <div className="flex-1 bg-bg-2 text-center grid place-items-center py-[50px]">
            <div className="max-w-[800px]">
              <h2 className="font-bold font-chivo text-[40px] leading-[30px] md:text-heading-3 mb-[50px]">
                Welcome back.
              </h2>
              <button type="button">
                <Link
                  className="flex items-center z-10 relative transition-all duration-200 group py-[13px] md:px-[120px] px-[80px] rounded-md bg-white text-gray-500 hover:text-gray-900 flex-row-reverse w-fit mb-[30px]"
                  to={"#"}
                >
                  <span className="block text-inherit w-full h-full rounded-md text-md font-chivo font-semibold">
                    Sign In with Google
                  </span>
                  <img
                    className="mr-5"
                    src="assets/images/icons/Icon-google.svg"
                    alt="google icon"
                  />
                </Link>
              </button>
              <div className="flex items-center justify-center gap-[7px] mb-[25px]">
                <div className="bg-gray-300 w-[50px] h-[2px]"></div>
                <p className="text-text text-gray-500">
                  Or, sign in with your email
                </p>
                <div className="bg-gray-300 w-[50px] h-[2px]"></div>
              </div>
              <form
                className="bg-white w-full p-8 shadow-3 rounded-[6px] md:p-12"
                onSubmit={handleSubmit}
              >
                <div className="relative mb-6">
                  <input
                    className="outline-none flex-1 pr-3 border caret-green-900 w-full placeholder:text-gray-400 placeholder:text-text placeholder:font-chivo border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-green-900 focus:border-[2px]"
                    type="email"
                    placeholder="Your email *"
                    name="email"
                    value={data.email}
                    onChange={handleOneChange}
                    required
                  />
                  <Link
                    to={"#"}
                    className="text-text text-green-900 absolute hover:opacity-70 top-1/2 -translate-y-1/2 right-[12px]"
                  >
                    Edit
                  </Link>
                </div>
                <div className="relative mb-6 last-of-type:mb-4">
                  <input
                    className="outline-none flex-1 pr-10 border caret-green-900 w-full peer placeholder:text-gray-400 placeholder:text-text placeholder:font-chivo border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-green-900 focus:border-[2px]"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={handleOneChange}
                    required
                  />
                  <span className="text-gray-400 text-sm px-1 font-chivo font-medium absolute left-3 bg-white -translate-y-1/2 peer-focus:text-green-900">
                    Password
                  </span>
                  <button
                    type="button"
                    className="absolute top-1/2 right-[12px] transform -translate-y-1/2 text-gray-500 hover:text-green-900"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {/* {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />} */}
                  </button>
                </div>
                <div className="block w-fit ml-auto -mt-5 mb-5">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-bold text-gray-500 hover:underline hover:text-c-green-900"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  className="mb-6 w-full text-white bg-c-green-900 transition-opacity duration-200 text-heading-6 font-chivo font-bold shadow-sm py-[13px] hover:opacity-75"
                  type="submit"
                >
                  Continue
                </button>
                <div className="flex gap-2">
                  <p className="text-text text-gray-500">
                    Don’t have an account?
                  </p>
                  <Link
                    to="/signup"
                    className="text-c-green-900 hover:opacity-70"
                  >
                    <p className="text-text">Sign up</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="bg fixed bottom-28 rounded-full grid place-items-center opacity-0 invisible transition-all duration-300 right-[20px] z-[9999] w-[48px] h-[48px]"
          id="backToTop"
        >
          <a
            className="rounded-full bg-green-900 grid place-items-center w-[48px] h-[48px]"
            href="#top"
          >
            <img src="assets/images/icons/icon-up.svg" alt="to top icon" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
