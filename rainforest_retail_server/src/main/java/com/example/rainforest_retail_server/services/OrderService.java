package com.example.rainforest_retail_server.services;

import com.example.rainforest_retail_server.models.Order;
import com.example.rainforest_retail_server.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Long id, Order orderDetails) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setDateToDeliver(orderDetails.getDateToDeliver());
            order.setDeliveryAddress(orderDetails.getDeliveryAddress());
            order.setRegionalHub(orderDetails.getRegionalHub());
            order.setStatus(orderDetails.getDeliveryStatus());
            return orderRepository.save(order);
        }
        return null;
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}