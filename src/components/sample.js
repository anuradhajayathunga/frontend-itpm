//import { useState } from "react";
import { Link } from "react-router-dom"; // For navigation between pages
import { Link as ScrollLink } from "react-scroll"; // For smooth scrolling
import collectBg from "../assets/collect-bg.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import imageTobase64 from "../helpers/imageTobase64";
import Header from "../components/Header";
import Footer from "../components/Footer";
import cityList from "../helpers/city";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const BecomeACollector = () => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState({
    fname: user?.name || " ",
    lname: "",
    email: user?.email || " ",
    phone: "",
    location: "",
    workarea: "",
    fnic: "",
    bnic: "",
    reginumber: "",
    chassisnumber: "",
    vehicle: "",
  });

  const [file, setFile] = useState(null);
  const handleUpNIC = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }

    const imagepic = await imageTobase64(selectedFile);

    // console.log("imagepic",imagepic)

    setData((preve) => {
      return {
        ...preve,
        fnic: imagepic,
      };
    });
  };

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  // Find the selected city object
  const city = cityList.find((c) => c.value === selectedCity);

  // Handle input changes for text fields
  const handleOneChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    const { name, value } = e.target;

    // Allow only numbers & limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setData({ ...data, [name]: value });
    }
  };

  // Handle city selection change
  const handleCityChange = (e) => {
    const cityValue = e.target.value;
    setSelectedCity(cityValue);
    setSelectedArea(""); // Reset area when city changes
    setData((prevData) => ({
      ...prevData,
      location: cityValue, // Store selected city in data.location
      workarea: "", // Reset workarea
    }));
  };

  // Handle area selection change
  const handleAreaChange = (e) => {
    const areaValue = e.target.value;
    setSelectedArea(areaValue);
    setData((prevData) => ({
      ...prevData,
      workarea: areaValue, // Store selected area in data.workarea
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.location || !data.workarea) {
      toast.error("Please select both a city and an area.");
    }
    if (data.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
    }
    console.log("Form Data Submitted:", data);
    toast.success("Form submitted successfully!");
  };
  console.log("data login", data);
  const faqs = [
    {
      question: "Where is my order?",
      answer:
        "Nulla non sollicitudin. Morbi sit amet laoreet ipsum, vel pretium mi.",
    },
    {
      question: "How can I return an item purchased online?",
      answer:
        "Morbi varius, tellus in accumsan blandit, elit ligula eleifend velit, luctus mattis ante nulla condimentum nulla.",
    },
    {
      question: "Can I cancel or change my order?",
      answer:
        "Morbi sit amet laoreet ipsum, vel pretium mi. Morbi varius, tellus in accumsan blandit.",
    },
    {
      question: "I have a promotional or discount code?",
      answer:
        "Luctus mattis ante nulla condimentum nulla. Morbi varius, tellus in accumsan blandit.",
    },
    {
      question: "What are the delivery types you use?",
      answer:
        "Morbi sit amet laoreet ipsum, vel pretium mi. Morbi varius, tellus in accumsan blandit.",
    },
    {
      question: "How can I pay for my purchases?",
      answer:
        "Nulla non sollicitudin. Morbi sit amet laoreet ipsum, vel pretium mi.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Luctus mattis ante nulla condimentum nulla. Morbi varius, tellus in accumsan blandit.",
    },
  ];
  return (
    <div>
      <Header />
      {/* hero section */}
      {/* <div className="full-width min-h-[900px] bg-cover bg-bottom"> */}
      <div
        style={{ backgroundImage: `url(${collectBg})` }}
        className="bg-repeat bg-cover bg-bottom w-full h-screen"
      >
        <div className="px-3 md:px-9 xl:px-0 mt-0 z-10 relative mx-auto py-[120px] max-w-[1320px] lg:flex lg:items-end lg:justify-between">
          <div className="lg:w-[60%] lg:mr-[150px]">
            <span className="font-chivo inline-block bg-c-green-300/20 text-c-white-100 py-3 px-6 rounded-full text-sm leading-4 mb-2">
              What We Do, What You Get
            </span>
            <h1 className="text-c-white-300 font-montserrat black  lg:text-[70px] md:text-[50px] md:leading-[70px] sm:text-[40px] sm:leading-[58px] text-[40px] leading-[48px] mb-[10px]">
              Join <span className="text-c-green-300">EcoBin</span> <br /> as a
              Collector!{" "}
            </h1>
            <p className="text-sm md:text-lg xl:text-xl text-c-white-100 pr-[40px] lg:pr-[60px] mb-[40px]">
              EcoBin is looking for dedicated individuals to collect recyclable
              items from residents and businesses. If you’re reliable and
              passionate about sustainability, apply today and start making a
              difference!
            </p>
            <div className="flex items-center justify-start mb-12">
              <ScrollLink
                to="collect-form"
                smooth={true}
                duration={500}
                className="flex items-center transition-all duration-200 group px-6 py-4 lg:px-8 lg:py-5 rounded-full bg-c-green-300 text-white hover:bg-gray-100 hover:text-gray-900  text-lg font-chivo font-semibold tracking-wide mr-6"
              >
                Join Our Team
                {/* <img
                  src="/assets/images/icons/icon-right.svg"
                  width={12}
                  height={12}
                  alt="arrow right icon"
                  className="ml-2 group-hover:filter-gray-900 "
                /> */}
                <div className="ml-[7px] text-base text-white group-hover:text-gray-900 ">
                  <FaArrowRightLong />
                </div>
              </ScrollLink>
              <Link
                to={"#"}
                href="index.html"
                className="text-lg font-chivo font-bold flex items-center"
              >
                Contact Us
                {/* <img
                  src="/assets/images/icons/icon-right.svg"
                  width={12}
                  height={12}
                  alt="arrow right icon"
                  className="ml-2"
                /> */}
                <div className="ml-[7px] text-base text-gray-900  group-hover:text-white">
                  <FaArrowRightLong />
                </div>
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* <div className="flex justify-between w-full flex-wrap lg:flex-col gap-10 lg:gap-0">
              {[
                {
                  number: "+12k",
                  text: "Projects done",
                  icon: "icon-waves.svg",
                },
                {
                  number: "+68",
                  text: "Offices / Factories",
                  icon: "icon-pine.svg",
                },
                {
                  number: "+15k",
                  text: "Constant clients",
                  icon: "icon-anchor.svg",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start lg:mb-16 last:mb-0 gap-6"
                >
                  <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center">
                    <img
                      src={`/assets/images/icons/${item.icon}`}
                      width={44}
                      height={44}
                      alt="icon"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold font-chivo text-3xl text-c-white-100 mb-1">
                      {item.number}
                    </h2>
                    <p className="text-c-white-300 text-lg">{item.text}</p>
                  </div>
                </div>
              ))}
            </div> */}
            {/* <div className="absolute hidden bottom-[-60px] left-[-117px] translate-x-[-260px] lg:block">
              <img
                src="/assets/images/hero-about2.png"
                width={500}
                height={500}
                alt="Agon"
                className="object-cover animate-hero-thumb-sm-animation"
              />
            </div> */}
          </div>
        </div>
      </div>
      {/* benefits */}
      <div className="px-3 md:px-9 xl:px-0 mt-16 text-center mx-auto max-w-4xl">
        <span className="font-chivo inline-block bg-c-green-100/20 text-c-green-900 py-3 px-7 rounded-full text-sm leading-4 mb-4">
          How It Works?
        </span>
        <div className="text-center mb-20">
          <h2 className="font-bold font-chivo mx-auto text-2xl md:text-4xl lg:text-5xl text-gray-900 mb-5 md:mb-8 max-w-2xl">
            Benefits of Becoming a Collector{" "}
          </h2>
        </div>
        <div className="min-w-full flex flex-col gap-5 items-center justify-center relative md:flex-wrap md:flex-row lg:gap-[30px] xl:gap-[110px]">
          <div className="rounded-2xl p-[30px] md:py-[20px] md:px-[53px] self-stretch relative bg-c-green-100/20 md:w-[calc(50%-20px)] lg:w-[calc(33.33%-30px)] xl:w-[calc(33.33%-75px)] transition-all duration-300 hover:translate-y-[-3px]">
            <div className="bg-white rounded-full grid place-items-center mx-auto mb-8 w-[80px] h-[80px]">
              <img
                className="max-w-[36px]"
                src="assets/images/icons/icon-dharma-wheel.svg"
                alt="icon"
              />
            </div>
            <h4 className="font-bold font-chivo text-[14px] xl:text-lg mb-[15px]">
              Earn Money{" "}
            </h4>
            <p className="text-md text-gray-700">
              Get paid for each collection and build a stable income.{" "}
            </p>
            <img
              className="hidden absolute right-0 lg:block top-1/2 translate-x-[30px] z-[-1] xl:translate-x-full xl:right-[-15px]"
              src="assets/images/icons/icon-arrow-1.svg"
              alt="direction arrow"
            />
          </div>
          <div className="rounded-2xl p-[30px] md:py-[20px] md:px-[53px] self-stretch relative bg-c-green-100/20 md:w-[calc(50%-20px)] lg:w-[calc(33.33%-30px)] xl:w-[calc(33.33%-75px)] transition-all duration-300 hover:translate-y-[-3px]">
            <div className="bg-white rounded-full grid place-items-center mx-auto mb-8 w-[80px] h-[80px]">
              <img
                className="max-w-[36px]"
                src="assets/images/icons/icon-wave.svg"
                alt="icon"
              />
            </div>
            <h4 className="font-bold font-chivo text-[14px] xl:text-lg mb-[15px]">
              Flexible Hours
            </h4>
            <p className="text-text text-gray-700">
              Choose your working hours and pick up assignments that fit your
              schedule.{" "}
            </p>
            <img
              className="hidden absolute right-0 lg:block top-1/2 translate-x-[30px] z-[-1] xl:translate-x-full xl:right-[-15px]"
              src="assets/images/icons/icon-arrow-2.svg"
              alt="direction arrow"
            />
          </div>
          <div className="rounded-2xl p-[30px] md:py-[20px] md:px-[53px] self-stretch relative bg-c-green-100/20 md:w-[calc(50%-20px)] lg:w-[calc(33.33%-30px)] xl:w-[calc(33.33%-75px)] transition-all duration-300 hover:translate-y-[-3px]">
            <div className="bg-white rounded-full grid place-items-center mx-auto mb-8 w-[80px] h-[80px]">
              <img
                className="max-w-[36px]"
                src="assets/images/icons/icon-headphones.svg"
                alt="icon"
              />
            </div>
            <h4 className="font-bold font-chivo text-[14px] xl:text-lg mb-[15px]">
              Sustainability
            </h4>
            <p className="text-text text-gray-700">
              Help reduce waste by collecting and ensuring responsible
              recycling.
            </p>
            <img
              className="hidden absolute right-0 top-full lg:block translate-x-[-60px] z-[-1] xl:translate-y-[30px]"
              src="assets/images/icons/icon-arrow-3.svg"
              alt="direction arrow"
            />
          </div>
          <div className="rounded-2xl p-[30px] md:py-[20px] md:px-[53px] self-stretch relative bg-c-green-100/20  md:w-[calc(50%-20px)] lg:w-[calc(33.33%-30px)] xl:w-[calc(33.33%-75px)] transition-all duration-300 hover:translate-y-[-3px] lg:order-1">
            <div className="bg-white rounded-full grid place-items-center mx-auto mb-8 w-[80px] h-[80px]">
              <img
                className="max-w-[36px]"
                src="assets/images/icons/icon-trees.svg"
                alt="icon"
              />
            </div>
            <h4 className="font-bold font-chivo text-[14px] xl:text-lg mb-[15px]">
              Work Assignments
            </h4>
            <p className="text-text text-gray-700">
              Receive scheduled pickups near your location for a steady
              workflow.{" "}
            </p>
            <img
              className="hidden absolute left-0 lg:block top-1/2 translate-x-[-30px] z-[-1] xl:-translate-x-full xl:left-[-15px]"
              src="assets/images/icons/icon-arrow-4.svg"
              alt="direction arrow"
            />
          </div>
          <div className="rounded-2xl p-[30px] md:py-[20px] md:px-[53px] self-stretch relative  bg-c-green-100/20 md:w-[calc(50%-20px)] lg:w-[calc(33.33%-30px)] xl:w-[calc(33.33%-75px)] transition-all duration-300 hover:translate-y-[-3px]">
            <div className="bg-white rounded-full grid place-items-center mx-auto mb-8 w-[80px] h-[80px]">
              <img
                className="max-w-[36px]"
                src="assets/images/icons/icon-flower.svg"
                alt="icon"
              />
            </div>
            <h4 className="font-bold font-chivo text-[14px] xl:text-lg mb-[15px]">
              Complete
            </h4>
            <p className="text-text text-gray-700">After-release Support</p>
          </div>
        </div>
      </div>
      {/* join us form */}
      <div
        id="collect-form"
        className=" items-center justify-between mx-auto relative max-w-[1320px]"
      >
        <div>
          <div className="full-width bg-bg-2">
            <div className="text-center px-5 pt-[74px] pb-[10px]">
              <h2 className="font-bold font-chivo text-[28px] leading-[32px] md:text-heading-2 mb-[22px]">
                Join Us
              </h2>
              <p className="text-text text-gray-700 mx-auto md:w-[49ch]">
                Earn money while helping the environment. Become a collector and
                be part of a sustainable future!
              </p>
            </div>
          </div>
          <div className="bg-gray-100 relative p-[40px] md:pt-[91px] md:pr-[98px] md:pb-[86px] md:pl-[92px] mt-[10px] rounded-[58px]">
            <div className="mx-auto relative max-w-[1320px]">
              <img
                className="absolute right-0 max-w-[129px] top-[-50px]"
                src="assets/images/mail.png"
                alt=""
              />
              <p className="text-capitalized text-gray-700 uppercase tracking-[2px] mb-[15px]">
                Join us
              </p>
              <h2 className="font-bold font-chivo text-[25px] leading-[30px] md:text-heading-3 mb-[22px]">
                Have an idea to earn income?
              </h2>
              <p className="text-text text-gray-600 mb-[30px] md:mb-[60px]">
                {/* Earn money while helping the environment. Become a collector and
                be part of a sustainable future! */}
              </p>
              <div className="flex flex-col gap-8 mb-[15px] md:mb-[25px] lg:flex-row lg:gap-[50px] xl:gap-[98px]">
                <div>
                  <div className="flex gap-[13px] mb-[15px] md:mb-[25px]">
                    <i>
                      <img
                        src="assets/images/icons/icon-home-fill.svg"
                        alt="home icon"
                      />
                    </i>
                    <p className="text-heading-6 font-bold font-chivo">
                      EcoBin Solution
                    </p>
                  </div>
                  <p className="text-text text-gray-600">
                    123 Green Street, EcoCity, Earth.
                  </p>
                  <p className="text-text text-gray-600 mb-[10px] md:mb-[16px]">
                    Manchester, Kentucky 39495
                  </p>
                  <p className="text-text text-gray-600 underline">
                    +(123)-456-7890
                  </p>
                  <p className="text-text text-gray-600 underline">
                    info@ecobin.com
                  </p>
                </div>
                <form className="flex-1" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6 mb-6 lg:flex-row xl:gap-[30px]">
                    {user?._id && (
                      <input
                        className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                        type="text"
                        name="fname"
                        value={user?.name}
                        onChange={handleOneChange}
                        placeholder="Enter first name"
                        readOnly={!!user?._id}
                      />
                    )}

                    <input
                      className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                      type="text"
                      name="lname"
                      value={data.lname}
                      onChange={handleOneChange}
                      placeholder="Your Last name"
                    />
                  </div>
                  <div className="flex flex-col gap-6 mb-6 lg:flex-row xl:gap-[30px]">
                    {user?._id && (
                      <input
                        className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                        type="email"
                        name="email"
                        value={user?.email}
                        onChange={handleOneChange}
                        placeholder="Your email"
                        readOnly={!!user?._id}
                      />
                    )}
                    <input
                      className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                      type="tel"
                      name="phone"
                      value={data.phone}
                      onChange={handleOneChange}
                      placeholder="Your contact number"
                      pattern="\d{10}"
                      title="Must be exactly 10 digits"
                      required
                    />
                  </div>
                  {/* City & Area Selection */}
                  <div className="flex flex-col gap-6 mb-6 lg:flex-row xl:gap-[30px]">
                    {/* City Dropdown */}
                    <select
                      className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[20px] appearance-none  text-gray-700"
                      name="location"
                      value={selectedCity}
                      onChange={handleCityChange}
                      required
                    >
                      <option className="text-gray-400" value="">
                        -- Choose a City --
                      </option>
                      {cityList.map((c) => (
                        <option key={c.id} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>

                    {/* Area Dropdown (Only shown when a city is selected) */}
                    {selectedCity && city && (
                      <select
                        className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[20px] appearance-none  text-gray-700"
                        name="workarea"
                        value={selectedArea}
                        onChange={handleAreaChange}
                        required
                      >
                        <option className="text-gray-400" value="">
                          -- Choose an Area --
                        </option>
                        {city.areas.map((area, index) => (
                          <option key={index} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="flex flex-col gap-6 mb-6 lg:flex-row xl:gap-[30px]">
                    {/* front photo */}
                    <div className="flex items-center justify-center w-full bg-white">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                      >
                        {!file && (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-700 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-[12px] text-center text-gray-700 dark:text-gray-400">
                              Click or drag and drop to upload <br />
                              <span className="font-semibold">
                                ID Front Side
                              </span>
                            </p>
                            <p className="text-[9px] text-gray-700 dark:text-gray-400">
                              (Please take a clean National ID (NIC) picture.)
                            </p>
                          </div>
                        )}
                        {file && (
                          <img
                            src={file}
                            alt="Uploaded NIC"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleUpNIC}
                        />
                      </label>
                    </div>
                    {/* back photo */}
                    <div class="flex items-center justify-center w-full bg-white">
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                      >
                        {/* dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 */}
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            class="w-8 h-8 mb-4 text-gray-700 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p class="mb-2 text-[12px] text-center text-gray-700 dark:text-gray-400">
                            Click or drag and drop to upload <br />{" "}
                            <span class="font-semibold">ID Back Side</span>
                          </p>
                          <p class="text-[9px] text-gray-700 dark:text-gray-400">
                            (Please take a clean National ID (NIC) picture.)
                            {/* PNG, JPG (MAX. 800x400px) */}
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          class="hidden"
                          onChange={handleUpNIC}
                        />
                      </label>
                    </div>
                  </div>

                  {/* vehicle form */}
                  <div className="flex flex-col gap-6 mb-6 lg:flex-row xl:gap-[30px]">
                    <input
                      className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                      type="text"
                      name="reginumber"
                      value={data.reginumber}
                      onChange={handleOneChange}
                      placeholder="Registration Number"
                    />
                    <input
                      className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                      type="text"
                      name="chassisnumber"
                      value={data.chassisnumber}
                      onChange={handleOneChange}
                      placeholder="Chassis Number"
                    />
                  </div>
                  {/* <textarea
                    className="w-full py-5 resize-none outline-0 px-[30px] max-h-[150px] mb-[35px] md:mb-[56px]"
                    name=""
                    cols="100"
                    rows="10"
                    placeholder="Tell us about yourself"
                  ></textarea> */}
                  <div className="flex flex-col gap-6 mb-6 lg:flex-row xl:gap-[30px] bg-white">
                    <div class="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer "
                      >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            class="w-8 h-8 mb-4 text-gray-700 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p class="mb-2 text-sm text-center text-gray-700 dark:text-gray-400">
                            <span class="font-semibold">Click </span> or drag
                            and drop to upload <br /> vehicle Image
                          </p>
                          <p class="text-xs text-gray-700 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <button
                      className="flex items-center transition-colors duration-200 px-[22px] py-[15px] lg:px-[32px] lg:py-[22px] rounded-[50px] font-chivo font-semibold text-md md:text-lg text-white bg-gray-900 w-fit"
                      type="submit"
                    >
                      Send Message
                      <i>
                        <img
                          className="ml-[7px] w-[12px] filter-white"
                          src="assets/images/icons/icon-right.svg"
                          alt="arrow right icon"
                        />
                      </i>
                    </button>
                    <p className="text-md text-gray-700">
                      By clicking contact us button, you agree our terms and
                      policy,
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Q&A */}
      <div className="gap-6 flex flex-col mx-auto px-5 xl:gap-[50px] max-w-[950px] mt-[70px] lg:mt-[98px]">
        <div className="flex-1 mb-[40px] text-center">
          <h2 className="font-bold font-chivo mx-auto text-[35px] leading-[44px] md:text-[46px] md:leading-[52px] lg:text-[55px] text-gray-900 mb-5 md:mb-[30px] max-w-[725px]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mx-auto mb-[10px] md:w-[55ch]">
            Feeling inquisitive? Have a read through some of our FAQs or contact
            our supporters for help.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-[35px]">
          {["People first", "Agile approach", "New mindset"].map(
            (item, index) => (
              <div key={index} className="mb-[30px] lg:mb-0">
                <div className="flex items-center mb-[17px]">
                  <img
                    className="mr-[9px]"
                    src="assets/images/icons/icon-leaf.svg"
                    alt="leaf icon"
                  />
                  <h4 className="text-lg font-bold font-chivo">{item}</h4>
                </div>
                <p className="text-gray-600">
                  The latest design trends meet hand-crafted templates.
                </p>
              </div>
            )
          )}
        </div>
        <div className="flex-[1.5]">
          {faqs.map((faq, index) => (
            <details key={index} className="relative accordion-item mb-5">
              <summary className="flex justify-between py-5 items-center gap-5 px-[30px] cursor-pointer bg-c-green-100/20">
                <h4 className="font-bold font-chivo text-gray-600 text-[14px] xl:text-2xl">
                  {faq.question}
                </h4>
              </summary>
              <p className="text-gray-600 font-medium font-chivo mt-[20px] ml-[20px] text-[10px] xl:text-lg">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
        <div className="flex items-center justify-center mb-[50px]">
          <a
            href="about-2.html#"
            className="flex items-center transition-all duration-200 group px-[22px] py-[15px] lg:px-[32px] lg:py-[22px] rounded-full bg-green-900 text-white hover:bg-gray-900 mr-[22px]"
          >
            <span className="text-lg font-chivo font-semibold">
              Join Our Team
            </span>
            <img
              className="ml-[7px] w-[12px]"
              src="assets/images/icons/icon-right.svg"
              alt="arrow right icon"
            />
          </a>
          <a
            href="index.html"
            className="text-lg font-chivo font-bold text-gray-900 flex items-center gap-[5px]"
          >
            Support Center
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeACollector;
