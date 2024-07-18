package com.example.rainforest_retail_server.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "clustered_orders")
public class ClusteredOrders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    // One to Many relationship with Order
    @OneToMany
    @JoinColumn(name = "order_id")
    private List<Orders> ClusteredOrders;

    @ManyToOne
    @JoinColumn(name = "regionalhub_id")
    private RegtionalHub regionalHub;

    @OneToOne
    @JoinColumn(name = "van_id")
    private Van deliveryVan;

    public ClusteredOrders(List<Orders> clusteredOrders, RegtionalHub regionalHub, Van deliveryVan) {
        ClusteredOrders = clusteredOrders;
        this.regionalHub = regionalHub;
        this.deliveryVan = deliveryVan;
    }

    public ClusteredOrders() {
    }

    public List<Orders> getClusteredOrders() {
        return ClusteredOrders;
    }

    public void setClusteredOrders(List<Orders> clusteredOrders) {
        ClusteredOrders = clusteredOrders;
    }

    public RegtionalHub getRegionalHub() {
        return regionalHub;
    }

    public void setRegionalHub(RegtionalHub regionalHub) {
        this.regionalHub = regionalHub;
    }

    public Van getDeliveryVan() {
        return deliveryVan;
    }

    public void setDeliveryVan(Van deliveryVan) {
        this.deliveryVan = deliveryVan;
    }
}