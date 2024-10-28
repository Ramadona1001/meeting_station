import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';
// api.meetingstation1.com
async function fetchData(endPoint: string): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.get(`https://api.meetingstation1.com/api${endPoint}`);
        return response.data; // Assuming the response is JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
async function postData(endPoint: string, data: any): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.post(`http://localhost:8000/api${endPoint}`, data);
        return response.data; // Assuming the response is JSON
        
    } catch (error : any) {
        if(error.response.data.errors) { 
            return error.response.data;
        }else{ 
            console.error('Error fetching data:', error);
            toast.error(`${error.response.data.message}`);
            return error;
        }
    }
}

export  {fetchData , postData};