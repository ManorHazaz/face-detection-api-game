var mute = true;
var developerMode = true;

const video = _('#video');

_('.return').addEventListener( 'click', () => 
{
	location.href = "index.html";
});

_('.mute').addEventListener( 'click', () => 
{
	mute = !mute;

    if( mute )
    {
        _('.mute').classList.remove("muted");
    }
    else
    {
        _('.mute').classList.add("muted");
    }
});

_('.developer-mode').addEventListener( 'click', () => 
{
	developerMode = !developerMode;

    if( developerMode )
    {
        _('.developer-mode').classList.remove("off");
        _('.canvas').classList.remove("hidden");        
    }
    else
    {
        _('.developer-mode').classList.add("off");
        _('.canvas').classList.add("hidden");
    }
});

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
    canvas.classList.add("canvas");
	_('.game-board').append( canvas );
	const displaySize = { width: video.offsetWidth, height: video.offsetHeight };
	faceapi.matchDimensions( canvas, displaySize );

    var seconds = 0;
    var matches = 0;
    var matchAudio = new Audio('../static/sound effects/match-sound-effect.wav');

	const gameOn = setInterval( async () => 
	{
		const detections = await faceapi.detectAllFaces( video, new faceapi.TinyFaceDetectorOptions() ).withFaceLandmarks().withFaceExpressions();
		const resizedDetections = faceapi.resizeResults( detections, displaySize );
		canvas.getContext('2d').clearRect( 0, 0, canvas.width, canvas.height );
		faceapi.draw.drawDetections( canvas, resizedDetections );
		faceapi.draw.drawFaceLandmarks( canvas, resizedDetections );
		faceapi.draw.drawFaceExpressions( canvas, resizedDetections );

        if( !detections[0] )
        {
            _('.adjust-position').classList.remove("hidden");
        }
        else
        {
            _('.adjust-position').classList.add("hidden");
            var faceExpression = detections[0].expressions;
            var expectedExpression = emojis[matches].name;

            if( faceExpression[expectedExpression] > 0.8 )
            {
                matches++;
                addV( matches );
                if( mute )
                {
                    matchAudio.play();
                }
            }

            if( matches === 5 )
            {
                clearInterval(gameOn);
                _('.modal').classList.remove("hidden");
                _('.win-time').textContent = seconds + ' seconds';
            }

            seconds = incrementSeconds( seconds, '.timer' );
        }
    }, 1000)
})