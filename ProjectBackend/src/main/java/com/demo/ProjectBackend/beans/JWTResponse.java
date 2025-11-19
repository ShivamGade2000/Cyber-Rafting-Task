package com.demo.ProjectBackend.beans;

public class JWTResponse {

    private String token;
    private String username;
    private String role;

    // Private constructor to enforce the use of the builder
    private JWTResponse(Builder builder) {
        this.token = builder.token;
        this.username = builder.username;
        this.role = builder.role;
    }

    public JWTResponse() {
        super();
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "JWTResponse [token=" + token + ", username=" + username + ", role=" + role + "]";
    }

    // Static Builder class
    public static class Builder {
        private String token;
        private String username;
        private String role;

        public Builder setToken(String token) {
            this.token = token;
            return this;
        }

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setRole(String role) {
            this.role = role;
            return this;
        }

        public JWTResponse build() {
            return new JWTResponse(this);
        }
    }
}
