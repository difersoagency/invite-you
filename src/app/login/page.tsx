"use client"
import Image from "next/image";
import FieldText from "../component/FieldText";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';




export default function Login(){

  const router = useRouter();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const token = Cookies.get('token');

  const loginHandler = async (e) => {
    e.preventDefault();
    
    //initialize formData
    const formData = new FormData();
   
    //append data to formData
    formData.append('email', username);
    formData.append('password', password);

    
    await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, formData)
    .then((response) => {
        Cookies.set('token', response.data.token);
        router.push('/dashboard');
        setIsLoggedIn(true);
    })
    .catch((error) => {
        console.log(error)
       
    })
};


useEffect(() => {
  
    if (token) {
   
      router.push('/dashboard');
    }
  }, [token, router]);


  return(
 
     <section className="flex items-center justify-center">
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
          <FieldText usefor='username' label='Username'  value={username} onChange={setUsername}  type="text"/>
          <FieldText usefor='password' label='Password' value={password} onChange={setPassword} type="password"/>
          <button className="px-8 py-2 text-white font-bold mx-auto bg-gold mt-6 text-xs " type="submit">Login</button>
        </form>
      </div>
    </section>
   
  
  );
}