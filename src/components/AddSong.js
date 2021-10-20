import React from "react";

function AddSong(){
	return(
		<div className="library-container">
			<form action="" method="POST">
				<label htmlFor="file">Attach your audio file:</label>
				<input type="file" name="file" id="filr" className="fineUpload dest1"/>
				<br />
				<label htmlFor="songName">Name of song:</label>
				<input type="text" name="songName" id="songName" className="input-ordinary dest2" />
				<br />
				<label htmlFor="singerName">Name of singer:</label>
				<input type="text" name="singerName" id="singerName" className="input-ordinary dest3" />
				<br />
				<label htmlFor="songDesc">Description of song:</label>
				<br />
				<textarea name="songDesc" id="songDesc" cols="30" rows="10" className="input-desc"></textarea>
				<br />
				<input type="submit" value="Upload" className="upload-btn" />
			</form>
		</div>
	)
}

export default AddSong