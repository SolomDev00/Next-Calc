import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/website-loading";

const PermanentlyMove = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/dashboard/home", { replace: true });
    }, [navigate]);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <LoadingScreen />
        </div>
    );
};

export default PermanentlyMove;
