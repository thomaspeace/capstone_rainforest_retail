package com.example.rainforest_retail_server.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "clustered_order")
public class ClusteredOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // One to Many relationship with Order
    @OneToMany(mappedBy = "clusteredOrder")
    private List<Order> listOfOrders;

    @ManyToOne
    @JoinColumn(name = "regional_hub_id")
    private RegionalHub regionalHub;

    @OneToOne
    @JoinColumn(name = "van_id")
    private Van deliveryVan;

    public ClusteredOrder(List<Order> listOfOrders, RegionalHub regionalHub, Van deliveryVan) {
        this.listOfOrders = listOfOrders;
        this.regionalHub = regionalHub;
        this.deliveryVan = deliveryVan;
    }

    public ClusteredOrder() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Order> getListOfOrders() {
        return listOfOrders;
    }

    public void setListOfOrders(List<Order> listOfOrders) {
        this.listOfOrders = listOfOrders;
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