---
layout: page
title: Fortune ai
description: Fortune ai is a Java spring boot api connected to chatgpt with a 'category' prompt. It returns a possitive message based on the topic
img: assets/img/12.jpg
permalink: /projects/java-projects/fortune-ai/
importance: 2
category: java
related_publications: false
tags: ["backend", "java", "springboot","microservice"]
---

### Java Spring Boot Collection

- [Bookit](/projects/java-projects/bookit)
- [fortune-ai] fortune-ai
- [happy2be](/projects/java-projects/happy2be)
- [calendar](/projects/java-projects/calendar/)
- [lazy-image-loader](/projects/java-projects/lazy-image-loader/)


Fortune-ai is a preliminary test of Java Spring Boot API development. The idea to represent a chatbot using chatgpt to provide prompting. It is simple to use and implement. 
A test model is associated with pintmento.com as the front end display and integration with an AWS EC2 instance and an RDS database storage system.
 Use to kickstart an app or tutorial.

Visit the repo and kick start your project! 

- [Fortune-AI Repository](https://github.com/cryshansen/fortune-ai)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/fortune-ai/user-journey.png" title="User Journey" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   User Journey of the fortune-ai model, spring boot api.
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/fortune-ai/journey-backend.png" title="Backend Journey" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   Backend journey of the system. 
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/fortune-ai/ERD.png" title="ERD of database" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/fortune-ai/class-model.png" title="Class Model" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="SOme imeag" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    On the left, an Entity Relationship Diagram (ERD). Middle, class model for the system methods. Right, tbd.
</div>

To illustrate the concepts and theory behind this Spring Boot Rest api mind mapping diagrams to illustrate the concepts and features.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fortune-ai/mindmap.png" title="Mind Map" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fortune-ai/class-model.png" title="Class Model" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
On the left, Mind map and on the right class model.
</div>

Here's the code for the rest controller endpoints:

{% raw %}

```java

@RestController
@RequestMapping("/api")
class FortuneController {

    private final OpenAIService openAIService;
    
    @GetMapping("/lucky-number")
    public int getLuckyNumber() {
        return random.nextInt(100) + 1;
    }

    @GetMapping("/daily-advice")
    public String getDailyAdvice() {
        return ADVICE[random.nextInt(ADVICE.length)];
    }


    @GetMapping("/fortune-ai")
    public Mono<String> getAIFortune(@RequestParam(value = "category", defaultValue = "general") String category) {
        return openAIService.getAiFortune(category);
    }
}
```

{% endraw %}
