// import { baseUrl } from "./baseUrl";
import * as faceapi from "face-api.js";
import { baseUrl } from "./baseUrl";

const loadFaceModels = async () => {
  console.log("isLoading");
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  ]);
  console.log("loaded");
};

const sendUserImage = async (imgaesData: FormData) => {
  const res = await baseUrl.post("/index.php", imgaesData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // timeout: 15000,
  });
  return res;
};


export { loadFaceModels, sendUserImage };
