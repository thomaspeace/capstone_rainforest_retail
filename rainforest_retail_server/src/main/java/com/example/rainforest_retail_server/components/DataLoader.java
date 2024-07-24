package com.example.rainforest_retail_server.components;

import com.example.rainforest_retail_server.models.*;
import com.example.rainforest_retail_server.repositories.OrderRepository;
import com.example.rainforest_retail_server.repositories.RegionalHubRepository;
import com.example.rainforest_retail_server.repositories.VanRepository;
import com.example.rainforest_retail_server.services.ClusteredOrderService;
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

    @Autowired
    ClusteredOrderService clusteredOrderService;


    public void run(ApplicationArguments args) throws Exception{

        RegionalHub londonHub = new RegionalHub("London", new AddressModel("24 Haverstock Hill", 51.545344674848295, -0.15391076496468353, "NW3 2BQ"));
        regionalHubRepository.save(londonHub);
        RegionalHub midlandsHub = new RegionalHub("Midlands", new AddressModel("1-2 Eckersall Rd", 52.41218359592306, -1.9419774612810101, "B38 8SS"));
        regionalHubRepository.save(midlandsHub);

        Van vanLondon1 = new Van(londonHub);
        Van vanLondon2 = new Van(londonHub);
        Van vanLondon3 = new Van(londonHub);
        Van vanLondon4 = new Van(londonHub);
        vanRepository.save(vanLondon1);
        vanRepository.save(vanLondon2);
        vanRepository.save(vanLondon3);
        vanRepository.save(vanLondon4);
        Van vanWestMidlands1 = new Van(midlandsHub);
        Van vanWestMidlands2 = new Van(midlandsHub);
        Van vanWestMidlands3 = new Van(midlandsHub);
        vanRepository.save(vanWestMidlands1);
        vanRepository.save(vanWestMidlands2);
        vanRepository.save(vanWestMidlands3);

        Order order1 = new Order(LocalDate.now(), new AddressModel("86A Chesterton Rd", 51.51951728901795, -0.21472394218691596, "W10 6EP"), londonHub);
        Order order2 = new Order(LocalDate.now(), new AddressModel("11-13 Penywern Rd", 51.490776221205515, -0.1929948386534358, "SW5 9TT"), londonHub);
        Order order3 = new Order(LocalDate.now(), new AddressModel("94-148 Bravington Rd", 51.530631065786665, -0.20492147365662977, "W9 3AP"), londonHub);
        Order order4 = new Order(LocalDate.now(), new AddressModel("32-2 Howard Rd", 51.51951728901795, -0.21472394218691596, "NW2 6DS"), londonHub);
        Order order5 = new Order(LocalDate.now(), new AddressModel("39A Galley Ln", 51.65461791573096, -0.22351845050164476, "EN5 4AR"), londonHub);
        Order order6 = new Order(LocalDate.now(), new AddressModel("57A Herne Hill", 51.457286229910686, -0.09558709440302694, "SE24 9NE"), londonHub);
        Order order7 = new Order(LocalDate.now(), new AddressModel("21 Wilson Rd", 51.47169537344103, -0.08521040906683797, "SE5 8PB"), londonHub);
        Order order8 = new Order(LocalDate.now(), new AddressModel("29 Woodstock Terrace", 51.50942818230739, -0.015406915618189784, "E14 0AD"), londonHub);
        Order order9 = new Order(LocalDate.now(), new AddressModel("19 Rutland Rd", 51.457286229910686, -0.09558709440302694, "IG1 1EN"), londonHub);
        Order order10 = new Order(LocalDate.now(), new AddressModel("211 Uxbridge Rd", 51.50638861496406, -0.24025752906933492, "W12 9DH"), londonHub);
        Order order11 = new Order(LocalDate.now(), new AddressModel("30 St Dionis Rd", 51.4736836244389, -0.20206717862493706, "SW6 4TT"), londonHub);
        Order order12 = new Order(LocalDate.now(), new AddressModel("59 Walnut Tree Walk", 51.49425333965464, -0.1125830448477041, "SE11 6DN"), londonHub);
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

        Order order13 = new Order(LocalDate.now(), new AddressModel("78 Pershore St", 52.47445440491003, -1.8945948927317637, "B5 4RW"), midlandsHub);
        Order order14 = new Order(LocalDate.now(), new AddressModel("140 Bath Row", 52.472383658186914, -1.911924893853801, "B15 1NQ"), midlandsHub);
        Order order15 = new Order(LocalDate.now(), new AddressModel("21 Hales St", 52.41034666804482, -1.509454451011393, "CV1 1JB"), midlandsHub);
        Order order16 = new Order(LocalDate.now(), new AddressModel("2 Gas St", 52.410007504497806, -1.5152805810744476, "CV1 4FG"), midlandsHub);
        Order order17 = new Order(LocalDate.now(), new AddressModel("21 Chilworth Cl", 52.5033424060608, -1.4504101740753226, "CV11 4XE"), midlandsHub);
        Order order18 = new Order(LocalDate.now(), new AddressModel("24 Olphin St", 52.6468477855405, -1.1260463611820537, "LE4 5HE"), midlandsHub);
        Order order19 = new Order(LocalDate.now(), new AddressModel("116 Dronfield St", 52.63113501665865, -1.1070089212126306, "LE5 5AT"), midlandsHub);
        Order order20 = new Order(LocalDate.now(), new AddressModel("5 Gaddesby Ave", 52.62249630733434, -1.1571443532638732, "LE3 1BN"), midlandsHub);
        orderRepository.save(order13);
        orderRepository.save(order14);
        orderRepository.save(order15);
        orderRepository.save(order16);
        orderRepository.save(order17);
        orderRepository.save(order18);
        orderRepository.save(order19);
        orderRepository.save(order20);

        // orders for not the current day
        Order order21 = new Order(LocalDate.now().plusDays(1), new AddressModel("262 Richmond Rd", 51.543329501163036, -0.05852695234618034, "E8 3NJ"), londonHub);
        Order order22 = new Order(LocalDate.now().plusDays(1), new AddressModel("179 Southgate Rd", 51.54463582158759, -0.08404533706362474, "N1 3LE"), londonHub);
        Order order23 = new Order(LocalDate.now().plusDays(1), new AddressModel("25B Warlock Rd", 51.52680474834105, -0.19955242986597643, "W9 3LP"), londonHub);
        Order order24 = new Order(LocalDate.now().plusDays(1), new AddressModel("69 Southfield Rd", 51.50252357756288, -0.2595729794297187, "W4 1BB"), londonHub);
        Order order25 = new Order(LocalDate.now().plusDays(1), new AddressModel("75 Salcott Rd", 51.45790428004103, -0.16509269527915077, "SW11 6DF"), londonHub);
        Order order26 = new Order(LocalDate.now().plusDays(1), new AddressModel("70 Wood's Rd", 51.47257867218878, -0.06022241416608214, "SE15 2SW"), londonHub);
        Order order27 = new Order(LocalDate.now().plusDays(1), new AddressModel("52 Conway Rd", 51.4868247952765, 0.08752965442365357, "SE18 1AR"), londonHub);
        Order order28 = new Order(LocalDate.now().plusDays(1), new AddressModel("92 Maple Rd", 51.413419893970676, -0.05636359139830776, "SE20 8HG"), londonHub);
        Order order29 = new Order(LocalDate.now().plusDays(1), new AddressModel("48 Churchill Rd", 51.51255927116803, 0.035315400430217914, "E16 3DX"), londonHub);
        orderRepository.save(order21);
        orderRepository.save(order22);
        orderRepository.save(order23);
        orderRepository.save(order24);
        orderRepository.save(order25);
        orderRepository.save(order26);
        orderRepository.save(order27);
        orderRepository.save(order28);
        orderRepository.save(order29);

    }
}
