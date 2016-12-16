import Menu from './menu.class';
import Button from './button.class';

let electric = new Button({
	title : 'Electric',
	radius : 60,
});

electric.set = 'electric';
electric.getSet = function(){return this.set;};

electric.coord.y = electric.radius+10;
electric.coordTitle.y = electric.coord.y;

let aqua = new Button({
	title : 'Aqua',
	radius : 60,
});

aqua.set = 'aqua';
aqua.getSet = function(){return this.set;};

aqua.coord.x = (electric.coord.x-electric.radius)-75;
aqua.coord.y = electric.coord.y;

aqua.coordTitle.x = aqua.coord.x;
aqua.coordTitle.y = aqua.coord.y;

let sandman = new Button({
	title : 'Sand',
	radius : 60,
});

sandman.set = 'sandman';
sandman.getSet = function(){return this.set;};

sandman.coord.x = (electric.coord.x+electric.radius)+75;
sandman.coord.y = electric.coord.y;

sandman.coordTitle.x = sandman.coord.x;
sandman.coordTitle.y = sandman.coord.y;

let presetMenu = new Menu();

presetMenu.addButtons([aqua,electric,sandman]);

export default presetMenu;