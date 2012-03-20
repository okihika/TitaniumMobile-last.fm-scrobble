
var lastfm_api_key = 'xxxxx';
var lastfm_api_sec = 'xxxxx';


function get_token_lastfm(){

	var api_signature = Titanium.Utils.md5HexDigest("api_key" + lastfm_api_key +  "methodauth.getSessiontoken" + lastfm_api_sec + "mysecret");
	var requestUrl = 'http://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=' + lastfm_api_key + '&api_sig=' + api_signature;

	var xhr = Titanium.Network.createHTTPClient();

	xhr.onload = function(){
		try{
			var doc = this.responseXML.documentElement;
			var lastfm_token = doc.getElementsByTagName("token").item(0).text;

			Ti.Platform.openURL('http://www.last.fm/api/auth/?api_key=' + lastfm_api_key + '&token=' + token );

        }catch(E){
			alert(E);
		}
						
	};

	xhr.onerror = function(){
		//
	};

	xhr.open('GET', requestUrl);
	xhr.send();
}


function get_session_key_lastfm(){
    
    var lastfm_token = 'xxxx';

	var api_signature = Titanium.Utils.md5HexDigest("api_key" + lastfm_api_key + "methodauth.getSessiontoken" + lastfm_token + lastfm_api_sec );
	var requestUrl = 'http://ws.audioscrobbler.com/2.0/'
					+ '?method=auth.getSession'
					+ '&token='   + lastfm_token
					+ '&api_key=' + lastfm_api_key 
					+ '&api_sig=' + api_signature;
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(){
		try{
			var doc = this.responseXML.documentElement;
			var lastfm_session_key = doc.getElementsByTagName("key").item(0).text;

		}catch(E){
			alert(E);
		}

	};

	xhr.onerror = function(){
		//
	};

	xhr.open('GET', requestUrl);
	xhr.send();
}


function scrobble_lastfm(){

	var sc_artist_name  = null; // 'Kagami';
	var sc_title_name   = null; // 'Tokyo Disco Music All Night Long';
	var sc_alubm_name   = null; // 'none';

	var lastfm_session_key = 'xxxx';

	var ts = new Date();
	var timestamp = Math.round( ts.getTime() / 1000);// ts.getTime();

	var api_signature = Titanium.Utils.md5HexDigest(
		               ""
			            +  "alubm"      + sc_alubm_name
			            +  "api_key"    + lastfm_api_key
			            +  "artist"     + sc_artist_name
			            +  "method"     + "track.scrobble"
			            +  "sk"         + lastfm_session_key
			            +  "timestamp"  + timestamp
			            +  "track"      + sc_title_name
			            +  lastfm_api_sec
			            );
			            
	var requestUrl = 'http://ws.audioscrobbler.com/2.0/';

	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(){
		//
	};

	xhr.onerror = function(){
		//
	};

	xhr.open('POST', requestUrl);
	xhr.send({
		track   : sc_title_name,
		timestamp : timestamp,
		artist  : sc_artist_name,
		alubm   : sc_alubm_name,
		api_key : lastfm_api_key,
		api_sig : api_signature,
		sk      : lastfm_session_key,
		method  : 'track.scrobble'
	});
}


function updateNowPlayingFrom_lastfm(){

	var sc_artist_name  = null; // 'Kagami';
	var sc_title_name   = null; // 'Tokyo Disco Music All Night Long';
	var sc_alubm_name   = null; // 'none';

	var lastfm_session_key = 'xxxx';

	var api_signature = Titanium.Utils.md5HexDigest(
			               ""
			            +  "alubm"      + sc_alubm_name
			            +  "api_key"    + lastfm_api_key
			            +  "artist"     + sc_artist_name
			            +  "method"     + "track.updateNowPlaying"
			            +  "sk"         + lastfm_session_key
			            +  "track"      + sc_title_name
			            +  lastfm_api_sec
	);

	var requestUrl = 'http://ws.audioscrobbler.com/2.0/';

	var xhr = Titanium.Network.createHTTPClient();

	xhr.onload = function(){
		//
	};

	xhr.onerror = function(){
       	//
	};

	xhr.open('POST', requestUrl);
	xhr.send({
		track   : sc_title_name,
		artist  : sc_artist_name,
		alubm   : sc_alubm_name,
		api_key : lastfm_api_key,
		api_sig : api_signature,
		sk      : lastfm_session_key,
		method  : 'track.updateNowPlaying'
	});
}
