import * as canvas from './canvas';
import * as leap_plugin from 'leapjs-plugins';
import soundManager from './soundManager';
import Leap from 'leapjs';
import mainMenu from './mainmenu';
import presetMenu from './presetMenu';
import onGesture from './gesture';
import {coordTo2d,drawCircle} from './utils';
import sampleTrigger from './sampleTrigger'

let ctx = canvas.getCtx();

let controller = Leap.loop({enableGestures: true}, (frame)=>{
	
	canvas.clear();

	presetMenu.render()
	
	mainMenu.render();

	if (canvas.getState() == 'experience') sampleTrigger.render();


	let lastHandCoord;
	frame.hands.forEach((hand) => {

		let leapPoint = hand.stabilizedPalmPosition;
		let coord = coordTo2d(frame,leapPoint);
		
		if (canvas.getState() == 'mainmenu') {

			mainMenu.getButton(0).onHover(coord,()=>{
				mainMenu.desactived();
				canvas.changeState('experience');
			});

		}else if(canvas.getState() == 'experience'){
			
			if(presetMenu.isActive()){
			
				presetMenu.getAllButtons().forEach((button)=>{
					button.onHover(coord,()=>{
						soundManager.loadSet(button.getSet());
						presetMenu.desactived();
					});
				});

			}

			if(hand.type=='right'){
				soundManager.editFilterEqByPosition(coord);
			};				

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
			
			let leapPoint = finger.stabilizedTipPosition;
			let coord = coordTo2d(frame,leapPoint);
			
			if (canvas.getState() == 'experience'){
				sampleTrigger.onTap(coord,()=>{
					soundManager.playSampleByFinger(hand,finger);
					soundManager.setSampleStateByFinger(hand,finger,true);
					console.log('Dedans');
				}, ()=>{
					soundManager.setSampleStateByFinger(hand,finger,false);
					console.log('Hors');
				});
			}

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
