package com.example.campusguide.entity

import jakarta.persistence.*

@Entity
@Table(name = "departments")
class Department(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var name: String = "",
    var description: String = "",
    var hod: String = "",
    var building: String = "",
    var contactEmail: String = ""
)
