import React from "react";
import { useParams } from "react-router-dom";
import {ReactComponent as PlayIcon} from '../../svgs/play.svg'
import {ReactComponent as HeartIcon} from '../../svgs/heart.svg'
const PlaylistPage = () => {

	let {id} = useParams()

	return (
		<div className="playlistPage">
			<div className="mainInner">
			<div className="playlistPageInfo">
				<div className="playlistPageImage">
					<img src="https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="pic" />
				</div>
				<div className="playlistPageContent">
					<p className="smallText uppercase bold">Liked Songs</p>
					<h1>A Perfect Day</h1>
					<p className="tagline">Minimalism, electronica and modern classical to concentrate</p>
					<div className="playlistPageDesc">
						<p className="soundin">SoundIn</p>
						<span>4hr 35min</span>
						<span>699,428 likes</span>
					</div>
				</div>
			<div className="playlistPageSongs">
				<div className="playlistButtons">
					<span className="playIcon">
						<PlayIcon />
					</span>
					<div className="icons">
					<div className="icon iconsHeart">
						<HeartIcon />
					</div>
					</div>
				</div>
			</div>
			</div>
			<ul className="songList">
				<li>
					<div className="songIcon"></div>
					<div className="songIcon">
						<PlayIcon className="playI" />
					</div>
					<div className="songDetails">
						<h3>Song One</h3>
						<span>Laura Marling</span>
					</div>
					<div className="songTime">
						<span>4:07</span>
					</div>
				</li>
				<li>
					<div className="songIcon"></div>
					<div className="songIcon">
						<PlayIcon className="playI" />
					</div>
					<div className="songDetails">
						<h3>Song One</h3>
						<span>Laura Marling</span>
					</div>
					<div className="songTime">
						<span>4:07</span>
					</div>
				</li>
				<li>
					<div className="songIcon"></div>
					<div className="songIcon">
						<PlayIcon className="playI" />
					</div>
					<div className="songDetails">
						<h3>Song One</h3>
						<span>Laura Marling</span>
					</div>
					<div className="songTime">
						<span>4:07</span>
					</div>
				</li>
				<li>
					<div className="songIcon"></div>
					<div className="songIcon">
						<PlayIcon className="playI" />
					</div>
					<div className="songDetails">
						<h3>Song One</h3>
						<span>Laura Marling</span>
					</div>
					<div className="songTime">
						<span>4:07</span>
					</div>
				</li>
				<li>
					<div className="songIcon"></div>
					<div className="songIcon">
						<PlayIcon className="playI" />
					</div>
					<div className="songDetails">
						<h3>Song One</h3>
						<span className="smallText">Laura Marling</span>
					</div>
					<div className="songTime">
						<span>4:07</span>
					</div>
				</li>
				
			</ul>
			</div>
		</div>
	)
}

export default PlaylistPage