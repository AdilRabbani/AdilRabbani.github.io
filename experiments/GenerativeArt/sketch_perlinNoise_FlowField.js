var perlinFf = function(sketch_){

var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;

function Particle()
{
	this.pos = sketch_.createVector(random(width),random(height));
	this.vel = sketch_.createVector(0,0);
	this.acc = sketch_.createVector(0,0);
	this.maxspeed = 2;
	this.prevPos = this.pos.copy();
	this.h = 0;
	this.a = 10;

	this.update = function()
	{
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.follow = function(vectors)
	{
		var x = floor(this.pos.x / scl);
		var y = floor(this.pos.y / scl);
		var index = x + y * cols;
		var force = vectors[index];
		this.applyForce(force);
	}

	this.applyForce = function(force)
	{
		this.acc.add(force);
	}

	this.show = function()
	{
		sketch_.stroke(this.h, 255, 255, this.a);
		this.h = this.h + 1;
		this.a = this.a + 1;
		if (this.h > 255) {
			this.h = 0;
		}
		if (this.a > 50) {
			this.a = 10;
		}
		sketch_.line(this.pos.x , this.pos.y , this.prevPos.x, this.prevPos.y);
		this.updatePrev();
	}

	this.updatePrev = function()
	{
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}

	this.edges = function()
	{
		if (this.pos.x > sketch_.width){ 
			this.pos.x = 0;
			this.updatePrev();
		}
		if (this.pos.x < 0) {
			this.pos.x = sketch_.width;
			this.updatePrev();
		}
		if (this.pos.y > sketch_.height) {
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0){
		 this.pos.y = sketch_.height;
		 this.updatePrev();
		}
	}
}

sketch_.setup = function()
{
	width_ = document.getElementById('sketch-PerlinNoiseFlowField').offsetWidth;
    sketch_.createCanvas(width_, width_);
	sketch_.colorMode(sketch_.HSB, 255);
	cols = floor(sketch_.width / scl);
	rows = floor(sketch_.height / scl);

	flowfield = new Array(cols * rows);

	for (var i = 0; i < 500; i++)
	{
		particles[i] = new Particle();
	}

	sketch_.background(30, 30, 30, 50);
	sketch_.strokeWeight(1);

}

sketch_.draw = function()
{
	var yoff = 0;

	for (var y = 0; y < rows; y++)
	{
		var xoff = 0;

		for (var x = 0; x < cols; x++)
		{
			var index = (x + y * cols);
			var angle = sketch_.noise(xoff, yoff , zoff) * TWO_PI * 2;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(1);
			flowfield[index] = v;
			xoff += inc;
			sketch_.stroke(0, 50);

		}
		yoff += inc;
		zoff += 0.0003;
	}

	for (var i = 0 ; i < particles.length; i++)
	{
		particles[i].follow(flowfield);
		particles[i].update();
		particles[i].edges();
		particles[i].show();
	}

}

};

var myp5 = new p5(perlinFf, 'sketch-PerlinNoiseFlowField');