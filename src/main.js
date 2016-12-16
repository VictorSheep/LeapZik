import * as canvas from './canvas';
import * as leap_plugin from 'leapjs-plugins';
import soundManager from './soundManager';
import Leap from 'leapjs';
import mainMenu from './mainmenu';
import presetMenu from './presetMenu';
import onGesture from './gesture';
import Texte from './text.class';
import {coordTo2d,drawCircle} from './utils';
import sampleTrigger from './sampleTrigger'

let ctx = canvas.getCtx();

let titre = new Texte();

titre.coord.y = 75;

console.log(titre);
let controller = Leap.loop({enableGestures: true}, (frame)=>{
	

	canvas.clear();

	presetMenu.render()
	
	mainMenu.render();
	
	if (canvas.getState() == 'experience') sampleTrigger.render();
	
	if (canvas.getState() == 'mainmenu') titre.render();
	
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

		hand.fingers.forEach((finger,index) => {
			
			let leapPoint = finger.stabilizedTipPosition;
			let coord = coordTo2d(frame,leapPoint);

			let colors = ['#100A28','#B377D7','#461F72','#8437A7','#16143F'];
			let color = colors[index%colors.length];

			if (canvas.getState() == 'experience'){
				sampleTrigger.onTap(coord,()=>{
					let coord = sampleTrigger.getCoord();
					let radius = sampleTrigger.getRadius();
					console.log(radius);
					soundManager.playSampleByFinger(hand,finger);
					if (!soundManager.getSampleState(hand,finger)) {
						drawCircle(ctx,coord,radius,color);
					}
					soundManager.setSampleStateByFinger(hand,finger,true);
				}, ()=>{
					soundManager.setSampleStateByFinger(hand,finger,false);
				});
			}

			ctx.beginPath();


			finger.positions.forEach((position) =>{
				
				let coord = coordTo2d(frame,position);
					
				ctx.lineTo(coord.x,coord.y);
				ctx.stroke();	
				ctx.closePath();


				drawCircle(ctx,coord,15,color);
			});
					
		});

		lastHandCoord = coord;
	});



  if(frame.valid && frame.gestures.length > 0 && canvas.getState() != 'mainmenu') {
  	onGesture(frame);
  }	

});
