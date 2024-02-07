package com.server.repos;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.server.models.OrderModel;

public interface OrderRepo extends MongoRepository<OrderModel, String>{

    
}
  
