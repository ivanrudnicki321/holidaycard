let orient, ovel;
let logo, pro, keyboard, welcome, sketchbg;
let angle = 0;
let atarget = 0;
let zoom = 0.1;
let ztarget = 1;
let screen;
let tune;
let flakes = [];
let lightpos;
let greetings = [
	'Merry Christmas',
	'Joyeux Noël',
	'Fröhliche Weihnachten',
	'¡Feliz Navidad',
	'Buon Natale',
	'Feliz Natal',
	'C Рождеством',
	'Vrolijk Kerstfeest',
	'Glædelig Jul',
	'Hyvää Joulua',
	'Καλά Χριστούγεννα',
	'メリークリスマス',
	'圣诞节快乐'
];
let index = 0;
let vol = 0;

function preload() {
	logo = loadImage('Apple_Logo.svg');
	keyboard = loadImage('keyboard2.jpg');
	tune = loadSound('christmas.mp3');
	welcome = loadImage('opwelcome.PNG');
	pro = loadImage('macbookpro.png');
	sketchbg = loadImage('sketchbg.PNG');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	orient = createVector(-HALF_PI, 3 * PI, 0);
	otarget = createVector(0, 0, 0);
	lightpos = createVector(0, -2 * height, 0.25 * height)
	screen = createGraphics(0.75 * height, 0.48 * height);
	imageMode(CENTER);
	for (let i = 0; i < 100; i++) {
		let pos = createVector(random(width), random(-height, 0));
		let vel = createVector(random(-1, 1), 0);
		flakes.push(new Flake(pos, vel, random(2, 5)));
	}
}

function draw() {
	setScene();
	if (frameCount > 60) zoom = lerp(zoom, ztarget, 0.1);
	if (frameCount > 90) orient.lerp(otarget, 0.1);
	rotateX(orient.x - PI / 12);
	rotateY(orient.y);
	rotateZ(orient.z);
	translate(0, 0.2 * height, 0);
	drawBase();
	drawTop();
}

function setScene() {
	background(0);
	ambientLight(120);
	lightpos.x = lerp(lightpos.x, map(mouseX, 0, width, -width, width), 0.05);
	lightpos.y = lerp(lightpos.y, map(mouseY, 0, height, -2 * height, 2 * height), 0.05);
	pointLight(80, 80, 80, lightpos.x, lightpos.y, lightpos.z);
	scale(zoom);
	noStroke();
}

function drawBase() {
	push();
	specularMaterial(50);
	box(0.75 * height, 0.01 * height, 0.6 * height);
	box(0.8 * height, 0.01 * height, 0.55 * height);
	translate(0.375 * height, 0, 0.275 * height);
	cylinder(0.025 * height, 0.01 * height);
	translate(-0.75 * height, 0, 0);
	cylinder(0.025 * height, 0.01 * height);
	translate(0, 0, -0.55 * height);
	cylinder(0.025 * height, 0.01 * height);
	translate(0.75 * height, 0, 0);
	cylinder(0.025 * height, 0.01 * height);
	pop();
	push();
	specularMaterial(50);
	translate(0, -0.011 * height, -0.075 * height);
	texture(keyboard);
	rotateX(HALF_PI);
	plane(0.75 * height, 0.35 * height);
	translate(0, 0.27 * height, 0);
	specularMaterial(70);
	plane(0.25 * height, 0.17 * height);
	pop();
}

function drawTop() {
	push();
	specularMaterial(50);
	angle = lerp(angle, atarget, 0.1);
	translate(0, 0, -0.3 * height);
	translate(0, -0.005 * height, 0);

	rotateZ(HALF_PI);
	cylinder(0.005 * height, 0.65 * height);
	rotateZ(-HALF_PI);
	translate(0, -0.006 * height, 0);

	rotateX(angle);
	translate(0, 0, 0.3 * height);
	push();
	specularMaterial(50);
	box(0.75 * height, 0.01 * height, 0.6 * height);
	box(0.8 * height, 0.01 * height, 0.55 * height);
	translate(0.375 * height, 0, 0.275 * height);
	cylinder(0.025 * height, 0.01 * height);
	translate(-0.75 * height, 0, 0);
	cylinder(0.025 * height, 0.01 * height);
	translate(0, 0, -0.55 * height);
	cylinder(0.025 * height, 0.01 * height);
	translate(0.75 * height, 0, 0);
	cylinder(0.025 * height, 0.01 * height);
	pop();
	texture(logo);
	translate(0, -0.01 * height, 0);
	rotateX(-HALF_PI);
	rotateY(PI);
	plane(0.1 * height, 0.12 * height);
	rotateY(-PI);
	translate(0, 0, 0.02 * height);
	drawScreen();
	translate(0, -0.27 * height, 0.01);
	specularMaterial(0);
	ellipse(0, 0, 0.02 * height, 0.02 * height);
	translate(0, 0.54 * height, 0.01)
	texture(pro);
	plane(pro.width * 0.18, pro.height * 0.18);
	pop();
	checkKeys();
}

function keyPressed() {
	if (keyCode == 87) otarget.x += PI / 8;
	if (keyCode == 83) otarget.x -= PI / 8;
	if (keyCode == 65) otarget.z -= PI / 8;
	if (keyCode == 68) otarget.z += PI / 8;
	if (keyCode == RIGHT_ARROW) otarget.y += PI / 8;
	if (keyCode == LEFT_ARROW) otarget.y -= PI / 8;
	if (keyCode == UP_ARROW) ztarget *= 1.1;
	if (keyCode == DOWN_ARROW) ztarget *= 0.9;
}

function mouseDragged() {
	if (mouseY < (2 * height / 3)) atarget += (pmouseY - mouseY) / 100;
	else otarget.y -= (pmouseX - mouseX) / 200;
	atarget = constrain(atarget, 0, 0.6 * PI);
}

function checkKeys() {
	if (keyIsDown(32)) {
		otarget.mult(0.9);
		ztarget = lerp(ztarget, 1, 0.1);
	}
}

function drawScreen() {
	if (!tune.isPlaying() && !tune.isPaused()) {
		screen.background(welcome);
	} else {
		if (tune.isPlaying() && frameCount % 300 == 0) index = (index + 1) % greetings.length;
		screen.background(sketchbg);
		screen.fill(255);
		screen.textAlign(CENTER, CENTER);
		screen.textSize(0.065 * height);
		screen.text(greetings[index] + '!', (screen.width / 2) + lightpos.x / 20, (screen.height / 2) + lightpos.y / 15);
		for (let f of flakes) {
			f.show();
			f.move();
			f.wrap();
		}
	}
	tint(150, 150, 205);
	image(screen, 0, 0);
	vol = map(angle, 0, 0.35 * PI, 0, 1);
	tune.setVolume(vol);
	let x = map(lightpos.x, -width, width, -1.0, 1.0);
	tune.pan(x);
}

function mousePressed() {
	if (abs(width / 2 - mouseX) < height / 4 && atarget > PI / 4 && mouseY < (2 * height / 3)) {
		if (!tune.isPlaying()) {
			frameCount = 1;
			tune.play();
		} else {
			tune.stop();
		}
	}
}


