package com.demo.ProjectBackend.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.ProjectBackend.beans.Request;

public interface RequestRepository extends JpaRepository<Request,Integer>{
	

	public List<Request> findByCustomer_CId(int cId);
	
	@Query("select r from Request r order by r.rId")
	public List<Request> findAllOrderByrIdAsc();
}
