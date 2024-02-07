package com.server.repos;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.server.models.TransactionModel;

public interface TransactionRepo extends MongoRepository<TransactionModel, String>{

    
}
