package com.example.tq;

public class UserMessage {
    private String userName;
    private String message;
private String history;

    public UserMessage(String userName, String message, String history) {
        this.userName = userName;
        this.message = message;
        this.history = history;

    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    @Override
    public String toString() {
        return "UserMessage{" +
                "userName='" + userName + '\'' +
                ", message='" + message + '\'' +
                '}';
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }




}
