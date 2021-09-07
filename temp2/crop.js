let foto,canvas,ctx,c_tmp,ctx_tmp;
let x,y,w,sx,sy,sw,xa,ya,wa;

function init(){
foto = document.querySelector('#foto');
canvas = document.querySelector('#canvasfoto');
canvas.height = foto.naturalHeight * (foto.width/foto.naturalWidth);
canvas.width = foto.width;
ctx = canvas.getContext("2d");
ctx.drawImage(foto,0,0,foto.naturalWidth,foto.naturalHeight);
cropRect();
}

function cropRect(){
    let xdom = document.querySelector("#x");
    let ydom = document.querySelector("#y");
    x = xdom.value; y = ydom.value;
    w = document.querySelector("#w").value;
    document.querySelector("#w").max = canvas.height ;
    xdom.max = canvas.width-w;
    ydom.max = canvas.height-w;
    h = w;
    if(parseInt(x)+parseInt(w)>=parseInt(canvas.width)){
        x = canvas.width-w;
        xdom.value = x;
    } 
    if(parseInt(y)+parseInt(w)>=parseInt(canvas.height)){
        y = canvas.height-w;
        ydom.value = y;
    } 
    
    ctx.clearRect(sx-2,sy-2,sw+4,sw+4);
    ctx.drawImage(foto,0,0,canvas.width,canvas.height);
    let per = foto.naturalHeight/canvas.height;
    xa = x * per;ya = y * per;wa = w * per;
    document.getElementById("crop").getContext("2d").drawImage(foto,xa,ya,wa,wa,0,0,150,150);
    ctx.strokeRect(x,y,w,w);
    sx = x; sy = y; sw = w;
}

c_tmp = document.createElement("canvas");
	c_tmp.setAttribute("width",800);
	c_tmp.setAttribute("height",450);
	ctx_tmp = c_tmp.getContext("2d");

function makeIMG(){
    //drawImage format => foto, sx, sy, sWidth, sHeight, dx, dy,dWidth, dHeight. where s = source, d = destination
    let ukuran = 900;
    ctx_tmp.drawImage(foto, sx, sy, sw, sw, 0, 0,ukuran,ukuran);
    ft_ = ctx_tmp.getImageData(0,0,sw,sw);
    imgblob = new Blob(ft_, {"type":"image/png"});
    imgBlobURL = URL.createObjectURL(imgblob);
}

document.addEventListener("DOMContentLoaded", ()=>{
    init();
});
