import axios from 'axios'
import Cookies from 'js-cookie';

const ROOT_API = process.env.NEXT_PUBLIC_API;
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
export async function getTemplateList(jenis) {
    const response = await axios.get(`${ROOT_API}/template/list/${jenis}`,{headers: getToken()}).catch((err) => err.response)
  

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
export async function getMusicList() {
    const response = await axios.get(`${ROOT_API}/music/list`,{headers: getToken()}).catch((err) => err.response)
  

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


export async function deleteProject(id : string) {
    const response = await axios.delete(`${ROOT_API}/project/delete/${id}`,{headers:getToken()}).catch((err) => err.response)
  
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

export async function deleteMusic(id : string) {
    const response = await axios.delete(`${ROOT_API}/music/delete/${id}`,{headers:getToken()}).catch((err) => err.response)
  
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
export async function storeMusic(file : string) {
    const response = await axios.post(`${ROOT_API}/music/store/`,file).catch((err) => err.response)
  
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
