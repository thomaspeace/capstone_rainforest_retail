package com.example.rainforest_retail_server.models;



public class VanDTO {

    private Long regionalHubId;
    private Long clusteredOrderId;

    public VanDTO() {
    }

    public VanDTO(Long regionalHubId, Long clusteredOrderId) {
        this.regionalHubId = regionalHubId;
        this.clusteredOrderId = clusteredOrderId;
    }

    // Getters and setters

    public Long getRegionalHubId() {
        return regionalHubId;
    }

    public void setRegionalHubId(Long regionalHubId) {
        this.regionalHubId = regionalHubId;
    }

    public Long getClusteredOrderId() {
        return clusteredOrderId;
    }

    public void setClusteredOrderId(Long clusteredOrderId) {
        this.clusteredOrderId = clusteredOrderId;
    }
}