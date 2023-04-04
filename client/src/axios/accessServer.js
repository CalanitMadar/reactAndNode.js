import Axios from 'axios';



const port = process.env.REACT_APP_BASE_PORT;



export const createUser = async (data)=>{
    let ret = await Axios.post(`http://localhost:${port}/register`, {
        name : data.name,
        email : data.email,
        phone : data.phone,
        select : data.select,
        password1 : data.password1,
        password2 : data.password2
      })
      if(ret.data === "data faild")
      {
       return "data faild";
      }
      if(ret.data === 23000)
      {
        return "23000";
      }
      return 'success';
}
//==================================================
export const checkUserLogin = async(data)=>{
  let response = await Axios.post(`http://localhost:${port}/login`, {data});
  return response.data;
}
//==================================================
export const forgetPassword = async(data)=>{
  let response = await Axios.post(`http://localhost:${port}/forgetPassword`, {data});
  return response.data;
}
//==================================================
export const sendEmail =(data)=>{

  let response = Axios.post(`http://localhost:${port}/sendEmail`, {data});
  return response.data;
}

