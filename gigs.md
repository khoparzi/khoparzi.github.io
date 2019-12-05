---
layout: page
gigs: true
---
<div class="col-md-8">
  <h2>Gigs/workshops</h2>
  <ul>
    {% for gig in site.data.gigs %}
      {% if gig.link contains "http" %}
      <li><a href="{{ gig.link }}">{{ gig.date }}: {{ gig.name }} - {{ gig.location }}</a></li>
      {% else %}
      <li>{{ gig.date }}: {{ gig.name }} - {{ gig.location }}</li>
      {% endif %}
    {% endfor %}
  </ul>
</div>
