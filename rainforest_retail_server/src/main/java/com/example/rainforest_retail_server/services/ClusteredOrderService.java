//package com.example.rainforest_retail_server.services;
//
//import com.example.rainforest_retail_server.models.Order;
//import com.example.rainforest_retail_server.models.OrderWrapper;
//import com.example.rainforest_retail_server.repositories.ClusteredOrderRepository;
//import org.apache.commons.math3.ml.clustering.CentroidCluster;
//import org.apache.commons.math3.ml.clustering.KMeansPlusPlusClusterer;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class ClusteredOrderService {
//
//    @Autowired
//    private ClusteredOrderRepository clusteredOrderRepository;
//
//    // we would need to get a list of orders called orderList
//
//
//    List<OrderWrapper> clusterInput = new ArrayList<>(orderList.size());
//        for (Order order : orderList) {
//        clusterInput.add(new OrderWrapper(order));
//    }
//
//    KMeansPlusPlusClusterer<OrderWrapper> clusterer = new KMeansPlusPlusClusterer<>(3, 10000);
//    List<CentroidCluster<OrderWrapper>> clusterResults = clusterer.cluster(clusterInput);
//
//
//}
