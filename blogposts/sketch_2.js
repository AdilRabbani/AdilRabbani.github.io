var pizza = function(sketch_) {

var width;

sketch_.setup = function() {
 
  width = document.getElementById('sketch-2').offsetWidth;
  sketch_.createCanvas(width, width, WEBGL);
  sketch_.setAttributes('antialias', true);
}

sketch_.draw = function()
{
    sketch_.background(255);
    sketch_.stroke(255);
    sketch_.strokeWeight(0);

    if (width < 500) {
        sketch_.scale(0.599315, 0.599315);
    }
    sketch_.translate(30, 0, 0);
    sketch_.fill(211, 152, 82);
    sketch_.arc(-40, 0, 350, 350, (QUARTER_PI + 0.4), (PI + HALF_PI + QUARTER_PI + 0.7), PIE, 50);
    sketch_.fill(253, 237, 53);
    sketch_.arc(-40, 0, 300, 300, (QUARTER_PI + 0.4), (PI + HALF_PI + QUARTER_PI + 0.7), PIE, 50);
    
    sketch_.fill(190,25,49);
    sketch_.ellipse(-120, 0, 30, 30);
    sketch_.ellipse(50, -50, 30, 30);
    sketch_.ellipse(-60, -90, 30, 30);
    sketch_.ellipse(-60, 90, 30, 30);

    sketch_.fill(8,183,114);

    sketch_.push();
    sketch_.rotateZ(radians(1));
    sketch_.rect(-140, 20, 40, 10);
    sketch_.rotateZ(radians(50));
    sketch_.rect(-100, 10, 30, 10);
    sketch_.rotateZ(radians(50));
    sketch_.rect(-100, 0, 30, 10);
    sketch_.rotateZ(radians(0));
    sketch_.rect(110, 0, 40, 10);
    sketch_.pop();

    sketch_.fill(241, 90, 36);
    sketch_.ellipse(-130, 70, 10, 10);
    sketch_.ellipse(-160, 0, 10, 10);
    sketch_.ellipse(-100, 110, 10, 10);
    sketch_.ellipse(-70, 50, 10, 10);
    sketch_.ellipse(-70, 0, 10, 10);
    sketch_.ellipse(-100, -100, 10, 10);
    sketch_.ellipse(-100, -50, 10, 10);
    sketch_.ellipse(-140, -50, 10, 10);
    sketch_.ellipse(40, -100, 10, 10);
    sketch_.ellipse(40, -30, 10, 10);
    sketch_.ellipse(-10, -30, 10, 10);
    sketch_.ellipse(-10, -120, 10, 10);
    sketch_.ellipse(-30, -70, 10, 10);
    sketch_.ellipse(-20, 100, 10, 10);
    sketch_.ellipse(-60, 130, 10, 10);

    sketch_.push();
    sketch_.rotateZ(radians(-5));
    sketch_.translate(30, 20, 0);
    sketch_.fill(211, 152, 82);
    sketch_.arc(-40, 0, 350, 350, 0, QUARTER_PI + 0.45, PIE, 50);
    sketch_.fill(253, 237, 53);
    sketch_.arc(-40, 0, 300, 300, 0, QUARTER_PI + 0.45, PIE, 50);
    sketch_.pop();

    sketch_.fill(190,25,49);
    sketch_.ellipse(80, 100, 30, 30);
    sketch_.ellipse(30, 40, 30, 30);

    sketch_.fill(8,183,114);
    sketch_.rect(70, 40, 40, 10);

    sketch_.fill(241, 90, 36);
    sketch_.ellipse(70, 70, 10, 10);
    sketch_.ellipse(60, 130, 10, 10);
    sketch_.ellipse(40, 90, 10, 10);
    sketch_.ellipse(70, 30, 10, 10);
    sketch_.ellipse(120, 30, 10, 10);
    sketch_.ellipse(110, 70, 10, 10);
    
}

};

var myp5 = new p5(pizza, 'sketch-2');

var sphere = function(sketch_3) {

    var angle = 0;
    var dividedBy = 7;
    var width;
    var radius;

    sketch_3.setup = function() {

        width = document.getElementById('sketch-1').offsetWidth;
        radius = width/3;
        sketch_3.createCanvas(width, width, WEBGL);
        sketch_3.setAttributes('antialias', true);
    }

    sketch_3.draw = function()
    {
        sketch_3.background(255);
        sketch_3.stroke(0);

        sketch_3.rotateX(angle);
        sketch_3.rotateY(angle);
        sketch_3.rotateZ(angle);

        sketch_3.strokeWeight(2);

        sketch_3.beginShape(POINTS);
        
        for (var i = 0; i < 360/dividedBy; i++) {
            for (var j = 0; j < 180/dividedBy; j++) {
                _x = radius * Math.cos(radians(i*dividedBy)) * Math.sin(radians(j*dividedBy));
                _y = radius * Math.sin(radians(i*dividedBy)) * Math.sin(radians(j*dividedBy));
                _z = radius * Math.cos(radians(j*dividedBy));
                sketch_3.vertex(_x,_y,_z);
            }
        }

        sketch_3.endShape();

        angle += 0.005;
    }

};

var myp5 = new p5(sphere, 'sketch-1');

var flower = function(sketch_4) {

    var angle = 0;
    var width;

    sketch_4.setup = function() {
      width = document.getElementById('sketch-3').offsetWidth;
      sketch_4.createCanvas(width, width, WEBGL);
      sketch_4.setAttributes('antialias', true);
    }

    sketch_4.draw = function() {
      if (width < 500) {
        sketch_4.scale(0.45, 0.45);
      }
      sketch_4.translate(0, 20, 0);
      sketch_4.background(255);
      sketch_4.strokeWeight(2);

      sketch_4.rotateY(angle);
      sketch_4.stroke(255, 235, 59);
      sketch_4.fill(121, 85, 72);
      sketch_4.ellipse(0, -120, 50, 50);
      sketch_4.fill(255, 111, 0);

      sketch_4.push();
      sketch_4.translate(0, -120, 0);
      for (var i = 0; i < 20; i++) {
        var _x = 30 * Math.cos(radians(i));
        var _y = 30 * Math.sin(radians(i));
        sketch_4.beginShape();
        sketch_4.vertex(_x, _y, 0);
        sketch_4.bezierVertex(-50, -250, -20, 120, -200, -10, _x, _y, 0);
        sketch_4.rotateZ(1);
        sketch_4.endShape();
      }
      sketch_4.pop();

      sketch_4.fill(62, 39, 35);
      sketch_4.stroke(0, 0, 0);

      sketch_4.beginShape();
      sketch_4.vertex(0, -40, -5);
      sketch_4.quadraticVertex(0, 300, -5, 100, 280, -5);
      sketch_4.quadraticVertex(0, 250, -5, 0, -40, -5);
      sketch_4.endShape();

      sketch_4.fill(0, 77, 64);

      sketch_4.beginShape();
      sketch_4.curveVertex(10, 150, -4);
      sketch_4.curveVertex(10, 150, -4);
      sketch_4.curveVertex(60, 80, -4);
      sketch_4.curveVertex(140, 100, -4);
      sketch_4.curveVertex(200, 100, -4);
      sketch_4.curveVertex(200, 110, -4);
      sketch_4.curveVertex(160, 140, -4);
      sketch_4.curveVertex(80, 160, -4);
      sketch_4.curveVertex(10, 150, -4);
      sketch_4.curveVertex(10, 150, -4);
      sketch_4.endShape();

      angle += 0.01;
    }

};

var myp5 = new p5(flower, 'sketch-3');