package com.example.rainforest_retail_server.services;

import com.example.rainforest_retail_server.models.ClusteredOrder;
import com.example.rainforest_retail_server.models.Order;
import com.example.rainforest_retail_server.models.OrderDTO;
import com.example.rainforest_retail_server.models.RegionalHub;
import com.example.rainforest_retail_server.models.enums.DeliveryStatus;
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

    public Order createOrder(OrderDTO orderDTO) {
        RegionalHub foundRegionalHub = regionalHubRepository.findById(orderDTO.getRegionalHubId()).get();
        Order newOrder = new Order(orderDTO.getDateToDeliver(), orderDTO.getDeliveryAddress(), foundRegionalHub);
        return orderRepository.save(newOrder);
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
            if(orderDTO.getDeliveryAddress().getLine() != null) {
                order.getDeliveryAddress().setLine(orderDTO.getDeliveryAddress().getLine());
            }
            if(orderDTO.getDeliveryAddress().getLatitude() != 0) {
                order.getDeliveryAddress().setLatitude(orderDTO.getDeliveryAddress().getLatitude());
            }
            if(orderDTO.getDeliveryAddress().getLongitude() != 0) {
                order.getDeliveryAddress().setLongitude(orderDTO.getDeliveryAddress().getLongitude());
            }
            if(orderDTO.getDeliveryAddress().getPostcode()!= null) {
                order.getDeliveryAddress().setPostcode(orderDTO.getDeliveryAddress().getPostcode());
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

            orderRepository.save(order);

            return order;
        }

        return null;
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }


    public Order orderDelivered(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setStatus(DeliveryStatus.DELIVERED);
            return orderRepository.save(order);
        }
        return null;
    }

    public Order orderNotDelivered(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setStatus(DeliveryStatus.NOT_DELIVERED);
            order.setDateToDeliver(order.getDateToDeliver().plusDays(1));
            return orderRepository.save(order);
        }
        return null;
    }
}

