import axios from 'axios'
import React from 'react'

export async function getProjectList() {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const response = await axios.get(`${ROOT_API}/project/list`)
    const axiosResponse = response

    return axiosResponse.data
}
