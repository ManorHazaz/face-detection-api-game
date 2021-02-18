function startVideo( video ) 
{
	navigator.getUserMedia
    (
		{ video: {} },
		stream => video.srcObject = stream,
		err => console.error( err )
	);
}
