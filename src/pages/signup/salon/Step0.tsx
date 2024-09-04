import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { salonSliceActions } from "@/store/salonSignupSlice";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Input } from "@/components/ui/input";

const Step0 = () => {
  let router = useRouter();
  let dispatch = useAppDispatch();
  let [step0, setStep0] = useState(
    useAppSelector((state) => state.signupSalon.step0)
  );

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(salonSliceActions.updateStep0(step0));

    dispatch(salonSliceActions.setCurrentStep(1));
  };

  return (
    <>
      <div className="bg-gren-500 flex justify-evenly items-center w-6/12">
        <div className="flex justify-center bg-ellow-500 flex-auto">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full "
            onClick={() => {
              dispatch(salonSliceActions.updateStep0(step0));
              router.push("/signup/role");
            }}
          >
            <IoArrowBack />
          </Button>
        </div>
        <div className=" ml-[-15px] text-xl flex flex-col flex-auto  bg-range-500 justify-center items-center">
          <p className="mb-5 text-center font-bold text-2xl">{"About you"}</p>
          <p className=" text-sm text-center font-light text-gray-500 w-2/4">
            {
              "Welcome to our platform Please tell us about yourself and your business."
            }
          </p>
        </div>
        <div className="bg-pik-500 flex-auto"></div>
      </div>

      <div className=" w-[380px]">
        {" "}
        <form onSubmit={formHandler} className="pt-[30px] text-xl">
          <div className="flex gap-4">
            <Input
              id="client_fname"
              type="text"
              placeholder="First name"
              value={step0.firstName}
              onChange={(e) => {
                setStep0((curr) => {
                  return { ...curr, firstName: e.target.value };
                });
              }}
            />
            <Input
              id="client_lname"
              type="text"
              placeholder="Last name"
              value={step0.lastName}
              onChange={(e) => {
                setStep0((curr) => {
                  return { ...curr, lastName: e.target.value };
                });
              }}
            />
          </div>

          <Input
            id="client_email"
            className="my-2"
            type="email"
            placeholder="Email address"
            value={step0.email}
            onChange={(e) => {
              setStep0((curr) => {
                return { ...curr, email: e.target.value };
              });
            }}
          />

          <Input
            id="business_name"
            className="my-2"
            type="text"
            placeholder="Business name"
            value={step0.businessName}
            onChange={(e) => {
              setStep0((curr) => {
                return { ...curr, businessName: e.target.value };
              });
            }}
          />
          <Input
            id="client_phone"
            className="my-2"
            type="number"
            value={step0.phone}
            onChange={(e) => {
              setStep0((curr) => {
                return { ...curr, phone: e.target.value };
              });
            }}
            placeholder="Phone number"
          />

          <Input
            id="client_password"
            className="my-2"
            type="password"
            placeholder="Create Password"
            value={step0.password}
            onChange={(e) => {
              setStep0((curr) => {
                return { ...curr, password: e.target.value };
              });
            }}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              className="mt-5 bg-[#d78b30] hover:bg-[#d78b30]"
              size="lg"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Step0;
