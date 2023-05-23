import React, { useState, useEffect } from 'react';
import './App.css';
import Loading from './app/views/components/loading/Loading.js';
import Home from './app/views/components/home/Home.js';
import Navigator from './app/views/components/navigation/Navigator';
import { useLocation } from "react-router-dom"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();




  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  return (
    <div>
      
      {isLoading && location.pathname == "/" ? <Loading /> : <Navigator/>}
    </div>
  );
}

export default App;