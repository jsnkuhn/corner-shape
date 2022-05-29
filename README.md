## about CSS `corner-shape`
- the CSS `corner-shape` property is currently a theoretical extension of the CSS `border-radius` property. It would allow more for more corner-shapes than just round (`angle/bevel`, `notch`, `scoop`, etc... ).
- Current Spec: https://drafts.csswg.org/css-backgrounds-4/#corner-shaping
- Demo Page: https://jsnkuhn.github.io/corner-shape/
  - this is a demo page of what `corner-shape` could be if implemented. It uses the CSS paintAPI polyfill from this repo.
- How can I help make this happen?
  - Use cases for `corner-shape` thread: https://github.com/w3c/csswg-drafts/issues/6980 

## `corner-shape` CSS paintAPI polyfill
- explanation of the polyfill
  - This polyfill attemps to create a more complete implementation of `corner-shape`  
  - properties: `corner-shape` `corner-size`
  - what values are accepted for each property and how to format
  - examples:
- FAQ
- use of the paintAPI polyfill (ie don't blame painAPI itself for poor performance in Firefox/Safari) https://github.com/GoogleChromeLabs/css-paint-polyfill
- some times in practice you'd be better off just using an SVG (smaller file size)
- limitations
