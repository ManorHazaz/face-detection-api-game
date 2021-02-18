function _( selector )
{
    return document.querySelector( selector );
}

function __( selector )
{
    return document.querySelectorAll( selector );
}

function getEmojis()
{
    return [
        { name: 'sad', code: '😢' },
        { name: 'surprised', code: '😮' },
        { name: 'happy', code: '😊' },
        { name: 'neutral', code: '😐' },
        { name: 'angry', code: '😡' },
    ];
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

function shuffle( array ) 
{
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while ( 0 !== currentIndex ) {
  
      // Pick a remaining element...
      randomIndex = Math.floor( Math.random() * currentIndex );
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[ currentIndex ];
      array[ currentIndex ] = array[ randomIndex ];
      array[ randomIndex ] = temporaryValue;
    }
    return array;
}

function displayEmojis( emojis )
{
    emojis.forEach( e => 
    {
        _('.emojis').textContent += e.code +' ';
    });
}
