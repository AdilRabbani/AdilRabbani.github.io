
var Fractals = function(sketch_){

    var points = [];
    var points_2 = [];
    var k;
    var j = 20;
    var numOfVertices = 5;
    var width;
    var sides;

    sketch_.setup = function()
    {
        width = document.getElementById('sketch-Fractals').offsetWidth;
        sketch_.createCanvas(width, width);
        setupSketch();

        sides = sketch_.createRadio();
        sides.option('3');
        sides.option('4');
        sides.option('5');
        sides.option('6');
        sides.option('7');
        sides.option('8');
        sides.option('9');
        sides.option('10');
        sides.value(numOfVertices.toString());
        sides.mouseClicked(changeNumOfVertices);
    }

    sketch_.draw = function()
    {

        k = 1 / j;

        var len_ = points.length;

        if (j > 4000/numOfVertices)
        {
            sketch_.fill(255, 255, 255, 210);
        }

        sketch_.beginShape();
        for (var i = 1; i < numOfVertices + 1; i++)
        {
            points_2[i - 1] = [points[(i - 1) % len_][0] + k * (points[((i - 1) + 1) % len_][0] - points[(i - 1) % len_][0]) , points[(i - 1) % len_][1] + k * (points[((i - 1) + 1) % len_][1] - points[(i - 1) % len_][1])];
            sketch_.vertex(points[(i - 1) % len_][0] + k * (points[((i - 1) + 1) % len_][0] - points[(i - 1) % len_][0]) , points[(i - 1) % len_][1] + k * (points[((i - 1) + 1) % len_][1] - points[(i - 1) % len_][1]));
        }
        sketch_.endShape(CLOSE);
        points = points_2;
        j = j + 1;

    }

    function changeNumOfVertices()
    {
        numOfVertices = parseInt(sides.value());
        setupSketch();
    }

    function setupSketch()
    {
        sketch_.background(30);
        sketch_.stroke(255, 255, 255, 100);
        sketch_.strokeWeight(2);
        sketch_.noFill();

        points = [];
        points_2 = [];
        k = 1;
        j = 20;

        for (var i = 0; i < numOfVertices; i++)
        {
            points_2[i] = 0;
        }

        var doublePi = 2.0 * 3.14159265;
        sketch_.beginShape();
        for (var i = 0; i < numOfVertices; i++)
        {
            var x = width/2 + width/2.5 * Math.cos(i * (doublePi/numOfVertices));
            var y = width/2 + width/2.5 * Math.sin(i * (doublePi/numOfVertices));
            sketch_.vertex(x, y);
            points.push([x, y]);
        }
        sketch_.endShape(CLOSE);
    }

};

var myp5 = new p5(Fractals, 'sketch-Fractals');