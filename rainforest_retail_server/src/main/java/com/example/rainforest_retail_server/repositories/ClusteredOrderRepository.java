package com.example.rainforest_retail_server.repositories;

import com.example.rainforest_retail_server.models.ClusteredOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClusteredOrderRepository extends JpaRepository<ClusteredOrder, Long> {
}
