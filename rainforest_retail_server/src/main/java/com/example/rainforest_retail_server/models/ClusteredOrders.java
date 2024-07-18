package com.example.rainforest_retail_server.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "clustered_orders")
public class ClusteredOrders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // One to Many relationship with Order
    @OneToMany
    @JoinColumn(name = "order_id")
    private List<Order> clusteredOrders;

    @ManyToOne
    @JoinColumn(name = "regional_hub")
    private RegionalHub regionalHub;

    @OneToOne
    @JoinColumn(name = "van_id")
    private Van deliveryVan;

    public ClusteredOrders(List<Order> clusteredOrders, RegionalHub regionalHub, Van deliveryVan) {
        this.clusteredOrders = clusteredOrders;
        this.regionalHub = regionalHub;
        this.deliveryVan = deliveryVan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Order> getClusteredOrders() {
        return clusteredOrders;
    }

    public void setClusteredOrders(List<Order> clusteredOrders) {
        this.clusteredOrders = clusteredOrders;
    }

    public RegionalHub getRegionalHub() {
        return regionalHub;
    }

    public void setRegionalHub(RegionalHub regionalHub) {
        this.regionalHub = regionalHub;
    }

    public Van getDeliveryVan() {
        return deliveryVan;
    }

    public void setDeliveryVan(Van deliveryVan) {
        this.deliveryVan = deliveryVan;
    }
}