soundFile1 = "";
soundFile2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;

song1Playing = false;
song2Playing = false;

function preload() {
	soundFile1 = loadSound("Believer.mp3");
	soundFile2 = loadSound("ShapeOfYou.mp3");
}

function setup() {
	canvas = createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
}

function modelReady() {
	console.log('Model Loaded!');
}

function gotPoses(poses) {
	if (poses.length > 0) {
		leftWristX = poses[0].pose.leftWrist.x;
		leftWristY = poses[0].pose.leftWrist.y;
		rightWristX = poses[0].pose.rightWrist.x;
		rightWristY = poses[0].pose.rightWrist.y;

		scoreLeftWrist = poses[0].pose.keypoints[9].score;
	}
}

function draw(){
	image(video, 0, 0, 600, 500);

	fill("#00094a")
	stroke("#00094a")

	circle(leftWristX, leftWristY, 10);

	song1Playing = soundFile1.isPlaying();
	song2Playing = soundFile2.isPlaying();

	if(scoreLeftWrist > 0.2){
		fill("#00094a")
		stroke("#00094a")

		circle(leftWristX, leftWristY, 10);

		soundFile2.stop();

		if(!song1Playing){
			soundFile1.play();
			document.getElementById("songPlayingLabel").innerHTML = "Song 1 Playing";
		}
	}
}