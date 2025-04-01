import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import Header from "../components/Header";
// import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const navigate = useNavigate();
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
    if (data.password === data.confpassword) {
      //console.log("SummaryApi.signUp.url", SummaryApi.signUp.url);
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }

      console.log("data", dataApi);
    } else {
      toast.error("check password and confirm password");
    }
  };
  console.log("data login", data);

  return (
    <>
    <Header />
      <div
        id="signup"
        className="full-width bg-bg-6 px-5 text-center flex flex-col items-center justify-center pt-[100px] pb-[300px] lg:pb-[400px] bg-c-green-300/20"
      >
        <div className="max-w-[800px]">
          <h2 className="font-bold font-chivo text-[40px] leading-[30px] md:text-heading-3 mb-[50px]">
            Let’s join us
          </h2>
          <button type="button">
            <Link
              to="/signup"
              className="flex items-center z-10 relative transition-all duration-200 group py-[13px] md:px-[120px] px-[50px] rounded-md bg-white text-gray-500 hover:text-gray-900 flex-row-reverse w-fit mb-[30px]"
            >
              <span className="block text-inherit w-full h-full rounded-md text-md font-chivo font-semibold">
                Sign up with Google
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
              Or, sign up with your email
            </p>
            <div className="bg-gray-300 w-[50px] h-[2px]"></div>
          </div>
          <form
            className="bg-white w-full p-8 shadow-3 rounded-[6px] md:p-12"
            onSubmit={handleSubmit}
          >
            <div className="relative mb-6">
              <input
                className="outline-none w-full pr-3 border caret-green-900 placeholder:text-gray-400 border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-green-900 focus:border-[2px]"
                type="text"
                placeholder="Your name *"
                name="name"
                value={data.name}
                onChange={handleOneChange}
                required
              />
              <Link
                to="/signup"
                className="text-text text-green-900 absolute hover:opacity-70 top-1/2 -translate-y-1/2 right-[12px]"
              >
                Edit
              </Link>
            </div>
            <div className="relative mb-6">
              <input
                className="outline-none w-full pr-3 border caret-green-900 placeholder:text-gray-400 border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-green-900 focus:border-[2px]"
                type="email"
                placeholder="Your email *"
                name="email"
                value={data.email}
                onChange={handleOneChange}
                required
              />
            </div>
            <div className="relative mb-6">
              <input
                className="outline-none w-full pr-3 border caret-green-900 placeholder:text-gray-400 border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-green-900 focus:border-[2px]"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleOneChange}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-[12px] transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />} */}
              </button>
            </div>
            <div className="relative mb-6">
              <input
                className="outline-none w-full pr-3 border caret-green-900 placeholder:text-gray-400 border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-green-900 focus:border-[2px]"
                type={showRetypePassword ? "text" : "password"}
                placeholder="Re-type Password"
                name="confpassword"
                value={data.confpassword}
                onChange={handleOneChange}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-[12px] transform -translate-y-1/2"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
              >
                {/* {showRetypePassword ? <FiEyeOff size={20} /> : <FiEye size={20} />} */}
              </button>
            </div>
            <div className="flex items-center mb-6 gap-[7px]">
              {/* <input
              type="checkbox"
              id="terms"
              className="w-5 h-5 cursor-pointer"
              required
            /> */}
              {/* <label htmlFor="terms" className="text-sm font-bold text-gray-500">
              Agree to{" "}
              <Link to="/terms" className="text-green-900 hover:opacity-70">
                terms & conditions
              </Link>
            </label> */}
            </div>
            <button className="w-full text-white bg-c-green-900 transition-opacity duration-200 text-heading-6 font-chivo font-bold shadow-sm py-[13px] hover:opacity-70 ">
              Continue
            </button>
            <div className="flex gap-2">
              <p className="text-text text-gray-500">
                Already have an account?
              </p>
              <Link to="/login" className="text-c-green-900 hover:opacity-70">
                Sign in now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
