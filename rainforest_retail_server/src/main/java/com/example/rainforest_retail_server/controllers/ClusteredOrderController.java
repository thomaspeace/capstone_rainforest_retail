package com.example.rainforest_retail_server.controllers;

import com.example.rainforest_retail_server.models.ClusteredOrder;
import com.example.rainforest_retail_server.services.ClusteredOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("clusters")
public class ClusteredOrderController {

    @Autowired
    ClusteredOrderService clusteredOrderService;

    @GetMapping
    public ResponseEntity<List<ClusteredOrder>> getAllClusterOrder() {
        List<ClusteredOrder> clusteredOrders = clusteredOrderService.findAllClusteredOrders();
        return new ResponseEntity<>(clusteredOrders, HttpStatus.OK);
    }
}
