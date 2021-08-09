---
layout: page
gigs: true
---
<div class="col-md-8">
  <h2>Recent Features</h2>
  <ul>
    <li><a href="https://www.thewildcity.com/features/18650-the-cult-of-the-code-decoding-algorave-its-future-in-south-asia">The Cult Of The Code: Decoding Algorave and Its Future In South Asia</li>
    <li><a href="https://www.vogue.in/culture-and-living/content/25-must-visit-art-exhibits-in-and-around-india-you-need-to-check-out">25 must-visit art exhibits in and around India you need to check out</a> - Vogue India</li>
  </ul>
  <h2>Works</h2>
  <ul>
    <li><a href="http://futurelanding.serendipityartsvirtual.com/abhinaykhoparzi">Future Landing: Collabscape</a></li>
  </ul>
  <h2>Music</h2>
  <ul>
    <li><a href="https://khoparzi.bandcamp.com/album/circadia">Circadia</a></li>
    <li><a href="https://youtu.be/C0fIfrlbcfo">GitHub India Satellite 2021, Day 2: Opening performance</a></li>
  </ul>
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
