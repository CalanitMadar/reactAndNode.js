import{useState} from 'react';
import {forgetPassword, sendEmail} from '../axios/accessServer';//Calling a function from another file
import { useNavigate } from "react-router-dom";



function ForgetPasswordComp() {
  const [email, setEmail] = useState("");
  const [select, setSelect] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();


  const sendData = async () =>
  {

    let data = {email : email , select : select};
    let response = await forgetPassword(data);
    
    if(response === 'email not found'){setErrorMessage('email not found');}
    if(response === 'ok')
    {
      let subject = 'password reset'
      let message = 'password';

      let data = {email:email, message : message, subject : subject};
      sendEmail(data);
      navigate("/OtpinputComponent");
    }

  }

  return (
    <div className="App">
      {errorMessage && (
        <p className="error"> {errorMessage} </p>
      )}
      
      <div className='information'>
          <label>Email:</label>
          <input type="email"  onChange={(event) => {setEmail(event.target.value);}}/>

          <label>Select a program:</label>
          <select className='selected' onChange={(event) => {setSelect(event.target.value);}}>
            <option value="1">single customer</option>
            <option value="2">Customer management system</option>
          </select>


          <button onClick={sendData}>OK</button>
        </div>
      </div>
  );
}

export default ForgetPasswordComp;


