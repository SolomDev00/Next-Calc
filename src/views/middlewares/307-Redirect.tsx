import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/website-loading";

const RedirectPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/", { replace: true });
        }, 2000);
        const timer2 = setTimeout(() => {
            navigate("/dashboard", { replace: true });
        }, 500);
        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, [navigate]);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <LoadingScreen />
        </div>
    );
};

export default RedirectPage;
