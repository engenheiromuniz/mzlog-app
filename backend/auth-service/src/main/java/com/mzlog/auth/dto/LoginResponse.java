package com.mzlog.auth.dto;

public class LoginResponse {

    private String token;
    private String username;
    private String nome;
    private String cargo;
    private boolean admin;

    public LoginResponse(String token, String username, String nome, String cargo, boolean admin) {
        this.token = token;
        this.username = username;
        this.nome = nome;
        this.cargo = cargo;
        this.admin = admin;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getNome() {
        return nome;
    }

    public String getCargo() {
        return cargo;
    }

    public boolean isAdmin() {
        return admin;
    }
}
