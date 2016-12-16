import Menu from './menu.class';
import Button from './button.class';

let electric = new Button({
	title : 'Electric',
});

electric.set = 'electric';
electric.getSet = function(){return this.set;};

electric.coord.y = electric.radius+10;

let aqua = new Button({
	title : 'Aqua',
});

aqua.set = 'aqua';
aqua.getSet = function(){return this.set;};

aqua.coord.x -= aqua.radius*2+50;
aqua.coord.y = electric.coord.y;

let sandman = new Button({
	title : 'Sandman',
});

sandman.set = 'sandman';
sandman.getSet = function(){return this.set;};

sandman.coord.x -= aqua.coord.x+50;
sandman.coord.y = electric.coord.y;


let presetMenu = new Menu();

presetMenu.addButtons([aqua,electric]);

export default presetMenu;