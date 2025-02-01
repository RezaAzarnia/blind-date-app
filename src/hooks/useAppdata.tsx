import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function useAppdata() {
    const [appData, setAppData] = useState<string | undefined>("");
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) setAppData(hash.slice(1))
    }, [hash])

    return { appData }
}
