import * as soundManager from './soundManager';
//import Leap from 'leapjs';
//import * as leap_plugin from 'leapjs-plugins';
import * as canvas from './canvas';
import {coordTo2d,drawCircle} from './utils';

let ctx = canvas.getCtx();

let controller = Leap.loop({enableGestures: true}, (frame)=>{
	canvas.clear();

	frame.hands.forEach((hand) => {

		let leapPoint = hand.stabilizedPalmPosition;
		let coord = coordTo2d(frame,leapPoint);

		drawCircle(ctx,coord,40,'black');

		hand.fingers.forEach((finger) => {
			ctx.beginPath();
			finger.positions.forEach((position,index) =>{
					
				let colors = ['green','red','blue','orange','brown'];
				let coord = coordTo2d(frame,position);
					
				ctx.lineTo(coord.x,coord.y);
				ctx.stroke();	
				ctx.closePath();

				let color = colors[index%colors.length];

				drawCircle(ctx,coord,15,color);

			});
					
		});
	
	});
});

controller.on("gesture", (gesture,frame) => {
    let handIds = gesture.handIds;
    let fingersId = gesture.pointableIds;
    let hand;
    handIds.forEach((handId)=>{
    	hand = frame.hand(handId);
    });
    switch (gesture.type){
        case "keyTap":
        	soundManager.playKick();
    		console.log("keyTap",hand.type,hand.finger(fingersId));
            break;
        case "swipe":
    		console.log('swipe');
        break;
    }

});