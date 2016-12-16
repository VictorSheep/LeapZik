import * as canvas from './canvas';
import * as leap_plugin from 'leapjs-plugins';
import soundManager from './soundManager';
import Leap from 'leapjs';
import mainMenu from './mainmenu';
import presetMenu from './presetMenu';
import onGesture from './gesture';
import guide from './guide';
import Texte from './text.class';
import sampleTrigger from './sampleTrigger'
import {coordTo2d,drawCircle} from './utils';

let ctx = canvas.getCtx();

let titre = new Texte();

titre.coord.y = 75;

let guideText = new Texte();

guideText.coord.y = window.innerHeight/2;
guideText.size = '2em';

/*Boucle du Leap Motion*/
let controller = Leap.loop({enableGestures: true}, (frame)=>{
	/*On efface le canvas*/
	canvas.clear();
	/*On dessine le menu des set d'ambiance*/
	presetMenu.render()
	/*On dessine le menu principale*/
	mainMenu.render();
	/*Dessine le bouton permettant de jouer un jeu si nous somme dans la bonne State*/
	if (canvas.getState() == 'experience') sampleTrigger.render();
	/*On dessine le titre de la WebApp si on est dans le menu principale*/
	if (canvas.getState() == 'mainmenu') titre.render();
	
	/*Garde en memoire les donnée de la main precedente*/
	let lastHandCoord;

	/*Boucle pour chaque main*/
	frame.hands.forEach((hand) => {

		let leapPoint = hand.stabilizedPalmPosition;
		let coord = coordTo2d(frame,leapPoint);
		
		if (canvas.getState() == 'mainmenu') {
			/*Desactive et change la State de la Web App en callback de l'event Hover du bouton*/
			mainMenu.getButton(0).onHover(coord,()=>{
				mainMenu.desactived();
				canvas.changeState('experience');
			});

		}else if(canvas.getState() == 'experience'){
			/*Si le menu des ambiances est activée*/
			if(presetMenu.isActive()){
				/*Pour chaque bouton, on verifie l'etat hover du boutton et et execute le callback*/
				presetMenu.getAllButtons().forEach((button)=>{
					button.onHover(coord,()=>{
						soundManager.loadSet(button.getSet());
						presetMenu.desactived();
					});
				});

			}


			if(hand.type=='right'){
				/*Permet de modifier le filtre en fonction de la position de la main droite*/
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

			let colors = ['#100A28','#16143F','#461F72','#8437A7','#B377D7'];
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
					if (guide.etat == 0) {
						guide.etat++;
						setTimeout(()=>{
							guide.etat++;
							setTimeout(()=>{
								guide.etat++;
								setTimeout(()=>{
									guide.etat++;
								},5000)
							},10000)
						},5000)
					}
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


  if (canvas.getState() == 'experience' && guide.etat<guide.message.length) {

  	guideText.color = '#B377D7';
  	guideText.content = guide.message[guide.etat];
  	guideText.render();
  }

  if(frame.valid && frame.gestures.length > 0 && canvas.getState() != 'mainmenu') {
  	onGesture(frame);
  }	


});
