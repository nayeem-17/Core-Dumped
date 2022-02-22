import axios from "axios";

const putData = async (url: string, body: any, token?: string) => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL+'',
        timeout: 1000,
        headers:{'authorization': 'Bearer '+token}
    })
    
    const response = await instance.put(url, body) ;
    return response;
} 

export default putData ;