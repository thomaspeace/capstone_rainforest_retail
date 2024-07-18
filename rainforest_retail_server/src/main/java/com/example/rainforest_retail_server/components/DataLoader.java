package com.example.rainforest_retail_server.components;

import com.example.rainforest_retail_server.models.*;
import com.example.rainforest_retail_server.repositories.OrderRepository;
import com.example.rainforest_retail_server.repositories.RegionalHubRepository;
import com.example.rainforest_retail_server.repositories.VanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    VanRepository vanRepository;

    @Autowired
    RegionalHubRepository regionalHubRepository;


    public void run(ApplicationArguments args) throws Exception{

        RegionalHub londonHub = new RegionalHub("London");
        regionalHubRepository.save(londonHub);

        Van vanLondon1 = new Van(londonHub);
        Van vanLondon2 = new Van(londonHub);
        Van vanLondon3 = new Van(londonHub);
        vanRepository.save(vanLondon1);
        vanRepository.save(vanLondon2);
        vanRepository.save(vanLondon3);

        Order order1 = new Order(LocalDate.now(), new DeliveryAddress("86A Chesterton Rd", 51.51951728901795, -0.21472394218691596, "W10 6EP"), londonHub);
        Order order2 = new Order(LocalDate.now(), new DeliveryAddress("11-13 Penywern Rd", 51.490776221205515, -0.1929948386534358, "SW5 9TT"), londonHub);
        Order order3 = new Order(LocalDate.now(), new DeliveryAddress("94-148 Bravington Rd", 51.530631065786665, -0.20492147365662977, "W9 3AP"), londonHub);
        Order order4 = new Order(LocalDate.now(), new DeliveryAddress("32-2 Howard Rd", 51.51951728901795, -0.21472394218691596, "NW2 6DS"), londonHub);
        Order order5 = new Order(LocalDate.now(), new DeliveryAddress("39A Galley Ln", 51.65461791573096, -0.22351845050164476, "EN5 4AR"), londonHub);
        Order order6 = new Order(LocalDate.now(), new DeliveryAddress("57A Herne Hill", 51.457286229910686, -0.09558709440302694, "SE24 9NE"), londonHub);
        Order order7 = new Order(LocalDate.now(), new DeliveryAddress("21 Wilson Rd", 51.47169537344103, -0.08521040906683797, "SE5 8PB"), londonHub);
        Order order8 = new Order(LocalDate.now(), new DeliveryAddress("29 Woodstock Terrace", 51.50942818230739, -0.015406915618189784, "E14 0AD"), londonHub);
        Order order9 = new Order(LocalDate.now(), new DeliveryAddress("19 Rutland Rd", 51.457286229910686, -0.09558709440302694, "IG1 1EN"), londonHub);
        Order order10 = new Order(LocalDate.now(), new DeliveryAddress("211 Uxbridge Rd", 51.50638861496406, -0.24025752906933492, "W12 9DH"), londonHub);
        Order order11 = new Order(LocalDate.now(), new DeliveryAddress("30 St Dionis Rd", 51.4736836244389, -0.20206717862493706, "SW6 4TT"), londonHub);
        Order order12 = new Order(LocalDate.now(), new DeliveryAddress("59 Walnut Tree Walk", 51.49425333965464, -0.1125830448477041, "SE11 6DN"), londonHub);
        orderRepository.save(order1);
        orderRepository.save(order2);
        orderRepository.save(order3);
        orderRepository.save(order4);
        orderRepository.save(order5);
        orderRepository.save(order6);
        orderRepository.save(order7);
        orderRepository.save(order8);
        orderRepository.save(order9);
        orderRepository.save(order10);
        orderRepository.save(order11);
        orderRepository.save(order12);



    }
}
