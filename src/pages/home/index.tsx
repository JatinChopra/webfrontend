"client only";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiSortAlt2 } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/router";

const Categories = [
  "Hair Services",
  "Nail Services",
  "Skincare",
  "Waxing and Hair Removal",
  "Makeup Services",
  "Spa Services",
  "Head Massage",
  "Hair Styling",
  "Perms and Relaxers",
  "Body Wrap",
  "Hair Extensions",
];
import axios, { AxiosError } from "axios";
import { json } from "stream/consumers";
type SalonAddress = {
  address: string;
  street: string;
  city: string;
  state: string;
  zip_postal: string;
  country: string;
};

// Helper function to convert 24-hour time to 12-hour time with AM/PM
const convertTo12HourFormat = (hour24: number, minute: number): string => {
  const period = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12 || 12; // Convert hour from 24-hour format to 12-hour format
  return `${hour12}:${minute < 10 ? "0" : ""}${minute} ${period}`;
};

// Function to handle the array and return formatted time or "Closed"
const getFormattedTime = (
  timingArray: [boolean, string, string, string, string, string]
): string => {
  const [isOpen, startHour24, startMinute24, endHour24, endMinute24] =
    timingArray;

  if (!isOpen) {
    return "Closed";
  }

  const startHour = parseInt(startHour24, 10);
  const startMinute = parseInt(startMinute24, 10);
  const endHour = parseInt(endHour24, 10);
  const endMinute = parseInt(endMinute24, 10);

  const startTime = convertTo12HourFormat(startHour, startMinute);
  const endTime = convertTo12HourFormat(endHour, endMinute);

  return `${startTime} - ${endTime}`;
};

type SalonTimings = {
  sunday: [boolean, string, string, string, string, string];
  monday: [boolean, string, string, string, string, string];
  tuesday: [boolean, string, string, string, string, string];
  wednesday: [boolean, string, string, string, string, string];
  thursday: [boolean, string, string, string, string, string];
  friday: [boolean, string, string, string, string, string];
  saturday: [boolean, string, string, string, string, string];
};

type SalonImages = {
  businessImages: string[];
  menuImages: string[];
  certImages: string[];
};

type serviceFor = "male" | "female" | "unisex";

type Salon = {
  id: string;
  name: string;
  images: SalonImages;
  address: SalonAddress;
  timings: SalonTimings;
  gender: serviceFor;
};

