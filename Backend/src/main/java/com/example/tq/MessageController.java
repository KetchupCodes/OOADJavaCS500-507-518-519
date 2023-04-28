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
public class MessageController {


    @MessageMapping("/home")
    @SendTo("/topic/result")
    public Reply greeting(@Payload UserMessage message) throws Exception {

        URL url = new URL("https://api.openai.com/v1/completions");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Bearer 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");
        con.setDoOutput(true);
        String dri = "Create 5 easy, accurate, and entertaining multiple-choice questions in the style of Millionaire show, with 4 options (A, B, C, and D) and 1 correct answer.Return an array of JSON objects, each containing the fields: 'question', 'A', 'B', 'C', 'D', and 'correct answer(A,B,C,D)'. The answers should be verifiable, factual and without misinformation.";

        String med =  "Create 5 highly challenging , accurate multiple-choice questions in the style of Millionaire show, with 4 options (A, B, C, and D) with only 1 correct option.Return an array of JSON objects, each containing the fields: 'question', 'A', 'B', 'C', 'D', and 'correct answer(A,B,C,D)'. The answers should be verifiable, factual and without misinformation.";
        String hardPrompt = "Create 5 extremely challenging, obscure,niche multiple-choice questions in the style of Millionaire show, each with four options (A, B, C, and D) and one correct answer.Return an array of JSON objects , with fields: 'question', 'A', 'B', 'C', 'D', and 'correct answer(A,B,C,D)'.Questions must be based on factual, verifiable information that is not widely known.";

        DataOutputStream out = new DataOutputStream(con.getOutputStream());
        out.writeBytes(
                "{\"model\": \"text-davinci-003\", \"prompt\": \""+hardPrompt+"\", \"temperature\": 0.7, \"max_tokens\": 4000,\"top_p\": 1,\"presence_penalty\": 0.6}");
        out.flush();
        out.close();

        int status = con.getResponseCode();
        if (status == 200) {
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            System.out.println(content);

            return new Reply(content.toString());
        } else {

            return new Reply("Failed to get data , status : "+status);
        }


    }

}