import { useState } from 'react'
import SearchIcon from '../Icons/SearchIcon'
import { citiesData } from '../constants/cities'
import { useFormContext } from 'react-hook-form'
type Props = {
    isOpenCity: boolean
    handleClose: () => void
}
export default function SelctCity({ isOpenCity, handleClose }: Props) {
    const {
        setValue,
        trigger
    } = useFormContext();
    const [cities, setCities] = useState(citiesData)

    // filter the cities based on the input value
    const handleFilterCities = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value: data } } = e;
        const filteredCities = citiesData.filter(city => city.name.includes(data))
        setCities(filteredCities)
    }
    return (
        <div
            className={`${isOpenCity ? "" : "hidden"} absolute w-full  top-0 bg-black h-full`}
        >
            <div className="h-full p-4 pl-8 overflow-hidden">
                <div className="relative">
                    <input
                        className="bg-light-gray w-full py-2.5 px-4 rounded-md  placeholder:text-base placeholder:text-slate-gray outline-none text-black mb-5"
                        placeholder="جستجو"
                        name="city"
                        onChange={handleFilterCities}
                    />
                    <button className='absolute top-0 flex items-center gap-1 font-semibold h-11 left-3 text-17'>
                        <SearchIcon />
                    </button>
                </div>

                <div className="relative h-screen overflow-scroll text-right pb-28 z-1">

                    {cities.length > 0 ?
                        cities.map((c, i) => (
                            <ul
                                key={i + 1}
                                data-value="1566262000"
                                className="flex flex-col pl-2 overflow-hidden transition-all duration-300 active:bg-black fade-animation"
                            >
                                <li
                                    className="relative flex items-center w-full h-full px-4 py-4 ml-4 border-b cursor-pointer border-light-gray active:bg-grey active:text-black active:border-black"
                                    onClick={() => {
                                        handleClose()
                                        setValue('city', c.name);
                                        trigger('city');
                                    }}
                                >
                                    {c.name}
                                </li>
                            </ul>
                        )) :
                        <div className="absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <h3 className='text-xl text-center text-white'>

                                شهر مورد نظر یافت نشد
                            </h3>
                        </div>
                    }

                </div>
            </div>
        </div>)
}
