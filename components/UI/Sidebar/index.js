import { useAuth } from "@context/auth/authContext"
import Link from "next/dist/client/link"
import React from "react"
import { useRouter } from 'next/router'

const SIDEBAR_ITEMS = [
    {
        key: "dashboard",
        title: "Dasboard",
        path: '/dashboard',
        icon: '/dashboard.svg'
    },
    {
        key: "todays_orders",
        title: "Today's Orders",
        path: '/todays_orders',
        icon: '/cart.svg'
    },
    {
        key: "new_orders",
        title: "New orders",
        path: "/new_orders",
        icon: '/cart.svg'
    },
    {
        key: "past_orders",
        title: "Past orders",
        path: "/past_orders",
        icon: '/color.svg'
    },
]

export default function SideBar(){
    const router = useRouter()
    return (
        <>
            <div className="item-shadow h-100">
                <div className="p-2 p-md-4 mb-3">
                    <img src="/logo.svg" height="40px" width="92px"/>
                </div>
                <div>
                    {SIDEBAR_ITEMS && SIDEBAR_ITEMS.map((item) =>
                        <Link href={item.path} key={item.key}>

                            <a >
                            <div className={`${router.pathname===item.path && 'active-tab-div'}`}></div>
                                <div className={`py-2 py-md-3 pl-2 pl-md-4 ${router.pathname===item.path && 'active-tab'}`}>
                                <img src={item.icon} className="mr-1"/>
                                    {item.title}
                                </div>
                            </a>
                        </Link>
                    )}
                </div>
            </div>
            <style jsx>{`
                .active-tab {
                    background: #E5F1FF;
                }
                .active-tab-div {
                    position: absolute;
                    width: 8px;
                    height: 56px;
                    background: #3570B5;
                    border-radius: 10px 40px 40px 10px;
                }
            `}</style>
        </>
        
    )
}
