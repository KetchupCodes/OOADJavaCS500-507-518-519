import React, { useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import "./messaging.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Qz from "./quizsection"
import { render } from "@testing-library/react";
var stompClient = null;
const ChatRoom = () => {
  const [userData, setUserData] = useState({
    userName: "",
    message: "",
  });
  const [publicChat, setPublicChat] = useState([]);
  const [UT, setUT] = useState(false);
  const handleUser = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, userName: value });
  };

  const captureMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const [presentQuestions,setPresentQuestion] = useState([]);



  const registerUser = (event) => {
    event.preventDefault(); // Add this line to prevent the default form submission behavior
    if (userData.userName === "") {
      alert("Enter Valid Username");
    } else {
      let sock = new SockJS("http://localhost:8080/ws");
      stompClient = over(sock);
      stompClient.connect({}, onConnected, onError);
    }
  };
  const onConnected = (frame) => {
    
   stompClient.subscribe("/topic/result", onPublicMessageReceived);
    setUT(true);
  };
  const onError = (err) => {
    console.log(err);
  };

  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    let replyJSON = JSON.parse(payloadData.s);
    const { id, object, created, model, choices, usage } = replyJSON;
    const { text } = choices[0];
    setPresentQuestion(object);

    //setPublicChat((prevState) => [...prevState, " GPT-3 : " + text]);
    
  };

  const sendMessage = (event) => {
    let a = userData.message;
    setPublicChat((prevState) => [...prevState, " Wait For response !! "]);
    let finalData = { ...userData, history: publicChat.toString() };
    stompClient.send("/app/home", {}, JSON.stringify(finalData));
  };
  const logOutUser = (event) => {
    stompClient.disconnect();
    setUT(false);
  };
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
          </div>
        </div>
      </header>
      <div className="container messageContainer">
        {UT ? (
          <div>
            <div>
              <button className="btn btn-danger" onClick={logOutUser}>
                Disconnect
              </button>
            </div>
            <h1 className="mt-4">
              User is Connected with USERNAME : {userData.userName}
            </h1>

            <div  className="input-group mb-3">
              <div id = "NakkenLowde"> <input
          type={"text"}
          className="form-control"
          placeholder="Enter Your Message"
          value={userData.message}
          onChange={captureMessage}

          
        /></div>
           
        <button className="btn btn-primary" onClick={sendMessage}>
          Start Quiz
        </button>
      </div>

      <ul className="list-group mt-4">
        {publicChat.map((i, index) => {
          return (
            <li className="list-group-item" key={index}>
              {i}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div>
      <form>
        <div className="form-group">
          <label>Enter User Name :</label>
          <input
            type="text"
            className="form-control"
            value={userData.userName}
            onChange={handleUser}
          />
        </div>
        <button className="btn btn-primary" onClick={registerUser}>
          Submit
        </button>
      </form>
      <Qz  class ="quizContainer" quizData={presentQuestions}/>
      
    </div>
  )}
  <footer className="mt-4">
    <div className="container">
      <p className="text-center">© Quiz Application 2023</p>
      <p className="text-center">OOAD Project By:</p>
      <p className="text-center">Vijit Kumar | Yashas R Kashyap | Vishal J Lodha | Yash Vardhan Soni</p>
     
    </div>
  </footer>
</div>
</div>
  );
};
export default ChatRoom;
