import '../App.css';
import{useState} from 'react';
import { useNavigate } from "react-router-dom";
import {isValidEmail,
  ifEmpty,
  onlyNumbers,
} from '../validation/validationForm';

import {checkUserLogin} from '../axios/accessServer';//Calling a function from another file
import {Link} from 'react-router-dom'


function LoginComp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [select, setSelect] = useState(1);


  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();
//-----------------------------------------------

  const sendData = async() =>
  {
    if(ifEmpty(email) || ifEmpty(password)){setErrorMessage('Do not leave a blank field');}
    if(!isValidEmail(email)){setErrorMessage('Must enter valid email!');}
    if(!onlyNumbers(select)){setErrorMessage('Only numbers should be entered!');}


    if(isValidEmail(email) && !ifEmpty(password) && onlyNumbers(select))
    {

      setErrorMessage('');
      let data = {
        email : email,
       password : password,
       select : select
      };

      let response = await checkUserLogin(data);

      if(response === "success")
      {
        localStorage.setItem('name', email);//session to keep username
        navigate('/homePage');
      }
      if(response === "faild")
      {
        setErrorMessage("Invalid password or email");
      }
      
    }

  }
//-----------------------------------------------
  return (


    <div className="App">
      {errorMessage && (
        <p className="error"> {errorMessage} </p>
      )}
      <div className='information'>
          
          <label>Email:</label>
          <input type="email"  onChange={(event) => {setEmail(event.target.value);}}/>

          <label>Password:</label>
          <input type="password" onChange={(event) => {setPassword(event.target.value);}}/>

          <label>Select a program:</label>
          <select className='selected' onChange={(event) => {setSelect(event.target.value);}}>
            <option value="1">single customer</option>
            <option value="2">Customer management system</option>
          </select>

          <button onClick={sendData}>OK</button>
          <br/>
          <Link to='/forgetPassword'>forget password</Link>

          </div>
    </div>
  );
}

export default LoginComp;
