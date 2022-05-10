class cornerShape {
    static get inputProperties() { 
      return [
        '--corner-shapes',
        '--corner-sizes', 
        '--background-color', 
        '--border-width',
        '--border-color'
      ];}
    
    paint(ctx, geom, properties) {
      var cornerShapes = properties.get('--corner-shapes').toString().trim().split(' ');
      const cornerSizes = properties.get('--corner-sizes').toString().replace(/px/g, '').trim().split(' ');
      const backgroundColor = properties.get('--background-color').toString();
      const borderWidth = properties.get('--border-width').toString().replace(/px/g, '').trim();
      const borderColor = properties.get('--border-color').toString();
  
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
  
      let inputLength = cornerSizes.length;
      switch (inputLength) {
        case 1:
          cornerTLW = cornerTLH = cornerTRW = cornerTRH = cornerBRW = cornerBRH = cornerBLW = cornerBLH = cornerSizes[0];
          break;
        case 4:
          cornerTLW = cornerTLH = cornerSizes[0];
          cornerTRW = cornerTRH = cornerSizes[1];
          cornerBRW = cornerBRH = cornerSizes[2];
          cornerBLW = cornerBLH = cornerSizes[3];
          break;
        case 3:
          cornerTLW = cornerTLH = cornerSizes[0];
          cornerTRW = cornerTRH = cornerBLW = cornerBLH = cornerSizes[1];
          cornerBRW = cornerBRH = cornerSizes[2];
          break;
        case 2:
          cornerTLW = cornerTLH = cornerBRW = cornerBRH = cornerSizes[0];
          cornerTRW = cornerTRH = cornerBLW = cornerBLH = cornerSizes[1];
          break;
      }
      
      if(cornerSizes.includes('/')){
        
        var indexToSplit = cornerSizes.indexOf('/');
        const cornerWidths = cornerSizes.slice(0, indexToSplit);
        const cornerHeights = cornerSizes.slice(indexToSplit + 1);
   
        let widthsLength = cornerWidths.length;
        switch (widthsLength) {
          case 1:
            cornerTLW = cornerTRW = cornerBRW = cornerBLW = cornerWidths[0];
            break;
          case 4:
            cornerTLW = cornerWidths[0];
            cornerTRW = cornerWidths[1];
            cornerBRW = cornerWidths[2];
            cornerBLW = cornerWidths[3];
            break;
          case 3:
            cornerTLW = cornerWidths[0];
            cornerTRW = cornerBLW = cornerWidths[1];
            cornerBRW = cornerWidths[2];
            break;
          case 2:
            cornerTLW = cornerBRW = cornerWidths[0];
            cornerTRW = cornerBLW = cornerWidths[1];
            break;
        }
          
        let heightsLength = cornerHeights.length;
        switch (heightsLength) {
          case 1:
            cornerTLH = cornerTRH = cornerBRH = cornerBLH = cornerHeights[0];
            break;
          case 4:
            cornerTLH = cornerHeights[0];
            cornerTRH = cornerHeights[1];
            cornerBRH = cornerHeights[2];
            cornerBLH = cornerHeights[3];
            break;
          case 3:
            cornerTLH = cornerHeights[0];
            cornerTRH = cornerBLH = cornerHeights[1];
            cornerBRH = cornerHeights[2];
            break;
          case 2:
            cornerTLH = cornerBRH = cornerHeights[0];
            cornerTRH = cornerBLH = cornerHeights[1];
            break;
        }
      }
      
      let p1 = new Path2D();
      p1.moveTo(cornerTLW, 0);
  
      p1.lineTo(geom.width - cornerTRW, 0);
      
        switch (shapesSorted[1]) {
          case "angle":
            break;
          case "square":
          default:
            p1.lineTo(geom.width, 0);
            break;
          case "notch":
            p1.lineTo(geom.width - cornerTRW, cornerTRH);
            break;
          case "scoop":
            p1.ellipse(geom.width, 0, cornerTRW, cornerTRH, Math.PI, 0, Math.PI * 1.5, true);
            break;
          case "round":
            p1.ellipse(geom.width - cornerTRW, cornerTRH, cornerTRH, cornerTRW, Math.PI * 1.5, 0, Math.PI / 2);
  
            break;
        }
      p1.lineTo(geom.width, cornerTRH);
      p1.lineTo(geom.width, geom.height - cornerBRH);
      
      switch (shapesSorted[2]) {
        case "angle":
          p1.lineTo(geom.width - cornerBRW, geom.height);
          break;
        case "square":
        default:
          p1.lineTo(geom.width, geom.height);
          break;
        case "notch":
              p1.lineTo(geom.width - cornerBRW, geom.height - cornerBRH);
      p1.lineTo(geom.width - cornerBRW, geom.height);
          break;
        case "scoop":
          p1.ellipse(geom.width, geom.height, cornerBRH, cornerBRW, Math.PI * 1.5, 0, Math.PI * 1.5, true);
          break;
        case "round":
          p1.ellipse(geom.width - cornerBRW, geom.height - cornerBRH, cornerBRW, cornerBRH, Math.PI * 2, 0, Math.PI / 2);
          break;
      }
      
      p1.lineTo(geom.width - cornerBRW, geom.height);
      p1.lineTo(cornerBLW, geom.height);
      
      switch (shapesSorted[3]) {
        case "angle":
          p1.lineTo(0, geom.height - cornerBLH);
          break;
        case "square":
        default:
          p1.lineTo(0 , geom.height);
          break;
        case "notch":
          p1.lineTo(cornerBLW, geom.height - cornerBLH);
          p1.lineTo(0, geom.height - cornerBLH);
          break;
        case "scoop":
          p1.ellipse(0, geom.height, cornerBLW, cornerBLH, Math.PI * 2, 0, Math.PI * 1.5, true);
          break;
        case "round":
          p1.ellipse(cornerBLW, geom.height - cornerBLH, cornerBLH, cornerBLW, Math.PI * .5, 0, Math.PI / 2);
          break;
      }
  
      p1.lineTo(0, geom.height - cornerBLH);
      p1.lineTo(0, cornerTLH);
  
      switch (shapesSorted[0]) {
          case "angle":
            break;
          case "square":
          default:
            p1.lineTo(0,0);
            break;
          case "notch":
            p1.lineTo(cornerTLW, cornerTLH);
            break;
          case "scoop":
            p1.ellipse(0, 0, cornerTLH, cornerTLW, Math.PI * .5, 0, Math.PI * 1.5, true);
            break;
          case "round":
            p1.ellipse(cornerTLW, cornerTLH, cornerTLW, cornerTLH, Math.PI, 0, Math.PI / 2);
            break;
        }
      p1.closePath();
      
      ctx.fillStyle = backgroundColor;
      
    if(borderWidth > 0){
         ctx.strokeStyle = borderColor; 
    }
  
        ctx.clip(p1);
        ctx.lineWidth = borderWidth * 2;
        ctx.fill(p1);
        ctx.stroke(p1);
    }
  }
  registerPaint("cornerShape", cornerShape);