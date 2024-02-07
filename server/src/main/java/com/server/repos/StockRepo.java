package com.server.repos;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.server.models.StockModel;

public interface StockRepo extends MongoRepository<StockModel, String>{

    StockModel findByUserAndSymbol(String user, String symbol);
    
}
