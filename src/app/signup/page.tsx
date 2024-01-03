"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignUpPage() {
  const route = useRouter();
  const [buttonDisabled, setbuttonDisabled] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/signup", user);

      console.log("Signup sucess " + response.data.message);
      toast.success(response.data.message);
      route.push("/login");
    } catch (error: any) {
      console.log("Signup failed " + error.message);
      toast.error("Signup failed");
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">{loading ? "Processing" : "SignUp"}</h1>
      <br />
      <label htmlFor="username">username</label>
      <input
        className="border-2 border-gray-300 rounded-lg p-2 text-black"
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="border-2 border-gray-300 rounded-lg p-2 text-black "
        type="text"
        name="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <hr />
      <label htmlFor="password">password</label>
      <input
        className="border-2 border-gray-300 rounded-lg p-2 text-black "
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <br />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignUp}
      >
        {buttonDisabled ? "No SignUp" : "Sign Up"}
      </button>

      <Link href="/login">visit login page</Link>
    </div>
  );
}
