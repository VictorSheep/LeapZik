import * as canvas from './canvas';
import * as utils from './utils';

let ctx = canvas.getCtx();

export default class { 
	constructor(arg){
		this.title = 'Button';
		this.radius = 50;
		this.coord = {
			x: canvas.getWidth()/2,
			y: canvas.getHeight()/2,
		};
		this.color = 'rgba(0,0,0,.8)';
		this.loadRadius = 0;
		this.loadColor = 'rgba(60,90,130,1)';
		this.border = true;
		this.borderSize = 2;
		this.borderColor = 'rgba(255,255,255,1)';
		this.isHover = false;
		this.isTap = false;

		if (typeof arg == 'object') {
			for (let prop in arg){
				if(this[prop]) this[prop] = arg[prop];
			}
		}

	}

	render(){
		
		if (this.border) utils.drawCircle(ctx,this.coord,this.radius+this.borderSize,this.borderColor); 		
		
		utils.drawCircle(ctx,this.coord,this.loadRadius,this.loadColor)
		utils.drawCircle(ctx,this.coord,this.radius,this.color)
		
		ctx.fillStyle = 'white';
		ctx.font = "2em calibri light";
		ctx.textAlign = "center"; 		
		ctx.fillText(this.title,this.coord.x,this.coord.y);
	}

	getPreset(){ return this.preset; };
	getCoord(){ return this.coord; };
	getRadius(){ return this.radius; };

	onHover(coord,callback){

		let dist = Math.sqrt(Math.pow(coord.x-this.coord.x,2)+Math.pow(coord.y-this.coord.y,2));

		if (dist<this.radius && this.loadRadius < this.radius){
			this.isHover = true;
			this.loadRadius+=2.5;
			if (this.loadRadius >= this.radius) callback();
		}else if (this.isHover === false){
			this.loadRadius -= 10;
			if (this.loadRadius<=0) this.loadRadius = 0;
			this.isHover = false;
		} else {
			this.isHover = false;
		}
	}

	onTap(coord,callback,callbakck2){
		if(typeof callback != 'function') return;
		let dist = Math.sqrt(Math.pow(coord.x-this.coord.x,2)+Math.pow(coord.y-this.coord.y,2));

		if (dist<this.radius && this.loadRadius < this.radius){
			callback();
		}else{
			if(callbakck2) callbakck2();
		}
	}
}