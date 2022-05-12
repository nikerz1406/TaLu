import axiosClient from "../utilities/axiosClient"
import queryString from 'query-string';
class WordsApi{
    gettAll = (params={}) =>{
        const url = '/getdata';
        return axiosClient.get(url,{params});
    }
    postHistory = (params={})=>{
        const url = '/saveHistory';
        var pas = JSON.stringify(params);
        return axiosClient.post(url, queryString.stringify({data:pas}));
    }

}
const wordApi = new WordsApi();
export default wordApi;