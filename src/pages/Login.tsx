import { useForm, FormProvider } from 'react-hook-form'
import Input from '../components/Input';
import ChangeIcon from '../Icons/ChangeIcon';
import { UserInfo } from '../types';
import { useState } from 'react';
import SelctCity from '../components/SelctCity';
import SelectAge from '../components/SelectAge';
import Button from '../components/Button';
import { useUserInfo } from '../store/useUserInfo';
import { useNavigate } from 'react-router';

export default function Login() {
    const methods = useForm<UserInfo>({
        defaultValues: {
            age: null,
            city: "",
            name: "",
            gender: "",
            bio: "",
        }
    });
    const { handleSubmit, watch, register, formState: { errors } } = methods;
    // watch the values of the and city to if change show it in div
    const age = watch('age');
    const city = watch('city');
    const navigate = useNavigate()

    const [selectMode, setSelectMode] = useState('')
    const handleMode = (value: string): void => setSelectMode(value)
    // use 
    const handleFillUserInfo = useUserInfo(state => state.handleFillUserInfo);

    const onSubmit = (data: UserInfo) => {
        handleFillUserInfo(data)

        navigate("/onBoard/height", { replace: true })
    }

    return (
        <>
            <div className='relative min-h-screen'>
                {/* progress bar */}
                <div className="box-content flex h-[3px] px-4 pt-2 space-x-2 bg-transparent">
                    <div className="relative flex-1 bg-white rounded-full bg-step-item animate-pop">
                        <div className="absolute duration-300 rounded-full size-full bg-text-primary transition-width"></div>
                    </div>
                    <div className="relative flex-1 rounded-full bg-grey bg-step-item">
                        <div className="absolute w-0 h-full duration-300 rounded-full transition-width"></div>
                    </div>
                </div>

                {/* form part */}
                <div className="flex-1 h-full px-4" >
                    <h2 className="my-4 text-center text-white">
                        ساخت حساب کاربری
                    </h2>

                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className='h-full'>
                            {/* add your name and bio */}
                            <div className="space-y-4">
                                <Input
                                    name='name'
                                    placeholder="نام"
                                    rules={
                                        {
                                            required: "لطفا نام خود را وارد کنید",
                                            maxLength: { value: 15, message: "نام کاربر نمیتواند بیشتر از 15 کاراکتر باشد" },
                                            pattern: {
                                                value: /^[\u0600-\u06FF\s]+$/,
                                                message: "لطفانام خود رو به فارسی وارد کنید"
                                            },
                                        }

                                    }
                                />
                                <Input
                                    name='bio'
                                    placeholder="بیوگرافی"
                                    rules={{
                                        required: "لطفا بیوگرافی خود را وارد کنید",
                                        maxLength: { value: 120, message: "بیوگرافی نمیتواند بیشتر از 120 کاراکتر باشد" },
                                    }}
                                />
                                <div className="[&>p]:text-slate-gray [&>p]:text-xs space-y-0.5">
                                    <p>
                                        مثال : طراح لباس و علاقه مند به گردش
                                    </p>
                                    <p>
                                        حداکثر 120 کاراکتر
                                    </p>
                                </div>
                            </div>

                            {/* choose the age and the city */}
                            <div className="mt-8 space-y-2">
                                <div className="relative">
                                    <Input
                                        name='age'
                                        value="سن"
                                        rules={{ required: "لطفا سن خود را وارد کنید" }}
                                        onClick={() => handleMode('age')}
                                        isDiv
                                    />
                                    <div className='absolute top-0 flex items-center gap-1 h-11 left-3 text-primary text-17 '>

                                        {age || ''}
                                        <ChangeIcon />
                                    </div>
                                </div>
                                <div className="relative ">
                                    <Input
                                        name="city"
                                        value="شهر"
                                        rules={{ required: "لطفا شهر خود را انتخاب کنید" }}
                                        onClick={() => handleMode('city')}
                                        isDiv
                                    />
                                    <div className='absolute top-0 flex items-center gap-1 h-11 left-3 text-primary text-17'>
                                        {city || ''}
                                        <ChangeIcon />
                                    </div>
                                </div>
                            </div>

                            {/* select gender part */}
                            <div className="mt-8">
                                <h3 className='mb-1 text-base text-slate-gray'>جنسیت</h3>
                                <div className="grid grid-cols-2 gap-2 text-17">
                                    <>
                                        <label
                                            className="flex items-center w-10 gap-2 cursor-pointer input-style"
                                            htmlFor="male"
                                        >
                                            <input
                                                className="hidden w-full peer"
                                                type="radio"
                                                value="male"
                                                id='male'
                                                {...register("gender", { required: "لطفا جنسیت خود را انتخاب کنید" })}
                                            />
                                            <span className="cursor-pointer checked-input-radio"></span>
                                            مرد
                                        </label>
                                    </>
                                    <>
                                        <label
                                            className="flex items-center gap-2 cursor-pointer input-style"
                                            htmlFor="female"
                                        >
                                            <input
                                                className="hidden w-full peer"
                                                id="female"
                                                type="radio"
                                                value="female"
                                                {...register("gender", { required: "لطفا جنسیت خود را انتخاب کنید" })}
                                            />
                                            <span className="checked-input-radio"></span>
                                            زن
                                        </label>
                                    </>
                                    {errors.gender &&
                                        <p className="h-4 mt-1 text-sm font-semibold text-primary">
                                            {errors.gender?.message?.toString()}
                                        </p>}
                                </div>
                            </div>

                            {/* next button */}
                            <div className="fixed left-0 right-0 w-full px-4 mx-auto bottom-4">
                                <Button>
                                    ادامه
                                </Button>
                            </div>
                        </form>
                        {/* put in the form provider to setvalue in seperate components */}
                        {selectMode === "age" && <SelectAge
                            handleClose={() => handleMode('')} />}
                        {selectMode === "city" && <SelctCity
                            isOpenCity={selectMode === "city"}
                            handleClose={() => handleMode('')} />}
                    </FormProvider>
                </div>
            </div>
        </>

    )
}