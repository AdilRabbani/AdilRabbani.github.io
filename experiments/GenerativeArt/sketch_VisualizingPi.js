var vPi = function(sketch_) {

var pi;
var sdigits = [];
var counts = [];
var currentIndex = 0;

sketch_.preload = function()
{
    pi = sketch_.loadStrings("one-million.txt");
}

sketch_.setup = function()
{
    sketch_.createCanvas(900, 900);
    sketch_.background(30);
    for (var i = 1; i < pi.length; i++)
    {
        for (var j = 0; j < pi[i].length; j++)
        {
            sdigits.push(parseInt(pi[i][j]));
        }
    }

    for (var i = 0; i < 10; i++)
    {
        counts[i] = 0;
    }

    sketch_.stroke(255);
    sketch_.noFill();
    sketch_.translate(sketch_.width/2 , sketch_.width/2);
    sketch_.strokeWeight(1);
    console.log("hello");
}

sketch_.draw = function()
{
    sketch_.translate(sketch_.width/2 , sketch_.width/2);
    var currentDigit = sdigits[currentIndex];
    var nextDigit = sdigits[currentIndex + 1];
    currentIndex++;

    var diff = sketch_.TWO_PI/10;
    var diff_2 = sketch_.TWO_PI;

    var a1 = sketch_.map(currentDigit, 0, 10, 0, sketch_.TWO_PI) + random(-diff, diff);
    var a2 = sketch_.map(nextDigit, 0, 10, 0, sketch_.TWO_PI) + random(-diff, diff);

    var b1 = sketch_.map(currentDigit, 0, 10, 0, sketch_.TWO_PI) + random(-diff_2, diff_2);

    if (currentDigit == 9)
    {
        sketch_.stroke(29, 233, 182, 50);
        if (currentDigit == nextDigit)
        {
            sketch_.fill(29, 233, 182, 100);
            sketch_.ellipse(((sketch_.height/2.5) - 90) * cos(b1),((sketch_.height/2.5) - 90) * sin(b1), 5, 5);
            sketch_.noFill();
        }
    }

    else if (currentDigit == 8)
    {
        sketch_.stroke(69, 90, 100, 50);
        if (currentDigit == nextDigit)
        {
            sketch_.fill(69, 90, 100, 100);
            sketch_.ellipse(((sketch_.height/2.5) - 80) * cos(b1),((sketch_.height/2.5) - 80) * sin(b1), 5, 5);
            sketch_.noFill();
        }
    }

    else if (currentDigit == 7)
    {
        sketch_.stroke(221, 44, 0, 50);
        if (currentDigit == nextDigit)
        {
            sketch_.fill(221, 44, 0, 100);
            sketch_.ellipse(((sketch_.height/2.5) - 70) * cos(b1),((sketch_.height/2.5) - 70) * sin(b1), 5, 5);
            sketch_.noFill();
        }
    }

    else if (currentDigit == 6)
    {
        sketch_.stroke(255, 111, 0, 50);
        if (currentDigit == nextDigit)
        {
            sketch_.fill(255, 111, 0);
            sketch_.ellipse(((sketch_.height/2.5) - 60) * cos(b1),((sketch_.height/2.5) - 60) * sin(b1), 5, 5);
            sketch_.noFill();
        }
    }

    else if (currentDigit == 5)
    {
        sketch_.stroke(238, 255, 65, 50);
        if (currentDigit == nextDigit)
        {
            sketch_.fill(238, 255, 65, 100);
            sketch_.ellipse(((sketch_.height/2.5) - 50) * cos(b1),((sketch_.height/2.5) - 50) * sin(b1), 5, 5);
            sketch_.noFill();
        }
    }

    else if (currentDigit == 4)
    {
        sketch_.stroke(233, 30, 99, 50);
        if (currentDigit == nextDigit)
        {
            sketch_.fill(233, 30, 99, 100);
            sketch_.ellipse(((sketch_.height/2.5) - 40) * cos(b1),((sketch_.height/2.5) - 40) * sin(b1), 5, 5);
            sketch_.noFill();
        }
    }
    else if (currentDigit == 3)
    {
        sketch_.stroke(156, 39, 176, 50);
        if (currentDigit == nextDigit)
        {
            sketch_.fill(156, 39, 176, 100);
            sketch_.ellipse(((sketch_.height/2.5) - 30) * cos(b1),((sketch_.height/2.5) - 30) * sin(b1), 5, 5);
            sketch_.noFill();
        }
    }
    else if (currentDigit == 2)
    {
        sketch_.stroke(21, 101, 192, 100);
        if (currentDigit == nextDigit)
        {
            sketch_.fill(21, 101, 192);
            sketch_.ellipse(((sketch_.height/2.5) - 20) * cos(b1),((sketch_.height/2.5) - 20) * sin(b1), 5, 5);
            sketch_.noFill();
        }
    }
    else if (currentDigit == 1)
    {
        sketch_.stroke(0, 105, 92, 50);
        if (currentDigit == nextDigit)
        {
            sketch_.fill(0, 105, 92, 100);
            sketch_.ellipse(((sketch_.height/2.5) - 10) * cos(b1),((sketch_.height/2.5) - 10) * sin(b1), 5, 5);
            sketch_.noFill();
        }
    }

    var x1 = ((sketch_.height/2.5) - 100) * cos(a1);
    var y1 = ((sketch_.height/2.5) - 100) * sin(a1);
    var x2 = ((sketch_.height/2.5) - 100) * cos(a2);
    var y2 = ((sketch_.height/2.5) - 100) * sin(a2);

    sketch_.line(x1, y1, x2, y2);
}

};

var myp5 = new p5(vPi, 'sketch-VisualizingPi');