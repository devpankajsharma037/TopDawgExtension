import React, { useEffect } from 'react';
import {createRoot} from 'react-dom/client'
import App from './App'
import '../static/contentScript.css'

const init = () =>{
    const container = document.createElement('div')
    if (!container){
      throw new Error('not found the container')
    }    
    document.body.appendChild(container)
    const root = createRoot(container)
    root.render(<App/>)
}



window.onload = function () {
  let ref = setInterval(async()=>{
    let isExist = document.getElementsByClassName('boiler').length
    if (isExist > 0){
      clearInterval(ref);
      init()
    }
    var body = document.body;
    body.classList.add("boiler"); 
  },500)
}