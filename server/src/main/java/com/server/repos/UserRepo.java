package com.server.repos;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.server.models.UserModel;

public interface UserRepo extends MongoRepository<UserModel, String>{
    UserModel findByEmail(String email);
}
