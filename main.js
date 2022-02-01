song1="";
song2="";
song1status="";
song2status="";
scoreleftwrist=0;
scorerightwrist=0;
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes);
}
function draw(){
    image(video,0,0,600,500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
        song2.stop();
        if(song1status==false){
            song1.play();

        }
    }
    if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        song1.stop();
        if(song2status==false){
            song2.play();
            
        }
    }
}
function preload(){
    song1=loadSound("Beliver_tamil.mp3");
    song2=loadsound("Beliver_English.mp3")
}
function modelloaded(){
    console.log("poseNet is initialized");
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("score leftwrist = "+scoreleftwrist+" score rightwrist = "+scorerightwrist);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwrist x = "+leftwristx+" leftwrist y = "+leftwristy);
        
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("rightwrist x = "+rightwristx+" rightwrist y = "+rightwristy);
    }
}