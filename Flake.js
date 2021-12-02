class Flake {
	constructor(pos, vel, size) {
		this.pos = pos;
		this.vel = vel;
		this.size = size;
	}
	show() {
		push();
		screen.fill(255, 155);
		screen.noStroke();
		screen.ellipse(this.pos.x-50,this.pos.y,this.size, this.size);
		screen.ellipse(this.pos.x+50,this.pos.y,this.size, this.size);
		screen.ellipse(this.pos.x,this.pos.y-50,this.size, this.size);
		screen.ellipse(this.pos.x,this.pos.y+50,this.size, this.size);
		pop();
	}
	move() {
		this.pos.add(this.vel);
		this.vel.y += this.size * 0.001;
		this.vel.x -= this.size * 0.001;
	}
	wrap() {
		if (this.pos.y > height+50) {
			this.pos.x = random(width);
			this.pos.y = random(-height / 2, 0);
			this.vel.mult(0.5);
		}
		if (this.pos.x < 0) this.pos.x = screen.width;
		if (this.pos.x > screen.width) this.pos.x = 0;
		this.vel.x -= this.size * ((width / 2) - mouseX) / 100000;

	}
}