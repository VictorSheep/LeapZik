import Button from './button.class';

let sampleTrigger = new Button({
	title : '',
	radius : 400,
	color : '#121E22'
})

sampleTrigger.blink = true;

sampleTrigger.coord.y = window.innerHeight+200;
sampleTrigger.coordTitle.y = sampleTrigger.coord.y - 250;

export default sampleTrigger;