package com.server.controllers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.models.OrderModel;
import com.server.models.StockModel;
import com.server.models.TransactionModel;
import com.server.models.UserModel;
import com.server.repos.OrderRepo;
import com.server.repos.StockRepo;
import com.server.repos.TransactionRepo;
import com.server.repos.UserRepo;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@Controller
public class RouteController {
    
    @Autowired
    UserRepo userRepo;

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    StockRepo stockRepo;

    @Autowired
    TransactionRepo transactionRepo;

    @PostMapping("/register")
    public UserModel registerMethod(@RequestBody UserModel userData) {
        try {

            userData.setBalance(0);
            UserModel user = userRepo.save(userData);
            return user;

        } catch (Exception e) {

            return null;
        }
    }

    @PostMapping("/login")
    public UserModel loginMethod(@RequestBody UserModel userData) {
        try {
            UserModel user = userRepo.findByEmail(userData.getEmail());

            if (user.getPassword().equals(userData.getPassword())) {

                return user;
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/deposit")
    public TransactionModel depositMethod(@RequestBody TransactionModel transaction) {
        try {
            Optional<UserModel> userData = userRepo.findById(transaction.getUser());
            UserModel user = userData.get();
            user.setBalance(user.getBalance().doubleValue() + transaction.getAmount().doubleValue());

            userRepo.save(user);

            DateTimeFormatter currentDate = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            LocalDateTime now = LocalDateTime.now();

            transaction.setTime(currentDate.format(now));
            transaction.setType("Deposit");

            transactionRepo.save(transaction);

            return transaction;
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/withdraw")
    public TransactionModel withdrawMethod(@RequestBody TransactionModel transaction) {
        try {
            Optional<UserModel> userData = userRepo.findById(transaction.getUser());
            UserModel user = userData.get();
            user.setBalance(user.getBalance().doubleValue() - transaction.getAmount().doubleValue());

            userRepo.save(user);

            DateTimeFormatter currentDate = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            LocalDateTime now = LocalDateTime.now();

            transaction.setTime(currentDate.format(now));
            transaction.setType("Withdraw");

            transactionRepo.save(transaction);

            return transaction;
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/fetch-user/{id}")
    public UserModel fetchUserMethod(@PathVariable("id") String id) {
        try {
            Optional<UserModel> user = userRepo.findById(id);
            return user.get();
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/transactions")
    public List<TransactionModel> fetchTransactionsMethod() {
        try {
            return transactionRepo.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/buyStock")
    public OrderModel buyStockMethod(@RequestBody OrderModel order){

        Optional<UserModel> userData = userRepo.findById(order.getUser());

        StockModel stockData = stockRepo.findByUserAndSymbol(order.getUser(), order.getSymbol());

        if (stockData != null){

            StockModel stock = stockData;
            stockData.setCount(stock.getCount().doubleValue() + order.getCount().doubleValue());
            stockData.setTotalPrice(stock.getTotalPrice().doubleValue() + order.getTotalPrice().doubleValue());

            stockRepo.save(stockData);
        }else{

            StockModel stock = new StockModel();
            stock.setUser(order.getUser());
            stock.setSymbol(order.getSymbol());
            stock.setName(order.getName());
            stock.setPrice(order.getPrice());
            stock.setCount(order.getCount());
            stock.setTotalPrice(order.getTotalPrice());
            
            stockRepo.save(stock);
        }

        

        UserModel user = userData.get();

        user.setBalance(user.getBalance().doubleValue() - order.getTotalPrice().doubleValue());

        userRepo.save(user);

        order.setOrderType("buy");
        order.setOrderStatus("completed");

        return orderRepo.save(order);
    }

    @PostMapping("/sellStock")
    public OrderModel sellStockMethod(@RequestBody OrderModel order){

        Optional<UserModel> userData = userRepo.findById(order.getUser());

        StockModel stock = stockRepo.findByUserAndSymbol(order.getUser(), order.getSymbol());

        stock.setCount(stock.getCount().doubleValue() - order.getCount().doubleValue());
        stock.setTotalPrice(stock.getPrice().doubleValue() * stock.getCount().doubleValue());

        stockRepo.save(stock);

        UserModel user = userData.get();

        user.setBalance(user.getBalance().doubleValue() + order.getTotalPrice().doubleValue());

        userRepo.save(user);
        order.setOrderType("sell");
        order.setOrderStatus("completed");
        return orderRepo.save(order);
    }

    @GetMapping("/fetch-stocks")
    public List<StockModel> fetchStocksMethod() {
        try {
            return stockRepo.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/fetch-orders")
    public List<OrderModel> fetchOrdersMethod() {
        try {
            return orderRepo.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/fetch-users")
    public List<UserModel> fetchUsersMethod() {
        try {
            return userRepo.findAll();
        } catch (Exception e) {
            return null;
        }
    }



}
