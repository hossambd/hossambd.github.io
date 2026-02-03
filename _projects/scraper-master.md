---
layout: page
title: Python Web Page Scraper
description: A compilation of page scrapers and parsing data for databse injection
img: assets/img/python/david-clode-oJlt2XBWuWs-unsplash.jpg
permalink: /projects/python-projects/scraper-master/
importance: 1
category: python
giscus_comments: false
tags: ["backend", "tools"]
---

### Python Collection

- [Site A – Happy Faces ](/projects/python-projects/happyfaces/)
- [Site B - Flask Sales Generator ](/projects/python-projects/flask-generate-sales)
- [Site C – License Spring API](/projects/python-projects/license-spring-api)
- [Site D – Scraper] (/projects/python-projects/scraper-master/)

### Python Repository

- [Scraper master](https://github.com/cryshansen/python/tree/main/PythonScrape-master)

This project illustrates the body of code repository for useful snippets and functions of python code blocks from scrapers to ssl, database from past working examples
Top level Python code organized and ranging from scraping, database, API connection files for reference purposes. The old school way of storing our code blocks. Some items are general scripts to apply to various urls and parse using Beautiful soup. Scraping exercises help with understanding the basis of spider crawlers, road blocks encountered and handling scraping blocks.

The below illustrations comprise of system level folder structures and files residing in each hierarchy. They help visualize the differnt components of an overwhelming repository of things.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/scraper-master/mind-map.png" title="Mind Meld" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   Mind Map of the code base to get a sense of the visualization of code as it relates to categories in snippet value.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/scraper-master/scraping-layer.png" title="Scraper Bundle Layer" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/scraper-master/section-b-data.png" title="Data Level Files" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/scraper-master/section-c-api-integration.png" title="API Integrations" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     On the left, Scraper Bundle Layer - navigates different scrape code files. Middle, Data Level Files. Right, API Integrations code start points.
</div>

The purpose of such a repo is to generate and follow small tutorials around python as well as a go to to speed your workflow process. However now that AI exists its less necessary to source code.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/scraper-master/section-d-utilities.png" title="Utility Functions" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/scraper-master/section-e-f.-task-domain.png" title="Domain and Tasking snippets" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   Utilities contain some im portaint features for API calls, converting files, IO scheduling Random Generators, string replace, user agent listing to obfuscate bypassing hinderances in scraping code bases.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/scraper-master/schedule-run.png" title="Schedula Run of App for scraping daily" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Use this workflow to set up a scheduled app that runs daily to scrape services into dbs. Can be built out further to expand the data gathered.
</div>
