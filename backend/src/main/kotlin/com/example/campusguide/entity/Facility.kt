package com.example.campusguide.entity

import jakarta.persistence.*

@Entity
@Table(name = "facilities")
class Facility(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var name: String = "",
    var description: String = "",
    var location: String = "",
    var openingHours: String = ""
)
