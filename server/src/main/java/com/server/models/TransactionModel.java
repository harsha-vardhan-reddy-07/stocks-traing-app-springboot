package com.server.models;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;

@Getter
@Document(collection = "transactions")
public class TransactionModel {
    
    public String _id;
    public String user;
    public String type;
    public String paymentMode;
    public Number amount;
    public String time;

    public TransactionModel(String _id, String user, String type, String paymentMode, Number amount, String time) {
        this._id = _id;
        this.user = user;
        this.type = type;
        this.paymentMode = paymentMode;
        this.amount = amount;
        this.time = time;
    }

    public String get_id() {
        return _id;
    }

    public String getUser() {
        return user;
    }

    public String getType() {
        return type;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public Number getAmount() {
        return amount;
    }

    public String getTime() {
        return time;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public void setAmount(Number amount) {
        this.amount = amount;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "TransactionModel [_id=" + _id + ", paymentMode=" + paymentMode + ", time=" + time
                + ", type=" + type + ", user=" + user + "]";
    }
}
