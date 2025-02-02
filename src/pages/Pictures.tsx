import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { sendUserImage, loadFaceModels } from "../services/imagesService";
import { useUserInfo } from "../store/useUserInfo";
import { sendUserData } from "../services/userService";
import { UserData } from "../types";
import * as faceapi from "face-api.js";
import PictureInput from "../components/PictureInput";
import Button from "../components/Button";
import laoderHaer from "../../public/loading heart.webm"
import useAppdata from "../hooks/useAppdata";
enum InputNames {
  A = "a",
  B = "b",
  C = "c",
  D = "d"
}
type PicturesProps = {
  [key in InputNames]: File | undefined
}
export default function Pictures() {
  const { appData } = useAppdata()

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const userInfo = useUserInfo(state => state);
  const { age, bio, city, favorites, gender, height, jobs, name } = userInfo;

  const methods = useForm<PicturesProps>();
  const { handleSubmit, watch, setValue } = methods;

  // show the error toast once
  const isShowToast = useRef(false);

  //watch the input files values
  const pictures = watch(Object.values(InputNames));
  const isDisabled = pictures.some(item => item == undefined);
  const filledInputsCount = pictures.filter(Boolean).length

  // detect te user face with face api
  const detectFace = async (value: File, options = {}) => {
    const picture = await faceapi.bufferToImage(value);

    return await faceapi
      .detectSingleFace(
        picture,
        new faceapi.TinyFaceDetectorOptions(options)
      )
      .withFaceLandmarks()
      .withFaceDescriptor()
  }
  //remove the picture from files if not human or picture don't clear
  const handleRemovePic = (key: InputNames): void => {
    if (!isShowToast.current) {
      isShowToast.current = true;
      toast("عکسی رو آپلود کن که چهرت مشخص باشه و با کیفیت باشه",
        {
          theme: "dark",
          position: "top-center",
          closeOnClick: true,
          autoClose: 2000
        })
    }
    // remove the picture file from the values
    setValue(key, undefined)
  }
  // validate imagaes that they are the same or not
  const validateFaceImages = (
    detections:
      (faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>> | undefined)[]): boolean => {
    // check distance between pictures one by one and if the distance less than 0.62 so the user pictures are same and if less than 0.2 so the pictures are same with high detect level;

    for (let i = 0; i < detections.length; i++) {
      for (let j = i + 1; j < detections.length; j++) {
        const distance = faceapi.euclideanDistance(detections[i]!.descriptor, detections[j]!.descriptor);
        if (distance < 0.2) {
          toast("لطفا عکس های تکراری آپلود نکنید", {
            theme: "dark",
            position: "top-center",
            closeOnClick: true,
            autoClose: 4000
          });
          console.log('repeat pic');
          return false;
        }
        if (!isShowToast.current && distance > 0.62) {
          isShowToast.current = true
          toast("لطفا فقط تصاویر یک فرد را آپلود کنید", {
            theme: "dark",
            position: "top-center",
            closeOnClick: true,
            autoClose: 4000
          });
          console.log('same pic');
          return false;
        }
      }
    }
    console.log('ok');
    return true
  }
  // send user imagse to server
  const callImageApi = async (values: PicturesProps): Promise<void> => {
    // make pictures in form data value
    const imagesData = new FormData();
    for (const key in values) {
      imagesData.append(key, values[key as InputNames]!);
    }
    try {

      console.log('img response');
      const response = await sendUserImage(imagesData)
      console.log(response);
      // give the pictures url to user api
      if (response.status === 200) {
        callUserApi(response.data.folder_name.toString())
      }
    } catch (error: unknown) {
      console.log(error);
      toast.error("متاسفانه خطایی رخ داده است لطفا مجدد امتحان کنید",
        {
          theme: "dark",
          position: "top-center",
          closeOnClick: true,
          autoClose: 4000
        })
    } finally {
      setIsLoading(false)
    }
  }
  // send user values to api
  const callUserApi = async (picFolder: string) => {

    const currentParams = window.location.hash.substring(1);

    const data: UserData = {
      app_data: currentParams,
      bio,
      jobs,
      gender: `${gender == "male" ? 0 : 1}`,
      city,
      fname: name,
      age,
      height,
      favorites,
      photos: picFolder,
    };
    console.log("Sending user data to server:", data);

    try {
      const res = await sendUserData(data)
      console.log(res);

      if (res.status === 200) {
        // add params later
        navigate(`/#${appData}`, { replace: true });
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  }
  // submit form 
  const onSubmit = async (value: PicturesProps) => {
    toast.warn("صبر کن هوش مصنوعی عکساتو چک کنه. شاید ۴۰ ثانیه طول بکشه",
      {
        theme: "dark",
        position: "top-center",
        closeOnClick: true,
        autoClose: 2000
      })
    setIsLoading(true)


    await loadFaceModels()
    // flag for show toast once
    isShowToast.current = false;

    //detect the users pictures first item normal detect and the second item with special options
    const detections = await Promise.all(
      Object.entries(value).map(async (item, index) => {
        const response = await detectFace(item[1]!,
          index === 1 ?
            { inputSize: 416, scoreThreshold: 0.2 } : {})
        // if the picture is not human remove it from files in react hook form items
        if (response == undefined) {
          setIsLoading(false)
          handleRemovePic(item[0] as InputNames)
          return undefined;
        } else {
          return response
        }
      })
    )
    console.log(detections);
    if (!validateFaceImages(detections)) {
      setIsLoading(false)
      console.log('problem');
      return
    } else {
      console.log('call image api');
      await callImageApi(value)
    }
  }

  return (
    <>
      {
        isLoading &&
        <>
          <div className="fixed top-0 left-0 z-10 w-full min-h-screen bg-black/50 backdrop-blur-md">
          </div>
          <div className="fixed z-50 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
            <video autoPlay loop muted playsInline className="w-80 h-96">
              <source src={laoderHaer} type="video/webm" />
            </video>
          </div>
        </>
      }
      {/* progressbar */}
      <div className="min-h-screen px-4">
        <div className="box-content flex h-[3px] pt-2 space-x-2 gap-0.5">
          <div className="relative flex-1 bg-white rounded-full bg-step-item animate-pop">
            <div className="absolute duration-300 rounded-full size-full bg-text-primary transition-width"></div>
          </div>
          <div className="relative flex-1 bg-white rounded-full bg-step-item">
            <div className="absolute w-0 h-full duration-300 rounded-full transition-width"></div>
          </div>
        </div>

        {/* img counter */}
        <div className="flex flex-row-reverse items-center justify-between w-full mt-4">
          <div className="px-4">
            <h3 className="font-semibold">عکس های پروفایل</h3>
          </div>
          <span className="pr-4 text-sm font-semibold text-grey" dir="ltr">
            {filledInputsCount} of {pictures.length}
          </span>
        </div>

        {/* img uploader */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid h-full grid-cols-2 gap-1 grid-rows-[209px_209px] mt-3">
              {
                // create picture inputs from enum 
                Array.from(Object.values(InputNames), (item, index) => {
                  return (
                    <PictureInput name={item} key={index} />
                  )
                })
              }
            </div>
            <p className="p-4 text-sm text-start text-slate-gray">
              برای ادامه شما باید 4 تا عکس اضافه کنی. عکس هات تمام رخ و واضح باشند.
            </p>
            <Button className="mt-2" disabled={isDisabled || isLoading}>
              ادامه
            </Button>
          </form>
        </FormProvider>
      </div >
    </>
  )
}
