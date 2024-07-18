package com.example.rainforest_retail_server.models;

import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "date_to_deliver")
    private LocalDate dateToDeliver;

    @Column(name = "delivery_address")
    private DeliveryAddress deliveryAddress;

    @ManyToOne
    @JoinColumn(name = "regional_hub_id")
    // may need json ignore properties
    private RegionalHub regionalHub;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

    private Order(LocalDate dateToDeliver, DeliveryAddress deliveryAddress, RegionalHub regionalHub, Status status){
        this.dateToDeliver = dateToDeliver;
        this.deliveryAddress = deliveryAddress;
        this.regionalHub = regionalHub;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getDateToDeliver() {
        return dateToDeliver;
    }

    public void setDateToDeliver(LocalDate dateToDeliver) {
        this.dateToDeliver = dateToDeliver;
    }

    public DeliveryAddress getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(DeliveryAddress deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public RegionalHub getRegionalHub() {
        return regionalHub;
    }

    public void setRegionalHub(RegionalHub regionalHub) {
        this.regionalHub = regionalHub;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
