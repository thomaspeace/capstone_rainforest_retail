package com.example.rainforest_retail_server.models;

import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
@Table(name = "regional_hubs")
public class RegionalHub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name ="region")
    private String region;

    @OneToMany(mappedBy = "regional_hub")
//    JsonIgnoreProperties??? << unsure if needed right now
    private List<Order> orders;

    @OneToMany(mappedBy = "regional_hub")
    private List<Van> vans;

    public RegionalHub(String region) {
        this.region = region;
        this.orders = new ArrayList<>();
        this.vans = new ArrayList<>();
    }

    public RegionalHub(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Van> getVans() {
        return vans;
    }

    public void setVans(List<Van> vans) {
        this.vans = vans;
    }
}
