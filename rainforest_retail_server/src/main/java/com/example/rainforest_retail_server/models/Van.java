package com.example.rainforest_retail_server.models;

import jakarta.persistence.*;


@Entity
@Table(name = "vans")
public class Van {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "regional_hub_id")
    private RegionalHub regionalHub;

    @OneToOne
    private ClusteredOrders clusteredOrders;

    public Van(RegionalHub regionalHub) {
        this.regionalHub = regionalHub;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RegionalHub getRegionalHub() {
        return regionalHub;
    }

    public void setRegionalHub(RegionalHub regionalHub) {
        this.regionalHub = regionalHub;
    }
}