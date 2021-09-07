let foto,canvas,ctx,ca_tmp,catx_tmp,f_ft;
let x,y,w,sx,sy,sw,xa,ya,wa,per;

function urln(){
	var files=document.getElementById("files");
	foto = document.querySelector('#foto');
    canvas = document.querySelector('#canvasfoto');
    document.querySelector("#wait").innerHTML = "Lagi ngeload Fotonya Bruh sabar cok...";
	var file=files.files;
	console.log(file);
	console.log(file[0]);
    fotoblob = URL.createObjectURL(file[0]);
	foto.src = fotoblob;
    console.log(fotoblob);
    setTimeout(()=>{
        if(foto.naturalWidth>foto.naturalHeight){
            foto.width = 500;
            foto.height = foto.width * (foto.naturalHeight/foto.naturalWidth);
            } else {
                foto.height = 500;
                foto.width = foto.height * (foto.naturalWidth/foto.naturalHeight); 
            }
            document.querySelector("#wait").innerHTML = "";
    canvas.height = foto.naturalHeight * (foto.width/foto.naturalWidth);
    canvas.width = foto.width;
    ctx = canvas.getContext("2d");
    ctx.drawImage(foto,0,0,canvas.width,canvas.height);
    if(canvas.height>canvas.width){
        document.querySelector("#w").max = canvas.width ;
        } else {
            document.querySelector("#w").max = canvas.height ;
        }
        per = foto.naturalHeight/canvas.height;
    cropRect();},4000);
}


function cropRect(){
    let xdom = document.querySelector("#x");
    let ydom = document.querySelector("#y");
    x = xdom.value; y = ydom.value;
    w = document.querySelector("#w").value;
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
    
    xa = x * per;ya = y * per;wa = w * per;
    document.getElementById("crop").getContext("2d").drawImage(foto,xa,ya,wa,wa,0,0,200,200);
    ctx.strokeRect(x,y,w,w);
    sx = x; sy = y; sw = w;
}

ca_tmp = document.createElement("canvas");
	ca_tmp.setAttribute("width",640);
	ca_tmp.setAttribute("height",640);
	catx_tmp = ca_tmp.getContext("2d");

function tengah(u1,u2){
    return (u1-u2)/2;
}

function makeIMG(){
    //drawImage format => foto, sx, sy, sWidth, sHeight, dx, dy,dWidth, dHeight. where s = source, d = destination
    let ukuran = 640;
    let uk2 = 450;
    let koor = tengah(ukuran,uk2);
    document.querySelector("#btn_crop").innerHTML = "Cropped!";
    document.querySelector('#video').hidden = false;
    document.getElementById("canvas").hidden = false;
    document.getElementById("butt").hidden = false;
    catx_tmp.drawImage(foto, sx*per, sy*per, sw*per, sw*per, koor, koor,uk2,uk2);
    f_ft = catx_tmp.getImageData(0,0,ukuran,ukuran);
}

