import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { salonSliceActions } from "@/store/salonSignupSlice";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const Step3 = () => {
  let dispatch = useAppDispatch();
  let [step3, setStep3] = useState(
    useAppSelector((state) => state.signupSalon.step3)
  );
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(salonSliceActions.updateStep3(step3));
    dispatch(salonSliceActions.setCurrentStep(4));
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
              dispatch(salonSliceActions.updateStep3(step3));
              dispatch(salonSliceActions.setCurrentStep(2));
            }}
          >
            <IoArrowBack />
          </Button>
        </div>
        <p className="text-2xl font-bold flex-auto align-center bg-range-500 w-[150px] text-center ml-[-35px] mb-5">
          {"Where do you want to provide services?"}
        </p>
        <div className="bg-pik-500 flex-auto"></div>
      </div>

      <div className=" w-[380px] bg-gree-500  ">
        <form
          onSubmit={(e) => formHandler(e)}
          className="pt-[0px]   flex flex-col "
        >
          <div className="border-gray-300 border-[1px] rounded-lg">
            {Object.entries(step3).map((item, idx) => {
              let id = idx + "";
              return (
                <div
                  key={"stylist" + idx}
                  className="items-top flex space-x-2 border-b-[1px] py-5 px-5 border-gray-300"
                >
                  <Checkbox
                    id={id}
                    defaultChecked={item[1]}
                    onCheckedChange={(value: boolean) => {
                      setStep3((curr) => ({ ...curr, [item[0]]: value }));
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-bold text-gray-700 leading-none ml-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item[0]}
                    </label>
                    {idx == 0 && (
                      <p className="text-sm text-gray-500 ml-5">
                        My clients come to me. I own the palce or work in a
                        salon/suite alongside other professionals.
                      </p>
                    )}
                    {idx == 1 && (
                      <p className="text-sm text-gray-500 ml-5">
                        {/* eslint-disable-next-line react/no-unescaped-entities*/}
                        I'm on the go. My services are performed at client's
                        location.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full bg-[#d78b30] hover:bg-[#d78b30] mt-10"
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

export default Step3;
