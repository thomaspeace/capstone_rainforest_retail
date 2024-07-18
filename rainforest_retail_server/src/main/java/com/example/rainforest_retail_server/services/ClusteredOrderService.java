package com.example.rainforest_retail_server.services;

import com.example.rainforest_retail_server.models.ClusteredOrder;
import com.example.rainforest_retail_server.models.Order;
import com.example.rainforest_retail_server.models.OrderWrapper;
import com.example.rainforest_retail_server.models.Van;
import com.example.rainforest_retail_server.models.enums.DeliveryStatus;
import com.example.rainforest_retail_server.repositories.ClusteredOrderRepository;
import com.example.rainforest_retail_server.repositories.OrderRepository;
import com.example.rainforest_retail_server.repositories.VanRepository;
import jakarta.transaction.Transactional;
import org.apache.commons.math3.ml.clustering.CentroidCluster;
import org.apache.commons.math3.ml.clustering.KMeansPlusPlusClusterer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<ClusteredOrder> findAllClusteredOrders() {
        return clusteredOrderRepository.findAll();
    }

    // we would need to change 1
    @Transactional
    public void createCluster(){
        List<Order> listOfOrders = new ArrayList<>(orderRepository.findByRegionalHubIdEqualsAndDeliveryStatusEquals(1, DeliveryStatus.NOT_DELIVERED));

        List<OrderWrapper> clusterInput = new ArrayList<>(listOfOrders.size());
        for (Order order : listOfOrders) {
            clusterInput.add(new OrderWrapper(order));
        }

        List<Van> listOfVans = new ArrayList<>(vanRepository.findByRegionalHubIdEquals(1));

        KMeansPlusPlusClusterer<OrderWrapper> clusterer = new KMeansPlusPlusClusterer<>(listOfVans.size(), 10000);
        List<CentroidCluster<OrderWrapper>> clusterResults = clusterer.cluster(clusterInput);

        for (int i = 0; i < clusterResults.size(); i++) {
            Van vanForCluster = listOfVans.get(i);
            List<Order> clusterOfOrders= new ArrayList<>();
            for (OrderWrapper orderWrapper : clusterResults.get(i).getPoints()) {
                Order orderForCluster = orderWrapper.getOrder();
                clusterOfOrders.add(orderForCluster);
            }
            ClusteredOrder clusteredOrder = new ClusteredOrder(clusterOfOrders, null, vanForCluster);
            clusteredOrderRepository.save(clusteredOrder);
        }
    }
}
