package com.server.models;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;

@Getter
@Document(collection = "orders")
public class OrderModel {

    public String _id;
    public String user;
    public String symbol;
    public String name;
    public Number price;
    public Number count;
    public Number totalPrice;
    public String stockType;
    public String orderType;
    public String orderStatus;

    public OrderModel(String _id, String user, String symbol, String name, Number price, Number count, Number totalPrice, String stockType, String orderType, String orderStatus) {
        this._id = _id;
        this.user = user;
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.count = count;
        this.totalPrice = totalPrice;
        this.stockType = stockType;
        this.orderType = orderType;
        this.orderStatus = orderStatus;
    }

    public String get_id() {
        return _id;
    }

    public String getUser() {
        return user;
    }   

    public String getSymbol() {
        return symbol;
    }

    public String getName() {
        return name;
    }

    public Number getPrice() {
        return price;
    }

    public Number getCount() {
        return count;
    }

    public Number getTotalPrice() {
        return totalPrice;
    }

    public String getStockType() {
        return stockType;
    }

    public String getOrderType() {
        return orderType;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Number price) {
        this.price = price;
    }

    public void setCount(Number count) {
        this.count = count;
    }

    public void setTotalPrice(Number totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setStockType(String stockType) {
        this.stockType = stockType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    @Override
    public String toString() {
        return "OrderModel [_id=" + _id + ", name=" + name + ", orderStatus=" + orderStatus
                + ", orderType=" + orderType  + ", stockType=" + stockType + ", symbol=" + symbol
                + ", user=" + user + "]";
    }
    
}
