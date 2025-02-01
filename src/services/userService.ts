import { UserData } from "../types";
import { baseUrl } from "./baseUrl";

const sendUserData = async (userData: UserData) => {
    const response = await baseUrl.post("/index.php/Login",
        {
             userData,
        }
    );
    return response
}
export { sendUserData }