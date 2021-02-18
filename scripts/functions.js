function _( selector )
{
    return document.querySelector( selector );
}

function __( selector )
{
    return document.querySelectorAll( selector );
}
function startVideo( video ) 
{
	navigator.getUserMedia
    (
		{ video: {} },
		stream => video.srcObject = stream,
		err => console.error( err )
	);
}
