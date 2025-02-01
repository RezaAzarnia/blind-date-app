import { baseUrl } from "./baseUrl";
import * as faceapi from "face-api.js";

const loadFaceModels = async () => {
  console.log("isLoading");
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.ageGenderNet.loadFromUri("/models"),
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
