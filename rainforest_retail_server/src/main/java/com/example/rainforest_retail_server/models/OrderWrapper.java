package com.example.rainforest_retail_server.models;

import org.apache.commons.math3.ml.clustering.Clusterable;

public class OrderWrapper implements Clusterable {

    private double[] point;
    private Order order;

    public OrderWrapper(Order order){
        this.order = order;
        this.point = new double[]{order.getDeliveryAddress().getLatitude(), order.getDeliveryAddress().getLongitude()};
    }

    @Override
    public double[] getPoint() {
        return point;
    }

    public Order getOrder() {
        return this.order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

}
