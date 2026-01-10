"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import { NextResponse } from "next/server";

export default function SignIn() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled,setButtonDisabled] = useState(true);
    const [Loading,setLoading] = useState(false);
    useEffect(() => {
      if(user.email && user.password)
        {
        setButtonDisabled(false);
        }
       else{
        setButtonDisabled(true);
       } 
    

    }, [user])
    

    const onLogin = async () => {
        try {
          setLoading(true);
          const response =  await axios.post("/api/users/login",user);
          console.log(response);

          return NextResponse.json({})
            
        } catch (error) {
            if(error instanceof Error )
                console.log("issue in login ", error.message);
            return NextResponse.json({message:"Something wrong w/ login,fix it!"},{status:401})
        } finally{
            setLoading(false);
        }
     };

    return (
        <div className="flex flex-col items-center  justify-center min-h-screen py-2">
            <h1>Login Page !!</h1>


            <label
                className="p-1
        "
                htmlFor="email"
            >
                email
            </label>
            <input
                className="p-2 bg-white text-black rounded-lg"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            ></input>

            <label className="p-1" htmlFor="password">
                Password
            </label>
            <input
                className="p-2 bg-white text-black rounded-lg"
                id="username"
                type="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            ></input>
            <button
                className="p-2 border-gray-500 rounded-b-lg focus:border-gray-700 hover:text-violet-500"
                onClick={onLogin}
            >
             {buttonDisabled ? "No Login " :"LOGIN"}
            </button>
            <Link href="/signup" className="hover:text-violet-500">
                Visit signup Page
            </Link>
        </div>
    );
}
