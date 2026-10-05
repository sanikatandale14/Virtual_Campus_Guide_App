package com.example.campusguide.repository

import com.example.campusguide.entity.Event
import org.springframework.data.jpa.repository.JpaRepository

interface EventRepository : JpaRepository<Event, Long>
