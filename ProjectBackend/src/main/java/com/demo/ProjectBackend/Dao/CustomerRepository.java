package com.demo.ProjectBackend.Dao;

import org.springframework.data.repository.CrudRepository;

import com.demo.ProjectBackend.beans.Customer;

public interface CustomerRepository extends CrudRepository<Customer,Integer>{

}
