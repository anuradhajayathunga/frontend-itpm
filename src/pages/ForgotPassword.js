import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };
  return (
    <div className="">
    <Header />
      <div className="px-[12px] md:px-[36px] xl:px-0 mt-[70px] text-center">
        <h2 className="font-bold font-chivo text-[35px] leading-[30px] md:text-heading-3 mb-[13px]">
          Reset password
        </h2>
        <p className="text-text text-gray-500 mb-[60px]">
          Enter your email to reset your password.
        </p>
        <form
          className="bg-white w-full p-8 shadow-3 mx-auto border border-gray-200 rounded-[6px] md:p-12 max-w-[400px]"
          onSubmit={handleSubmit}
        >
          <div className="relative mb-6 last-of-type:mb-4">
            <input
              className="outline-none flex-1 pr-10 border caret-green-900 w-full peer placeholder:text-gray-400 placeholder:text-text placeholder:font-chivo border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-green-900 focus:border-[2px]"
              id="mail"
              required
              type="email"
              name="mail"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-gray-400 text-sm px-1 font-chivo font-medium absolute left-3 bg-white -translate-y-1/2 peer-focus:text-green-900"></span>
            <i className="absolute hover:opacity-70 top-1/2 -translate-y-1/2 right-[12px]">
              <img
                src="assets/images/icons/icon-envelope.svg"
                alt="email icon"
              />
            </i>
          </div>
          <button
            className="mb-6 w-full text-white bg-c-green-900 transition-opacity duration-200 text-heading-6 font-chivo font-bold shadow-sm py-[13px] hover:opacity-75"
            type="submit"
          >
            Reset password
          </button>
          <div className="flex gap-2">
            <Link to="/" className="text-green-900 hover:opacity-70">
              <p className="text-text">Back to Homepage</p>
            </Link>
          </div>
        </form>
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
  );
};

export default ForgotPassword;
