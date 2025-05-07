//import { useState } from "react";
import { Link } from "react-router-dom"; // For navigation between pages
import { Link as ScrollLink } from "react-scroll"; // For smooth scrolling
import collectBg from "../assets/collect-bg.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
//import imageTobase64 from "../helpers/imageTobase64";
import Header from "../components/Header";
import Footer from "../components/Footer";
import cityList from "../helpers/city";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import uploadImage from "../helpers/uploadImage";
import { MdDelete } from "react-icons/md";
import Benifits from "../components/Benifits";
import CollectorQA from "../components/CollectorQ&A";
import SummaryApi from "../common";
const BecomeACollector = () => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    location: "",
    workarea: "",
    fnic: "",
    bnic: "",
    reginumber: "",
    chassisnumber: "",
    vehicle: "",
  });

  const [frontfile, frontSetFile] = useState(null);
  const [backfile, backSetFile] = useState(null);
  const [vehiclefile, vehicleSetFile] = useState(null);

  // Populate form data from Redux user state on mount
  useEffect(() => {
    if (user) {
      setData({
        fname: user.name || "",
        lname: user.lname || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        workarea: user.workarea || "",
        fnic: user.fnic || "",
        bnic: user.bnic || "",
        reginumber: user.reginumber || "",
        chassisnumber: user.chassisnumber || "",
        vehicle: user.vehicle || "",
      });
      frontSetFile(user.fnic || null);
      backSetFile(user.bnic || null);
      vehicleSetFile(user.vehicle || null);
    }
  }, [user]);

  // Upload functions (No Base64 Conversion)
  const fhandleUpNIC = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      const uploadFNIC = await uploadImage(selectedFile);
      if (!uploadFNIC?.url) {
        console.error("Image upload failed.");
        return;
      }
      console.log("Uploaded Image URL:", uploadFNIC.url);

      frontSetFile(uploadFNIC.url); // Display uploaded image
      setData((prev) => ({ ...prev, fnic: uploadFNIC.url }));
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const bhandleUpNIC = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      const uploadBNIC = await uploadImage(selectedFile);
      if (!uploadBNIC?.url) {
        console.error("Image upload failed.");
        return;
      }
      console.log("Uploaded Image URL:", uploadBNIC.url);

      backSetFile(uploadBNIC.url);
      setData((prev) => ({ ...prev, bnic: uploadBNIC.url }));
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const vhandleUpVehicle = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      const uploadVehicle = await uploadImage(selectedFile);
      if (!uploadVehicle?.url) {
        console.error("Image upload failed.");
        return;
      }
      console.log("Uploaded Image URL:", uploadVehicle.url);

      vehicleSetFile(uploadVehicle.url);
      setData((prev) => ({ ...prev, vehicle: uploadVehicle.url }));
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  // Delete images
  const deleteBackImg = () => {
    backSetFile(null);
    setData((prev) => ({ ...prev, bnic: "" }));
  };

  const deleteFrontImg = () => {
    frontSetFile(null);
    setData((prev) => ({ ...prev, fnic: "" }));
  };

  const deleteVehicleImg = () => {
    vehicleSetFile(null);
    setData((prev) => ({ ...prev, vehicle: "" }));
  };

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  // Find the selected city object
  const city = cityList.find((c) => c.value === selectedCity);

  // Handle text field changes
  const handleOneChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d{0,10}$/.test(value)) return; // Restrict to 10 digits

    setData({ ...data, [name]: value });
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.location || !data.workarea) {
      toast.error("Please select both a city and an area.");
      return;
    }
    if (data.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }
    if (!frontfile || !backfile || !vehiclefile) {
      toast.error("Please upload all required images.");
      return;
    }

    const response = await fetch(SummaryApi.collectorForm.url, {
      method: SummaryApi.collectorForm.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      setTimeout(() => {
        window.location.reload(); // ✅ Auto refresh after successful form submission
      }, 1500);
    } else {
      toast.error(responseData?.message);
    }
  };
  console.log("form data", data);
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
            <h1 className="text-c-white-300 font-montserrat font-black lg:text-[70px] md:text-[50px] md:leading-[70px] sm:text-[40px] sm:leading-[58px] text-[40px] leading-[48px] mb-[10px]">
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
                className="flex items-center transition-all duration-200 group px-6 py-4 lg:px-8 lg:py-5 rounded-full bg-c-green-300 text-white hover:bg-gray-100 hover:text-black text-lg font-chivo font-semibold tracking-wide mr-6"
              >
                Join Our Team
                {/* <img
                  src="/assets/images/icons/icon-right.svg"
                  width={12}
                  height={12}
                  alt="arrow right icon"
                  className="ml-2 group-hover:filter-black"
                /> */}
                <div className="ml-[7px] text-base text-white group-hover:text-black">
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
                <div className="ml-[7px] text-base text-black group-hover:text-white">
                  <FaArrowRightLong />
                </div>
              </Link>
            </div>
          </div>
          <div className="relative"></div>
        </div>
      </div>
      {/* benefits */}
      <Benifits />
      {/* join us form */}
      {user?._id && (
        <div
          id="collect-form"
          className=" items-center justify-between mx-auto relative max-w-[1320px]"
        >
          <div>
            <div className="full-width bg-bg-2">
              <div className="text-center px-5 pt-[74px] pb-[10px]">
                <h2 className="font-bold font-chivo mx-auto text-[35px] leading-[44px] md:text-[46px] md:leading-[52px] lg:text-[55px] text-gray-900 mb-5 md:mb-[30px] max-w-[725px]">
                  Join Us
                </h2>
                <p className="text-gray-600 text-center mx-auto mb-[10px] md:w-[55ch]">
                  Earn money while helping the environment. Become a collector
                  and be part of a sustainable future!
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
                          readOnly
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
                          readOnly
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
                          htmlFor="dropzone-fid"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                        >
                          {!frontfile && (
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

                          {frontfile && (
                            <div className="relative w-full h-full">
                              <div
                                className="absolute top-1 right-1 p-2  bg-white rounded-full  group-hover:block"
                                onClick={deleteFrontImg}
                              >
                                <div className="text-2xl text-c-red-100 hover:scale-110 transform transition-all duration-200">
                                  <MdDelete />
                                </div>
                              </div>

                              <img
                                src={frontfile}
                                alt="Uploaded NIC"
                                id="dropzone-fid"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <input
                            id="dropzone-fid"
                            type="file"
                            className="hidden"
                            onChange={fhandleUpNIC}
                            title="Must be exactly 10 digits"
                            required
                          />
                        </label>
                      </div>
                      {/* back photo */}
                      <div class="flex items-center justify-center w-full bg-white">
                        <label
                          for="dropzone-bid"
                          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                        >
                          {/* dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 */}
                          {!backfile && (
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
                          )}

                          {backfile && (
                            <div className="relative w-full h-full">
                              <div
                                className="absolute top-1 right-1 p-2  bg-white rounded-full  group-hover:block"
                                onClick={deleteBackImg}
                              >
                                <div className="text-2xl text-c-red-100 hover:scale-110 transform transition-all duration-200">
                                  <MdDelete />
                                </div>
                              </div>
                              <img
                                src={backfile}
                                alt="Uploaded NIC"
                                id="dropzone-bid"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <input
                            id="dropzone-bid"
                            type="file"
                            className="hidden"
                            onChange={bhandleUpNIC}
                            required
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
                        required
                      />
                      <input
                        className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                        type="text"
                        name="chassisnumber"
                        value={data.chassisnumber}
                        onChange={handleOneChange}
                        placeholder="Chassis Number"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-6 mb-6 lg:flex-row xl:gap-[30px] bg-white">
                      <div class="flex items-center justify-center w-full">
                        <label
                          for="dropzone-file"
                          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer "
                        >
                          {!vehiclefile && (
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
                                <span class="font-semibold">Click </span> or
                                drag and drop to upload <br /> vehicle Image
                              </p>
                              <p class="text-xs text-gray-700 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                          )}
                          {vehiclefile && (
                            <div class="relative w-full h-full">
                              <div
                                class="absolute top-1 right-1 p-2  bg-white rounded-full  group-hover:block"
                                onClick={deleteVehicleImg}
                              >
                                <div class="text-2xl text-c-red-100 hover:scale-110 transform transition-all duration-200">
                                  <MdDelete />
                                </div>
                              </div>
                              <img
                                src={vehiclefile}
                                alt="Uploaded vehicle"
                                id="dropzone-file"
                                class="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <input
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                            onChange={vhandleUpVehicle}
                          />
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
      )}

      {/* Q&A */}
      <CollectorQA />
      <Footer />
    </div>
  );
};

export default BecomeACollector;
