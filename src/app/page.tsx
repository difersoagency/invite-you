"use client"
import Image from "next/image";
import FieldText from "./component/FieldText";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Login from "./login/page";
import Dashboard from "./dashboard/page";







export default function Home(){

  const router = useRouter();
  const token = Cookies.get('token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
//   useEffect(() => {

//     if(!token) {
//         router.push('/login');
       
//       }else{
//         setIsLoggedIn(true);
//       }
    
// }, [token]);




  return(
    <main>
      {/* {isLoggedIn ? (
        <Dashboard></Dashboard>
      ) : (
         <Login></Login>
      )} */}
       <Login></Login>
    </main>
  
  );
}