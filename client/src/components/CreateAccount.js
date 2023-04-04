import '../App.css';
import{useState} from 'react';
import { useNavigate } from "react-router-dom";

import {createUser} from '../axios/accessServer';//Calling a function from another file

import {isValidEmail,
        onlyLetters,
        onlyNumbers,
        ifEmpty,
        checkPassword
} from '../validation/validationForm';

function CreateAccountComp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [select, setSelect] = useState(1);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

  let navigate = useNavigate();



  const keepData = async () =>{
    let error = checkPassword(password1, password2);
    if(error !== "true"){setErrorMessage(error)}
    if(ifEmpty(email) || ifEmpty(name) || ifEmpty(phone)){setErrorMessage('Do not leave a blank field');}
    if(!isValidEmail(email)){setErrorMessage('Must enter valid email!');  }
    if(!onlyLetters(name)){setErrorMessage('Only letters must be entered!');}
    if(!onlyNumbers(phone)){setErrorMessage('Only numbers should be entered!');}
    
    if(isValidEmail(email) && onlyLetters(name) && onlyNumbers(phone)&&
     !ifEmpty(email) && !ifEmpty(name) && !ifEmpty(phone) && error === "true")
    {
      setErrorMessage(' ');
      let data = {name : name,
        email : email,
        phone : phone,
        select : select,
        password1 : password1,
        password2 : password2

      }
     let ret = await createUser(data);//call to the function to create a new user and server-side validation will be done there
      if(ret === "data faild")//if error in server side
      {
        navigate("/error");
      }

      if(ret === "23000")//if error is 23000, it means that email exist in database
      {
        setErrorMessage("This email already exists");
        navigate("/register");
      }
      if(ret === 'success')
      {
        navigate("/login");
      }
 
    }
    

  }
  
  return (
    <div className="App">

      {errorMessage && (
        <p className="error"> {errorMessage} </p>
      )}
      <div className='information'>
          <label>Name:</label>
          <input type="text" onChange={(event) => {setName(event.target.value);}}/>

          <label>Email:</label>
          <input type="email"  onChange={(event) => {setEmail(event.target.value);}}/>

          <label>Phone:</label>
          <input type="Phone" onChange={(event) => {setPhone(event.target.value);}}/>

          <label>Password:</label>
          <input type="password" onChange={(event) => {setPassword1(event.target.value);}}/>

          <label>Confirm password:</label>
          <input type="password" onChange={(event) => {setPassword2(event.target.value);}}/>

          <label>Select a program:</label>
          <select className='selected' onChange={(event) => {setSelect(event.target.value);}}>
            <option value="1">single customer</option>
            <option value="2">Customer management system</option>
          </select>

          


          <button onClick={keepData}>confirm</button>
        </div>
      </div>
  );
}

export default CreateAccountComp;


