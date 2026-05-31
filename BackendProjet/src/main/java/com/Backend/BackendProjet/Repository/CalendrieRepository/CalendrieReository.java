package com.Backend.BackendProjet.Repository.CalendrieRepository;

import com.Backend.BackendProjet.Entity.CalendrieEntity.Meeting;
import com.Backend.BackendProjet.Enum.MeetingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CalendrieReository extends JpaRepository<Meeting,Long> {
    @Query("SELECT m FROM Meeting m WHERE m.group.id = :meetingId")
    List<Meeting> findByIdGroup(@Param("meetingId") Long meetingId);

    @Query("SELECT m FROM Meeting m WHERE m.type = :type AND m.group.id = :groupId")
    List<Meeting> findByTypeAndGroup(@Param("type") MeetingType type, @Param("groupId") Long groupId);

    List<Meeting> findByGroup_Id(Long groupId);
    List<Meeting> findByGroup_IdInAndType(List<Long> groupIds, MeetingType type);
}