const Index = () => {
  const { toast } = useToast();
  const router = useRouter();
  let step = useAppSelector((state) => state.signupStylist.currentStep);

  // const [salons, setSalons] = useState([]);
  const [salons, setSalons] = useState<Salon[]>([]);

  let today = getCurrentDay();

  function getCurrentDay(): string {
    const dayOfWeek: { [key: number]: string } = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
    };
    const todayIndex = new Date().getDay();
    return dayOfWeek[todayIndex];
  }

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/salons`)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.data[0]);
        setSalons(response.data.data); // Store the data in state
      })
      .catch((error) => {
        console.error("Error fetching salons:", error);

        // Show error toast
        if (error.response && error.response.status === 500) {
          toast({
            title: "Fetch Error",
            description: "Error fetching salons. Please try again later.",
          });
        } else {
          toast({
            title: "Fetch Error",
            description: "An unexpected error occurred.",
          });
        }
      });
  }, []); // Empty dependency array means this useEffect runs once on component mount

  interface TimingArray {
    [day: string]: [boolean, string, string, string, string, "am" | "pm"];
  }

  function formatTime(
    hour: number,
    minute: number,
    period: "am" | "pm"
  ): string {
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute} ${period}`;
  }

  function getSalonTimingForToday(timings: TimingArray): string {
    // Get the current day of the week in lowercase
    const daysOfWeek: { [key: string]: string } = {
      sunday: "sunday",
      monday: "monday",
      tuesday: "tuesday",
      wednesday: "wednesday",
      thursday: "thursday",
      friday: "friday",
      saturday: "saturday",
    };

    const today = new Date()
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const timingArray = timings[today] || [false, "", "", "", "", "am"];

    const isOpen = timingArray[0];
    const startHour = parseInt(timingArray[1], 10);
    const startMinute = parseInt(timingArray[2], 10);
    const endHour = parseInt(timingArray[3], 10);
    const endMinute = parseInt(timingArray[4], 10);
    const period = timingArray[5];

    // Check if the salon is open today
    if (!isOpen) {
      return "Closed";
    }

    // Format start and end times
    const startTime = formatTime(startHour, startMinute, period);
    const endTime = formatTime(endHour, endMinute, period);

    return `${startTime} - ${endTime}`;
  }
  const getRandomGradient = () => {
    const gradients = [
      "bg-gradient-to-br from-pink-400 to-yellow-500",
      "bg-gradient-to-br from-blue-500 to-teal-400",
      "bg-gradient-to-br from-purple-400 to-indigo-600",
      "bg-gradient-to-br from-green-400 to-lime-500",
      "bg-gradient-to-br from-red-500 to-orange-600",
    ];

    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  };

  return (
    <>
      <div className="w-100 min-h-screen flex flex-col overflow-y-hidden">
        <div className="shadow-md  bg-white fixed shadow-s py-2 px-10 w-full flex z-40 ">
          <div className=" pl-5 bg-lue-500 w-3/12 -">
            <img className="" src="/logo_whitebg.png" />
          </div>
          <div className="bg-reen-500 flex justify-center gap-10 items-center   w-6/12">
            <Select>
              <SelectTrigger className="w-[180px] rounded-full shadow-md ">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex w-6/12 bg-lue-500 items-center">
              <IoSearch className="mr-[-34px] z-20 text-xl text-gray-500 font-bold" />
              <Input
                type="text"
                placeholder="Search for a salon or service"
                className="rounded-full shadow-md pl-10 z-10 max-w-[480px] h-[43px]"
              ></Input>
            </div>
          </div>
          <div className=" pr-5 bg-ellow-500  gap-2 w-3/12 text-gray-700 flex items-center justify-center">
            <Button
              variant={"ghost"}
              className="px-6 font-bold rounded-full shadow-d flex items-center gap-2"
            >
              <HiOutlineShoppingBag className="font-bold text-xl" />
              Cart
            </Button>
            <Button
              variant={"ghost"}
              className="px-6 font-bold rounded-full shadow-d flex items-center gap-2"
            >
              <FaRegUser className="text-lg" />
              Sign In
            </Button>
          </div>
        </div>
        {/* Start of the scrollable page */}
        <div className=" flex-auto flex flex-col items-center overflow-y-auto mt-[70px] pb-20  bg-reen-500 mb-20">
          {/* Section1: Category */}
          <div className="flex flex-col justify-center h-[328px] shadow-md rounded-lg bg-[#f7f7f7] mt-5 px-16 gap-7  w-8/12 ">
            <p className="font-bold text-lg flex ">What are you looking for?</p>
            <Carousel className="bg-ink-500">
              <CarouselContent className="bg-reen-500">
                {Categories.map((item, index) => {
                  return (
                    <CarouselItem className="basis-1/12 flex flex-col bg-yellow500 items-center min-w-[200px] gap-2 justify-center">
                      <img
                        className="w-[180px] h-[180px] rounded-full object-cover"
                        src={`/cat_${index + 1}.jpeg`}
                      />
                      <p className="font-bold text-md">{item}</p>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          {/* Section2: Banners */}
          <div className="h-[449px] bg-gra-500 py-5 px-10 w-full lg:w-8/12">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <img className="object-cover" src="/banner.png" />
                </CarouselItem>{" "}
                <CarouselItem>
                  <img className="object-cover" src="/banner.png" />
                </CarouselItem>{" "}
                <CarouselItem>
                  <img className="object-cover" src="/banner.png" />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          {/* Section3: Filtering and Sorting options */}
          <div className="bg-yan-500 border-b-[1px] border-gray-200 lg:w-8/12 w-[100%] h-20 flex items-center pl-5 gap-3">
            {
              <DropdownMenu>
                <DropdownMenuTrigger className=" flex h-10 justify-center items-center rounded-full shadow-md px-5">
                  <FiFilter className="mr-2 text-lg" />
                  Filter
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
            <Select>
              <SelectTrigger className="w-[100px] rounded-full shadow-md ">
                <BiSortAlt2 className="text-lg" />
                <SelectValue className="text-lg" placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-full shadow-md px-5">
              <FaRegStar className="mr-2 text-lg" />
              4+ Ratings
            </Button>
            <Button variant="outline" className="rounded-full shadow-md px-5">
              Offer
            </Button>
          </div>
          {/* Section4: Top rated salons */}
          <Carousel className="  bg-gren-500 relative h-[400px] py-5 px-4 w-full lg:w-8/12 border-b-[1px] border-gray-300">
            <p className="text-2xl font-bold">Top Rated Salons</p>
            <CarouselContent className="px-5 py-5">
              {salons.map((item, id) => {
                let gender =
                  item.gender.charAt(0).toUpperCase() +
                  item.gender.substring(1);
                return (
                  <>
                    <CarouselItem
                      key={id}
                      className="basis-1/4  mx-1 bg-ink-500 rounded-lg  max-w-[280px] flex flex-col items-center  py-1 px-[2px] justify-center "
                    >
                      <div>
                        <div>
                          <p
                            className={` text-[12px] font-bold text-white w-[70px] absolute text-center rounded-md mt-[20px] ml-[-10px] ${
                              gender == "Unisex"
                                ? "bg-purple-600"
                                : gender == "Male"
                                ? "bg-[#20AFFF]"
                                : "bg-pink-500"
                            }`}
                          >
                            {gender}
                          </p>
                          <img
                            className="object-cover rounded-lg w-[301px] h-[190px] z-10"
                            src={item.images.businessImages[0]}
                          />
                          <div className="flex flex-col relative mt-[-45px] ml-[226px] justify-center  items-center gap-[2px] bg-gray-800 rounded-lg w-[38px] h-[38px] backdrop-blur-lg opacity-80">
                            <FaStar className="text-gray-400" />
                            <p className="font-bold text-[10px] text-gray-400">
                              4.25
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pr-2 bg-gren-500">
                          <p className="font-medium mb-2  text-[14px] mt-1">
                            {item.name}
                          </p>
                          <p className="text-[12px]">6.5km</p>
                        </div>
                        <div className="flex gap-2">
                          <MdOutlineLocationOn />
                          <p className="mb-[2px] text-[12px]  text-gray-600">
                            {item.address.address}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <MdOutlineAccessTime />
                          <p className="text-[12px]  text-gray-600">
                            {getFormattedTime(
                              item.timings[
                                today as
                                  | "monday"
                                  | "tuesday"
                                  | "wednesday"
                                  | "thursday"
                                  | "friday"
                                  | "saturday"
                                  | "sunday"
                              ]
                            )}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  </>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute top-10 left-[92%]" />
            <CarouselNext className="absolute top-10 right-5" />
          </Carousel>
          {/* Section5: Nearby your area  */}
          <div className="  bg-gren-500  py-5 px-4 w-full lg:w-8/12 border-b-[1px] border-gray-300">
            <p className="text-2xl font-bold mb-10 mt-14">Near by your area</p>
            <div className="flex flex-wrap gap-5">
              {salons.map((item, id) => {
                let gender =
                  item.gender.charAt(0).toUpperCase() +
                  item.gender.substring(1);
                return (
                  <>
                    <div
                      key={id}
                      onClick={() => {
                        console.log(item.id);
                        router.push(`home/salon/${item.id}`);
                      }}
                      className="  mx-1 bg-ink-500 rounded-lg  max-w-[380px] bg-gren-500 px-4 pt-4  shadow-lg border-white border-[1px]  hover:border-gray-300 flex flex-col items-center  pb-6   justify-center "
                    >
                      <div>
                        <div className="relative">
                          <p
                            className={` text-[12px] font-bold text-white w-[70px] absolute text-center rounded-md mt-[20px] ml-[-10px] z-10 ${
                              gender == "Unisex"
                                ? "bg-purple-600"
                                : gender == "Male"
                                ? "bg-[#20AFFF]"
                                : "bg-pink-500"
                            }`}
                          >
                            {gender}
                          </p>
                          <img
                            className="object-cover rounded-lg relative w-[341px] h-[230px] "
                            src={item.images.businessImages[0]}
                          />
                          <div className="flex flex-col right-3 bottom-2 justify-center absolute  items-center gap-[2px] bg-gray-800 rounded-lg w-[38px] h-[38px] backdrop-blur-lg opacity-80">
                            <FaStar className="text-gray-400" />
                            <p className="font-bold text-[10px] text-gray-400">
                              4.25
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pr-2 bg-gren-500">
                          <p className="font-medium mb-2  text-[14px] mt-1">
                            {item.name}
                          </p>
                          <p className="text-[12px]">6.5km</p>
                        </div>
                        <div className="flex gap-2">
                          <MdOutlineLocationOn />
                          <p className="mb-[2px] text-[12px]  text-gray-600">
                            {item.address.address}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <MdOutlineAccessTime />
                          <p className="text-[12px]  text-gray-600">
                            {getFormattedTime(
                              item.timings[
                                today as
                                  | "monday"
                                  | "tuesday"
                                  | "wednesday"
                                  | "thursday"
                                  | "friday"
                                  | "saturday"
                                  | "sunday"
                              ]
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="flex flex-col justify-center items-center gap-5 mt-14 mb-10">
              <p className="font-bold text-[14px] text-gray-500">
                Continue exploring Salons
              </p>
              <Button variant="outline" className="py-4 px-5">
                View More
              </Button>
            </div>
          </div>
          {/* Section6: Promo Codes */}
          <Carousel className="  bg-gren-500 relative h-[340px]  bg-[#f0f0f0]  py-5 px-4 w-full pt-10 lg:w-8/12 border-b-[1px] border-gray-300">
            <p className="text-2xl font-bold ">Promo codes for more savings</p>
            <CarouselContent className="px-5 py-5">
              {Array(10)
                .fill(0)
                .map((item, id) => {
                  return (
                    <CarouselItem
                      key={id}
                      className="basis-1/4 mx-4 lg:min-w-[370px] px-5 flex flex-col justify-center h-[200px] rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 via-cyan-400"
                    >
                      <p className="text-white font-bold text-2xl mt-4">
                        Get 30% OFF
                      </p>
                      <p className="text-sm text-white mb-4">
                        Get discount on the skincare service
                      </p>
                      <p className="p-2 rounded-lg bg-opacity-10 bg-black text-white text-lg max-w-[180px]">
                        Code: SKIN30OFF
                      </p>
                      <div className="flex justify-between mt-4 items-center">
                        <p className="text-sm text-white">
                          Expires on : 20 Aug 2022
                        </p>
                        <Button
                          size="sm"
                          className="bg-white text-black hover:bg-white hover:text-black font-semibold"
                        >
                          Know More
                        </Button>
                      </div>
                    </CarouselItem>
                  );
                })}
            </CarouselContent>
            <CarouselPrevious className="absolute top-10 left-[92%]" />
            <CarouselNext className="absolute top-10 right-5" />
          </Carousel>
          {/* Section7: Recommended */}
          <Carousel className="  bg-gren-500 relative h-[400px] py-5 px-4 w-full lg:w-8/12 border-b-[1px] border-gray-300">
            <p className="text-2xl font-bold">Recommended</p>
            <CarouselContent className="px-5 py-5">
              {salons.map((item, id) => {
                let gender =
                  item.gender.charAt(0).toUpperCase() +
                  item.gender.substring(1);
                return (
                  <>
                    <CarouselItem
                      key={id}
                      className="basis-1/4  mx-1 bg-ink-500 rounded-lg  max-w-[280px] flex flex-col items-center  py-1 px-[2px] justify-center "
                    >
                      <div>
                        <div>
                          <p
                            className={` text-[12px] font-bold text-white w-[70px] absolute text-center rounded-md mt-[20px] ml-[-10px] ${
                              gender == "Unisex"
                                ? "bg-purple-600"
                                : gender == "Male"
                                ? "bg-[#20AFFF]"
                                : "bg-pink-500"
                            }`}
                          >
                            {gender}
                          </p>
                          <img
                            className="object-cover rounded-lg w-[301px] h-[190px] z-10"
                            src={item.images.businessImages[0]}
                          />
                          <div className="flex flex-col relative mt-[-45px] ml-[226px] justify-center  items-center gap-[2px] bg-gray-800 rounded-lg w-[38px] h-[38px] backdrop-blur-lg opacity-80">
                            <FaStar className="text-gray-400" />
                            <p className="font-bold text-[10px] text-gray-400">
                              4.25
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pr-2 bg-gren-500">
                          <p className="font-medium mb-2  text-[14px] mt-1">
                            {item.name}
                          </p>
                          <p className="text-[12px]">6.5km</p>
                        </div>
                        <div className="flex gap-2">
                          <MdOutlineLocationOn />
                          <p className="mb-[2px] text-[12px]  text-gray-600">
                            {item.address.address}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <MdOutlineAccessTime />
                          <p className="text-[12px]  text-gray-600">
                            {getFormattedTime(
                              item.timings[
                                today as
                                  | "monday"
                                  | "tuesday"
                                  | "wednesday"
                                  | "thursday"
                                  | "friday"
                                  | "saturday"
                                  | "sunday"
                              ]
                            )}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  </>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute top-10 left-[92%]" />
            <CarouselNext className="absolute top-10 right-5" />
          </Carousel>

          {/* Section8: Partnership */}
          <div className="flex justify-center overflow-hidden gap-10 w-full lg:w-8/12 px-5 mt-10 items-center">
            <div className="h-[580px] flex-auto w-full bg-[#F5EBFF] flex flex-col justify-between pt-20 rounded-lg  items-center ">
              <div className="flex flex-col gap-3 justify-center items-center">
                <p className="text-2xl font-bold lg:w-[70%] text-center">
                  Would you like to become a partner with SalonX?
                </p>
                <p className="lg:w-[80%] text-center">
                  Cut the phone tag. Find your next appointment and book
                  instantly anytime, anywhere.
                </p>
                <Button size="lg" className="text-xl mt-5">
                  Add Salon
                </Button>
              </div>
              <img src="/workers1.png" className="h-[60%] object-cover"></img>
            </div>
            <div className="h-[580px] flex-auto w-full bg-[#EDFFC6] flex flex-col justify-between pt-20 rounded-lg  items-center ">
              <div className="flex flex-col gap-3 justify-center items-center">
                <p className="text-2xl font-bold lg:w-[70%] text-center">
                  I'm currently affiliated a partner with salon X.
                </p>
                <p className="lg:w-[80%] text-center">
                  Cut the phone tag. Find your next appointment and book
                  instantly anytime, anywhere.
                </p>
                <Button size="lg" className="text-xl mt-5">
                  Go to Dashboard
                </Button>
              </div>
              <img src="/workers2.png" className="h-[60%] object-cover"></img>
            </div>
          </div>
          {/* Section9: */}
          <div className="w-8/12 py-10 items-center mt-10 bg-reen-500 flex flex-col justify-center">
            <p className="text-2xl text-center font-bold">
              Frequently Asked Questions
            </p>
            <p className=" text-center w-2/5 mt-2 mb-5">
              Ask anyting you need to know about our product and services. we
              are ready to answer all your queries.
            </p>

            {Array(5)
              .fill(10)
              .map((item, id) => {
                return (
                  <Accordion type="single" collapsible className="w-8/12 mb-3">
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger
                        className={`border-x-2 border-t-2 border-b-2 px-5 rounded-lg underline-0`}
                      >
                        Is it accessible?
                      </AccordionTrigger>
                      <AccordionContent className="py-5 border-x-2 border-b-2 rounded-b-lg px-10">
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
