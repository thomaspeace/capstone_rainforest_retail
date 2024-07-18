package com.example.rainforest_retail_server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClusteredOrderRepository extends JpaRepository<ClusteredOrder, Long> {
}
