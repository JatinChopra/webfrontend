import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { stylistSliceActions } from "@/store/stylistSignupSlice";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Input } from "@/components/ui/input";

const Step4 = () => {
  let router = useRouter();
  let dispatch = useAppDispatch();
  let [step4, setStep4] = useState(
    useAppSelector((state) => state.signupStylist.step4)
  );

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(stylistSliceActions.updateStep4(step4));

    dispatch(stylistSliceActions.setCurrentStep(5));
  };

  return (
    <>
      <div className="bg-gren-500 flex justify-evenly items-center w-6/12">
        <div className="flex justify-center bg-ellow-500 flex-auto">
          <Button
            size="icon"
            variant={"outline"}
            className="rounded-full"
            onClick={() => {
              dispatch(stylistSliceActions.updateStep4(step4));
              dispatch(stylistSliceActions.setCurrentStep(3));
            }}
          >
            <IoArrowBack />
          </Button>
        </div>
        <div className=" ml-[-15px] text-xl flex flex-col flex-auto  bg-range-500 justify-center items-center">
          <p className="mb-5 text-center font-bold text-2xl">
            {"Enter your address"}
          </p>
          <p className=" text-sm text-center font-light text-gray-500 w-2/4">
            {"Where can clients find you?"}
          </p>
        </div>
        <div className="bg-pik-500 flex-auto"></div>
      </div>

      <div className=" w-[380px]">
        {" "}
        <form onSubmit={formHandler} className="pt-[30px] text-xl">
          <Input
            id="address"
            className="my-2"
            type="text"
            placeholder="Address"
            value={step4.address}
            onChange={(e) => {
              setStep4((curr) => {
                return { ...curr, address: e.target.value };
              });
            }}
          />

          <Input
            id="street"
            className="my-2"
            type="text"
            placeholder="Street"
            value={step4.street}
            onChange={(e) => {
              setStep4((curr) => {
                return { ...curr, street: e.target.value };
              });
            }}
          />

          <div className="flex gap-4">
            <Input
              id="city"
              type="text"
              placeholder="City"
              value={step4.city}
              onChange={(e) => {
                setStep4((curr) => {
                  return { ...curr, city: e.target.value };
                });
              }}
            />
            <Input
              id="stat"
              type="text"
              placeholder="State"
              value={step4.state}
              onChange={(e) => {
                setStep4((curr) => {
                  return { ...curr, state: e.target.value };
                });
              }}
            />
          </div>
          <Input
            id="zip_code"
            className="my-2"
            type="number"
            value={step4.zip_postal}
            onChange={(e) => {
              setStep4((curr) => {
                return { ...curr, zip_postal: e.target.value };
              });
            }}
            placeholder="ZIP/Postal code"
          />

          <Input
            id="client_password"
            className="my-2"
            type="text"
            placeholder="Country"
            value={step4.country}
            onChange={(e) => {
              setStep4((curr) => {
                return { ...curr, country: e.target.value };
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

export default Step4;
