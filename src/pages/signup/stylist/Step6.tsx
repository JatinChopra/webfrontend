import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { stylistSliceActions } from "@/store/stylistSignupSlice";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type newService = ["string", "string", "string", "string"][] | [];

let hoursArray = new Array(12).fill("00");
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

const Step6 = () => {
  let dispatch = useAppDispatch();
  let step6Data = useAppSelector((state) => state.signupStylist.step6);
  let [isOpen, setIsOpen] = useState(false);
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(stylistSliceActions.setCurrentStep(2));
  };

  return (
    <>
      <div className="bg-gren-500 flex justify-evenly items-center w-6/12">
        <div className="flex justify-center bg-ellow-500 flex-auto">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-gay-400"
            onClick={() => {
              dispatch(stylistSliceActions.setCurrentStep(5));
            }}
          >
            <IoArrowBack />
          </Button>
        </div>
        <div className=" ml-[-15px] text-xl flex flex-col flex-auto  bg-range-500 justify-center items-center">
          <p className="mb-5 text-center font-bold text-2xl">
            {"Add services"}
          </p>
          <p className=" text-sm text-center font-light text-gray-500 w-2/4">
            {
              "Add the basic information for this service now. You'll be able to ad description and adjust the advanced settings for the services later on."
            }
          </p>
        </div>
        <div className="bg-pik-500 flex-auto"></div>
      </div>

      <div className=" w-[580px]">
        <form
          onSubmit={(e) => formHandler(e)}
          className="pt-[30px]   flex flex-col "
        >
          {step6Data?.length == 0 && (
            <div className="bg-geen-500 text-center">
              No services added yet.
            </div>
          )}
          {step6Data?.map((item, idx) => {
            let id = idx + "";
            return (
              <div
                key={"stylist" + idx}
                className="items-top flex  border-b-[1px] py-5 border-gray-300"
              >
                <div className="flex bg-reen-500 w-full justify-between pl-5">
                  <div>{item[0]}</div>

                  <div className="flex w-3/5 bg-ink-500 justify-evenly">
                    <div className="flex gap-2">
                      <div className="text-gray-500">{item[1]}Hr</div>
                      <div className="text-gray-500">{item[2]}Min</div>
                    </div>
                    <div className="text-md font-bold">
                      {"$"}
                      {item[3]}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex mt-10 justify-end">
            <Button
              type="submit"
              className="mb-[-34px] bg-[#d78b30] hover:bg-[#d78b30] "
              size="lg"
            >
              Continue
            </Button>
          </div>
        </form>
        <Button
          className="mt-[-250px]"
          variant="outline"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add New service
        </Button>
      </div>

      <AddNewServiceBox isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

const AddNewServiceBox = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector((state) => state.signupStylist.step6);
  const [serviceName, setServiceName] = useState("");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [price, setPrice] = useState("00");

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
      }}
    >
      <DialogContent className="bg-white w-[400px]">
        <DialogHeader>
          <DialogTitle>Add New Service?</DialogTitle>
          <DialogDescription>
            <p className="mb-2 mt-5 font-bold">Service Name</p>
            <Input
              type="text"
              className="h-[40px]"
              value={serviceName}
              onChange={(e) => {
                setServiceName(e.target.value);
              }}
            />
            <div className="flex gap-5 items-center my-5">
              <p className="font-bold text-sm">Time : </p>
              <div className="flex items-center gap-2">
                <Select
                  defaultValue={hour}
                  onValueChange={(val) => {
                    setHour(val);
                  }}
                >
                  <SelectTrigger className=" w-[65px]">
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
                <p>Hours</p>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  defaultValue={minute}
                  onValueChange={(val) => {
                    setMinute(val);
                  }}
                >
                  <SelectTrigger className="w-[65px]">
                    <SelectValue placeholder="HH" />
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
                <p>Minutes</p>
              </div>
            </div>{" "}
            <p className="font-bold">Price</p>
            <Input
              type="text"
              className="h-[40px] mt-2"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <Button
              className="mt-5 bg-[#d78b30] hover:bg-[#d78b30]"
              onClick={() => {
                let dataArr = [
                  serviceName.trim(),
                  hour.trim(),
                  minute.trim(),
                  price.trim(),
                ];

                let newState = [...currentState, dataArr] as newService;
                dispatch(stylistSliceActions.updateStep6(newState));

                setIsOpen(false);

                console.log(serviceName);
                console.log(hour);
                console.log(minute);
                console.log(price);
              }}
            >
              Add
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Step6;
