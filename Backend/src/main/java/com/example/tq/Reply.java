package com.example.tq;

public class Reply {
    private String s;

    public Reply(String s) {
        this.s = s;
    }

    @Override
    public String toString() {
        return "Reply{" +
                "s='" + s + '\'' +
                '}';
    }

    public String getS() {
        return s;
    }

    public void setS(String s) {
        this.s = s;
    }
}
