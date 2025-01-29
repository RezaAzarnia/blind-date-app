import { useMemo, useState } from "react";
import { allJobs } from "../constants/jobs";
import { FaBriefcase, FaCheck } from "react-icons/fa";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useUserInfo } from "../store/useUserInfo";

export default function Jobs() {
    const [selectedJobs, setSelectedJobs] = useState<string[]>([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const addUserJobs = useUserInfo(state => state.handleUserJobs)

    // filter the items by search here
    const filteredJobs = useMemo(() =>
        [...searchValue.length ? allJobs.filter(item => item.includes(searchValue)) : allJobs], [searchValue])

    // set selected jobs to first and the filtered items down 
    const displayedJobs = useMemo(() => {
        return [
            ...selectedJobs,
            ...filteredJobs.filter(item => !selectedJobs.includes(item))
        ]
    }, [filteredJobs, selectedJobs])

    const handleClickJob = (job: string) => {
        const isJobSelected = selectedJobs.includes(job)
        // if user re select one other item remove it from selected items 
        if (isJobSelected) {
            setSelectedJobs(prev => prev.filter(item => item !== job))
            // add the items
        } else if (selectedJobs.length < 3) {
            setSelectedJobs((prev => [...prev, job]))
        } else {
            toast("🙄 فقط می‌توانید سه شغل انتخاب کنید", {
                theme: 'dark',
                position: 'top-center',
                closeOnClick: true,
                autoClose: 2000
            })
        }
    }
    const handleConfirm = () => {
        if (selectedJobs.length) {
            toast("✅ انتخاب‌ها ثبت شد", {
                autoClose: 2000,
                position: "top-center",
                theme: "dark",
                closeOnClick: true
            });
            addUserJobs(selectedJobs)
            navigate("/onBoard/pictures");
        } else {
            toast("❗ حداقل یک شغل را انتخاب کنید", {
                autoClose: 2000,
                position: "top-center",
                theme: "dark",
                closeOnClick: true
            });
        }
    }

    return (
        <div
        >
            {/* Scrollable Content */}
            <div
                className="flex-grow w-full h-[90vh] max-w-md p-4 mx-auto overflow-y-auto"
            >
                {/* navbar  */}
                <div className="flex flex-col items-center mb-6">
                    <FaBriefcase className="mb-2 text-4xl" />
                    <h1 className="text-lg font-bold">شغل تو انتخاب کن</h1>
                </div>

                {/* Search Bar */}
                <div className="w-full mb-4">
                    <input
                        type="text"
                        placeholder="جستجو..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full p-3 text-gray-300 placeholder-gray-500 rounded-lg bg-active focus:outline-none"
                    />
                </div>
                {/* show jobs list */}
                <div className="w-full p-4 rounded-lg shadow-md bg-header-alt">
                    {displayedJobs.map((job, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => handleClickJob(job)}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg mb-3 cursor-pointer transition-all duration-300 bg-header-alt text-grey hover:bg-active hover:shadow-md
                                ${selectedJobs.includes(job) && "!bg-primary !text-white shadow-lg"}
                                `}
                            >
                                <span className="text-sm font-medium">{job}</span>
                                {selectedJobs.includes(job) && (
                                    <span className="text-lg font-bold text-gray-300">
                                        <FaCheck />
                                    </span>
                                )}
                            </div>
                        )
                    }
                    )}
                </div>
            </div>

            <div className="w-full max-w-md p-4 mx-auto">
                <Button disabled={selectedJobs.length === 0} onClick={handleConfirm}>
                    ادامه
                </Button>
            </div>

        </div>)
}
