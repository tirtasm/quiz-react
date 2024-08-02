import React from "react";
import RegisterForm from "../components/formRegister";
import { Link } from "react-router-dom";

function RegisterPage() {
    return(
        <div className="flex items-center bg-blue-100 justify-center h-screen">
            <RegisterForm></RegisterForm>
        </div>
    )
}
export default RegisterPage;