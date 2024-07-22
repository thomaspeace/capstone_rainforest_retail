package com.example.rainforest_retail_server.repositories;

import com.example.rainforest_retail_server.models.Order;
import com.example.rainforest_retail_server.models.enums.DeliveryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository  extends JpaRepository<Order, Long> {

    List<Order> findByRegionalHubIdEqualsAndDeliveryStatusEqualsAndDateToDeliverEquals(long regionalHubId, DeliveryStatus deliveryStatus, LocalDate currentDate);
}
