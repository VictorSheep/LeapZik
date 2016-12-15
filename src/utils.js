import * as canvas from './canvas';

function coordTo2d(frame,leapPoint){

	let iBox = frame.interactionBox;
	let normalizedPoint = iBox.normalizePoint(leapPoint, true);

	let x = normalizedPoint[0] * canvas.getWidth();
	let y = (1 - normalizedPoint[1]) * canvas.getHeight();

	return {x,y};
}

function drawCircle(ctx,coord,radius,color){
	ctx.beginPath();
	ctx.arc(coord.x, coord.y, radius, 0, Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();	
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

export {coordTo2d, drawCircle, sleep};