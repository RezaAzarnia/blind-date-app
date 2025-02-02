import { Outlet, useNavigation } from "react-router";
import Loader from "./Loader";

export default function Layout() {
    const navigate = useNavigation()
    console.log('here ayout');
    console.log(navigate.state);
    if (navigate.state === "loading") {
        return <Loader />
    }
    return (
        <div className='flex flex-col min-h-screen text-white'>
            <Outlet />
        </div>
    )
}
