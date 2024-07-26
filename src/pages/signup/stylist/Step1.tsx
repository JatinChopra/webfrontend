import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { stylistSliceActions } from "@/store/stylistSignupSlice";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const Step1 = () => {
  let dispatch = useAppDispatch();
  let [step1, setStep1] = useState(
    useAppSelector((state) => state.signupStylist.step1)
  );
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(stylistSliceActions.updateStep1(step1));
    dispatch(stylistSliceActions.setCurrentStep(2));
  };

  return (
    <>
      <div className="bg-gren-500 flex justify-evenly items-center w-6/12">
        <div className="flex justify-center bg-ellow-500 flex-auto">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              dispatch(stylistSliceActions.updateStep1(step1));
              dispatch(stylistSliceActions.setCurrentStep(0));
            }}
          >
            <IoArrowBack />
          </Button>
        </div>
        <p className="text-2xl font-bold flex-auto align-center bg-ornge-500 text-center">
          {"Tell us About your Business"}
        </p>
        <div className="bg-pik-500 flex-auto"></div>
      </div>

      <div className=" w-[380px]">
        <form
          onSubmit={(e) => formHandler(e)}
          className="pt-[30px]   flex flex-col "
        >
          {Object.entries(step1).map((item, idx) => {
            let id = idx + "";
            return (
              <div
                key={"stylist" + idx}
                className="items-top flex space-x-2 border-b-[1px] py-5 border-gray-300"
              >
                <Checkbox
                  id={id}
                  defaultChecked={item[1]}
                  onCheckedChange={(value: boolean) => {
                    setStep1((curr) => ({ ...curr, [item[0]]: value }));
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-bold text-gray-500 leading-none ml-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item[0]}
                  </label>
                </div>
              </div>
            );
          })}

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

export default Step1;
