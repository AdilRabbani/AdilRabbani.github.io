function Particle()
{
	this.pos = sketch_.createVector(random(width),random(height));
	this.vel = sketch_.createVector(0,0);
	this.acc = sketch_.createVector(0,0);
	this.maxspeed = 2;
	this.prevPos = this.pos.copy();
	this.h = 0;
	this.a = 10;
	this.sWeight = 1;

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
		stroke(this.h, 255, 255, this.a);
		this.h = this.h + 1;
		this.a = this.a + 1;
		if (this.h > 255) {
			this.h = 0;
		}
		if (this.a > 150) {
			this.a = 10;
		}
		strokeWeight(this.sWeight);
		this.sWeight = this.sWeight + 1;
		if (this.sWeight > 3) {
			this.sWeight = 1;
		}
		line(this.pos.x , this.pos.y , this.prevPos.x,this.prevPos.y);
		this.updatePrev();
	}

	this.updatePrev = function()
	{
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}

	this.edges = function()
	{
		if (this.pos.x > width){ 
			this.pos.x = 0;
			this.updatePrev();
		}
		if (this.pos.x < 0) {
			this.pos.x = width;
			this.updatePrev();
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0){
		 this.pos.y = height;
		 this.updatePrev();
		}
	}
}