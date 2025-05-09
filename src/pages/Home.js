import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation between pages
import { Link as ScrollLink } from "react-scroll"; // For smooth scrolling
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import mainBg from "../assets/main-bg.png";
import { FaArrowRightLong } from "react-icons/fa6";
import Header from "../components/Header";
import Footer from "../components/Footer";

const services = [
  {
    title: "Convenient & Hassle-Free",
    description:
      "ECOBIN smart bins simplify waste disposal with real-time alerts and optimized routes, saving users and operators time and effort.",
    icon: "assets/images/icons/icon-flower.svg",
    bgIcon: "assets/images/icons/icon-flower-white.svg",
    bgColor: "bg-c-green-300/60",
  },
  {
    title: "Earn from Your Waste",
    description:
      "ECOBIN rewards users for recycling by turning waste into valuable resources for the community, by offering incentives such as discounts, points or cash back.",
    icon: "assets/images/icons/icon-map.svg",
    bgIcon: "assets/images/icons/icon-map-white.svg",
    bgColor: "bg-c-green-300/60",
  },
  {
    title: "Eco-Friendly Impact",
    description:
      "Reduces landfill waste, promotes recycling and reduces carbon emissions, helping to create a cleaner, greener and more sustainable environment for future generations.",
    icon: "assets/images/icons/icon-pine.svg",
    bgIcon: "assets/images/icons/icon-pine-white.svg",
    bgColor: "bg-c-green-300/60",
  },
  {
    title: "Trusted by Thousands",
    description:
      "ECOBIN is a proven solution adopted by municipalities, businesses and residents around the world, ensuring reliability, transparency and measurable environmental benefits.",
    icon: "assets/images/icons/icon-pine.svg",
    bgIcon: "assets/images/icons/icon-pine-white.svg",
    bgColor: "bg-c-green-300/60",
  },
];

// ...
const features = [
  { title: "Boost your sale", icon: "/assets/number-1_9507565.png" },
  {
    title: "Smart Installation Tools",
    icon: "/assets/number-2_9507577.png",
  },
  {
    title: "Introducing New Features",
    icon: "/assets/number-3_9507588.png",
  },
  { title: "Dynamic Boosting", icon: "/assets/number-4_9507599.png" },
];

