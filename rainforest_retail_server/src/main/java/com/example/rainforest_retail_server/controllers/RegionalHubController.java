package com.example.rainforest_retail_server.controllers;

import com.example.rainforest_retail_server.models.RegionalHub;
import com.example.rainforest_retail_server.services.RegionalHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/regional-hubs")
public class RegionalHubController {

    @Autowired
    private RegionalHubService regionalHubService;

    @GetMapping // localhost:8080/regional-hubs
    public ResponseEntity<List<RegionalHub>> getAllRegionalHubs() {
        List<RegionalHub> regionalHubs = regionalHubService.getAllRegionalHubs();
        return new ResponseEntity<>(regionalHubs, HttpStatus.OK);
    }

    @GetMapping("/{id}") // localhost:8080/regional-hubs/1
    public ResponseEntity<Optional<RegionalHub>> getRegionalHubById(@PathVariable Long id) {
        Optional<RegionalHub> regionalHub = Optional.ofNullable(regionalHubService.getRegionalHubById(id));
        if (regionalHub.isPresent()) {
            return new ResponseEntity<>(regionalHub, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping // localhost:8080/regional-hubs
    public ResponseEntity<RegionalHub> createRegionalHub(@RequestBody RegionalHub regionalHub) {
        RegionalHub savedRegionalHub = regionalHubService.createRegionalHub(regionalHub);
        return new ResponseEntity<>(savedRegionalHub, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}") // localhost:8080/regional-hubs/1
    public ResponseEntity<Optional<RegionalHub>> updateRegionalHub(@PathVariable Long id, @RequestBody RegionalHub regionalHubDetails) {
        Optional<RegionalHub> updatedRegionalHub = Optional.ofNullable(regionalHubService.updateRegionalHub(id, regionalHubDetails));
        if (updatedRegionalHub.isPresent()) {
            return new ResponseEntity<>(updatedRegionalHub, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}") // localhost:8080/regional-hubs/1
    public ResponseEntity<Optional<Void>> deleteRegionalHub(@PathVariable Long id) {
        Optional<RegionalHub> regionalHub = Optional.ofNullable(regionalHubService.getRegionalHubById(id));
        if (regionalHub.isPresent()) {
            regionalHubService.deleteRegionalHub(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}