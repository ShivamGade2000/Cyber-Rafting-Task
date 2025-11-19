package com.demo.ProjectBackend.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.ProjectBackend.beans.Quotation;

public interface QuotationRepository extends JpaRepository<Quotation,Integer>{
	
	
	public List<Quotation> findByCustomer_CId(int id);
	
	public List<Quotation> findByVendor_VId(int id);
}
