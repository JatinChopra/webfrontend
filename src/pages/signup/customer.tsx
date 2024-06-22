import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {



  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let fname = (document.querySelector('#client_fname') as HTMLInputElement).value;
    let lname = (document.querySelector("#client_lname") as HTMLInputElement).value;
    let email = (document.querySelector('#client_email') as HTMLInputElement).value;
    let phone = (document.querySelector('#client_phone') as HTMLInputElement).value;
    let pass = (document.querySelector('#client_password') as HTMLInputElement).value;


    console.log(fname, lname, email, phone, pass);


  }


  return (
    <>
      <div className="w-100 min-h-screen flex flex-col overflow-y-hidden">
        <div className="border-b-2   border-gray-300 flex justify-center">
          <img className="py-4" src="/logo_whitebg.png" />
        </div>
        <div className=" flex-auto flex flex-col items-center mt-[80px]">

          <p className="text-xl ">Personal Information</p>
          <p>Welcome to our platform! Please fill out the form <br /> to create your account.</p>
          <form onSubmit={(e) => formHandler(e)} className="pt-[30px] text-xl">

            <div className="flex gap-4">
              <Input id="client_fname" type="text" placeholder="First name" />
              <Input id="client_lname" type="text" placeholder="Last name" />
            </div>


            <Input id="client_email" className="my-2" type="email" placeholder="Email address" />
            <Input id="client_phone" className="my-2" type="number" placeholder="Phone number" />

            <Input id="client_password" className="my-2" type="password" placeholder="Create Password" />

            <div className="flex justify-center">
              <Button type="submit" className="bg-[#d78b30] hover:bg-[#d78b30]" size="lg">Continue</Button>
            </div>


          </form>
        </div>
      </div >
    </>
  );
};

export default Index;
