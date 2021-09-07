let video,c_ft,ctx_ft,scale,c_out,ctx_out,c_tmp,ctx_tmp,vidStream,arrVid,mRec,imgframe;

document.querySelector('#video').hidden = true;
document.getElementById("canvas").hidden = true;
document.getElementById("butt").hidden = true;

    function cp(tp,ob){
        //cp  => center point
        return (tp-ob)/2;
    }

	function init(){
		video = document.querySelector('#video');
        video.height = video.width;
		video.crossOrigin = "";
		c_out = document.getElementById("canvas");
		ctx_out = c_out.getContext("2d");
        //========== VIDEO DOM ===========
		c_tmp = document.createElement("canvas");
		c_tmp.width = video.videoWidth;
		c_tmp.height = video.videoHeight;
		ctx_tmp = c_tmp.getContext("2d");
        //========== CANVAS TEMPORARY ===========

        arrVid = [];
        vidStream = c_out.captureStream(30);
        mRec = new MediaRecorder(vidStream);
        mRec.ondataavailable = function(e) {
            arrVid.push(e.data);
            console.log("Ada!");
        };
        mRec.onstop = function(e) {
            console.log(arrVid);
            var blob = new Blob(arrVid, {'type':'video/mp4'});
            arrVid = [];
            let vidURL = URL.createObjectURL(blob);
            console.log(vidURL);
            video.src = vidURL;
            video.play();
        };
        video.play();
        mRec.start();
		video.addEventListener("play", computeFrame);
	}


	function computeFrame(){
        video.pause();
		ctx_tmp.drawImage(video,0,0,video.width,video.height);
		let frame = ctx_tmp.getImageData(0,0,video.width,video.height);
        //let ft_frame = ctx_ft.getImageData(0,0,video.videoWidth,video.videoHeight);
			console.log(frame);

		let l = frame.data.length/4;
        for(let i=0;i<l;i++){
            let r = frame.data[i*4+0];
            let g = frame.data[i*4+1];
            let b = frame.data[i*4+2];
            if (r < 33 && g > 220 && b < 33) {
                frame.data[i*4+0] = f_ft.data[i*4+0];
                frame.data[i*4+1] = f_ft.data[i*4+1];
                frame.data[i*4+2] = f_ft.data[i*4+2];
            }
        }
        
        ctx_tmp.putImageData(frame,0,0);
        ctx_out.drawImage(c_tmp,0,0,c_out.width,c_out.height);

        /*c_tmp.toBlob(function(blob){
            var urlImg = URL.createObjectURL(blob);
            imgframe.src = urlImg;
            ctx_out.drawImage(imgframe,0,0,c_out.width,c_out.height);
            URL.revokeObjectURL(urlImg);
        },'image/png');*/
		
        if(video.ended){
            mRec.stop();
        } else {
            video.play();
		setTimeout(computeFrame,33);
    }
	}
	
	function mulai(){
		init();
	};
