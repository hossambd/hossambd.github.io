---
layout: page
title: Lazy Image Loader
description: Exploring Java Spring Factory and Angular 2+ sends a json response with file image structure parsing for masonry layout front end using angular methods and delegates
img: assets/img/12.jpg
permalink: /projects/java-projects/lazy-image-loader/
importance: 6
category: java
tags: ["backend", "fullstack" ]
---

### Java Spring Boot Collection

- [Bookit](/projects/java-projects/bookit)
- [fortune-ai](/projects/java-projects/fortune-ai)
- [happy2be](/projects/java-projects/happy2be)
- [calendar](/projects/java-projects/calendar/)
- [gallery-loader](/projects/java-projects/gallery-loader)
- [lazy-image-loader]lazy-image-loader


#### 📸 Java Studio Gallery Project

This project was an exploratory build designed to create a photo studio gallery system using ***Java EE*** technologies, ***Spring***, ***Hibernate***, and ***JSP***. It demonstrates a hybrid web architecture combining server-side rendering (via JSP) and an angular.js integration exploratively. The project reflects experimentation with both traditional MVC and modern single-page app patterns. It is different than the gallery-loader repo as this version includes JSP pages and the gallery-loader excludes the JSP from the code base. This app was the origninal created to set up a java app that evolved into expoloring the angular framework aspect of the design. [Gallery Loader](/projects/java-projects/gallery-loader) is the second rendition of this app that excludes the jsp functionality.

##### 🎯 Project Purpose
To manage and display a list of photography studios and their associated images in a responsive gallery interface, supporting CRUD operations (Create, Read, Update, Delete) through a Java-based backend.

###### ⚙️ Tech Stack
###### Backend:
Java EE with JSP and Servlets
Spring Framework (manual bean management via SpringFactory)
Hibernate ORM for database persistence
Custom DAO and Manager classes (e.g., StudioDao, StudioManager)

###### Frontend:

JSP templates using JSTL
Bootstrap 4 for styling and layout
Lazy loading logic for performance optimization

##### 📁 Folder Overview
web/ – Contains the web.xml servlet configuration, wiring StudioController to a specific route.

WebContent/ – Includes both static HTML and dynamic JSP pages, such as:

studio-gallery.jsp – A hybrid JSP page that loads data via AngularJS and displays it in a flexible grid layout.

static_gallery.jsp – A simpler version with hardcoded images for prototyping layout ideas.

src/bll/StudioManager.java – A business logic class responsible for interacting with StudioDao to fetch or update studio records.

##### 🧠 Key Difference:
Static (static_gallery.jsp): No backend interaction; layout is hardcoded—great for prototyping.
Lazy Loading (studio-gallery.jsp): Fetches live data from the server via AngularJS, ensuring scalability and performance for large image sets.


Visit its repo here:
- [Lazy Image Load Repository](https://github.com/cryshansen/javaRepo/tree/main/lazyImageLoad)

Scroll around to help visualize the repo package in a documentationary way.
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lazy-img-loader/user-journey.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The user journey reflects the flow of the user engagement with the system to provide some insight to its makeup at a high level. The image is split into two components to have a closer view of the flow. This first piece is front end engagement with the system.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lazy-img-loader/user-journey1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
  The user journey reflects the flow of the user engagement with the system to provide some insight to its makeup at a high level. The image is split into two components to have a closer view of the flow. This portion of the complete journey is the backend portion of the engagement with the system.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lazy-img-loader/mvc-flow.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lazy-img-loader/class-diagram.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lazy-img-loader/erdiagram.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos: On the left, The MVC flow of data engagement. Diagram that visually represents the MVC (Model-View-Controller) architecture for your Java Studio Gallery Project based on the flow and components.  Middle, illustrates the class model and its methods utilized in the backend Java Structure. Right, is an ERD Entity Relationship of the data storage typically a database.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lazy-img-loader/mind-map.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   Diagram that visually represents the MVC (Model-View-Controller) architecture for your Java Studio Gallery Project based on the flow and components
</div>

#### 🔄 Request Flow (MVC Pattern)
The user visits the gallery page (e.g., studio-gallery.jsp).
AngularJS sends an HTTP request to /StudioController.
StudioController invokes StudioManager methods.
StudioManager calls StudioDao, which uses Hibernate to query the database.
Studio data is returned as JSON to AngularJS, which renders it dynamically into a gallery.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/lazy-img-loader/sequence-diagram.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/lazy-img-loader/static-vs-lazy.png" title="Static vs Lazy flow comparison" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   🧠 Key Difference: Static (static_gallery.jsp): No backend interaction; layout is hardcoded—great for prototyping.  Lazy Loading (studio-gallery.jsp): Fetches live data from the server via AngularJS, ensuring scalability and performance for large image sets.
</div>

💡 Notes
The codebase reflects an experimentation phase—some JSP pages include AngularJS logic, others serve static content. A partially implemented HTTP POST flow suggests future plans to allow studio creation or updates via AngularJS. The architecture shows clear separation between data access (DAO), business logic (Manager), and presentation (JSP + AngularJS).

 Snippet of the angular lazy load 
{% raw %}

```html
lazy_loader.jsp
 <div class="flex-container" ng-controller="studioStaticGalleryController">
	<h1>
		Lazy Loading Images With AngularJS
	</h1>

	<p>
		You have {{ photos.size }} photos in your set.

		<a ng-click="rebuildSet()">Rebuild set</a>.
		<a ng-click="changeSource()">Change src</a>.
		<a ng-click="clearPhotos()">Clear</a>.
	</p>

	<a ng-show="isBoxVisible" ng-click="hideBox()" class="box">
		This is a big thing that may change,
		causing the DOCUMENT HEIGHT to change.
	</a>

	
  		<div class="block" ngClass="block" ng-repeat="photo in photos">
			<img class="w-100" bn-lazy-src="{{ photo.src }}" alt="{{photo.id}}" />
		</div>
</div>
```

{% endraw %}

imagePreload.HTML
This file handles preloading of the browser content. the angular is written at the bottom of the page declaring a app.factory function as a utility class to preloading the image objects. In the backend the system returns a json array 

{% raw %}
```html
<body ng-controller="AppController">

	<h1>
		Preloading Images In AngularJS With Promises
	</h1>

	<div ng-switch="isLoading">

		<!-- BEGIN: Loading View. -->
		<p ng-switch-when="true">

			Your images are being loaded... {{ percentLoaded }}%

		</p>
		<!-- END: Loading View. -->

		<!-- BEGIN: Results View. -->
		<div
			ng-switch-when="false"
			ng-switch="isSuccessful">

			<p ng-switch-when="true">

				<img
					ng-repeat="src in imageLocations"
					ng-src="{{ src }}"
					style="width: 100px ; margin-right: 10px ;"
					/>

			</p>

			<p ng-switch-when="false">

				<strong>Oops</strong>: One of your images failed to load :(

			</p>

		</div>
		<!-- END: Results View. -->

	</div>
    
```
{% endraw %}
