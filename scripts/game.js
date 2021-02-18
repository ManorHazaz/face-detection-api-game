const video = _('#video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then( startVideo( video ) )

video.addEventListener( 'play', () => 
{
    var emojis = getEmojis();

    emojis = shuffle( emojis );

    displayEmojis( emojis );
	const canvas = faceapi.createCanvasFromMedia( video );
	_('.game-board').append( canvas );
	const displaySize = { width: video.offsetWidth, height: video.offsetHeight };
	faceapi.matchDimensions( canvas, displaySize );

	const gameOn = setInterval( async () => 
	{
		const detections = await faceapi.detectAllFaces( video, new faceapi.TinyFaceDetectorOptions() ).withFaceLandmarks().withFaceExpressions();
		const resizedDetections = faceapi.resizeResults( detections, displaySize );
		canvas.getContext('2d').clearRect( 0, 0, canvas.width, canvas.height );
		faceapi.draw.drawDetections( canvas, resizedDetections );
		faceapi.draw.drawFaceLandmarks( canvas, resizedDetections );
		faceapi.draw.drawFaceExpressions( canvas, resizedDetections );

        }
    }, 1000)
})