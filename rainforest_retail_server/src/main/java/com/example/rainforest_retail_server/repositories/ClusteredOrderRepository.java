package com.example.rainforest_retail_server.repositories;

import com.example.rainforest_retail_server.models.ClusteredOrders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClusteredOrderRepository extends JpaRepository<ClusteredOrders, Long> {
}
