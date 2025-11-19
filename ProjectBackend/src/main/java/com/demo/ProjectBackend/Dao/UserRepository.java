package com.demo.ProjectBackend.Dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.demo.ProjectBackend.beans.User;

public interface UserRepository extends CrudRepository<User,Integer>{
	@Query("select u from User u where email=:email")
	public Optional<User> findByEmail(String email);

}
