---
layout: page
title: Bookit
description: A simple booking system API with Java Spring Boot AWS cloud environment EC2 and RDS 
img: assets/img/12.jpg
permalink: /projects/java-projects/bookit/
importance: 3
category: java
tags: ["fullstack", "backend", "java", "microservice", "springboot","maven","RDS","AWS"]

---


### Java Spring Boot Collection

- [ Bookit ] bookit
- [fortune-ai](/projects/java-projects/fortune-ai)
- [happy2be](/projects/java-projects/happy2be)
- [calendar](/projects/java-projects/calendar/)
- [lazy-image-loader](/projects/java-projects/lazy-image-loader/)


This project is the inspiration for future projects intended to grow in the booking ecosystem. This particular project focuses only on backend and a vanilla style html / javascript page to make building quicker and faster as version 1 evolves into React and Angular integrated packages.

Visit the repo and kick start your project! 

- [Bookit Repository](https://github.com/cryshansen/bookit)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/bookit/journey2.png" title="Journey2 " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   User Journey through the bookit systems  back end through a users journey to interact and engage. The booking section illustrates the endpoints of this backend.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/bookit/journey.png" title="Journey" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   Administrators, owners and logged in users can follow the Administrator journey with the logged in dashboard. This particular 'dashboard' facilitates a view of the calendar only. The 'booking' section illustrates the method endpoints of the system.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
         {% include figure.liquid loading="eager" path="assets/img/bookit/appointment-day.png" title="Appointment Day Sequence Diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Appointment day sequence diagram. Identifies the flow of the appointment calender display and its flow through the architecture of the application.
</div>


You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
         {% include figure.liquid loading="eager" path="assets/img/bookit/studio-dashboard.png" title="Dashboard Sequence Diagram" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/bookit/FullCalendar.png" title="Full Calendar Example" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Appointment Administration sequence diagram. Identifies the flow of the administration of appointments adjustments of bookings and user appointment changes by staff. Right photo illustrates the fullcalendar.js layout inclusion to the system admin. 
</div>
<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
         {% include  figure.liquid path="assets/img/bookit/ERD-database.png" title="ERD Database of Bookit" class="img-fluid rounded z-depth-1" %}    
    </div>
     <div class="col-sm-8 mt-3 mt-md-0">
        {% include  figure.liquid path="assets/img/bookit/mind-map.png" title="Bookit Mind Map" class="img-fluid rounded z-depth-1" %}
    </div>
</div>




{% raw %}

```java

@RestController
@RequestMapping("/booking")
public class BookitController {

    @Autowired
    private BookitService bookitService;

    @GetMapping("/day/{date}")
    public List<Appointment> getBookingsByDay(@PathVariable String date) {
        return bookitService.getBookingsByDay(date);
    }

    @GetMapping("/month/{month}")
    public Set<String> getBookingsByMonth(@PathVariable String month) {
        return bookitService.getBookingsByMonth(month);
    }

    @PostMapping("/add")
    public Appointment addBooking(@RequestBody Appointment appointment) {
        return bookitService.setBooking(appointment);
    }

    @GetMapping("/all")
    public List<Appointment> getAllAppointments() {
        return bookitService.getAllAppointments();
    }
}
```

{% endraw %}
