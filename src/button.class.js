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
		this.isFull = ()=>{console.log('Pas de fonction définit')};

		if (typeof arg == 'object') {
			for (let prop in arg){
				if(this[prop]) this[prop] = arg[prop];
			}
		}

	}

	render(){
		
		utils.drawCircle(ctx,this.coord,this.loadRadius,this.loadColor)
		utils.drawCircle(ctx,this.coord,this.radius,this.color)
		
		ctx.fillStyle = 'white';
		ctx.font = "2em calibri light";
		ctx.textAlign = "center"; 		
		ctx.fillText(this.title,this.coord.x,this.coord.y);
	}

	onHover(coord){

		let dist = Math.sqrt(Math.pow(coord.x-this.coord.x,2)+Math.pow(coord.y-this.coord.y,2));

		if (dist<this.radius && this.loadRadius < this.radius){
			this.loadRadius+=2.5;
			if (this.loadRadius >= this.radius) this.isFull();
		}else{
			this.loadRadius -= 10;
			if (this.loadRadius<=0) this.loadRadius = 0;
		}
	}

	getPreset(){ return this.preset };
}