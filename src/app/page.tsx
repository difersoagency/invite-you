"use client"
import Image from "next/image";
import FieldText from "./component/FieldText";
import { Button } from "@nextui-org/react";
import { useState } from "react";


export default function Home(){

  const [username,setUsername] = useState("");


  const loginHandler = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log(username)
  };


  return(
    <section className="flex items-center justify-center h-full">
      <div className="m-auto">
        <Image 
          src="/logo.png"
          width={200}
          height={100}
          alt="Logo Invite You"
          className="m-auto"
        />
        <h1 className="font-bold text-2xl mt-2 text-center">Login</h1>

        <form onSubmit={loginHandler} className="mt-5 text-center">
          <FieldText usefor='username' label='Username'  value={username} onChange={setUsername}  />
          <FieldText usefor='password' label='Password' value={username} onChange={setUsername} />
          <button className="px-8 py-2 text-white font-bold mx-auto bg-gold mt-6 text-xs " type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}