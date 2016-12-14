let canvas = document.getElementById('drawZone');

let state = 'mainmenu';

let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export function getCanvas(){ return canvas; }
export function getWidth() { return canvas.width; }
export function getHeight(){ return canvas.height; }
export function getCtx()   { return ctx; }
export function clear()    { ctx.clearRect(0, 0, canvas.width, canvas.height); }
export function changeState(arg)    { state = arg }
export function getState()    { return state }
