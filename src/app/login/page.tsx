"use client"
import Image from "next/image";
import FieldText from "../component/FieldText";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { setLogin } from "../../../services/auth";

export default function Login(){

  const router = useRouter();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  const loginHandler = async () => {
    const formData = {
      email,
      password
    }

    if(!email || !password){
      toast.error('Email dan Password wajib di isi')
    } else {
      const response = await setLogin(formData);
      console.log(formData)
      if(response.error){
        toast.error(response.message)
      }else{
        toast.success("Berhasil")
       
        router.push('/dashboard');
      }
    }


  };


  
  
  
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  
 // const token = Cookies.get('token');

//   const loginHandler = async (e) => {
//     e.preventDefault();
    
//     //initialize formData
//     const formData = new FormData();
   
//     //append data to formData
//     formData.append('email', username);
//     formData.append('password', password);

    
//     await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, formData)
//     .then((response) => {
//         Cookies.set('token', response.data.token);
//         router.push('/dashboard');
//         setIsLoggedIn(true);
//     })
//     .catch((error) => {
//         console.log(error)
       
//     })
// };


// useEffect(() => {
  
//     if (token) {
   
//       router.push('/dashboard');
//     }
//   }, [token, router]);


  return(
    <>
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
        <div  className="mt-5 text-center">
          <FieldText usefor='email' label='Email'  value={email} onChange={setEmail}  type="text"/>
          <FieldText usefor='password' label='Password' value={password} onChange={setPassword} type="password"/>
          <button className="px-8 py-2 text-white font-bold mx-auto bg-gold mt-6 text-xs " onClick={loginHandler} type="submit">Login</button>
        </div>
      </div>
    </section>
    <ToastContainer></ToastContainer>
    </>  
  );
}