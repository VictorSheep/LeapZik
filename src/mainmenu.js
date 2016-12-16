import Menu from './menu.class';
import Button from './button.class';
import * as canvas from './canvas';

let mainMenu = new Menu();

let commencer = new Button({
	title : 'Commencer',
	radius : 250,
})



mainMenu.addButtons([commencer]);

mainMenu.actived();

export default mainMenu;