import { useState } from "react";
import { useUserInfo } from "../store/useUserInfo";
import Wheel from "../components/wheel";
import Button from "../components/Button";
import { useNavigate } from "react-router";

export default function HeightPicker() {
    const [userHeight, setUserHeight] = useState<{ value: number } | null>(null)
    const navigate = useNavigate()
    const handleUserHeight = useUserInfo(state => state.handleUserHeight)
    return (

        <div className="relative flex flex-col py-8 w-full h-[80vh] bg-black justify-between items-center">

            <div className="w-full text-center text-white">
                <h1>قد</h1>
                <span className="text-sm opacity-70">قدت چنده؟</span>
            </div>

            <div className="w-20 h-48 ">
                <Wheel
                    initIdx={21}
                    length={221}
                    minValue={149}
                    maxValue={220}
                    width={40}
                    label="cm"
                    state={userHeight}
                    setState={setUserHeight}
                    loop
                />
            </div>
            <Button className="!w-3/5 " disabled={Number(userHeight?.value) < 150} onClick={() => {
                handleUserHeight(Number(userHeight?.value))
                navigate("/onBoard/favorites",{ replace: true })
                //         // router.push(`/onBoard/favorites#${currentParams}`);
            }}>
                بعدی
            </Button>

        </div >
    )
}
