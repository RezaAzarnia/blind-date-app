import  { useEffect } from 'react'
import { useUserInfo } from '../store/useUserInfo'
import { useNavigate } from 'react-router'
import useAppdata from '../hooks/useAppdata'
type Props = {
    children: React.ReactNode
}
export default function ProtectRoutes({ children }: Props) {
    const { appData } = useAppdata()
    const isUserCompletedInfo = useUserInfo(state => state.isUserCompeltedInfo)
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isUserCompletedInfo) {
            navigate(`/#${appData}`)
        }
    }, [appData, isUserCompletedInfo, navigate])

    return <>{children}</>
}
