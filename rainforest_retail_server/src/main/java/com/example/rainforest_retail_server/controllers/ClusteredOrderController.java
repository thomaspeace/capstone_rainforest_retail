package com.example.rainforest_retail_server.controllers;

import com.example.rainforest_retail_server.models.ClusteredOrder;
import com.example.rainforest_retail_server.services.ClusteredOrderService;
import com.example.rainforest_retail_server.services.RegionalHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clusters")
public class ClusteredOrderController {

    @Autowired
    ClusteredOrderService clusteredOrderService;

    @GetMapping
    public ResponseEntity<List<ClusteredOrder>> getAllClusterOrder() {
        List<ClusteredOrder> clusteredOrders = clusteredOrderService.findAllClusteredOrders();
        return new ResponseEntity<>(clusteredOrders, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<List<ClusteredOrder>> createClustersByRegionalHub(@RequestBody Long id) {
        List<ClusteredOrder> clusteredOrdersList = clusteredOrderService.createAndReturnClusteredOrders(id);
        if (clusteredOrdersList != null) {
            return new ResponseEntity<>(clusteredOrdersList, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
