import { Dispatch, SetStateAction, useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { salonSliceActions } from "@/store/salonSignupSlice";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
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
import { toNamespacedPath } from "path";
import { IoMdAddCircle } from "react-icons/io";

type newStaff =
  | ["string", "string", "string", "string", "string", "string"][]
  | [];

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
  const router = useRouter();
  const { toast } = useToast();
  let dispatch = useAppDispatch();
  let requestData = useAppSelector((state) => state.signupSalon);
  let step6Data = useAppSelector((state) => state.signupSalon.step7);
  let [isOpen, setIsOpen] = useState(false);
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // dispatch(stylistSliceActions.setCurrentStep(2));
    // send the request first console log
    console.log(requestData);

    // send data to backend
    console.log("Sending sytlist signup data");
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/salon/signup`, {
        personalInfo: requestData.step0,
        businessType: requestData.step1,
        businessImages: requestData.step2,
        siteOfService: requestData.step3,
        address: requestData.step4,
        timings: requestData.step5,
        servicesOffered: requestData.step6,
        staff: requestData.step7,
      })
      .then((res) => {
        if (res.status == 201) {
          toast({ title: "Signup Sucess", description: res.data.message });
          router.push("/home");
        }
      })
      .catch((e) => {
        console.log("Stylist isgnup request error : ");
        console.log(e);
        if (e.request.status == 400) {
          toast({
            title: "Signup Error",
            description: e.response.data.message,
          });
        }
      });
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
              dispatch(salonSliceActions.setCurrentStep(6));
            }}
          >
            <IoArrowBack />
          </Button>
        </div>
        <div className=" ml-[-15px] text-xl flex flex-col flex-auto  bg-range-500 justify-center items-center">
          <p className="mb-5 text-center font-bold text-2xl">{"Add Staff"}</p>
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
                className="items-top bgpink-500 flex  border-b-[1px] py-5 border-gray-300"
              >
                <div className="flex bggreen-500 w-full gap-4 items-center pl-5">
                  <img
                    src={item[0]}
                    alt="Uploaded"
                    className="w-[55px] h-[55px] object-cover rounded-lg"
                  />
                  <div>
                    <div className="font-bold">{item[1] + " " + item[2]}</div>
                    <div>{item[5]}</div>
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
          Add New staff
        </Button>
      </div>

      <AddNewStaffBox isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

const AddNewStaffBox = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector((state) => state.signupSalon.step7);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageURL, setImageURL] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      console.log("files dropped ---------");
      console.log("Making an axios request");

      const formData = new FormData();
      formData.append("file", file);

      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/service/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            const url = res.data.imageUrl;
            setImageURL(url);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
      }}
    >
      <DialogContent className="bg-white w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Staff Member</DialogTitle>
          <label className="mt-5 w-[130px] h-[130px] flex justify-center border-gray-300 border-dashed border-[2px] rounded-lg items-center cursor-pointer">
            {imageURL ? (
              <img
                src={imageURL}
                alt="Uploaded"
                className="w-[130px] h-[130px] object-cover rounded-lg"
                onClick={() => {
                  // Allow user to change the image
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              />
            ) : (
              <>
                <input
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  id="fileInput"
                />
                <IoMdAddCircle className="text-4xl" />
              </>
            )}
          </label>
          <DialogDescription>
            <div className="flex gap-3 mb-5 mt-5">
              <Input
                type="text"
                placeholder="First name"
                className="h-[40px]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Last name"
                className="h-[40px]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <Input
              type="email"
              placeholder="Email Address"
              className="h-[40px] mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Phone number"
              className="h-[40px] my-3"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Position"
              className="h-[40px] my-2"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />

            <Button
              className="mt-5 bg-[#d78b30] hover:bg-[#d78b30]"
              onClick={() => {
                let dataArr = [
                  imageURL.trim(),
                  firstName.trim(),
                  lastName.trim(),
                  email.trim(),
                  number.trim(),
                  position.trim(),
                ];

                let newState = [...currentState, dataArr];
                dispatch(salonSliceActions.updateStep7(newState as newStaff));

                setImageURL("");

                setImageURL("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setNumber("");
                setPosition("");

                setIsOpen(false);
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
