import {Routes, Route, Link} from 'react-router-dom'
import CreateAccountComp from './CreateAccount';
import ErrorComp from './Error';
import ForgetPasswordComp from './ForgetPassword';
import HomePageComp from './HomePage';
import LoginComp from './Login';
import OtpinputComponent from './OtpinputComponent';


function MainPageComp() {
  return (
    <div className="App">


      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>




    <Routes>
      <Route path="/login" element={ <LoginComp />  } />
      <Route path="/register" element={ <CreateAccountComp/>  } />
      <Route path="/error" element={ <ErrorComp/>  } />
      <Route path="/homePage" element={ <HomePageComp/>  } />
      <Route path="/forgetPassword" element={ <ForgetPasswordComp/>  } />
      <Route path="/OtpinputComponent" element={ <OtpinputComponent/>  } />


      

    </Routes>

    </div>
  );
}

export default MainPageComp;
