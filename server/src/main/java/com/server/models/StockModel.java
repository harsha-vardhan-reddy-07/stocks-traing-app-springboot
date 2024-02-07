package com.server.models;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;

@Getter
@Document(collection = "stocks")
public class StockModel {
    
    public String _id;
    public String user;
    public String symbol;
    public String name;
    public Number price;
    public Number count;
    public Number totalPrice;
    public String stockExchange;

    public StockModel(String _id, String user, String symbol, String name, Number price, Number count, Number totalPrice, String stockExchange) {
        this._id = _id;
        this.user = user;
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.count = count;
        this.totalPrice = totalPrice;
        this.stockExchange = stockExchange;
    }

    public StockModel() {
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

    public String getStockExchange() {
        return stockExchange;
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

    public void setStockExchange(String stockExchange) {
        this.stockExchange = stockExchange;
    }

    @Override
    public String toString() {
        return "StockModel [_id=" + _id + ", name=" + name  + ", stockExchange="
                + stockExchange + ", symbol=" + symbol + ", user=" + user + "]";
    }
}
