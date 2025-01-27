import { useRouteError } from 'react-router'
type Props = {
    data: string;
    message: string;
    status: number
}
export default function Error() {
    const error = useRouteError() as Props
    console.log(error.message);
    return (
        <div>
            <h1 className="p-3 my-1 text-2xl text-center text-white capitalize bg-red-500 rounded-md">
                {error?.message}
            </h1>
        </div>
    )
}
