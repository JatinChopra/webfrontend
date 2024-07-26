import React from "react";
import { useAppSelector } from "@/lib/hooks";

// import step components
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

const Index = () => {
  let step = useAppSelector((state) => state.signupStylist.currentStep);

  return (
    <>
      <div className="w-100 min-h-screen flex flex-col overflow-y-hidden">
        <div className="border-b-2   border-gray-300 flex justify-center">
          <img className="py-4" src="/logo_whitebg.png" />
        </div>
        <div className=" flex-auto flex flex-col items-center mt-[50px] bg-gren-500">
          {step === 0 && <Step0 />}
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}
          {step === 5 && <Step5 />}
          {step === 6 && <Step6 />}
        </div>
      </div>
    </>
  );
};

export default Index;
