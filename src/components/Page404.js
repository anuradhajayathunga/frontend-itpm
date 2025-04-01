import React from "react";
import Header from "./Header";

const Page404 = () => {
  return (
    <section id="page-404" className="bg-white division">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {/* 404 PAGE TEXT */}
          <div className="md:w-9/12 lg:w-8/12 w-full px-4 text-center">
            <div className="lg:pt-40 lg:pb-20 md:mt-20 md:pt-24 md:pb-20 sm:pt-24 xsm:pt-24 xsm:pb-16 pt-44 pb-24">
              {/* Image */}
              <div className="relative lg:mb-10 md:mb-8 sm:mb-10 xsm:mb-9 mb-14 px-5">
                <img
                  className="inline-block"
                  src="assets/error-404.png"
                  alt="error-404"
                />
              </div>
              {/* Text */}
              <h2 className="text-4xl md:text-3xl lg:text-3xl sm:text-2xl xsm:text-xl font-bold text-gray-900 mb-5">
                Page Not Found
              </h2>
              <h6 className="text-lg lg:text-base md:text-lg sm:text-lg xsm:text-base text-gray-600 mb-6 px-5 leading-relaxed">
                Oops! The page you are looking for might have been moved,
                renamed, or might never have existed.
              </h6>
              {/* Button */}
              <a
                href="/"
                className="bg-c-green-300 hover:bg-c-green-900 text-white font-bold py-3 px-6 rounded-lg"
              >
                Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Divider */}
      <hr className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-40 border-none mt-10" />
      {/* Footer */}
      <footer className="bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2025 ©EcoBin Solution Pvt Ltd.</p>
          <ul className="flex justify-center space-x-4 mt-2">
            <li>
              <a
                href="/"
                className="text-sm text-gray-700 hover:underline"
              >
                Privacy Policy
              </a>
            </li>
            <li className="text-gray-500">|</li>
            <li>
              <a
                href="/"
                className="text-sm text-gray-700 hover:underline"
              >
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
};

export default Page404;
