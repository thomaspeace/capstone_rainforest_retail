package com.example.rainforest_retail_server.repositories;

import com.example.rainforest_retail_server.models.ClusteredOrder;
import com.example.rainforest_retail_server.models.enums.DeliveryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ClusteredOrderRepository extends JpaRepository<ClusteredOrder, Long> {
    List<ClusteredOrder> findByRegionalHubIdEquals(long regionalHubId);
}
