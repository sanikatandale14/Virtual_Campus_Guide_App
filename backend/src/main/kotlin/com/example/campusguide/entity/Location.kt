package com.example.campusguide.entity

import jakarta.persistence.*

@Entity
@Table(name = "locations")
class Location(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var name: String = "",
    var category: String = "",
    var description: String = "",
    var building: String = "",
    var floor: String = "",
    var openingHours: String = "",
    var contact: String = "",
    var latitude: Double = 0.0,
    var longitude: Double = 0.0
)
