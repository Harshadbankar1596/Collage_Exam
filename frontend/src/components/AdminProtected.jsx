import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminProtected = ({ Element }) => {
    const navigate = useNavigate();
    const admin = useSelector((state) => state.admin);

    useEffect(() => {
        if (!admin || !admin.token) {
            navigate("/login");
            return;
        }

        try {
            const decoded = jwtDecode(admin.token);

            if (decoded.exp < Date.now() / 1000) {
                navigate("/login");
            }
        } catch (error) {
            navigate("/login");
        }
    }, [admin, navigate]);

    return Element;
};

export default AdminProtected;
