"use client";

import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const logout = async () => {
    try {
      //this try block is simply runnign the code in that file only , i.e invoke that file from this file
      await axios.get("api/users/logout");
      toast.success("logout successful");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error)
        console.log("Logout Unsuccessfull !", error.message);
    }
  };

  const [UserInfo, setUserInfo] = useState("Nothing");

  const getUserInfo = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data.data._id);
      setUserInfo(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error("failed of fetch user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      <hr />
      <p>
        Profile Page
        <br></br>
        <button
          onClick={logout}
          className="bg-blue-500 w-fit p-2 m-2 rounded-b-3xl "
        >
          Logout
        </button>
      </p>
      <button onClick={getUserInfo} className="w-fit  p-2 my-4 bg-green-400 ">
        Get User Details
      </button>
      <h2>
        {UserInfo === "Nothing" ? (
          "Nothing happended Here"
        ) : (
          <Link href={`/profile/${UserInfo}`} >{UserInfo}</Link>
        )}
      </h2>
    </div>
  );
}