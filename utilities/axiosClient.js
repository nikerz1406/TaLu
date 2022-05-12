import axios from 'axios';

const axiosClient = axios.create({
  baseURL:'https://api.khochangchang.com/api',
  // headers:{
  //   'content-type':'application/json',
  // },
  // paramsSerializer:params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) =>{
  // Handle token here
  return config;
})

axiosClient.interceptors.response.use((response) =>{
  if(response && response.data){
    return response.data;
  }
  return response;
},(error)=>{
  // throw error;
  return Promise.reject(error);
})

export default axiosClient;