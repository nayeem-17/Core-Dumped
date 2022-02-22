import axios from "axios";

const deleteData = async (url: string, token?: string) => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL+'',
        timeout: 1000,
        headers:{'authorization': 'Bearer '+token}
    })
    
    const response = await instance.delete(url) ;
    return response;
} 

export default deleteData ;