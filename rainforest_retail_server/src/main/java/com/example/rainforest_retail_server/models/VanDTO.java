package com.example.rainforest_retail_server.models;

public class VanDTO {

    private long regionalHubId;
    private long clusterId;

    public VanDTO(long regionalHubId){
        this.regionalHubId = regionalHubId;
    }

    public VanDTO() {
    }

    public long getRegionalHubId() {
        return regionalHubId;
    }

    public void setRegionalHubId(long regionalHubId) {
        this.regionalHubId = regionalHubId;
    }

    public long getClusterId() {
        return clusterId;
    }

    public void setClusterId(long clusterId) {
        this.clusterId = clusterId;
    }
}
