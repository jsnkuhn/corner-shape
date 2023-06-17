class cornerShapeV2 {
    static get inputProperties() { 
      return [
        '--corner-shape',
        '--corner-size', 
        '--background-color', 
        '--border-width',
        '--border-color'
      ];}
    
    paint(c, g, properties) {
      var cornerShapes = properties.get('--corner-shape').toString().trim().split(' ');
      const cornerSizes = properties.getAll('--corner-size').toString().trim().split(' ');

      const backgroundColor = properties.get('--background-color');      
      const borderWidth = properties.get('--border-width').value;
      const borderColor = properties.get('--border-color');

var shapeTL, shapeTR, shapeBR, shapeBL; 
      
      let shapesLength = cornerShapes.length;
      switch (shapesLength) {
        case 1:
          shapeTL = shapeTR = shapeBR = shapeBL = cornerShapes[0];
          break;
        case 4:
          shapeTL = cornerShapes[0];
          shapeTR = cornerShapes[1];
          shapeBR = cornerShapes[2];
          shapeBL = cornerShapes[3];
          break;
        case 3:
          shapeTL = cornerShapes[0];
          shapeTR = shapeBR = cornerShapes[1];
          shapeBL = cornerShapes[2]
          break;
        case 2:
          shapeTL = shapeBR = cornerShapes[0];
          shapeTR = shapeBL = cornerShapes[1];
          break;
      }
      
      let shapesSorted = [];
      shapesSorted[0] = shapeTL;
      shapesSorted[1] = shapeTR;
      shapesSorted[2] = shapeBR;
      shapesSorted[3] = shapeBL;
      
      let cornerTLW, cornerTLH, cornerTRW, cornerTRH, cornerBRW, cornerBRH, cornerBLW, cornerBLH;
      let cornerWidths = [];
      let cornerHeights = [];
      
      if(cornerSizes.includes('/')){
        var indexToSplit = cornerSizes.indexOf('/');
        cornerWidths = cornerSizes.slice(0, indexToSplit);
        cornerHeights = cornerSizes.slice(indexToSplit + 1);
      }
      else{
        cornerWidths = cornerSizes;
        cornerHeights = cornerSizes;
      }
          
      let computedCornerWidths = cornerWidths.map(item => {
        if(item.includes('%')){
          return parseInt(item) / 100 * g.width
        }
        else{
          return parseInt(item)
        }
      })    
  
      let widthsLength = computedCornerWidths.length;
      switch (widthsLength) {
        case 1:
          cornerTLW = cornerTRW = cornerBRW = cornerBLW = computedCornerWidths[0];
          break;
        case 4:
          cornerTLW = computedCornerWidths[0];
          cornerTRW = computedCornerWidths[1];
          cornerBRW = computedCornerWidths[2];
          cornerBLW = computedCornerWidths[3];
          break;
        case 3:
          cornerTLW = computedCornerWidths[0];
          cornerTRW = cornerBLW = computedCornerWidths[1];
          cornerBRW = computedCornerWidths[2];
          break;
        case 2:
          cornerTLW = cornerBRW = computedCornerWidths[0];
          cornerTRW = cornerBLW = computedCornerWidths[1];
          break;
      }
      
      let computedCornerHeights = cornerHeights.map(item => {
        if(item.includes('%')){
          return parseInt(item) / 100 * g.height
        }
        else{
          return parseInt(item)
        }
      })
      
      let heightsLength = computedCornerHeights.length;
      switch (heightsLength) {
        case 1:
          cornerTLH = cornerTRH = cornerBRH = cornerBLH = computedCornerHeights[0];
          break;
        case 4:
          cornerTLH = computedCornerHeights[0];
          cornerTRH = computedCornerHeights[1];
          cornerBRH = computedCornerHeights[2];
          cornerBLH = computedCornerHeights[3];
          break;
        case 3:
          cornerTLH = computedCornerHeights[0];
          cornerTRH = cornerBLH = computedCornerHeights[1];
          cornerBRH = computedCornerHeights[2];
          break;
        case 2:
          cornerTLH = cornerBRH = computedCornerHeights[0];
          cornerTRH = cornerBLH = computedCornerHeights[1];
          break;
      }
      
      let p = new Path2D();
      p.moveTo(cornerTLW, 0);
  
      p.lineTo(g.width - cornerTRW, 0);
      
        switch (shapesSorted[1]) {
          case "angle":
            break;
          case "square":
          default:
            p.lineTo(g.width, 0);
            break;
          case "notch":
            p.lineTo(g.width - cornerTRW, cornerTRH);
            break;
          case "scoop":
            p.ellipse(g.width, 0, cornerTRW, cornerTRH, Math.PI, 0, Math.PI * 1.5, true);
            break;
          case "round":
            p.ellipse(g.width - cornerTRW, cornerTRH, cornerTRH, cornerTRW, Math.PI * 1.5, 0, Math.PI / 2);
  
            break;
        }
      p.lineTo(g.width, cornerTRH);
      p.lineTo(g.width, g.height - cornerBRH);
      
      switch (shapesSorted[2]) {
        case "angle":
          p.lineTo(g.width - cornerBRW, g.height);
          break;
        case "square":
        default:
          p.lineTo(g.width, g.height);
          break;
        case "notch":
              p.lineTo(g.width - cornerBRW, g.height - cornerBRH);
      p.lineTo(g.width - cornerBRW, g.height);
          break;
        case "scoop":
          p.ellipse(g.width, g.height, cornerBRH, cornerBRW, Math.PI * 1.5, 0, Math.PI * 1.5, true);
          break;
        case "round":
          p.ellipse(g.width - cornerBRW, g.height - cornerBRH, cornerBRW, cornerBRH, Math.PI * 2, 0, Math.PI / 2);
          break;
      }
      
      p.lineTo(g.width - cornerBRW, g.height);
      p.lineTo(cornerBLW, g.height);
      
      switch (shapesSorted[3]) {
        case "angle":
          p.lineTo(0, g.height - cornerBLH);
          break;
        case "square":
        default:
          p.lineTo(0 , g.height);
          break;
        case "notch":
          p.lineTo(cornerBLW, g.height - cornerBLH);
          p.lineTo(0, g.height - cornerBLH);
          break;
        case "scoop":
          p.ellipse(0, g.height, cornerBLW, cornerBLH, Math.PI * 2, 0, Math.PI * 1.5, true);
          break;
        case "round":
          p.ellipse(cornerBLW, g.height - cornerBLH, cornerBLH, cornerBLW, Math.PI * .5, 0, Math.PI / 2);
          break;
      }
  
      p.lineTo(0, g.height - cornerBLH);
      p.lineTo(0, cornerTLH);
  
      switch (shapesSorted[0]) {
          case "angle":
            break;
          case "square":
          default:
            p.lineTo(0,0);
            break;
          case "notch":
            p.lineTo(cornerTLW, cornerTLH);
            break;
          case "scoop":
            p.ellipse(0, 0, cornerTLH, cornerTLW, Math.PI * .5, 0, Math.PI * 1.5, true);
            break;
          case "round":
            p.ellipse(cornerTLW, cornerTLH, cornerTLW, cornerTLH, Math.PI, 0, Math.PI / 2);
            break;
        }
      p.closePath();
      
      c.fillStyle = backgroundColor;
      
      if(borderWidth > 0){
        c.strokeStyle = borderColor;
      }
      if(borderWidth <= 0){
        c.strokeStyle = "transparent";
      }
  
      c.clip(p);
      c.lineWidth = borderWidth * 2;
      c.fill(p);
      c.stroke(p);
    }
  }
  registerPaint("borderCornerShape", cornerShapeV2);
