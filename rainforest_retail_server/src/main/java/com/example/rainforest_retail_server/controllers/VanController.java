package com.example.rainforest_retail_server.controllers;

import com.example.rainforest_retail_server.models.Van;
import com.example.rainforest_retail_server.models.VanDTO;
import com.example.rainforest_retail_server.services.VanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vans")
public class VanController {

    @Autowired
    private VanService vanService;

    @GetMapping
    public ResponseEntity<List<Van>> getAllVans() {
        List<Van> vans = vanService.getAllVans();
        return new ResponseEntity<>(vans, HttpStatus.OK);
    }

    @GetMapping("/{id}") //  localhost:8080/vans/1
    public ResponseEntity<Van> getVanById(@PathVariable Long id) {
        Van van = vanService.getVanById(id);
        if (van != null) {
            return new ResponseEntity<>(van, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping //  localhost:8080/vans
    public ResponseEntity<Van> createVan(@RequestBody VanDTO vanDTO) {
        Van createdVan = vanService.createVan(vanDTO);
        return new ResponseEntity<>(createdVan, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Van> updateVan(@PathVariable Long id, @RequestBody Van vanDetails) {
        Van updatedVan = vanService.updateVan(id, vanDetails);
        if (updatedVan != null) {
            return new ResponseEntity<>(updatedVan, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVan(@PathVariable Long id) {
        vanService.deleteVan(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}