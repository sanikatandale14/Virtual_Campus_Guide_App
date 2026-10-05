package com.example.campusguide.service

import com.example.campusguide.entity.Event
import com.example.campusguide.repository.EventRepository
import org.springframework.stereotype.Service

@Service
class EventService(private val eventRepository: EventRepository) {

    fun getAllEvents(): List<Event> = eventRepository.findAll()

    fun getEventById(id: Long): Event? = eventRepository.findById(id).orElse(null)

    fun createEvent(event: Event): Event = eventRepository.save(event)

    fun updateEvent(id: Long, updated: Event): Event? {
        val existing = eventRepository.findById(id).orElse(null) ?: return null
        existing.name = updated.name
        existing.description = updated.description
        existing.date = updated.date
        existing.time = updated.time
        existing.venue = updated.venue
        return eventRepository.save(existing)
    }

    fun deleteEvent(id: Long): Boolean {
        if (!eventRepository.existsById(id)) return false
        eventRepository.deleteById(id)
        return true
    }
}
