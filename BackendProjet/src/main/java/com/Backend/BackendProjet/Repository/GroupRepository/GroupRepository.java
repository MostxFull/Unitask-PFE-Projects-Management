package com.Backend.BackendProjet.Repository.GroupRepository;

import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group,Long> {
}
