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
let x1 = 0;
let y1 = 10;
let x2 = 4;
let y2 = 14;
let xR = true;
let yD = true;

let TRUE_PIXELS = 576;
let FAKE_PIXELS = 72;
let PS = TRUE_PIXELS / FAKE_PIXELS;

import P5Behavior from 'p5beh';

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

pb.draw = function (floor, p) {
  /* this == pb.p5 == p */
  // draw here...
  this.clear();
	// for (let u of floor.users) {
    // pb.drawUser(u);
  // }
  // this.fill(128, 128, 128, 128);
	this.stroke('blue');
	this.line(x1*PS, y1*PS, x2*PS, y2*PS);

	// MOVE THE LINE
	if (xR && FAKE_PIXELS <= x2+2) { xR = false; }
	if (yD && FAKE_PIXELS <= y2+2) { yD = false; }
	if (!xR && 0 >= x2-1) { xR = true; }
	if (!yD && 0 >= y2-1) { yD = true; }

	x1 = xR ? x1+1 : x1-1;
	y1 = yD ? y1+1 : y1-1;
	x2 = xR ? x2+1 : x2-1;
	y2 = yD ? y2+1 : y2-1;
  // this.noStroke();
  // pb.drawSensors(floor.sensors);
};

export const behavior = {
  title: "Laser Beams",
  init: pb.init.bind(pb),
  frameRate: 1,
  render: pb.render.bind(pb),
  numGhosts: 4
};
export default behavior
