import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminProtected = ({ Element }) => {
    const navigate = useNavigate();
    const admin = useSelector((state) => state.admin);

    useEffect(() => {
        if (!admin || !admin?.token) {
            navigate("/admin/login");
            return;
        }

        try {
            const decoded = jwtDecode(admin.token);
            console.log(Date.now()/1000);
            console.log(decoded.exp);
            
            if (decoded?.exp < Date.now() / 1000) {
                console.log("qwer");
                
                navigate("/admin/login");
            }

        } catch (error) {
            console.log(error);
            navigate("/admin/login");
        }
    }, [admin, navigate]);

    return Element;
};

export default AdminProtected;
