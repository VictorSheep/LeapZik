import Button from './button.class';
import soundManager from './soundManager';

let sampleTrigger = new Button({
	title : '',
	radius : 400,
	onTap : (hand,finger) => {
		soundManager.playSampleByKeyTap(hand,finger);		
	},
})

sampleTrigger.coord.y = window.innerHeight+200;

export default sampleTrigger;