package com.server.models;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;

@Getter
@Document(collection = "users")
public class UserModel {

    public String _id;
    public String email;
    public String password;
    public String username;
    public String usertype;
    public Number balance;

    public UserModel(String _id, String email, String password, String username, String usertype, Number balance) {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.usertype = usertype;
        this.balance = balance;
    }

    public String get_id() {
        return _id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public String getUsertype() {
        return usertype;
    }

    public Number getBalance() {
        return balance;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }

    public void setBalance(Number balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "UserModel [_id=" + _id + ", email=" + email + ", password=" + password
                + ", username=" + username + ", usertype=" + usertype + "]";
    }
    
}
