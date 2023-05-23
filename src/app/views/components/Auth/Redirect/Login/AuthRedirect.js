import { useAuth0 } from "@auth0/auth0-react";
import React  from "react";
import './AuthRedirect.css';
import { useNavigate } from 'react-router-dom';


const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function AuthRedirect() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();



  const getToken = async() => {
    if(isAuthenticated) {
        getAccessTokenSilently().then(res => {
            localStorage.clear()
            localStorage.setItem("jwtToken", res)
            localStorage.setItem("user_email", user.email)
            navigate('/?redirect=true')
        })
    }
  };
  getToken()


  
  return (
    <div className='logo' style={{backgroundColor: '#142328'}}>
        <b>
            <h1 style={{color:'#FFFFFF',  display: 'inline-block', fontSize: '8vh'}}>U</h1>
            <h1 style={{color:'#06C167',  display: 'inline-block', fontSize: '8vh'}}>beer</h1>
        </b>
    </div>
  );
};
