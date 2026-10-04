import axios, { AxiosRequestConfig } from "axios";

export default async function callApi({ url, method, data }: AxiosRequestConfig) {
    const response = await axios({
        url,
        method,
        data
    }).catch(err => err.response)

    if (!response || response.status > 300) {
        const res = {
            error: true,
            message: response?.data?.message || 'Tidak dapat terhubung ke server',
            data: null
        }
        return res;
    }

    const res = {
        error: false,
        message: 'success',
        data: response.data
    }

    return res;

}