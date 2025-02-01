import React from 'react'
import { useLocation } from 'react-router';

export default function Home() {
    const { hash } = useLocation();
    console.log(hash);

    return (
        <div>Home</div>
    )
}
