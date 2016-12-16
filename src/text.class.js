import * as canvas from './canvas';

let ctx = canvas.getCtx();

export default class{
	constructor(arg){
		this.content = 'LeapZik';
		this.coord = {
			x: canvas.getWidth()/2,
			y:0,
		};
		this.color = [255,255,255];
		this.blink = false;
		this.alpha = 1;
		this.size = '5em';
		if (typeof arg == 'object') {
			for (let prop in arg){
				if(this[prop]) this[prop] = arg[prop];
			}
		}

	}

	render(){		
		ctx.fillStyle = 'rgba('+this.color[0]+','+this.color[1]+','+this.color[2]+','+this.alpha+')';
		ctx.font = this.size+" calibri light";
		ctx.textAlign = "center"; 		
		ctx.fillText(this.content,this.coord.x,this.coord.y);

		if (this.blink) {
			if (this.alpha<=0 ||this.alpha>=1) this.addAlpha *=-1;
			this.alpha += this.addAlpha;
		};
	}
} 