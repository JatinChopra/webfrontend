import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";

let rolesData = [
  {
    role: "I'm a client",
    text: "Streamlining Your Salon Experience,\nOne Click at a Time",
    url: "/signup/customer",
    image: "/client_role.png",
  },
  {
    role: "I'm a stylist",
    text: "Empowering Stylists to Showcase Their\nTalent and Grow their Business",
    url: "/signup/stylist",
    image: "/stylist_role.png",
  },
  {
    role: "We're a Salon ",
    text: "Register your Salon Today and Simplify\nBookings for Your Clients",
    url: "/signup/salon",
    image: "/salon_role.png",
  },
];

const Index = () => {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <>
      <div className="w-100 min-h-screen flex overflow-y-hidden">
        {/* left half */}
        <div className="  max-h-screen">
          <img src="/rectangle_bg_signup.png" alt="left background salon x" />
        </div>
        {/* right half */}
        <div className=" flex-auto ">
          <div className="h-[100px] flex justify-start items-center mx-10">
            <Button variant="outline" className="">
              <IoArrowBackOutline />
            </Button>
          </div>

          <div className=" h-5/6 flex justify-center">
            <div>
              <p className="text-xl font-semibold my-10 text-center">
                How would you like to continue ?
              </p>
              {rolesData.map((item, idx) => {
                return (
                  <>
                    <div
                      className={`border-2 lg:w-[720px]  h-[150px] rounded-lg mb-4  ${
                        idx == activeRole
                          ? "border-[#d68b30]"
                          : "border-gray-300"
                      } `}
                    >
                    <Link href={item.url}>
                      <div
                        className={`cursor-pointer h-[100%] rounded-lg border-white border-4 ${
                          idx == activeRole ? "bg-[#fbf4e5]" : "bg-white"
                        } flex  items-center `}
                        onMouseOver={() => {
                          setActiveRole(idx);
                        }}
                      >
                        <div className="pl-4 flex items-center py-2 justify-between  w-full">
                          <div className="pl-2 ">
                            <p className=" text-lg font-medium">{item.role}</p>
                            <p className="max-w-[310px] font-light text-sm">
                              {item.text}
                            </p>
                          </div>
                          <img src={item.image} className="mr-10" />
                        </div>
                      </div>
                      </Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="h-[62px] justify-center flex items-center border-t-[2px] border-gray-200">
            By proceeding, you agree to the Terms and Conditions and Privacy
            Policy
          </div>
        </div>
      </div>
    </>
    // <div>role selection page

    //     <Link href="/signup/customer">client</Link>
    //     <div>stylist</div>
    //     <div>salon</div>

    // </div>
  );
};

export default Index;
    