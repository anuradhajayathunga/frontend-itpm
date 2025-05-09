import { Link } from "react-router-dom"; // For navigation between pages
import { Link as ScrollLink } from "react-scroll"; // For smooth scrolling
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import cityList from "../helpers/city";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import VoiceInputField from "../components/VoiceInputField";
import uploadImage from "../helpers/uploadImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckSquare,
} from "lucide-react";

const LocateBin = () => {
  const user = useSelector((state) => state?.user?.user);

  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    date: "",
    time: "",
    wasteType: [],
  });

  const wasteTypes = ["Plastic", "Organic", "Electronic", "Glass", "Other"];

  // Populate form data from Redux user state on mount
  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        fname: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  // Handle text field changes
  const handleOneChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setData((prev) => ({
        ...prev,
        wasteType: checked
          ? [...prev.wasteType, value]
          : prev.wasteType.filter((item) => item !== value),
      }));
    } else if (name === "phone" && !/^\d{0,10}$/.test(value)) {
      return; // Restrict to 10 digits
    } else {
      setData({ ...data, [name]: value });
    }
  };

  // Validation
  const validate = () => {
    const { fname, lname, email, phone, address, city, date, time, wasteType } =
      data;

    if (
      !fname ||
      !email ||
      !city ||
      !address ||
      !phone ||
      !date ||
      !time ||
      wasteType.length === 0
    ) {
      toast.error("Please fill all required fields.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    const selectedDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (selectedDate < currentDate) {
      toast.error("Please select a date from today onwards.");
      return false;
    }

    const [hours, minutes] = time.split(":").map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const startTime = 9 * 60;
    const endTime = 17 * 60;
    if (timeInMinutes < startTime || timeInMinutes > endTime) {
      toast.error("Please select a time between 9 AM and 5 PM.");
      return false;
    }

    return true;
  };
  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Combine date and time into ISO format
      const scheduledAt = new Date(`${data.date}T${data.time}`);

      const payload = {
        ...data,
        scheduledAt,
      };

      // Optional: Remove date & time keys if backend doesn't expect them separately
      delete payload.date;
      delete payload.time;

      const response = await fetch(SummaryApi.send_waste.url, {
        method: SummaryApi.send_waste.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        // setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Submission failed: " + error.message);
    }
  };

  // useEffect(() => {
  //   const loadMap = () => {
  //     const script = document.createElement("script");
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
  //     script.async = true;
  //     script.defer = true;
  //     script.onload = initMap;
  //     document.head.appendChild(script);
  //   };

  //   const initMap = () => {
  //     const map = new window.google.maps.Map(document.getElementById("map"), {
  //       center: { lat: -34.397, lng: 150.644 },
  //       zoom: 8,
  //     });

  //     new window.google.maps.Marker({
  //       position: { lat: -34.397, lng: 150.644 },
  //       map,
  //       title: "EcoBin Location",
  //     });
  //   };

  //   loadMap();
  // }, []);
  return (
    <div>
      <Header />
      {/* {user?._id && ( */}
        <div
          id="collect-form"
          className=" items-center justify-between mx-auto relative max-w-[1320px]"
        >
          <div>
            <div className="full-width bg-bg-2">
              <div className="text-center px-5 pt-[30px] pb-[10px]">
                <h2 className="font-bold font-chivo mx-auto text-[35px] leading-[44px] md:text-[46px] md:leading-[52px] lg:text-[55px] text-green-500 mb-5 md:mb-[30px] max-w-[1500px]">
                  Find Your Nearest Bin
                </h2>
                {/* <p className="text-gray-800 text-center mx-auto mb-[10px] md:w-[55ch]">
                  Locate your closest collection point with just a few clicks.
                  Our interactive map helps you find bins that accept your
                  specific items, making recycling convenient and efficient.
                </p> */}
              </div>
            </div>
            <div className="bg-gray-100 relative p-[40px] md:pt-[91px] md:pr-[98px] md:pb-[86px] md:pl-[92px] mt-[10px] rounded-[58px]">
              <div className="mx-auto relative max-w-[1320px]">
                <img
                  className="absolute right-[-20px] max-w-[129px] top-[-60px]"
                  src="assets/images/mail.png"
                  alt=""
                />
                <p className="text-capitalized text-gray-700 uppercase tracking-[2px] mb-[15px]">
                  Quickly Locate the Right Bin Near You.
                </p>
                <h2 className="font-bold font-chivo text-[20px] leading-[30px] md:text-heading-3 mb-[22px]">
                  Easily discover the nearest recycling collection points
                  tailored to your needs.
                </h2>
                <p className="text-text text-gray-600 mb-[30px] md:mb-[60px]">
                  {/* Earn money while helping the environment. Become a collector and
                be part of a sustainable future! */}
                </p>
                <div className="flex flex-col gap-8 mb-[15px] md:mb-[25px] lg:flex-row lg:gap-[50px] xl:gap-[2px]">
                  {/* Left Side - Google Map */}
                  <div className="relative lg:w-1/2 mr-4">
                    {/* <h3 className="font-semibold text-xl mb-0 text-green-700">
                      Find Us Here
                    </h3> */}
                    <div className="mb-6 rounded-lg overflow-hidden ">
                      <img
                        className="h-full w-full object-cover mb-3"
                        src="/assets/hero_geocoding_api_720 1.png"
                        alt="Agon"
                        width={600}
                        height={400}
                      />
                      <div className="space-y-3 mt-4">
                        <p className="text-capitalized text-gray-700  tracking-tight flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-green-600" />
                          123 Green Street, EcoCity, Earth
                        </p>
                        <p className="text-capitalized text-gray-700  tracking-tight  flex items-center">
                          <Phone className="w-5 h-5 mr-2 text-green-600" />
                          +(123)-456-7890
                        </p>
                        <p className="text-capitalized text-gray-700  tracking-tight  flex items-center">
                          <Mail className="w-5 h-5 mr-2 text-green-600" />
                          info@ecobin.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <form className="flex-1" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6 mb-6 lg:flex-row xl:gap-[30px]">
                      {user?._id && (
                        <VoiceInputField
                          className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px] capitalize"
                          type="text"
                          name="fname"
                          value={user?.name}
                          onChange={handleOneChange}
                          placeholder="Enter first name"
                          readOnly
                        />
                      )}

                      <input
                        className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px] capitalize"
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
                    <div className="flex flex-col gap-6 mb-6 lg:flex-row xl:gap-[30px]">
                      <input
                        className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                        type="text"
                        name="address"
                        value={data?.address}
                        onChange={handleOneChange}
                        placeholder="Your address"
                      />
                      <input
                        className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                        type="text"
                        name="city"
                        value={data?.city}
                        onChange={handleOneChange}
                        placeholder="Your Main City"
                      />
                    </div>
                    <div className="flex flex-col gap-6 mb-6 lg:flex-row xl:gap-[30px]">
                      <input
                        className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                        type="date"
                        name="date"
                        value={data?.date}
                        onChange={handleOneChange}
                        placeholder="Your address"
                      />
                      <input
                        className="outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                        type="time"
                        name="time"
                        value={data?.time}
                        onChange={handleOneChange}
                        placeholder="Your Main City"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block font-medium mb-2 px-[10px]">
                        Waste Types:
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {wasteTypes.map((type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              name="wasteType"
                              value={type}
                              checked={data.wasteType.includes(type)}
                              onChange={handleOneChange}
                              className="accent-green-600 outline-none flex-1 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-5 px-[30px]"
                            />

                            <span className="px-[10px] text-gray-400">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-5">
                      <button
                        className="flex items-center transition-colors duration-200 px-[22px] py-[15px] lg:px-[32px] lg:py-[22px] rounded-[50px] font-chivo font-semibold text-md md:text-lg text-white bg-c-green-300 w-fit"
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
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}

      <Footer />
    </div>
  );
};

export default LocateBin;
