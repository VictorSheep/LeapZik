import Menu from './menu.class';
import Button from './button.class';
import soundManager from './soundManager';

let aqua = new Button({
	title : 'Aqua',
	isFull : () => {soundManager.loadSet('aqua');presetMenu.desactived()},
})
aqua.coord.x -= aqua.radius*2+50;
aqua.coord.y = aqua.radius+10;

let electric = new Button({
	title : 'Electric',
	isFull : () => {soundManager.loadSet('electric');presetMenu.desactived()},
});

electric.coord.y = electric.radius+10;

let presetMenu = new Menu();

presetMenu.addButtons([aqua,electric]);

export default presetMenu;