import { useState } from "react";
import { favoritesItems } from "../constants/favourits"
import HeartIcon from "../Icons/HeartIcon";
import { toast } from "react-toastify";
import SelectableCheckboxList from "../components/SelectableCheckboxList";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useUserInfo } from "../store/useUserInfo";
export default function Favorites() {

    const [selectedFavorites, setSelectedFavorites] = useState<string[]>([]);
    const addUserFavorits = useUserInfo(state => state.handleUserFavorits)
    const navigate = useNavigate()

    const handleChooseFavorites = (favoriteItem: string) => {
        // remove the selected item if user select it again
        if (selectedFavorites.includes(favoriteItem)) {
            setSelectedFavorites((prev) => [...prev.filter(item => !item.includes(favoriteItem))])
            return
        }
        // add the favorits items if user don't select more than 3
        if (selectedFavorites.length < 3) {
            setSelectedFavorites([...selectedFavorites, favoriteItem])
        } else {
            // show alert 
            toast("فقط می‌توانید سه مورد را انتخاب کنید😕", {
                theme: 'dark',
                position: 'top-center',
                closeOnClick: true,
                autoClose: 2000
            })
        }
    }
    const handleNextStep = () => {
        if (selectedFavorites.length) {
            toast("✅ انتخاب‌ها ثبت شد", {
                autoClose: 3000,
                position: "top-center",
                theme: "dark",
            });
            addUserFavorits(selectedFavorites)
            navigate("/onBoard/jobs")
        } else {
            toast("❗ حداقل یک مورد را انتخاب کنید", {
                autoClose: 3000,
                position: "top-center",
                theme: "dark",
            });
        }
    }
    return (
        <>
            <div
                className="w-full h-[90vh] max-w-lg p-4 mx-auto overflow-y-auto"
            >
                <div className="w-full p-6 pb-8 rounded-lg bg-header-alt">
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <HeartIcon />
                        <h2 className="text-lg font-bold ">علاقه مندی ها</h2>
                    </div>
                    <div className="flex flex-col gap-4 ">
                        {
                            favoritesItems?.map((item, index) => {
                                return (
                                    <SelectableCheckboxList
                                        key={index + 1}
                                        value={item}
                                        checked={selectedFavorites.includes(item)}
                                        onSelect={() => handleChooseFavorites(item)}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="px-4">
                <Button onClick={handleNextStep}
                    disabled={selectedFavorites.length < 1}
                    className="w-full px-4 my-4 bg-primary">
                    ادامه
                </Button>
            </div>
        </>
    );
}

