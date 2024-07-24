package com.example.rainforest_retail_server.services;

import com.example.rainforest_retail_server.models.*;
import com.example.rainforest_retail_server.models.enums.DeliveryStatus;
import com.example.rainforest_retail_server.repositories.ClusteredOrderRepository;
import com.example.rainforest_retail_server.repositories.OrderRepository;
import com.example.rainforest_retail_server.repositories.RegionalHubRepository;
import com.example.rainforest_retail_server.repositories.VanRepository;
import jakarta.transaction.Transactional;
import org.apache.commons.math3.ml.clustering.CentroidCluster;
import org.apache.commons.math3.ml.clustering.KMeansPlusPlusClusterer;
import org.apache.commons.math3.random.JDKRandomGenerator;
import org.apache.commons.math3.random.RandomGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClusteredOrderService {

    @Autowired
    private ClusteredOrderRepository clusteredOrderRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private VanRepository vanRepository;

    @Autowired
    private RegionalHubRepository regionalHubRepository;

    public List<ClusteredOrder> findAllClusteredOrders() {
        return clusteredOrderRepository.findAll();
    }

    @Transactional
    public void createCluster(long regionalHubId) {
        // Fetch orders that are not delivered for the given regional hub
        List<Order> listOfOrders = new ArrayList<>(orderRepository.findByRegionalHubIdEqualsAndDeliveryStatusEqualsAndDateToDeliverEquals(regionalHubId, DeliveryStatus.NOT_DELIVERED, LocalDate.now()));

        // Wrap orders for clustering
        List<OrderWrapper> clusterInput = new ArrayList<>(listOfOrders.size());
        for (Order order : listOfOrders) {
            clusterInput.add(new OrderWrapper(order));
        }

        // Fetch vans for the regional hub
        List<Van> listOfVans = new ArrayList<>(vanRepository.findByRegionalHubIdEquals(regionalHubId));

        // Create a random generator with a fixed seed
        RandomGenerator random = new JDKRandomGenerator();
        random.setSeed(42); // You can choose any integer as the seed

        // Create the clusterer with the fixed random generator
        KMeansPlusPlusClusterer<OrderWrapper> clusterer = new KMeansPlusPlusClusterer<>(
                listOfVans.size(),
                10000,
                new org.apache.commons.math3.ml.distance.EuclideanDistance(),
                random
        );

        // Perform clustering
        List<CentroidCluster<OrderWrapper>> clusterResults = clusterer.cluster(clusterInput);

        // Process clustering results
        for (int i = 0; i < clusterResults.size(); i++) {
            Van vanForCluster = listOfVans.get(i);
            List<Order> clusterOfOrders = new ArrayList<>();

            for (OrderWrapper orderWrapper : clusterResults.get(i).getPoints()) {
                Order orderForCluster = orderWrapper.getOrder();
                clusterOfOrders.add(orderForCluster);
            }

            // Create and save clustered order
            ClusteredOrder clusteredOrder = new ClusteredOrder(clusterOfOrders, vanForCluster.getRegionalHub(), vanForCluster);
            clusteredOrderRepository.save(clusteredOrder);

            // Update orders with new clustered order
            for (Order order : clusterOfOrders) {
                order.setCluster(clusteredOrder);
                order.setStatus(DeliveryStatus.OUT_FOR_DELIVERY);
                orderRepository.save(order);
            }

            // Update van with new clustered order
            vanForCluster.setClusteredOrder(clusteredOrder);
            vanRepository.save(vanForCluster);
        }
    }

    public void removeClusteredOrdersByRegionalHubId(long regionalHubId) {

        List<ClusteredOrder> clusteredOrderList = new ArrayList<>(clusteredOrderRepository.findByRegionalHubIdEquals(regionalHubId));

        for(ClusteredOrder clusteredOrder : clusteredOrderList) {
            List<Order> orderList = clusteredOrder.getListOfOrders();
            for(Order order : orderList) {
                order.removeCluster();
                orderRepository.save(order);
            }
            clusteredOrderRepository.deleteById(clusteredOrder.getId());
        }
    }

    public List<ClusteredOrder> createAndReturnClusteredOrders(long regionalHubId) {

        if(!regionalHubRepository.findById(regionalHubId).isPresent()){
            return null;
        }
        removeClusteredOrdersByRegionalHubId(regionalHubId);
        createCluster(regionalHubId);
        return new ArrayList<>(clusteredOrderRepository.findByRegionalHubIdEquals(regionalHubId));
    }
}