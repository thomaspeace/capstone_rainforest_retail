package com.example.rainforest_retail_server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;


@Entity
@Table(name = "vans")
public class Van {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "regional_hub_id")
    @JsonIgnoreProperties({"vans","orders"})
    private RegionalHub regionalHub;

    @OneToOne
    @JsonIgnoreProperties({"regionalHub"})
    private ClusteredOrder clusteredOrder;

    public Van(RegionalHub regionalHub) {
        this.regionalHub = regionalHub;
    }

    public Van() {
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

    public ClusteredOrder getClusteredOrder() {
        return clusteredOrder;
    }

    public void setClusteredOrder(ClusteredOrder clusteredOrder) {
        this.clusteredOrder = clusteredOrder;
    }
}