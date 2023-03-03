import React, { useState, useEffect } from 'react';
import './App.css';
import Loading from './app/views/components/loading/Loading.js';
import Home from './app/views/components/home/Home.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> : <Home />}
    </div>
  );
}

export default App;