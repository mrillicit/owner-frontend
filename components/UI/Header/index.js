import { useAuth } from "@context/auth/authContext";
import Link from "next/dist/client/link";
export default function Header({ heading }) {
    const { logout } = useAuth()
    return (
        <>
            <div className="container row col-12 px-3 pb-4">
                <div className="d-flex justify-content-between">
                    <div>
                        <h3>{heading}</h3>
                    </div>
                    <div>
                        <div className="font-weight-bold text-primary cursor-pointer" onClick={logout}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{``}</style>
            <div> hello </div>
        </>
    );
}
