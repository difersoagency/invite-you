"use client"
import Image from "next/image";
import FieldText from "../component/FieldText";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { setLogin } from "../../../services/auth";
import Cookies from 'js-cookie';

export default function Login(){

  const router = useRouter();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const token = Cookies.get('token');

  if(token) {
    router.replace('/dashboard');
    }

  const loginHandler = async () => {
    const formData = {
      email,
      password
    }

    if(!email || !password){
      toast.error('Email dan Password wajib di isi')
    } else {
      const response = await setLogin(formData);
      if(response.error){
        toast.error(response.message)
      }else{
        toast.success("Berhasil")
        Cookies.set('token', response.data.token, {expires : 1})
       
      router.replace('/dashboard');
      }
    }
  };



  return(
    <>
    <section className="w-screen h-screen bg-[url('/bg.png')] bg-cover opacity-25 absolute z-[-1]"></section>
    <section className="flex items-center h-screen w-screen justify-center relative z-20">
      <div className="m-auto bg-white px-14 py-10 rounded-xl">
        <Image 
          src="/logo.png"
          width={200}
          height={100}
          alt="Logo Invite You"
          className="m-auto"
        />
        <h1 className="font-bold text-2xl mt-2 text-center">Login</h1>
        <div  className="mt-5 ">
          <FieldText usefor='email' label='Email'  value={email} onChange={setEmail}  type="text"/>
          <FieldText usefor='password' label='Password' value={password} onChange={setPassword} type="password"/>
          <button className="px-8 py-2 text-white font-bold mx-auto bg-gold mt-6 text-xs w-[20vw]" onClick={loginHandler} type="submit">Login</button>
        </div>
      </div>
    </section>
    <ToastContainer></ToastContainer>
    </>  
  );
 
}

