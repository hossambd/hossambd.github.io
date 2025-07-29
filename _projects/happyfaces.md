---
layout: page
title: Python HappyFaces 
description: A local run/flask integration of the distilbert pretrained positive negative classification.
img: assets/img/python/david-clode-oJlt2XBWuWs-unsplash.jpg
permalink: /projects/python-projects/happyfaces/
importance: 3
category: python
giscus_comments: false
tags: ["Python","Flask"]
---

### Python Collection

- [Site A – Happy Faces ] (/projects/python-projects/happyfaces/)
- [Site B - Flask Sales Generator ](/projects/python-projects/flask-generate-sales) 
- [Site C – License Spring API](/projects/python-projects/license-spring-api)
- [Site D – Scraper](/projects/python-projects/scraper-master/)


### Python Repository
- [Happy Faces API](https://github.com/cryshansen/happyfaces)

Exploration of the Python stack api application development in combination and to enhance happy2be api model with the Bert Sentiment distributed model using happyfaces ***huggingface/hub/models--distilbert-base-uncased-finetuned-sst-2-english***. While the happy2be model does not have the proper distilbert this app utilizes this feature. It is intended to be deployed in an AWS EC2 instance for access. 

This repo explores the use of two different application packages for working with python apis. One file represents the ***FastAPI*** and the second uses ***Flask*** for the app build of for deployement to aws. This package is the python subset of the happy2be where it is intended to be called and information performed and sentiment sent in the back end to support the prompt / sentiment matching. of the happy2be.


✅ Here's what this project is doing:
🧠 Function. Loads a sentiment classification model from Hugging Face (distilbert-base-uncased-finetuned-sst-2-english)

Sets up a FastAPI app with:

A home route (GET /) for testing
A predict route (POST /predict/) that accepts a string input and returns the sentiment analysis result

🧪 At runtime
It runs two test sentences and prints their results when the app starts.
It runs continuously as a web service using FastAPI (e.g., via uvicorn or hypercorn).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happyfaces/system-diagram-sentiment-analysis.png" title="Happy Faces Mind Map" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    System diagram -- sentiment analysis system.
</div>

<div class="row">
    <div class="col-12">
        <table style="width:100%; border-collapse: collapse; font-family: Arial, sans-serif;">
            <thead style="background-color: #f2f2f2;">
                <tr>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">File</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Purpose</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td style="border: 1px solid #ddd; padding: 12px;"><code>WorkingModel.py</code></td>
                <td style="border: 1px solid #ddd; padding: 12px;">Downloads <strong>base DistilBERT</strong> (no classification head). Good for fine-tuning or using embeddings.</td>
                </tr>
                <tr>
                <td style="border: 1px solid #ddd; padding: 12px;"><code>convertModel.py</code></td>
                <td style="border: 1px solid #ddd; padding: 12px;">Forces download and logs path for <strong>fine-tuned</strong> <code>distilbert-base-uncased-finetuned-sst-2-english</code>. Used for ETL or permanent local use.</td>
                </tr>
                <tr>
                <td style="border: 1px solid #ddd; padding: 12px;"><code>WorkingTokenizer.py</code></td>
                <td style="border: 1px solid #ddd; padding: 12px;">Implements a <strong>FastAPI</strong> server with <code>/</code> and <code>/predict/</code> endpoints using HuggingFace pipeline for sentiment.</td>
                </tr>
                <tr>
                <td style="border: 1px solid #ddd; padding: 12px;"><code>happyface.py</code></td>
                <td style="border: 1px solid #ddd; padding: 12px;">Implements a <strong>Flask API</strong> for POSTing text to <code>/analyze</code> using the same tokenizer and pipeline. Simple wrapper to serve the model.</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>





<div class="row my-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happyfaces/user-flow.png" title="User Flow" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happyfaces/state-diagram.png" title="State Diagram" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happyfaces/class-diagram.png" title="Class Diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, State Diagram Visualizes how user input transitions through various states in your system. Right, Class Diagram Describes the main classes and their relationships (useful if you expand your app with more features).
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/happyfaces/proper-mind-map.png" title="Happy Faces Mind Map" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/happyfaces/sequence-diagram.png" title="Sequence Diagram" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/happyfaces/logic-flow-fastapp.png" title="Logic Fast API" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sequence Diagram. llustrates how components (like the user, API, tokenizer, and model) interact over time. On the right, the logic flow diagram of the fast API. The Flask version is identical in flow.
</div>

The code is very simple for building out a small support API endpoint to connect sentiment analysis on message prompts.

Snippet of a python route included in the app is below:

{% raw %}

```python


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    result = nlp(text)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

```
{% endraw %}

📝 Notes / Suggestions
✅ FastAPI vs Flask: You’re testing two server frameworks for the same model. You can unify into one later.
✅ Model portability: Good idea with ***support/convertModel.py*** to find and optionally move model files.
✅ Tokenizer and model loading are correctly structured in both web apps.
✅ Ideal next step: Add test cases + Dockerize for portability if deploying to the AWS Instance environment.




Visit the python repo for more details: 
- [Happy Faces API](https://github.com/cryshansen/happyfaces)
