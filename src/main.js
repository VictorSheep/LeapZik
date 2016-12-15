import * as canvas from './canvas';
import * as leap_plugin from 'leapjs-plugins';
import Leap from 'leapjs';
import mainMenu from './mainmenu';
import presetMenu from './presetMenu';
import onGesture from './gesture';
import {coordTo2d,drawCircle} from './utils';

let ctx = canvas.getCtx();

let controller = Leap.loop({enableGestures: true}, (frame)=>{
	
	canvas.clear();

	presetMenu.render()
	
	mainMenu.render();
	
  		
	let lastHandCoord;
	frame.hands.forEach((hand) => {

		let leapPoint = hand.stabilizedPalmPosition;
		let coord = coordTo2d(frame,leapPoint);

		if (canvas.getState() == 'mainmenu') {

			mainMenu.getAllButtons()[0].onHover(coord);

		}else if(canvas.getState() == 'experience' && presetMenu.isActive()){
			presetMenu.getAllButtons().forEach((button)=>{
				button.onHover(coord);
			});
		}
		
		drawCircle(ctx,coord,40,'black');

		if (typeof lastHandCoord === 'object' && Math.abs(coord.x-lastHandCoord.x)<350){ 
			frame.gestures.push(
				{
					type : 'nearPalm',
					distance : Math.abs(coord.x-lastHandCoord.x)
				}
			);
		}

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

		lastHandCoord = coord;
	});



  if(frame.valid && frame.gestures.length > 0 && canvas.getState() != 'mainmenu') {
  	onGesture(frame);
  }	

});
