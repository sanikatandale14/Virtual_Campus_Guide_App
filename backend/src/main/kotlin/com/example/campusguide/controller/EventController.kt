package com.example.campusguide.controller

import com.example.campusguide.entity.Event
import com.example.campusguide.service.AuthService
import com.example.campusguide.service.EventService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = ["*"])
class EventController(
    private val eventService: EventService,
    private val authService: AuthService
) {

    @GetMapping
    fun getAllEvents(): List<Event> = eventService.getAllEvents()

    @GetMapping("/{id}")
    fun getEventById(@PathVariable id: Long): ResponseEntity<Event> {
        val event = eventService.getEventById(id)
        return if (event != null) ResponseEntity.ok(event)
        else ResponseEntity.notFound().build()
    }

    @PostMapping
    fun createEvent(@RequestBody event: Event,
                    @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Event> {
        authService.requireAdmin(auth)
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(event))
    }

    @PutMapping("/{id}")
    fun updateEvent(@PathVariable id: Long, @RequestBody event: Event,
                    @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Event> {
        authService.requireAdmin(auth)
        val updated = eventService.updateEvent(id, event)
        return if (updated != null) ResponseEntity.ok(updated)
        else ResponseEntity.notFound().build()
    }

    @DeleteMapping("/{id}")
    fun deleteEvent(@PathVariable id: Long,
                    @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Void> {
        authService.requireAdmin(auth)
        return if (eventService.deleteEvent(id)) ResponseEntity.noContent().build()
        else ResponseEntity.notFound().build()
    }
}
