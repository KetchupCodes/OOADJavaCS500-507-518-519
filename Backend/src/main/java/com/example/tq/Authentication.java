package com.example.tq;
public class Authentication{
    private String userName;
    private String password;

    public boolean isSignUpBox() {
        return signUpBox;
    }

    public void setSignUpBox(boolean signUpBox) {
        this.signUpBox = signUpBox;
    }

    private boolean signUpBox;
    public String getUserName() {
        return userName;
    }

    public Authentication() {
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}