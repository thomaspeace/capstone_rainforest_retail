package com.example.rainforest_retail_server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "regional_hubs")
public class RegionalHub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="hub_address")
    private AddressModel addressModel;

    @Column(name ="region")
    private String region;

    @OneToMany(mappedBy = "regionalHub")
    @JsonIgnoreProperties({"regionalHub"})
    private List<Order> orders;

    @OneToMany(mappedBy = "regionalHub")
    @JsonIgnoreProperties({"regionalHub"})
    private List<Van> vans;

    public RegionalHub(String region, AddressModel addressModel) {
        this.region = region;
        this.orders = new ArrayList<>();
        this.vans = new ArrayList<>();
        this.addressModel = addressModel;
    }

    public RegionalHub() {
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

    public AddressModel getAddressModel() {
        return addressModel;
    }

    public void setAddressModel(AddressModel addressModel) {
        this.addressModel = addressModel;
    }
}
