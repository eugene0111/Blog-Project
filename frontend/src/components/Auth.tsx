import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import type { SignupInput } from "@eugene.sam/blog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: {type: "signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    async function sendRequest() {
        console.log(postInputs);
        const response = await axios.post(`${BACKEND_URL}/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/blogs");
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold text-center">
                            Create an Account
                        </div>
                        <div className="text-slate-400 text-center">
                            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                            <Link className="underline underline-offset-1 pl-2" to={type === "signup" ? "/signin" : "/signup"}>{type === "signup" ? "Login" : "Signup"}</Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type === "signup" ? <LabelledInput label="Name" placeholder="Enter your Name" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                name: e.target.value
                            }))
                        }} /> : null}
                        <LabelledInput label="Email" placeholder="abc@example.com" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                email: e.target.value
                            }))
                        }} />
                        <LabelledInput label="Password" type={"password"} placeholder="********" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                password: e.target.value
                            }))
                        }} />
                        <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signup" ? "Sign Up" : "Sign In"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

type LabelledInputType = {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <div>
            <label className="block mb-2 text-sm font-medium text-black pt-4">{label}</label>
            <input type={type || "text"} onChange={onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}