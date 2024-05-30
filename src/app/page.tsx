"use client"
import Image from "next/image";
import FieldText from "./component/FieldText";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { setLogin } from "../../services/auth";
import Cookies from 'js-cookie';
import Login from "./login/page";

export default function Home(){
  const token = Cookies.get('token');
  const router = useRouter();
 
 

  return (
   <Login></Login>
  );   
}

