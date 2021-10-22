const video = document.getElementById('videoElm');

const loadFaceAPI = async ()=>{
    await faceapi.nets.faceLandmark68Net.loadFromUri('.model');
    await faceapi.nets.faceRegcognitionNet.loadFromUri('.model');
    await faceapi.nets.tinyFaceDetection.loadFromUri('.model');
    await faceapi.nets.faceExpressionNet.loadFromUri('.model');


    
}
function getCameraStream(){
    if (navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({ video:{} })
        .then(stream => {
            video.srcObject = stream;
        });
    
    }
}

video.addEventListener('playing', ()=>{
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    setInterval(()=>{
        const detects = awaitfaceapi.detectAllFaces(video, new faceapi.tinuFaceDetectorOptions());
        concole.log(detects);

    }, 300);
});

loadFaceAPI().then(getCameraStream());