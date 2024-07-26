import { useState, useRef, FormEvent, ChangeEvent, DragEvent } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { stylistSliceActions } from "@/store/stylistSignupSlice";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";

import { stylistSignupType } from "@/store/stylistSignupSlice";
const Step2 = () => {
  let dispatch = useAppDispatch();

  let fileInputRef = useRef(null);

  const step2 = useAppSelector((state) => state.signupStylist.step2);
  const [step2Data, setStep2Data] = useState(step2);
  // i should not use hooks inside other hooks
  let [imageUrlsA, setImageUrlsA] = useState<string[]>(
    step2.businessImages || []
  );
  let [imageUrlsB, setImageUrlsB] = useState<string[]>(step2.menuImages || []);
  let [imageUrlsC, setImageUrlsC] = useState<string[]>(step2.certImages || []);

  let [maleCheck, setMalecheck] = useState<boolean>(
    step2.serviceFor.male || false
  );
  let [femaleCheck, setFemaleCheck] = useState<boolean>(
    step2.serviceFor.female || false
  );
  let [unisexCheck, setUnisexCheck] = useState<boolean>(
    step2.serviceFor.unisex || false
  );
  let [aboutBusiness, setAboutBusiness] = useState(step2.aboutText || "");

  function updateStep2State() {
    let updatedData: stylistSignupType["step2"] = {
      ...step2Data,
      businessImages: imageUrlsA,
      menuImages: imageUrlsB,
      certImages: imageUrlsC,
      serviceFor: {
        male: maleCheck,
        female: femaleCheck,
        unisex: unisexCheck,
      },
      aboutText: aboutBusiness,
    };
    setStep2Data((curr) => updatedData);
    dispatch(stylistSliceActions.updateStep2(updatedData));
  }

  let formHandler = (e: FormEvent) => {
    e.preventDefault();
    updateStep2State();
    dispatch(stylistSliceActions.setCurrentStep(3));
  };

  function dropHandler(e: DragEvent) {
    console.log("File(s) dropped");

    e.preventDefault();

    if (e.dataTransfer) {
      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...e.dataTransfer.items].forEach((item, i) => {
          // If dropped items aren't files, reject them
          if (item.kind === "file") {
            const file = item.getAsFile();
            console.log(`… file[${i}].name = ${file?.name}`);
            console.log(file?.arrayBuffer);
          }
        });
      } else {
        // Use DataTransfer interface to access the file(s)
        [...e.dataTransfer.files].forEach((file, i) => {
          console.log(`… file[${i}].name = ${file.name}`);
        });
      }
    }
  }

  const handleFileChange = (
    e: ChangeEvent,
    imageType: "business" | "menu" | "cert"
  ) => {
    const target = e.target as HTMLInputElement;
    console.log(target.files?.length);
    if (target.files) {
      console.log(target.files[0]?.size);
      console.log("files dropped ---------");
      console.log("Making an axios request");

      const formData = new FormData();
      formData.append("file", target.files[0]);

      axios
        .post("http://localhost:3001/service/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            let url = res.data.imageUrl;

            if (imageType == "business") {
              setImageUrlsA((curr) => [...curr, url]);
              dispatch(
                stylistSliceActions.updateBusinessImages([...imageUrlsA, url])
              );
            } else if (imageType == "menu") {
              setImageUrlsB((curr) => [...curr, url]);
              dispatch(
                stylistSliceActions.updateMenuImages([...imageUrlsB, url])
              );
            } else if (imageType == "cert") {
              setImageUrlsC((curr) => [...curr, url]);
              dispatch(
                stylistSliceActions.updateCertImages([...imageUrlsC, url])
              );
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  function dragOverHandler(e: DragEvent) {
    console.log("File(s) in drop zone");
    e.preventDefault();
  }
  return (
    <>
      <div className="bg-gren-500 flex justify-evenly items-center w-6/12">
        <div className="flex justify-center bg-ellow-500 flex-auto">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full "
            onClick={() => {
              updateStep2State();
              dispatch(stylistSliceActions.setCurrentStep(1));
            }}
          >
            <IoArrowBack />
          </Button>
        </div>
        <div className=" ml-[-15px] text-xl flex flex-col flex-auto  bg-range-500 justify-center items-center">
          <p className="mb-5 text-center font-bold text-2xl">
            {"Add business Info"}
          </p>
          <p className=" text-sm text-center font-light text-gray-500 w-2/4">
            {
              "Please enter business details, Images and your expert certificates."
            }
          </p>
        </div>
        <div className="bg-pik-500 flex-auto"></div>
      </div>

      <div className="lg:w-[900px] bg-geen-500 px-10 mb-20">
        <form
          onSubmit={(e) => formHandler(e)}
          className="pt-[30px] text-sm flex flex-col "
        >
          <p className="font-bold mb-3">Upload Business Images</p>
          <div
            className="bg-ink-500 w-full h-[280px] border-[2px] rounded-lg  border-dashed  border-gray-300"
            id="drop_zone"
            onDrop={(e) => {
              dropHandler(e);
            }}
            onDragOver={(e) => {
              dragOverHandler(e);
            }}
          ></div>
          {/* add -> more images  */}
          <div className="bg-yllow-500 flex mt-3 ">
            <div className="bg-yellw-500 h-full">
              <label className=" mt-5 w-[130px] h-[130px]  flex justify-center border-gray-300 border-dashed border-[2px] rounded-lg items-center cursor-pointer">
                <input
                  onChange={(e) => {
                    handleFileChange(e, "business");
                  }}
                  ref={fileInputRef}
                  type="file"
                  className=" sr-only"
                  id="fileInput"
                />

                <IoMdAddCircle className="text-4xl" />
              </label>
            </div>
            <div className="bg-lue-500 flex px-5  py-2 gap-2 flex-auto overflow-x-scroll items-center ">
              {imageUrlsA?.map((item, idx) => {
                return (
                  <div
                    key={"businessimg" + idx}
                    className="bg-gray-500 min-w-[150px] h-[150px] rounded-lg overflow-hidden"
                  >
                    <img
                      src={item}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* line */}
          <div className="w-full h-[1px] rounded-full bg-gray-500 my-5"></div>
          <p className="font-bold mb-2 mt-4">Upload Menu Images</p>
          <div className="bg-ellow-500 flex ">
            <div>
              <label className=" mt-5 w-[130px] h-[130px]  flex justify-center border-gray-300 border-dashed border-[2px] rounded-lg items-center cursor-pointer">
                <input
                  onChange={(e) => {
                    handleFileChange(e, "menu");
                  }}
                  ref={fileInputRef}
                  type="file"
                  className=" sr-only"
                  id="fileInput"
                />

                <IoMdAddCircle className="text-4xl" />
              </label>
            </div>
            <div className="bg-lue-500 flex px-5  py-2 gap-2 flex-auto overflow-x-scroll items-center ">
              {imageUrlsB?.map((item, idx) => {
                return (
                  <div
                    key={"businessimg" + idx}
                    className=" min-w-[150px] h-[150px] rounded-lg overflow-hidden"
                  >
                    <img
                      src={item}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full h-[1px] rounded-full bg-gray-500 my-5"></div>
          <p className="font-bold mb-2 mt-4">Upload Certificates</p>
          <div className="bg-yelow-500 flex">
            <div>
              <label className=" mt-5 w-[130px] h-[130px]  flex justify-center border-gray-300 border-dashed border-[2px] rounded-lg items-center cursor-pointer">
                <input
                  onChange={(e) => {
                    handleFileChange(e, "cert");
                  }}
                  ref={fileInputRef}
                  type="file"
                  className=" sr-only"
                  id="fileInput"
                />

                <IoMdAddCircle className="text-4xl" />
              </label>
            </div>
            <div className="bg-bue-500 flex px-5  py-2 gap-2 flex-auto overflow-x-scroll items-center ">
              {imageUrlsC?.map((item, idx) => {
                return (
                  <div
                    key={"businessimg" + idx}
                    className="bg-gray-500 min-w-[150px] h-[150px] rounded-lg overflow-hidden"
                  >
                    <img
                      src={item}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full h-[1px] rounded-full bg-gray-500 my-5"></div>
          <p className="font-bold mb-2 mt-4">Service Providing For</p>
          <div className="flex gap-10 mt-5 font-bold text-gray-500 text-md">
            <div className="flex gap-2 items-center">
              <Checkbox
                id="male"
                defaultChecked={maleCheck}
                onCheckedChange={(val: boolean) => {
                  setMalecheck(val);
                }}
              />{" "}
              <p>Male</p>
            </div>{" "}
            <div className="flex gap-2  items-center">
              <Checkbox
                id="female"
                defaultChecked={femaleCheck}
                onCheckedChange={(val: boolean) => {
                  setFemaleCheck(val);
                }}
              />{" "}
              <p>Female</p>
            </div>{" "}
            <div className="flex gap-2 items-center">
              <Checkbox
                id="unisex"
                defaultChecked={unisexCheck}
                onCheckedChange={(val: boolean) => {
                  setUnisexCheck(val);
                }}
              />{" "}
              <p>Unisex</p>
            </div>
          </div>{" "}
          <div className="w-full h-[1px] rounded-full bg-gray-500 my-5"></div>
          <p className="font-bold mb-4">About This Business</p>
          <Textarea
            placeholder="Write here..."
            className="min-h-[240px]"
            value={aboutBusiness}
            onChange={(e) => {
              setAboutBusiness(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-[#d78b30] hover:bg-[#d78b30] mt-10"
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
export default Step2;
