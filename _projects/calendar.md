---
layout: page
title: Calendar
description: Exploring Java and Angular.js creating a full calendar with angular methods and delegations
img: assets/img/12.jpg
permalink: /projects/java-projects/calendar/
importance: 4
category: java
tags: ["frontend","angular","backend", "java", "springboot", "microservice","maven","MySql","MariaDB"]
---

### Java Spring Boot Collection

- [Bookit](/projects/java-projects/bookit)
- [fortune-ai](/projects/java-projects/fortune-ai)
- [happy2be](/projects/java-projects/happy2be)
- [calendar] calendar
- [gallery-loader](/projects/java-projects/gallery-loader)
- [lazy-image-loader](/projects/java-projects/lazy-image-loader/)

This application is an older version of the bookit application however the ***bookit*** is a ***rest microservice*** whereas this application is a ***full stack*** java implementation.
Java framework coupled with a mix of ***Angular.js V2*** framework and ***full calendar*** jsp (Jakarta Server Pages) server-side technology that enables developers to create dynamic web content. A JSP file typically has a .jsp extension and combines static content, such as HTML or XML, with dynamic elements written in Java.

Visit the repo and kick start your project! 

- [calendar Repository](https://github.com/cryshansen/calendar)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/calendarjsp/journey.png" title="User Journey" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This Calendar JSP style Java Spring application User Journey identifies the applications engagement.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/calendarjsp/flow-general-app.png" title="General Application Flow" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/calendarjsp/flow-calendar-event.png" title="Calendar Event Flwo" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/calendarjsp/erdiagram.png" title="Entity Relationship Diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   The above images depict the general flow of functional code flow through the applications processes. On the left we have a generaized app flow, Middle we have the calendar event flow of logic and on the right we have the Entity Relationship diagram associated with the calendar event entity Persistence POJO mapping to the database table 
</div>

A snippet of the Calendar Event Dao below of the data flow to the database connetivity useing hibernate Query and session states.

{% raw %}

```java
import entity.CalendarEvent;
public class CalendarEventDao extends HibernateDaoSupport {

	@SuppressWarnings("unchecked")
	public List<CalendarEvent> getCalendarEvents(){
		
		return getHibernateTemplate().loadAll(CalendarEvent.class);

	}
	public  CalendarEvent getCalendarEventByCalendarEventId(int cEventId) {
		 return (CalendarEvent) getHibernateTemplate().get(CalendarEvent.class, cEventId);
	}
	
	public void addCalendarEvent(CalendarEvent cEvent) {
		
		getHibernateTemplate().save(cEvent);
	}

	public Long getRowCount() {
		Session dbSession = getSession();
		Query dbQuery= dbSession.createQuery(
			"select count(calEventId) from entity.CalendarEvent");
		Long count = (Long) dbQuery.uniqueResult();
		dbSession.close();
		return count;
	}
	
}
```

{% endraw %}


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/calendarjsp/sequence-diagram.png" title="Sequence Diagram of Calendar" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The sequence diagram of the calendar application using jsp http contections vs newer frameworks. It identifies the application flow or narative of the systems functionality and data flows
</div>

#### Explanation – Saving an Event (Sequence Diagram)

When a user interacts with the calendar interface to add a new event, the following sequence of actions occurs:

***User Action:*** The user clicks a "Save" or similar button after entering event details on the calendar interface.

***Browser Request:*** This triggers a POST request to the server, specifically targeting the CalendarEventController.

##### Controller Processing:

The controller receives the JSON payload. It parses the incoming data to extract event fields (such as title, time, colors, and availability). It creates a CalendarEvent object using these values.

##### Data Persistence:

The controller calls the CalendarEventDao.addCalendarEvent() method. The DAO constructs a database query (likely an INSERT) and sends it to the database.

##### Database Response:

The database executes the query and returns success (or failure). The DAO confirms completion back to the controller.

##### Final Response:

The controller sends back a 200 OK HTTP response to the browser. The event is now considered saved, and the front-end can refresh or update the calendar display to show the new booking.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/calendarjsp/mind-map.png" title="Mind Map of the calendar system" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/calendarjsp/flow-general-app.png" title="General Application flow" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The left illustrates the high level mind mapping of the system to aid in visualization of the system concepts and features, the right image itemizes the flow of the code logic
</div>


### Testing example 

Lets run some testing of the calendar using assertions to test the calenar event functions. 


{% raw %}
```java
@Test
	public void testAddCalendarEvent() {
    	final CalendarEvent event= new CalendarEvent();
	
	
	event.setCalEventTitle("Apothecary");
	event.setBgColor("#cde9b5");
	
	
	transactionTemplate.execute(new TransactionCallbackWithoutResult() {

	    protected void doInTransactionWithoutResult(TransactionStatus status) {
	    	calendarEventDao.addCalendarEvent(event);
	    	assertTrue( event.getCalEventId() > 0 );
	    	CalendarEvent event4 = calendarEventDao.getCalendarEventByCalendarEventId( event.getCalEventId());
	        
	    	assertEquals( event.getCalEventTitle(), event4.getCalEventTitle());
	        assertEquals( event.getBgColor(), event4.getBgColor());
	       
	        
	        status.setRollbackOnly();
	    }
	    
	});
}
```
{% endraw %}