import React, { useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import MCQList from "./MCQList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./messaging.css";
import mySound from './KBCFull.mp3'

var stompClient = null;
let userName = ""
let password = ""
let newUser = false


const Login =()=>{

    const [quizDat, setQuizDat] = useState([]);
    
    // const [playSound] = useSound(mySound);
     
  
    const parseData = (data) => {
        const parsedData = JSON.parse(data);
        const choicesText = parsedData["s"]
        
        const choices = JSON.parse(choicesText.replace(/(\\n|\\')/g, "").trim());
        const qd = choices["choices"][0]["text"]

        return JSON.parse(qd)
      };
      
   const onConnected = async (frame) => {
    
        await stompClient.subscribe("/topic/result", onMessageReceived);
        await stompClient.subscribe("/topic/auth", authenticateUser);
        console.log("connected");
        console.log(JSON.stringify({"userName":userName,"password":password}))
        stompClient.send("/app/login", {}, JSON.stringify({"userName":userName,"password":password,"signUpBox":newUser}) );

    }
  
    const authenticateUser=(payload)=> {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData.s);
        if (payloadData.s === "true"){
            //Make display of class "login" none
            
            // playSound();
            var audio = new Audio(mySound);
            audio.play();

            document.getElementsByClassName("login")[0].style.display = "none";
            stompClient.send("/app/home", {}, JSON.stringify({ho:"You"}));
           
        }
        else{
          alert("Auth Failed")
        }
    }


    const onError = (err) => {
        alert("Could not conenct to web socket")
         };

    const registerUser =(event) => {
        event.preventDefault(); // Add this line to prevent the default form submission behavior

        if (event.target[0].value === "") {
          alert("Enter Valid Username");
        } else {

           
           userName = event.target[0].value;
           password = event.target[1].value;
           newUser = event.target[2].checked;
            let sock = new SockJS("http://localhost:8080/ws");
          stompClient = over(sock);
          
          stompClient.connect({}, onConnected, onError);


         
        }
        
      };
       
        
        
    const onMessageReceived = (payload) => {
          
            setQuizDat(parseData(payload.body));
            document.getElementsByClassName("quiz")[0].style.display = "block";
            };
    
    return(
        <div> <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
          Kaun Banega Crorepati
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tech Stack
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Kaun Banega Crorepati</h1>
            <p className="lead">
            Wet your intellectual appetite
            </p>
            <div className ="login ">
                <h1>Login</h1>
                <form onSubmit={registerUser}>
                        <input type="text" placeholder="username" />
                        <input type="password" placeholder="password" />
                        <input type="checkbox" />New User?
                        <br/>
            
                        <button type="submit" className="btn btn-primary" >Login</button>
                </form>
            
            </div>
          </div>
        </div>
      </header>
      
           
<div className="container messageContainer">
<div className="quizClass" style={{display:"none"}}>
                <button className="btn btn-primary" >Click</button>
            </div>
            <div className="quiz" style={{display:"none"}}>
                {console.log({quizDat})}
                <MCQList quizData={quizDat}/>
            </div>

</div>
   
          
           < footer className="mt-4">
    <div className="container">
      <p className="text-center">© Quiz Application 2023</p>
      <p className="text-center">OOAD Project By:</p>
      <p className="text-center">Vijit Kumar | Yashas R Kashyap | Vishal J Lodha | Yash Vardhan Soni</p>
     
    </div>
  </footer>
        </div>
        
    )
}
export default Login;



