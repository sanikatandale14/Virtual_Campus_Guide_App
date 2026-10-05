package com.example.campusguide.entity

import jakarta.persistence.*

@Entity
@Table(name = "announcements")
class Announcement(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var title: String = "",
    var message: String = "",
    var date: String = "",
    var author: String = ""
)
