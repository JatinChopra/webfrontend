import React, { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { salonSliceActions } from "@/store/salonSignupSlice";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { businessDay } from "@/store/stylistSignupSlice";

let hoursArray = new Array(24).fill("00");
for (let i = 0; i < hoursArray.length; i++) {
  let str = i.toString();
  if (str.length != 2) {
    str = "0" + str;
  }
  hoursArray[i] = str;
}

let minutesArray = new Array(60).fill("00");
for (let i = 0; i < minutesArray.length; i++) {
  let str = i.toString();
  if (str.length != 2) {
    str = "0" + str;
  }
  minutesArray[i] = str;
}
const Step5 = () => {
  let dispatch = useAppDispatch();

  let step5Data = useAppSelector((state) => state.signupSalon.step5);
  console.log(step5Data);

  let [step5, setStep5] = useState(step5Data);
  console.log(step5);

  function handleHours(val: number) {
    if (val > 12) {
      console.log(val);
      console.log(val / 10);
      val = Math.trunc(val / 10);
    } else if (val < 0) {
      val = 0;
    }
    // convert it to string and if length is less than 2 then append a 0
    let str = val.toString();
    if (str.length == 1) {
      str = "0" + str;
    }

    return str;
  }

  function handleMinutes(val: number) {
    if (val > 59) {
      val = 59;
    } else if (val < 0) {
      val = 0;
    }
    // convert it to string and if length is less than 2 then append a 0
    let str = val.toString();
    if (str.length == 1) {
      str = "0" + str;
    }

    return str;
  }

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(salonSliceActions.updateStep5(step5));
    dispatch(salonSliceActions.setCurrentStep(6));
  };

  function updateStep5(key: string, newArr: businessDay) {
    console.log(key);
    console.log(newArr);
    setStep5((curr) => {
      curr = { ...curr, [key]: newArr };
      return curr;
    });
  }

  return (
    <>
      <div className="bg-gren-500 flex justify-evenly items-center w-6/12">
        <div className="flex justify-center bg-ellow-500 flex-auto">
          <Button
            size="icon"
            variant={"outline"}
            className="rounded-full "
            onClick={() => {
              dispatch(salonSliceActions.updateStep5(step5));
              dispatch(salonSliceActions.setCurrentStep(4));
            }}
          >
            <IoArrowBack />
          </Button>
        </div>
        <p className="text-2xl font-bold flex-auto align-center bg-ornge-500 text-center">
          {"Your Business Hours"}
        </p>
        <div className="bg-pik-500 flex-auto"></div>
      </div>

      <div className=" w-[580px] bg-oange-500">
        <form
          onSubmit={(e) => formHandler(e)}
          className="pt-[30px]   flex flex-col "
        >
          {Object.entries(step5).map((item, idx) => {
            let [key, valueArr] = item;
            let id = idx + "";

            return (
              <div
                key={"stylist" + idx}
                className="bg-yllow-500 py-5 px-5 items-center justify-between flex  border-b-[1px]  border-gray-300 "
              >
                <Switch
                  id={id}
                  defaultChecked={valueArr[0]}
                  onCheckedChange={(value: boolean) => {
                    let newArr = [...valueArr];
                    newArr[0] = value;
                    updateStep5(key, newArr as businessDay);
                  }}
                />
                <div className="flex items-center justify-between bg-pnk-500 w-full">
                  <p className=" font-bold text-gray-500 leading-none ml-5">
                    {item[0].charAt(0).toUpperCase() + item[0].substring(1)}
                  </p>

                  <div className=" flex gap-1 mr-4 items-center bg-reen-500">
                    <Select
                      disabled={!valueArr[0]}
                      defaultValue={valueArr[1]}
                      onValueChange={(val) => {
                        let newArr = [...valueArr];
                        newArr[1] = val;
                        updateStep5(key, newArr as businessDay);
                      }}
                    >
                      <SelectTrigger className="w-[65px]" value={valueArr[1]}>
                        <SelectValue placeholder="HH" />
                      </SelectTrigger>
                      <SelectContent className="w-[65px] h-[125px] bg-white">
                        {hoursArray.map((item) => {
                          return (
                            <SelectItem
                              className="w-full px-0 flex justify-center  bg-yelow-500 text-center"
                              key={item}
                              value={item}
                            >
                              <p>{item}</p>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <Select
                      disabled={!valueArr[0]}
                      defaultValue={valueArr[2]}
                      onValueChange={(val) => {
                        let newArr = [...valueArr];
                        newArr[2] = val;
                        updateStep5(key, newArr as businessDay);
                      }}
                    >
                      <SelectTrigger className="w-[65px]" value={valueArr[2]}>
                        <SelectValue placeholder="mm" />
                      </SelectTrigger>
                      <SelectContent className="w-[65px] h-[125px] bg-white">
                        {minutesArray.map((item) => {
                          return (
                            <SelectItem
                              className="w-full px-0 flex justify-center  bg-yelow-500 text-center"
                              key={item}
                              value={item}
                            >
                              <p>{item}</p>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <p className="px-2">To</p>
                    <Select
                      disabled={!valueArr[0]}
                      defaultValue={valueArr[3]}
                      onValueChange={(val) => {
                        let newArr = [...valueArr];
                        newArr[3] = val;
                        updateStep5(key, newArr as businessDay);
                      }}
                    >
                      <SelectTrigger className="w-[65px]" value={valueArr[3]}>
                        <SelectValue placeholder="HH" />
                      </SelectTrigger>
                      <SelectContent className="w-[65px] h-[125px] bg-white">
                        {hoursArray.map((item) => {
                          return (
                            <SelectItem
                              className="w-full px-0 flex justify-center  bg-yelow-500 text-center"
                              key={item}
                              value={item}
                            >
                              <p>{item}</p>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <Select
                      disabled={!valueArr[0]}
                      defaultValue={valueArr[4]}
                      onValueChange={(val) => {
                        let newArr = [...valueArr];
                        newArr[4] = val;
                        updateStep5(key, newArr as businessDay);
                      }}
                    >
                      <SelectTrigger className="w-[65px]" value={valueArr[4]}>
                        <SelectValue placeholder="mm" />
                      </SelectTrigger>
                      <SelectContent className="w-[65px] h-[125px] bg-white">
                        {minutesArray.map((item) => {
                          return (
                            <SelectItem
                              className="w-full px-0 flex justify-center  bg-yelow-500 text-center"
                              key={item}
                              value={item}
                            >
                              <p>{item}</p>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
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

export default Step5;
