import { useEffect } from 'react';
import useAppdata from '../hooks/useAppdata';
import { useUserInfo } from '../store/useUserInfo';
import { useNavigate } from 'react-router';

export default function Home() {
    const { appData } = useAppdata();
    const navigate = useNavigate();
    // here we will change the check join with api and replace it here
    const isUserLoggedIn = useUserInfo(state => state.isUserCompeltedInfo)
    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate(`/onBoard/#${appData}`, { replace: true })
        }
    }, [appData, isUserLoggedIn, navigate])

    return (
        <div className='text-end'>hash is :<br /> <span className='text-xs'>
            {appData}
        </span>
        </div>
    )
}
