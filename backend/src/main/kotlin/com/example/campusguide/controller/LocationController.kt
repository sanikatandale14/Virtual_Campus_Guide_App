package com.example.campusguide.controller

import com.example.campusguide.entity.Location
import com.example.campusguide.service.AuthService
import com.example.campusguide.service.LocationService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = ["*"])
class LocationController(
    private val locationService: LocationService,
    private val authService: AuthService
) {

    @GetMapping
    fun getAllLocations(@RequestParam(required = false) name: String?): List<Location> {
        return if (name.isNullOrBlank()) locationService.getAllLocations()
        else locationService.searchLocations(name)
    }

    @GetMapping("/{id}")
    fun getLocationById(@PathVariable id: Long): ResponseEntity<Location> {
        val location = locationService.getLocationById(id)
        return if (location != null) ResponseEntity.ok(location)
        else ResponseEntity.notFound().build()
    }

    @PostMapping
    fun createLocation(@RequestBody location: Location,
                       @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Location> {
        authService.requireAdmin(auth)
        return ResponseEntity.status(HttpStatus.CREATED).body(locationService.createLocation(location))
    }

    @PutMapping("/{id}")
    fun updateLocation(@PathVariable id: Long, @RequestBody location: Location,
                       @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Location> {
        authService.requireAdmin(auth)
        val updated = locationService.updateLocation(id, location)
        return if (updated != null) ResponseEntity.ok(updated)
        else ResponseEntity.notFound().build()
    }

    @DeleteMapping("/{id}")
    fun deleteLocation(@PathVariable id: Long,
                       @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Void> {
        authService.requireAdmin(auth)
        return if (locationService.deleteLocation(id)) ResponseEntity.noContent().build()
        else ResponseEntity.notFound().build()
    }
}
