import {api} from helper.js;

const login=(user)=>{
    return api.post('/login').then(
        (response)=>response.json());
};