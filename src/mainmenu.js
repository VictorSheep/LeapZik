import * as canvas from './canvas';
import * as utils from './utils';

let ctx = canvas.getCtx();

let titre = 100;

let circleCoord = {
	x: canvas.getWidth()/2,
	y: titre+300,
};

let	loadRadius = 0;

export default { 
	
	render(){
		ctx.fillStyle = 'white';
		ctx.font="5em calibri";
		ctx.textAlign="center"; 
		ctx.fillText("LeapZik",canvas.getWidth()/2,titre);
		
		utils.drawCircle(ctx,circleCoord,252,'rgba(255,255,255,.9)')
		utils.drawCircle(ctx,circleCoord,loadRadius,'rgba(60,90,130,1)')
		utils.drawCircle(ctx,circleCoord,250,'rgba(0,0,0,.8)')
		
		ctx.fillStyle = 'white';
		ctx.font = "3em calibri light";
		ctx.textAlign = "center"; 		
		ctx.fillText("Commencer",canvas.getWidth()/2,circleCoord.y);
	},

	buttonHover(coord){
		if (coord.x-circleCoord.x<252 && loadRadius < 250){
			loadRadius+=2.5;
			if (loadRadius >= 250) canvas.changeState('experience');
		}else{
			loadRadius -= 10;
			if (loadRadius<=0) loadRadius = 0;
		}
	}
}