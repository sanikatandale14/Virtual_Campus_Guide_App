package com.example.campusguide.entity

import jakarta.persistence.*

@Entity
@Table(name = "events")
class Event(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var name: String = "",
    var description: String = "",
    var date: String = "",
    var time: String = "",
    var venue: String = ""
)
