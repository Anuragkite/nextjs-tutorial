
"use client"

import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";  
import { useRouter } from "next/navigation";

export default  function ProfilePage() {
    const router = useRouter();
    const logout = async ()=>{
        try {
            //this try block is simply runnign the code in that file only , i.e invoke that file from this file 
            await axios.get('api/users/logout');
            toast.success("logout successful");
            router.push("/login");

        } catch (error:unknown) {
            if(error instanceof Error)
                console.log("Logout Unsuccessfull !",error.message);
                toast.error(error.message);
        }
    } 

    return (
        <div className="flex items-center justify-center min-h-screen py-2">
            <hr />
            <p>
            
                Profile Page
                <br></br>
                <button onClick={logout} className="bg-blue-500 w-fit p-2 m-2 rounded-b-3xl ">Logout</button>
            </p>


        </div>
    )
}