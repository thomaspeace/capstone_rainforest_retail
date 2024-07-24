package com.example.rainforest_retail_server.controllers;

import com.example.rainforest_retail_server.models.Order;
import com.example.rainforest_retail_server.models.OrderDTO;
import com.example.rainforest_retail_server.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping // localhost:8080/orders
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{id}") // localhost:8080/orders
    public ResponseEntity<Optional<Order>> getOrderById(@PathVariable Long id) {
        Optional<Order> order = Optional.ofNullable(orderService.getOrderById(id));
        if (order.isPresent()) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping // localhost:8080/orders
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO orderDTO) {
        Order savedOrder = orderService.createOrder(orderDTO);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Optional<Order>> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        Optional<Order> updatedOrder = Optional.ofNullable(orderService.updateOrder(id, orderDetails));
        if (updatedOrder.isPresent()) {
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/{id}")  // localhost:8080/orders/1
    public ResponseEntity<Optional<Order>> updateOrderPartial(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        Optional<Order> updatedOrder = Optional.ofNullable(orderService.partialUpdateOrder(id, orderDTO));
        if (updatedOrder.isPresent()) {
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}") // localhost:8080/orders/1
    public ResponseEntity<Optional<Void>> deleteOrder(@PathVariable Long id) {
        Optional<Order> order = Optional.ofNullable(orderService.getOrderById(id));
        if (order.isPresent()) {
            orderService.deleteOrder(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/delivered/{id}")
    public ResponseEntity<Optional<Order>> orderDelivered(@PathVariable Long id) {
        Optional<Order> order = Optional.ofNullable(orderService.orderDelivered(id));
        if (order.isPresent()) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/not-delivered/{id}")
    public ResponseEntity<Optional<Order>> orderNotDelivered(@PathVariable Long id) {
        Optional<Order> order = Optional.ofNullable(orderService.orderNotDelivered(id));
        if (order.isPresent()) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
