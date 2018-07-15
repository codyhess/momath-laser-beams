/* MoMath Hackathon Math Square Laser Beams
 *
 *        Title: Laser Beams
 *  Description: Users can direct laser beam bounces.
 * Scheduler ID: 
 *    Framework: P5
 *       Author: Team Banjo Kelele
 *      Created: 2018-07
 *       Status: does not works
 */
import P5Behavior from 'p5beh';
import * as Display from 'display';

const pb = new P5Behavior();

// for WEBGL: pb.renderer = 'webgl';

pb.preload = function (p) {
  /* this == pb.p5 == p */
  // ...
}

pb.setup = function (p) {
  /* this == pb.p5 == p */
  /* P5Behavior already calls createCanvas for us */
  // setup here...
};


let LEVEL_SIZE = 18;
let BLOCK_SIZE = Display.width / LEVEL_SIZE;
let BS = BLOCK_SIZE;

let Beam = (x, y, xR, yD, color) => {
	return {
		xR: xR,
		yD: yD,
		points: [
			[x,y],
			[x+(.5*xR*-1),y+(.5*yD*-1)],
			[x+(1*xR*-1),y+(1*yD*-1)],
			[x+(1.5*xR*-1),y+(1.5*yD*-1)],
			[x+(2*xR*-1),y+(2*yD*-1)],
			[x+(2.5*xR*-1),y+(2.5*yD*-1)],
		],
		scooch: function() {
			for (let i=this.points.length-1; i>=0; i--) {
				if (i === 0) {
					if (xR === 1 && this.points[i][0] > 17) {
						xR = -1;
						this.color = 'green';
					}
					if (yD === 1 && this.points[i][1] > 17) {
						yD = -1;
						this.color = 'red';
					}
					if (xR === -1 && this.points[i][0] < 1) {
						xR = 1;
						this.color = 'blue';
					}
					if (yD === -1 && this.points[i][1] < 1) {
						yD = 1;
						this.color = 'yellow';
					}

					this.points[i][0] = xR === 1 ? this.points[i][0]+.5 : this.points[i][0]-.5;
					this.points[i][1] = yD === 1 ? this.points[i][1]+.5 : this.points[i][1]-.5;
				} else {
					this.points[i][0] = this.points[i-1][0];
					this.points[i][1] = this.points[i-1][1];
				}
			}
		},
		color: color,
	}
}
let b1 = Beam(7, 4, 1, 1, 'blue');
let b2 = Beam(11, 3, -1, -1, 'yellow');
let b3 = Beam(9, 10, -1, 1, 'red');
let b4 = Beam(4, 8, 1, -1, 'green');

pb.draw = function (floor, p) {
	let drawBeam = (b) => {
		this.stroke(b.color);
		for (let i=0; i<b.points.length-1; i++) {
			this.line(
				(b.points[i][0]*BS)+16,
				(b.points[i][1]*BS),
				(b.points[i+1][0]*BS)+16,
				(b.points[i+1][1]*BS)
				);
			console.log(b.points[i][0]*BS);
		}
		b.scooch();
	}

  this.clear();
	drawBeam(b1);
	drawBeam(b2);
	drawBeam(b3);
	drawBeam(b4);
	for (let i=0; i<floor.users.length; i++) {
		continue;
	}
	b1.scooch();
	this.stroke('blue');
	this.line(0,0,0,575);
	this.stroke('yellow');
	this.line(0,0,575,0);
	this.stroke('red');
	this.line(0,575,575,575);
	this.stroke('green');
	this.line(575,0,575,575);

	let drawUser = (x, y) {
		this.line(x*BS, y*BS, x*BS+BS, y*BS);
		this.line(x*BS, y*BS, x*BS, y*BS+BS);
		this.line(x*BS+BS, y*BS+BS, x*BS+BS, y*BS);
		this.line(x*BS+BS, y*BS+BS, x*BS, y*BS+BS);
		this.line(x*BS, y*BS, x*BS+BS, y*BS+BS);
		this.line(x*BS, y*BS+BS, x*BS+BS, y*BS);
	}
	this.stroke('white');
	for (let i=0; i<floor.users.length; i++) {
		let u = floor.users[i];
	  let x = Math.floor(u.x / BLOCK_SIZE);
	  let y = Math.floor(u.y / BLOCK_SIZE);
		drawUser(x, y);
	}
};

export const behavior = {
  title: "Laser Beams",
  init: pb.init.bind(pb),
  frameRate: 4,
  render: pb.render.bind(pb),
  numGhosts: 4
};
export default behavior
