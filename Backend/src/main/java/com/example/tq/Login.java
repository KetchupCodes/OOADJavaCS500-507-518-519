package com.example.tq;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


@Controller
public class Login extends PerformAuth  {


    @MessageMapping("/login")
    @SendTo("/topic/auth")
    public Reply login(@Payload Authentication message) throws Exception {

            String uN = message.getUserName();
            String pwd = message.getPassword();
            setUserName(uN);
            setPassword(pwd);
            setSignUp(message.isSignUpBox());
            System.out.println(getUserName()+getPassword()+getisSignUp());
            boolean res = authenticate();
            System.out.println("The details are  "+uN+"   "+pwd);
            return new Reply(String.valueOf(res));

    }

}