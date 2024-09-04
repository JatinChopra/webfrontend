"client only";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { LuClock4 } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaPhone } from "react-icons/fa6";
import axios from "axios";

type SalonResponse = {
  message: string;
  data: {
    id: string;
    name: string;
    phone: string;
    email: string;
    images: {
      businessImages: string[];
      menuImages: string[];
      certImages: string[];
      serviceFor: {
        male: boolean;
        female: boolean;
        unisex: boolean;
      };
      aboutText: string;
    };
    address: {
      address: string;
      street: string;
      city: string;
      state: string;
      zip_postal: string;
      country: string;
    };
    timings: {
      sunday: [boolean, string, string, string, string, string];
      monday: [boolean, string, string, string, string, string];
      tuesday: [boolean, string, string, string, string, string];
      wednesday: [boolean, string, string, string, string, string];
      thursday: [boolean, string, string, string, string, string];
      friday: [boolean, string, string, string, string, string];
      saturday: [boolean, string, string, string, string, string];
    };
    servicesOffered: [
      [string, string, string, string],
      [string, string, string, string]
    ];
    staff: [
      [string, string, string, string, string, string],
      [string, string, string, string, string, string]
    ];
    serviceFor: {
      male: boolean;
      female: boolean;
      unisex: boolean;
    };
  };
};

const convertTo12HourFormat = (hour24: number, minute: number): string => {
  const period = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12 || 12; // Convert hour from 24-hour format to 12-hour format
  return `${hour12}:${minute < 10 ? "0" : ""}${minute} ${period}`;
};

