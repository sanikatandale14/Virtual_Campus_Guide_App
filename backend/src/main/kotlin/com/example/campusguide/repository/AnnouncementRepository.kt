package com.example.campusguide.repository

import com.example.campusguide.entity.Announcement
import org.springframework.data.jpa.repository.JpaRepository

interface AnnouncementRepository : JpaRepository<Announcement, Long>
