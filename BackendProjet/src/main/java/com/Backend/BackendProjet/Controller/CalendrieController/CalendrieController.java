package com.Backend.BackendProjet.Controller.CalendrieController;

import com.Backend.BackendProjet.Dtos.CalendrieDtos.DtoCalendrieSave;
import com.Backend.BackendProjet.Enum.MeetingType;
import com.Backend.BackendProjet.Repository.CalendrieRepository.CalendrieReository;
import com.Backend.BackendProjet.Service.CalendrieService.CalendrieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Meeting")
@CrossOrigin(origins = "http://localhost:5173")

public class CalendrieController {
    private CalendrieService calendrieService;
    public CalendrieController(CalendrieService calendrieService) {
        this.calendrieService = calendrieService;
    }

//    @PostMapping("/save")
//    public ResponseEntity<?> saveMeeting(@RequestBody DtoCalendrieSave dtoCalendrieSave){
//        return calendrieService.saveMeeting(dtoCalendrieSave);
//    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMeeting(@PathVariable long id,@RequestBody DtoCalendrieSave dtoCalendrieSave){
        return calendrieService.updateMeeting(id,dtoCalendrieSave);
    }
    @PostMapping("/saveMeeting/{id}")
    public ResponseEntity<?> saveMeeting(@PathVariable long id,@RequestBody DtoCalendrieSave dtoCalendrieSave){
        return calendrieService.saveMeeting(id,dtoCalendrieSave);
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllMeetings(){
        return calendrieService.getAllMeetings();
    }
    @GetMapping("/group/{id}")
    public ResponseEntity<?> getMeetingByGroup(@PathVariable Long id){
        return calendrieService.getMeetingsByGroup(id);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getMeetingById(@PathVariable Long id){
        return calendrieService.getMeetingById(id);
    }
    @GetMapping("/group")
    public ResponseEntity<?> getMeetingByGroupAndType(@RequestParam(name = "id") Long id, @RequestParam(name = "type") String type) {
        try {
            MeetingType meetingType = MeetingType.valueOf(type.toUpperCase()); // Conversion en Enum
            return calendrieService.getMeetingByType(id, meetingType);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid meeting type: " + type);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMeeting(@PathVariable Long id){
        return calendrieService.deleteMeeting(id);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getMeettingById(@PathVariable long id){
        return calendrieService.getMeetingByUser(id);
    }






}
