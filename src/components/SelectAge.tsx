import { useState } from 'react'
import Wheel from '../components/wheel';
import { useFormContext } from 'react-hook-form';
import Button from './Button';
type Props = {
    handleClose: () => void
}
export default function SelectAge({ handleClose }: Props) {
    const {
        setValue,
        trigger
    } = useFormContext();

    const [age, setAge] = useState<{ value: number } | null>(null);

    return (
        <div className="fixed w-full top-0 left-0  h-full bg-black z-[9999] flex items-center justify-center">
            <div className="flex flex-col items-center p-4 space-y-4 text-white bg-black rounded-lg">
                <div className="w-[70px] h-[180px]">
                    <Wheel
                        length={85}
                        state={age}
                        setState={setAge}
                        minValue={15}
                        maxValue={90}
                        loop
                    />
                </div>
                <Button
                    className='!mt-10'
                    onClick={() => {
                        setValue("age", age?.value)
                        trigger("age")
                        handleClose()
                    }}
                >
                    بعدی
                </Button>
            </div>
        </div>
    )
}
