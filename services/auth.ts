import axios from "axios";
import { error } from "console";
import { LoginTypes } from "./dataTypes";
const ROOT_API = process.env.NEXT_PUBLIC_API;
import Cookies from 'js-cookie';
import callApi from "../config/api";

export async function setLogin(data: LoginTypes){
    const url = `${ROOT_API}/login`;
   
    return callApi({
        url,
        method: 'POST',
        data
    });
}
