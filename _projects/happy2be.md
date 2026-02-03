---
layout: page
title: Happy2be
description: Furthering my exploration in Java Spring Boot APIs and cloud technologies
img: assets/img/12.jpg
permalink: /projects/java-projects/happy2be/
importance: 3
category: java
giscus_comments: false
tags: ["backend", "java", "microservice"]
---

### Java Spring Boot Collection

- [Bookit](/projects/java-projects/bookit)
- [fortune-ai](/projects/java-projects/fortune-ai)
- [happy2be] happy2be
- [calendar](/projects/java-projects/calendar/)
- [lazy-image-loader](/projects/java-projects/lazy-image-loader/)

Furthering my exploration in Java Spring Boot APIs and cloud technologies, and using the foundation of fortune-ai, the desire to understand language models with human interface has be exploring the value ChatGPT can bring. Use to kickstart an app or tutorial.

Visit the repo and kick start your project!

- [Happy2be Repository](https://github.com/cryshansen/happy2be)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happy2be/user-journey.png" title="user journey" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    User Journey to happiness is through Happy2Be
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happy2be/sequence-diagram.png" title="Sequence Diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sequence Diagram of java spring boot api of user engagement with the service. 
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happy2be/erd.png" title="Database ERD" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happy2be/logic-flow.png" title="Logic Flow" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happy2be/happy2be-postman.png" title="happy 2 be postman" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   Image on the left:Postman response, middle:Logic Flow and right: Database Entity Relationship Diagram A simple MariadDB/MySql database to record the message / response and emotion.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happy2be/sequence-diagram1.png" title="Sequence Diagram of Flask" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sequence Diagram of flask integration of Happy2Be for the emotion positive / negative BERT via happyfaces. 
</div>

Below we explore a mind map of the process to aid in visualizations of the api system and its components.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/happy2be/mind-map.png" title="Mind Map of Happy To Be" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/happy2be/user-engagement.png"  title="User Engagement" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Happy 2 Be Mind map of the backend of a to be chatbot developed to accept a propt and respond based on the emotional aspects of the message. User Engagement flow is the focus of this model.
</div>

{% raw %}

```java

@RestController
@RequestMapping("/api/emotion")
public class EmotionController {
   // private final TokenizerService tokenizerService;
    private final EmotionService emotionService;
    public EmotionController(EmotionService tokenizerService) {
        this.emotionService = tokenizerService;
    }

    @PostMapping
    public String classifyEmotion(@RequestBody String text) throws Exception {
        return emotionService.classifyEmotion(text);
    }
}
```

{% endraw %}
