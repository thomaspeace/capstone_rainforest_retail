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
    private String addressLine;
    private double latitude;
    private double longitude;
    private String postCode;

    public OrderDTO(LocalDate dateToDeliver,
                    long regionalHubId,
                    DeliveryStatus deliveryStatus,
                    long clusterId,
                    String addressLine,
                    double latitude,
                    double longitude,
                    String postCode) {
        this.dateToDeliver = dateToDeliver;
        this.regionalHubId = regionalHubId;
        this.deliveryStatus = deliveryStatus;
        this.clusterId = clusterId;
        this.addressLine = addressLine;
        this.latitude = latitude;
        this.longitude = longitude;
        this.postCode = postCode;
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

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }
}
