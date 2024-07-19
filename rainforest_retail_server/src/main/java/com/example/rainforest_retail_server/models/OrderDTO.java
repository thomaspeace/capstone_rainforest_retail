package com.example.rainforest_retail_server.models;

import com.example.rainforest_retail_server.models.enums.DeliveryStatus;

import java.time.LocalDate;

public class OrderDTO {

    private LocalDate dateToDeliver;
    private long regionalHubId;
    private DeliveryStatus deliveryStatus;
    private long clusterId;

    /*
    * DELIVERY ADDRESS SECTION
    */
    private AddressModel deliveryAddress;

    public OrderDTO(LocalDate dateToDeliver, long regionalHubId, DeliveryStatus deliveryStatus, long clusterId, AddressModel deliveryAddress) {
        this.dateToDeliver = dateToDeliver;
        this.regionalHubId = regionalHubId;
        this.deliveryStatus = deliveryStatus;
        this.clusterId = clusterId;
        this.deliveryAddress = deliveryAddress;

    }

    public OrderDTO() {
    }

    public LocalDate getDateToDeliver() {
        return dateToDeliver;
    }

    public void setDateToDeliver(LocalDate dateToDeliver) {
        this.dateToDeliver = dateToDeliver;
    }

    public long getRegionalHubId() {
        return regionalHubId;
    }

    public void setRegionalHubId(long regionalHubId) {
        this.regionalHubId = regionalHubId;
    }

    public DeliveryStatus getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(DeliveryStatus deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }

    public long getClusterId() {
        return clusterId;
    }

    public void setClusterId(long clusterId) {
        this.clusterId = clusterId;
    }

    public AddressModel getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(AddressModel deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
}
