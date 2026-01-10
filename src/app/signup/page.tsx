"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignIn() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      // Frontend (page.tsx) to Backend (route.ts) , Data Sharing
      // axios making a post request i.e. sending data to the backend then we can fetch the data from the their
      setLoading(true);
      const response = await axios.post("api/users/signup",user);
      console.log("Sign-up successfull ", response.data);
      toast.success("signIn successful");
      router.push("/login"); //hey router just push the user to /login
    
    }

    catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log("An unknown error has occurred !! ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center  justify-center min-h-screen py-2">
      <h1>{Loading ? "Processing" : "SignUp Page"}</h1>

      <label
        className="p-1
        "
        htmlFor="username"
      >
        username
      </label>
      <input
        className="p-2 bg-white text-black rounded-lg"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      ></input>

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
        id="password"
        type="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      ></input>
      <button
        className="p-2 border-gray-500 rounded-b-lg focus:border-gray-700 hover:text-violet-500"
        onClick={onSignUp}
      >
        {buttonDisabled ? "No Sign Up" : " SignUp Here"}
      </button>
      <Link href="/login" className="hover:text-violet-500">
        Visit login Page
      </Link>
    </div>
  );
}
