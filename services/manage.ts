import axios from 'axios'
import Cookies from 'js-cookie';

export function getToken(){
    let headers = {};
    const token = Cookies.get('token');
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return headers

}

export async function getProjectList() {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const response = await axios.get(`${ROOT_API}/project/list`,{headers: getToken()}).catch((err) => err.response)
  

    if (response.status > 300) {
       
      const res = {
            status : response.status,
            data : [],
            message : response.data.message,
        }

        return res
      }

      const res = {
        status : response.status,
        data : response.data.data,
        message : response.data.message,
    }

    return res
}


export async function getProjectDetail(id : number) {
       const ROOT_API = process.env.NEXT_PUBLIC_API;
    const response = await axios.get(`${ROOT_API}/project/detail/${id}`,{headers: getToken()}).catch((err) => err.response)
  
    if (response.status > 300) {
       
        const res = {
              status : response.status,
              data : [],
              message : response.data.message,
          }
  
          return res
        }
  
        const res = {
          status : response.status,
          data : response.data.data,
          message : response.data.message,
      }
  
      return res
}
