package com.example.rainforest_retail_server.models;

import jakarta.persistence.Embeddable;

@Embeddable
public class AddressModel {

    private String line;
    private double latitude;
    private double longitude;
    private String postcode;

    public AddressModel(String line, double latitude, double longitude, String postcode) {
        this.line = line;
        this.latitude = latitude;
        this.longitude = longitude;
        this.postcode = postcode;
    }

    public AddressModel() {
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
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

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }
}
