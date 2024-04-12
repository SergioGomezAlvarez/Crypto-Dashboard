import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';



const now = new Date();
const day = now.getDay();
const hours = now.getHours();
const minutes = now.getMinutes();
console.log(`Today is day ${day} and the time is ${hours}:${minutes}.`);



const App = () => {
  const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  const [time, setTime] = useState(timeString);
  const [timeOut, setTimeOut] = useState()


  return (
    <>
      <h1 className="cashflow-text">{time}</h1>

    </>
  )


}







export default App
