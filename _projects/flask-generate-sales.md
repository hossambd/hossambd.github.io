---
layout: page
title: Python License Spring API
description: A compilation of data information endpoint connections to gather and parsing data related to EMTP.com Licenses.
img: assets/img/python/david-clode-oJlt2XBWuWs-unsplash.jpg
permalink: /projects/python-projects/flask-generate-sales/
importance: 2
category: python
giscus_comments: true
tags: ["backend", "tools"]
---

### Python Collection

- [Site A – Happy Faces ](/projects/python-projects/happyfaces/)
- [Site B - Flask Sales Generator ] flask-generate-sales
- [Site C – License Spring API](/projects/python-projects/license-spring-api)
- [Site D – Scraper](/projects/python-projects/scraper-master/)

### Python Repository

- [License Spring API](https://github.com/cryshansen/flask-generate-sales)

This project generates realistic fake sales data for a photography business using Python and the Faker library. Originally designed as a lightweight API and CSV generator using Flask, it was later ported to a Drupal module for integration into a dynamic sales dashboard.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/flask-generate-sales/user-journey.png" title="User Journey" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Follow the user journey of this fake sales generator. it is useful for presenting some simple data sampling for prototype purpose or for demonstration purposes.
</div>

To create believable and varied weekly photography sales data, supporting analytics dashboards, portfolio projects, and visualizations without relying on sensitive or real client data.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/flask-generate-sales/system-diagram.png" title="System Diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   This illustration presents the system as a wholistic view of its design and features.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/flask-generate-sales/sequence-diagram.png" title="Sequence Diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   This illustration presents the a sequence of events as it moves through the system components and back to the user.
</div>

The generated data is saved to: root folder Can adjust as necessary for simplicity it is bundled as is.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/flask-generate-sales/erd.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   Erd design for database setups.
</div>

Run your app:

{% raw %}

```bash
uvicorn app:app --reload --host 127.0.0.1 --port 8000

```

{% endraw %}
