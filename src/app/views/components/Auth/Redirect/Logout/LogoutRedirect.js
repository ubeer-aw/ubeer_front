
import React from "react";
import './LogoutRedirect.css';
import { useNavigate } from 'react-router-dom';

export default function LogoutRedirect() {
  const navigate = useNavigate();
  localStorage.clear();
  navigate('/')

  return (
    <div className='logo' style={{backgroundColor: '#142328'}}>
        <b>
            <h1 style={{color:'#FFFFFF',  display: 'inline-block', fontSize: '8vh'}}>U</h1>
            <h1 style={{color:'#06C167',  display: 'inline-block', fontSize: '8vh'}}>beer</h1>
        </b>
    </div>
  );
};
