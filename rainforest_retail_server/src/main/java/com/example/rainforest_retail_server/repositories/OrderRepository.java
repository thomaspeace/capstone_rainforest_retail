package com.example.rainforest_retail_server.repositories;

import com.example.rainforest_retail_server.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository  extends JpaRepository<Order, Long> {
}
