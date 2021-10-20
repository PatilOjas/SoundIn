import React from "react";

function AudioControls() {
	return(
		<div className="control-container">
			<div className="album-art">
						<img src="https://images.unsplash.com/photo-1613390067790-4d9e73445a7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80" alt="album art" />
			</div>
			<div className="main-comp">
				<div className="details">
					<div className="track-name">SaReGaMaPaDhaNiSa</div>
					<div className="track-artist">Ojas Patil</div>
				</div>

				<div className="slider-container">
					<div className="current-time">00:00</div>
					<input type="range" min="1" max="100" value="0" className="seek_slider" onChange="seekTo()" />
					<div className="total-duration">00:00</div>
				</div>
				
				<div className="buttons">
					<div className="prev-track" onClick="prevTrack()">
						<i className="fa fa-step-backward fa-2x"></i>
					</div>
					<div className="playpause-track" onClick="playpauseTrack()">
						<i className="fa fa-play-circle fa-3x"></i>
					</div>
					<div className="next-track" onClick="nextTrack()">
						<i className="fa fa-step-forward fa-2x"></i>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AudioControls
