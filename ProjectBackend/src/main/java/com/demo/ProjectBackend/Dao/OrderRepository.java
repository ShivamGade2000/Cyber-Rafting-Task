package com.demo.ProjectBackend.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.ProjectBackend.beans.Orders;

public interface OrderRepository extends JpaRepository<Orders, Integer>{
	

	public List<Orders> findByCustomer_CId(int id);
	
	public List<Orders> findByVendor_VId(int id);

}
