import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="wrapper mx-auto text-gray-900 font-normal max-w-[1320px]">
      <footer className="mt-[92px] lg:mt-[50px] xl:mt-[20px] mb-[30px]">
        <div className="px-[12px] md:px-[36px] xl:px-0 mt-[70px]">
          <div className="flex flex-col items-center gap-2 mb-14 md:flex-row md:justify-between">
            <img
              className="h-full w-full object-cover max-w-[162px]"
              src="/assets/Logo/Logo.svg"
              alt="logo"
            />
            <div className="flex items-center flex-col gap-5 md:flex-row lg:gap-[30px]">
              <p className="text-heading-6 font-chivo font-bold">
                Ready to get started?
              </p>
              <button type="button">
                <Link
                  className="flex items-center z-10 relative transition-all duration-200 group px-[22px] py-[15px] lg:px-[32px] lg:py-[15px] rounded-md bg-c-green-300 text-white hover:bg-gray-100 hover:text-gray-900 w-fit"
                  href="#"
                >
                  <span className="block text-inherit w-full h-full rounded-md text-lg font-chivo font-semibold">
                    Contact
                  </span>
                </Link>
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-200 h-[1px] mb-[52px]"></div>
          <div className="text-gray-600 grid gird-cols-1 gap-8 mb-[48px] md:grid-cols-2 lg:grid-cols-5 xl:gap-[98px]">
            <div>
              <h5 className="text-heading-5 font-chivo font-normal  mb-5 text-[14px]">
              {/* Making waste management simple and rewarding. We help residents sell their non-perishable items while promoting sustainability. */}
              </h5>
              {/* <p className="text-text mb-5">
                123 Green Street, EcoCity, Earth.
              </p>
              <p className="text-text underline">+123-456-7890</p>
              <p className="text-text underline">info@ecobin.com</p> */}
            </div>
            <div>
              <h5 className="text-heading-5 font-chivo font-bold text-gray-900 mb-5 text-[18px]">
                About Us
              </h5>
              <ul>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300 hover:pl-[3px]"
                    href="#"
                  >
                    Mission &amp; Vision
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Our Team
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Careers
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Press &amp; Media
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Advertising
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-green-900 hover:pl-[3px]"
                    href="#"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-heading-5 font-chivo font-bold text-gray-900 mb-5 text-[18px]">
                Discover
              </h5>
              <ul>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Our Blog
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Plans &amp; Pricing
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Knowledge Base
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Office Center
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    News &amp; Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-heading-5 font-chivo font-bold text-gray-900 mb-5 text-[18px]">
                Support
              </h5>
              <ul>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    FAQs
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Editor Help
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Community
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
<<<<<<< HEAD
                    href="../pages/Feedback&Complaint.js"
                  >
                    Feedback & Complaints
=======
                    href="#"
                  >
                    Live Chatting
>>>>>>> main
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="transition-all duration-200 hover:text-c-green-300  hover:pl-[3px]"
                    href="#"
                  >
                    Support Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-heading-5 font-chivo font-bold text-gray-900 mb-5 text-[18px]">
                Contact
              </h5>
              <p className="text-text mb-5">
                123 Green Street, EcoCity, Earth.
              </p>
              <p className="text-text underline">+123-456-7890</p>
              <p className="text-text underline">info@ecobin.com</p>
              {/* <ul>
                <li className="mb-2">
                  <a
                    className="transition-all duration-200 hover:text-green-900 hover:pl-[3px]"
                    href="#"
                  >
                    Request an offer
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="transition-all duration-200 hover:text-green-900 hover:pl-[3px]"
                    href="#"
                  >
                    How it works
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="transition-all duration-200 hover:text-green-900 hover:pl-[3px]"
                    href="#"
                  >
                    Pricing
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="transition-all duration-200 hover:text-green-900 hover:pl-[3px]"
                    href="#"
                  >
                    Reviews
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="transition-all duration-200 hover:text-green-900 hover:pl-[3px]"
                    href="#"
                  >
                    Stories
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
          <div className="w-full bg-gray-200 h-[1px] mb-[46px]"></div>
          <div className="text-gray-400 lg:flex lg:items-center lg:justify-between">
            <div className="md:flex md:items-center md:gap-6">
              <p className="text-lead font-bold">
                ©EcoBin Solution Pvt Ltd 2025
              </p>
              <div className="flex items-center justify-between md:gap-6">
                <Link className="text-text" href="#">
                  Privacy policy
                </Link>
                <Link className="text-text" to={"#"}>
                  Cookies
                </Link>
                <Link className="text-text" href="#">
                  Terms of service
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 mt-5 lg:mt-0">
              <Link
                className="w-8 h-8 transition-all duration-300 hover:opacity-70 hover:-translate-y-1"
                href="#"
              >
                <img
                  className="h-full w-full object-cover"
                  src="assets/images/icons/icon-facebook-green.svg"
                  alt="facebook icon"
                />
              </Link>
              <Link
                className="w-8 h-8 transition-all duration-300 hover:opacity-70 hover:-translate-y-1"
                href="#"
              >
                <img
                  className="h-full w-full object-cover"
                  src="../assets/images/icons/icon-instagram-green.svg"
                  alt="instagram icon"
                />
              </Link>
              <Link
                className="w-8 h-8 transition-all duration-300 hover:opacity-70 hover:-translate-y-1"
                href="#"
              >
                <img
                  className="h-full w-full object-cover"
                  src="assets/images/icons/icon-twitter-green.svg"
                  alt="twitter icon"
                />
              </Link>
              <Link 
                className="w-8 h-8 transition-all duration-300 hover:opacity-70 hover:-translate-y-1"
                href="#"
              >
                <img
                  className="h-full w-full object-cover"
                  src="assets/images/icons/icon-linkedin-green.svg"
                  alt="linkedin icon"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
