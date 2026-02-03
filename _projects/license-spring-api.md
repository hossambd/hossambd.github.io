---
layout: page
title: Python License Spring API
description: A compilation of data information endpoint connections to gather and parsing data related to EMTP.com Licenses.
img: assets/img/python/david-clode-oJlt2XBWuWs-unsplash.jpg
permalink: /projects/python-projects/license-spring-api/
importance: 2
category: python
giscus_comments: true
tags: ["backend", "tools"]
---

### Python Collection

- [Site A – Happy Faces ](/projects/python-projects/happyfaces/)
- [Site B - Flask Sales Generator ](https://github.com/cryshansen/flask-generate-sales)
- [Site B – Scraper](/projects/python-projects/scraper-master/)
- [Site C – License Spring API] License Spring API

### Python Repository

- [License Spring API](https://github.com/cryshansen/python/license_spring)

This project generates realistic fake sales data for a photography business using Python and the Faker library. Originally designed as a lightweight API and CSV generator using Flask, it was later ported to a Drupal module for integration into a dynamic sales dashboard.

🎯 Purpose
To create believable and varied weekly photography sales data, supporting analytics dashboards, portfolio projects, and visualizations without relying on sensitive or real client data.

🔧 Technologies Used
Python 3
Faker – for generating names, emails, locations, etc.
Pandas – for CSV output
Flask (optional) – to serve generated data via API endpoint (for early demos)

Below Images and figure captions illustrate the visual representations of the concepts, division of folders based on usage types and display the highlevel important information regarding this set of python toolkit components. These are mostly snippets of functionality needed to build an ETL system.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```bash
uvicorn app:app --reload --host 127.0.0.1 --port 8000

```

{% endraw %}
