## about CSS `corner-shape`
the CSS `corner-shape` property is currently a theoretical Editor's Draft extension of the CSS `border-radius` property. It would allow more corner-shapes like `angle/bevel`, `notch`, `scoop`, etc... ). Please note that it is common for property/value names to evolve as specs get worked out so it's possible that this could appear in a different context or under a different name by the time it would get implemented in browsers.
  - Current Editor's Draft Spec: https://drafts.csswg.org/css-backgrounds-4/#corner-shaping
Demo Page: https://jsnkuhn.github.io/corner-shape/

How can I help make `corner-shape` a real CSS property?
  - The CSS Working Group (csswg) is currently collecting live site use cases for non-round corner shapes. The idea is to show live site non-round "corner shaped" designs where browsers implementing `corner-shape` would make developments jobs easier. Anyone is welcome to drop in an example or other wise participate in this github issue: https://github.com/w3c/csswg-drafts/issues/6980 

## `corner-shape` CSS paintAPI polyfill and demo page
This polyfill attemps to create a more complete implementation of `corner-shape` than currently exists. There are other `corner-shape` like paintAPI worklets but most focus on a single "corner shape" (for example just angled corners), do not support the `border-radius` slash syntax for rectangular corner sizes and miss the fact that the spec would allow mixing of corner shapes.
  - properties: 
    - `corner-shape` 
    - `corner-size`
  - what values are accepted for each property and how to format
  - examples:
  ```css 
  background-image: paint(cornerShape);
  --background-color: rgb(0,0,0);
  --border-color: #fff;
  --border-width: 1;
  --corner-size: 16px; /* accepts 1-8 values */
  --corner-shape: angle;
  ```
- FAQ
- use of the paintAPI polyfill (ie don't blame painAPI itself for poor performance in Firefox/Safari) https://github.com/GoogleChromeLabs/css-paint-polyfill
- some times in practice you'd be better off just using an SVG (smaller file size)
- limitations
