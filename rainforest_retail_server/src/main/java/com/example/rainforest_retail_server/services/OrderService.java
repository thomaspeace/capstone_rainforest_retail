package com.example.rainforest_retail_server.services;

import com.example.rainforest_retail_server.models.ClusteredOrder;
import com.example.rainforest_retail_server.models.Order;
import com.example.rainforest_retail_server.models.OrderDTO;
import com.example.rainforest_retail_server.models.RegionalHub;
import com.example.rainforest_retail_server.repositories.ClusteredOrderRepository;
import com.example.rainforest_retail_server.repositories.OrderRepository;
import com.example.rainforest_retail_server.repositories.RegionalHubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RegionalHubRepository regionalHubRepository;

    @Autowired
    private ClusteredOrderRepository clusteredOrderRepository;

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

    public Order partialUpdateOrder(Long id, OrderDTO orderDTO) {
        Order order = orderRepository.findById(id).get();
        if(order != null) {
            if(orderDTO.getDateToDeliver() != null) {
                order.setDateToDeliver(orderDTO.getDateToDeliver());
            }
            if(orderDTO.getAddressLine() != null) {
                order.getDeliveryAddress().setLine(orderDTO.getAddressLine());
            }
            if(orderDTO.getLatitude() != 0) {
                order.getDeliveryAddress().setLatitude(orderDTO.getLatitude());
            }
            if(orderDTO.getLongitude() != 0) {
                order.getDeliveryAddress().setLongitude(orderDTO.getLongitude());
            }
            if(orderDTO.getPostCode() != null) {
                order.getDeliveryAddress().setPostcode(orderDTO.getPostCode());
            }
            if(orderDTO.getRegionalHubId() != 0) {
                RegionalHub regionalHub = regionalHubRepository.findById(orderDTO.getRegionalHubId()).get();
                order.setRegionalHub(regionalHub);
            }
            if(orderDTO.getDeliveryStatus() != null) {
                order.setStatus(orderDTO.getDeliveryStatus());
            }
            if(orderDTO.getClusterId() != 0) {
                ClusteredOrder clusteredOrder = clusteredOrderRepository.findById(orderDTO.getClusterId()).get();
                order.setCluster(clusteredOrder);
            }
            return order;
        }

        return null;
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}