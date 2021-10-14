import Input from "@components/Form/Input";
import Header from "@components/UI/Header";
import { useAuth } from "@context/auth/authContext";
import axiosInstance from "@utils/axios";
import { useRouter } from "next/router";
import React from "react";

export default function Login() {
    const router = useRouter();
    const { login, loading, loginError, accessToken } = useAuth();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        login({ email, password });
    };

    React.useEffect(() => {
        if (accessToken) {
            router.push("/dashboard");
        }
    }, [accessToken]);

    return (
        <>
            <Header />
            <div className="outer-container">
                <div className="form-box w-100 p-3">
                    <h4 className="text-primary mb-4">Owner Login</h4>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <Input label="Email Address" value={email} onChange={setEmail} type="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <Input label="Password" value={password} onChange={setPassword} type="password" name="password" required />
                        </div>
                        <div className="form-group">
                            {loginError && <div className="alert alert-danger">{loginError}</div>}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                Login
                            </button>
                        <div> //implement auth properly </div>
                        </div>
                    </form>
                </div>
            </div>
            <style jsx>{`
                .outer-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: calc(100vh - 130px);
                }
                .form-box {
                    max-width: 500px;
                }
            `}</style>
        </>
    );
}