// ...
const testimonials = [
  {
    id: 1,
    name: "Wade Warren",
    company: "Louis Vuitton",
    image: "assets/images/avatar-1.png",
    text: "Even factoring differences in body weight between children and adults into account.",
  },
  {
    id: 2,
    name: "Wade Warren",
    company: "Louis Vuitton",
    image: "assets/images/avatar-2.png",
    text: "Even factoring differences in body weight between children and adults into account.",
  },
  {
    id: 3,
    name: "Wade Warren",
    company: "Louis Vuitton",
    image: "assets/images/avatar-3.png",
    text: "Even factoring differences in body weight between children and adults into account.",
  },
  {
    id: 4,
    name: "Wade Warren",
    company: "Louis Vuitton",
    image: "assets/images/avatar-4.png",
    text: "Even factoring differences in body weight between children and adults into account.",
  },
  {
    id: 5,
    name: "Wade Warren",
    company: "Louis Vuitton",
    image: "assets/images/avatar-5.png",
    text: "Even factoring differences in body weight between children and adults into account.",
  },
];
const Home = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div>
      <Header />
      {/* Hero */}
      {/* full-width min-h-[850px] banner-hero bg-c-green-300/20 banner-1 */}
      {/* <div className="bg-hero-pattern bg-repeat bg-cover bg-bottom w-full h-screen"> */}
      <div
        style={{ backgroundImage: `url(${mainBg})` }}
        className="bg-repeat bg-cover bg-bottom w-full h-screen"
      >
        <div className="px-[12px] md:px-[40px] xl:px-[60px] mt-0 z-10 relative py-[100px] lg:mx-[200px] lg:py-[120px] max-w-[850px] lg:flex lg:items-center">
          {/* Left Side - Text Content */}
          <div className="flex-1">
            <h1 className="text-c-white-300 font-montserrat font-black  lg:text-[70px] md:text-[50px] md:leading-[70px] sm:text-[40px] sm:leading-[58px] text-[40px] leading-[48px] mb-[10px]">
              Turn your waste into value with the
              <span className="text-c-green-300"> EcoBin </span>Solution!
            </h1>
            <p className="text-sm md:text-lg xl:text-xl text-c-white-100 pr-[40px] lg:pr-[60px] mb-[40px]">
              Sell your non-perishable items, recycle responsibly, and
              contribute to a greener p lanet. Together, we can make a
              difference.
            </p>
            <div className="flex items-center justify-start">
              <button type="button">
                <Link
                  to="/locatebin"
                  className="flex items-center z-10 relative transition-all duration-200 group px-[22px] py-[15px] lg:px-[32px] lg:py-[22px] rounded-[50px] bg-c-green-300 text-white hover:bg-gray-100 hover:text-gray-900 text-heading-6 tracking-wide mr-[22px] hover:translate-y-[-2px]"
                >
                  <span className="block text-inherit w-full h-full rounded-[50px] text-lg font-chivo font-semibold">
                    Get Start
                  </span>
                  {/* <img
                    className="ml-[7px] w-[12px] filter-white group-hover:filter-gray-900 "
                    src="assets/images/icons/icon-right.svg"
                    alt="arrow right icon"
                  /> */}
                  <div className="ml-[7px] text-base text-white group-hover:text-gray-900 ">
                    <FaArrowRightLong />
                  </div>
                </Link>
              </button>
              <ScrollLink
                to="why-choose"
                smooth={true}
                duration={500}
                className="text-base flex items-center font-chivo font-bold
                text-[18px] leading-[18px] gap-[5px] cursor-pointer "
              >
                See More
                <img
                  className="ml-[7px] w-[12px]"
                  src="assets/images/icons/icon-right.svg"
                  alt="arrow right icon"
                />
              </ScrollLink>
            </div>
          </div>

          {/* Right Side - Image and Video */}
          {/* <div className="hidden relative flex-1 h-auto self-stretch lg:block"> */}
          {/* <div className="absolute w-full left-20 animate-hero-thumb-sm-animation bottom-[-60px] max-w-[526px]">
              <img
                className="h-full w-full object-cover"
                src="assets/images/hero-1.png"
                alt="Agon"
              />
            </div>
            <div className="absolute opacity-80 animate-float max-w-[176px] bottom-[10%] -translate-x-1/3">
              <div className="relative bg-green-900 bg-opacity-80 rounded-2xl grid place-items-center">
                <img
                  className="h-full w-full object-cover"
                  src="assets/images/video-bg.png"
                  alt="Agon"
                />
                <p className="text-heading-4 absolute text-white font-chivo font-bold ml-[49px]">
                  Watch intro video
                </p>
                <button
                  className="rounded-full bg-white grid place-items-center absolute play-video w-[64px] h-[64px] left-[-15%]"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <img
                    src="assets/images/icons/icon-play.svg"
                    alt="play button"
                    width="15"
                  />
                </button>
              </div>
            </div> */}
          {/* </div> */}
        </div>

        {/* Optional: Video Modal */}
        {isVideoPlaying && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
              <button
                className="absolute top-2 right-2 text-gray-700 text-lg"
                onClick={() => setIsVideoPlaying(false)}
              >
                ✖
              </button>
              <video
                controls
                className="w-full max-w-[600px] h-auto rounded-lg"
              >
                <source src="assets/videos/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
      {/* why choose ecobin */}
      <div id="why-choose" className="px-3 md:px-9 xl:px-0 mt-16 lg:mt-24 ">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-bold font-chivo mx-auto text-3xl leading-[44px] md:text-4xl md:leading-[52px] lg:text-5xl text-gray-900 mb-6 max-w-2xl">
            Why Choose ECOBIN?{" "}
          </h2>
          <p className="text-lg text-gray-700 mx-auto max-w-3xl">
            At ECOBIN, we’re more than just a recycling platform. we’re your
            partner in creating a sustainable future.
          </p>
        </div>

        {/* Service Cards */}
        <div className="max-w-[1320px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {" "}
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 md:py-14 md:px-12 relative mb-5 flex flex-col justify-between transition-all duration-300 ${service.bgColor} hover:-translate-y-1`}
              >
                <div>
                  {/* <img
                    className="h-20 w-20 object-cover mb-8"
                    src={service.icon}
                    alt="icon"
                  /> */}
                  <h2 className="font-bold text-dark font-chivo text-2xl md:text-3xl mb-8">
                    {service.title}
                  </h2>
                  <p className="font-medium text-white mb-8">
                    {service.description}
                  </p>
                </div>
                <Link
                  to="/"
                  className="flex items-center transition-all duration-200 group px-6 py-4 lg:px-6 lg:py-4 rounded-full bg-white text-gray-900 hover:bg-c-green-300 hover:text-white w-fit hover:-translate-y-1"
                >
                  <span className="text-lg font-chivo font-semibold">
                    Learn More
                  </span>
                  <img
                    className="ml-2 w-3 group-hover:filter-white"
                    src="assets/images/icons/icon-right.svg"
                    alt="arrow right icon"
                  />
                </Link>
                {/* <img
                  className="absolute bottom-0 right-0 z-0 w-20 md:w-36 h-20 md:h-36 translate-x-1/5 translate-y-1/5 xl:translate-x-0 xl:translate-y-0"
                  src={service.bgIcon}
                  alt="background icon"
                /> */}
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden lg:flex lg:gap-5 xl:gap-8 flex items-center justify-between mx-auto relative max-w-[1320px]"></div>
      </div>
      {/* how ecobin works */}
      <div className="px-3 md:px-9 xl:px-0 mt-[70px] lg:mt-[100px] flex items-center justify-between mx-auto relative max-w-[1320px]">
        <div className="lg:grid lg:grid-cols-2 lg:gap-[30px] xl:gap-[95px]">
          {/* Left Image Section */}
          <div className="relative">
            <img
              className="rounded-2xl mb-[30px] lg:mb-0 lg:flex-1"
              src="/assets/garbage-from-nature.jpg"
              alt="Agon"
              width={500}
              height={500}
            />
          </div>

          {/* Right Content Section */}
          <div className="flex-1 order-1">
            <span className="font-chivo inline-block bg-c-green-300/10 text-c-green-900 py-[14px] px-[28px] rounded-[50px] text-[14px] leading-[14px] mb-[22px]">
              What We Do, What You Get
            </span>
            <h3 className="font-chivo font-bold lg:text-5xl md:text-[46px] md:leading-[52px] text-[35px] leading-[44px] mb-[22px]">
              How ECOBIN Works
            </h3>
            <p className="text-lg text-gray-600 mb-[50px]">
              Discover the simple steps to recycle smarter! From submitting your
              items online to receiving payment after pickup, ECOBIN makes
              recycling effortless and rewarding.
            </p>

            <div className="border border-green-900 border-dashed mb-[48px]"></div>

            {/* Features Grid */}
            <div className="md:grid md:grid-cols-2 md:gap-y-[34px] lg:gap-x-[70px]">
              {features.map((feature, index) => (
                <div key={index} className="mb-[30px] lg:mb-0">
                  <div className="flex items-center mb-[17px]">
                    <img
                      className="mr-[9px]"
                      src={feature.icon}
                      alt="icon"
                      width={24}
                      height={24}
                    />
                    <h4 className="text-xl font-chivo font-bold">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-600">
                    The latest design trends meet hand-crafted templates.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* find your nearest bin */}
      <div className="tab-content mt-24 lg:gap-8 lg:flex  flex items-center justify-between mx-auto relative max-w-[1320px] bg-c-green-600/20 limeing">
        {/* Left Section - Text Content */}
        <div className="p-5 md:p-16 lg:w-1/2">
          <h2 className="font-bold font-chivo text-2xl  leading-[32px] md:text-4xl mb-8">
            Find Your Nearest Bin
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            Locate your closest collection point with just a few clicks. Our
            interactive map helps you find bins that accept your specific items,
            making recycling convenient and efficient.
          </p>

          {/* Learn More Button */}
          <Link
            to={"#"}
            className="flex items-center z-10 relative transition-all duration-200 group px-6 py-4 lg:px-8 lg:py-5 rounded-full bg-white text-gray-900 hover:bg-green-600 hover:text-white w-fit shadow-md"
          >
            <span className="block text-lg font-semibold font-chivo">
              Get Start
            </span>
            <img
              className="ml-2 "
              src="/assets/images/icons/icon-right.svg"
              alt="arrow right icon"
              width={12}
              height={12}
            />
          </Link>
        </div>

        {/* Right Section - Image & Play Button */}
        <div className="relative lg:w-1/2">
          <img
            className="h-full w-full object-cover"
            src="/assets/hero_geocoding_api_720 1.png"
            alt="Agon"
            width={600}
            height={400}
          />

          {/* Play Button */}
          {/* <button className="rounded-full bg-white grid place-items-center absolute w-[135px] h-[135px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 shadow-lg">
            <img
              src="/assets/images/icons/icon-play.svg"
              alt="play button"
              width={30}
              height={30}
            />
          </button> */}
        </div>
      </div>
      {/* what our user say! */}
      <div className="px-3 md:px-9 xl:px-0 mt-16  mx-auto relative max-w-[1320px]">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-gray-900 font-bold text-2xl md:text-4xl lg:text-5xl mb-3">
              Our Happy Customers
            </h2>
            <p className="text-gray-600">
              Know about our clients, we are a worldwide corporate lime
            </p>
          </div>
          <div className="flex items-center gap-5">
            <button
              ref={prevRef}
              className="w-12 h-12 xl:w-16 xl:h-16 bg-gray-100 border border-c-green-300/20 rounded-full hover:bg-c-green-300 flex items-center justify-center"
            >
              <img
                src="assets/images/icons/icon-prev.svg"
                alt="Previous"
                className="w-6 h-6 group-hover:filter-white"
              />
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 xl:w-16 xl:h-16 bg-gray-100 border border-c-green-300/20  rounded-full hover:bg-c-green-300 flex items-center justify-center"
            >
              <img
                src="assets/images/icons/icon-next.svg"
                alt="Next"
                className="w-6 h-6 group-hover:filter-white"
              />
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial.id}
              className="p-10 border-4 border-c-green-300/20 rounded-lg"
            >
              <img
                className="w-14 h-14 mb-5 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <p className="text-lg font-bold">{testimonial.name}</p>
              <p className="text-sm text-gray-700 font-semibold mb-3">
                {testimonial.company}
              </p>
              <p className="text-gray-500">{testimonial.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
