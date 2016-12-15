import * as utils from './utils';

const DURATION = 2500;

export default class{

	constructor(){
		this.active = false;
		this.listButtons = [];	
	}

	addButtons(buttons){
		this.listButtons = buttons;
	}

	activedAlong(){ 
		if (!this.isActive()){
			this.actived()
			setTimeout(()=>{this.desactived()},DURATION);
		}
	}

	isActive(){
		return this.active;
	}

	render(){
		if (!this.isActive()) return;
		for (var i = 0; i <this.listButtons.length; i++) {
			this.listButtons[i].render();
		}
	}

	getButton(id){
		return this.listButtons[id];
	}

	getAllButtons(){
		return this.listButtons;
	}

	actived(){
		this.active = true;
	}

	desactived(){
		this.active = false;
	}	
}