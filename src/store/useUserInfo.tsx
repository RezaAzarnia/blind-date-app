import { create } from 'zustand'
import { UserInfo } from '../types';
import { devtools } from 'zustand/middleware'

interface UserLoggedinValue extends UserInfo {
    isUserCompeltedInfo: boolean;
    height: number;
    favorites: string[],
    jobs: string[],
    handleFillUserInfo: (userValues: UserInfo) => void;
    handleUserHeight: (userHeight: number) => void;
    handleUserFavorits: (userFavorites: string[]) => void;
    handleUserJobs: (userJobs: string[]) => void
}
export const useUserInfo = create<UserLoggedinValue>()(

    devtools(
        (set) => ({
            name: "",
            bio: "",
            age: 0,
            city: '',
            gender: '',
            height: 0,
            favorites: [],
            jobs: [],
            isUserCompeltedInfo: false,
            handleFillUserInfo: (userValues: UserInfo) => {
                set((state) => (
                    { ...state, ...userValues, isUserCompeltedInfo: true }
                ))
            },
            handleUserHeight: (userHeight: number) => {
                set((state) => ({ ...state, height: userHeight }))
            },
            handleUserFavorits: (userFavorits: string[]) => {
                set((state) => ({ ...state, favorites: userFavorits }))
            },
            handleUserJobs: (userJobs: string[]) => {
                set((state) => ({ ...state, jobs: userJobs }))
            }
        })
    ))