// Function to handle the array and return formatted time or "Closed"
const getFormattedTime = (
  timingArray: [boolean, string, string, string, string, string] | undefined
): string => {
  if (!timingArray) {
    return "Closed"; // Handle cases where timingArray is undefined or null
  }

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

const Index = () => {
  const router = useRouter();
  const [salonData, setSalonData] = useState<SalonResponse>();
  let [gender, setGender] = useState<string>();

  let { id } = router.query;
  useEffect(() => {
    const URLlist = window.location.href.split("/");
    if (!id) {
      id = URLlist[URLlist.length - 1];
    }

    console.log(id);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/salon/${id}`)
      .then((response) => {
        console.log(response.data);
        let res = response.data as SalonResponse;
        if (res.data.serviceFor.female) {
          setGender("Female");
        }
        if (res.data.serviceFor.male) {
          setGender("Male");
        }
        if (res.data.serviceFor.unisex) {
          setGender("Unisex");
        }

        setSalonData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching salon data:", error);
      });
  }, []);

  return (
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
      <div className="mt-[100px]  mx-auto w-[80%] bg-ellow-500 h-[89vh] overflow-y-scroll flex gap-10">
        <div className="bg-reen-500 w-8/12 p-5">
          <div className=" bg-ray-500 py-5 px-10 w-full h-[560px]  ">
            <Carousel>
              <p
                className={` text-lg font-bold text-white w-[120px] px-2 absolute text-center rounded-md mt-[20px] z-10 ml-[-20px] ${
                  gender == "Unisex"
                    ? "bg-purple-600"
                    : gender == "Male"
                    ? "bg-[#20AFFF]"
                    : "bg-pink-500"
                }`}
              >
                {gender}
              </p>
              <CarouselContent>
                {salonData?.data.images.businessImages.map((img, idx) => {
                  return (
                    <CarouselItem>
                      <img
                        className="object-cover  h-[500px]  w-full rounded-2xl bg-blue-500"
                        src={img}
                      />
                    </CarouselItem>
                  );
                })}{" "}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="bg-ellow-500 mt-3 p-5 pl-10">
            <p className="text-2xl font-bold">{salonData?.data.name}</p>
            <p className="mt-2">{salonData?.data.images.aboutText}</p>
            <div className="flex gap-2 items-center mt-5 mb-3">
              <IoMdMail />
              <p>{salonData?.data.email}</p>
            </div>
            <div className="flex gap-2 items-center mb-3">
              <FaPhone />
              <p>+91 {salonData?.data.phone}</p>
            </div>
          </div>

          <div className="bg-ink-500 p-2 flex mb-[50px] pl-10">
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="mb-5 bg-gray-100 px-5 w-full h-[70px] border-y-2 border-neutral-700 rounded-none  flex items-center justify-start">
                <TabsTrigger value="services" className=" ">
                  Services
                </TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="menu">Menu</TabsTrigger>
              </TabsList>
              <TabsContent value="services">
                <p className="text-2xl font-bold text-gray-700">Services</p>
                <div className="bg-gren-500 ">
                  {salonData?.data.servicesOffered.map((item, id) => {
                    return (
                      <div className="flex bg-yllow-500 border-b-2 pb-3 my-5 mx-5 justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://picsum.photos/100"
                            className="h-16 w-16  object-contain rounded-lg"
                          />
                          <div>
                            <p className="text-lg font-bold">{item[0]}</p>
                            <div className="flex items-center gap-1 ">
                              <LuClock4 className="text-sm font-bold" />
                              <p className="text-sm ">
                                {item[1]}hr {item[2]}mins
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p>{item[3]}</p>
                          <Button>Add</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="team">
                <p className="text-2xl font-bold text-gray-700">Team</p>
                <div className="bg-reen-500 flex-auto">
                  {salonData?.data.staff.map((item, id) => {
                    return (
                      <div className="flex bg-ellow-500 my-5 mx-5 border-b-2 pb-4 justify-between items-center">
                        <div className="flex items-center gap-3">
                          <img
                            src={item[0]}
                            className="h-16 w-16  object-contain rounded-full"
                          />
                          <div>
                            <p className="text-lg ">
                              {item[1]} {item[2]}
                            </p>
                            <div className="flex items-center gap-1 ">
                              <p className="text-sm ">{item[5]}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex mx-5 gap-2 items-center cursor-pointer">
                          <p className="ml-5 cursor-pointer text-orange-400 font-bold text-sm">
                            INFO
                          </p>
                          <MdOutlineKeyboardArrowRight className="text-xl" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="menu">
                <p className="text-2xl font-bold text-gray-700">Team</p>
              </TabsContent>
            </Tabs>
          </div>

          <div className="pl-10 mb-10">
            <p className="text-2xl font-bold text-gray-700 mb-2 ">
              Our Service Menu
            </p>
            <div className="flex gap-4 h-[240px] items-center justify-center g-green-500 bg-gray-200 p-5 rounded-lg py-2">
              {salonData?.data.images.menuImages
                ? salonData?.data.images.menuImages
                    .slice(0, 4)
                    .map((item, idx) => {
                      return (
                        <img
                          src={item}
                          className="h-[200px] aspect-square flex-auto object-cover rounded-md"
                        />
                      );
                    })
                : "No Menu Images Uploaded"}
            </div>
          </div>

          <div className="pl-10 mt-5">
            <p className="text-2xl font-bold text-gray-700 ">
              Our Salon Gallery
            </p>
            <div className="bg-gray-200 h-[500px] mt-5 p-4 flex gap-2 rounded-lg">
              <div className="bg-yllow-500 rounded-lg flex-auto">
                <img
                  src={salonData?.data.images.businessImages[0]}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <div className="bg-yllow-500 rounded-lg flex-auto  flex flex-wrap">
                {salonData?.data.images.businessImages
                  ? salonData?.data.images.businessImages
                      .slice(0, 4)
                      .map((item, idx) => {
                        return (
                          <img
                            src={item}
                            className="h-[200px] aspect-square flex-auto object-cover rounded-md"
                          />
                        );
                      })
                  : "No Menu Images Uploaded"}
              </div>
            </div>
          </div>

          <div className="h-[100px]"></div>
        </div>
        <div className="bg-lue-500 w-4/12 p-5">
          <div className="bg-gray-200 rounded-lg p-5">
            <p className="text-xl font-bold text-black mb-5 mt-5">
              Business Hours
            </p>
            {[
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ].map((day, idx) => {
              const timing = salonData?.data.timings[
                day as
                  | "monday"
                  | "tuesday"
                  | "wednesday"
                  | "thursday"
                  | "friday"
                  | "saturday"
                  | "sunday"
              ] as [boolean, string, string, string, string, string];

              return (
                <div className="flex gap-2 items-center">
                  <LuClock4 className="text-lg" />
                  <p key={idx} className="font-bold text-gray-600 py-1">
                    {`${day.charAt(0).toUpperCase() + day.slice(1)} :`}
                    <span className="ml-5">
                      {timing ? getFormattedTime(timing) : "Closed"}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
