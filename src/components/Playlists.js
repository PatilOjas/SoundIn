import React from "react";
import {ReactComponent as PlayIcon} from '../svgs/play.svg'

const Playlists = (props) => {
	const dataPlaylists = [
		{
			id: 101,
			category_id: 1,
			name: 'Focus PLaylist 1',
			img: 'https://images.unsplash.com/photo-1518961039426-cdc80759ff57?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1119&q=80',
			desc: 'Lorem ipsum delor vas...',
			
		},
		{
			id: 102,
			category_id: 3,
			name: 'Home PLaylist 1',
			img: 'https://images.unsplash.com/photo-1634233942057-b75723e58180?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=388&q=80',
			desc: 'Lorem ipsum delor vas...',
		},
		{
			id: 103,
			category_id: 3,
			name: 'Home PLaylist 2',
			img: 'https://images.unsplash.com/photo-1634229952383-8e4069f75e2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
			desc: 'Lorem ipsum delor vas...',
		},
		{
			id: 104,
			category_id: 3,
			name: 'Home PLaylist 3',
			img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
			desc: 'Lorem ipsum delor vas...',
		},
		{
			id: 105,
			category_id: 4,
			name: 'Sunday playlists 1',
			img: 'https://images.unsplash.com/photo-1634227232738-0bb7b885fdb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=436&q=80',
			desc: 'Lorem ipsum delor vas...',
		},
		{
			id: 106,
			category_id: 2,
			name: 'Mood playlists 1',
			img:'https://images.unsplash.com/photo-1634238917234-a581f86ae740?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
			desc: 'Lorem ipsum delor vas...',
		},
		{
			id: 107,
			category_id: 2,
			name: 'Mood playlists 2',
			img: 'https://images.unsplash.com/photo-1634148969837-7feba3939ee3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=460&q=80',
			desc: 'Lorem ipsum delor vas...',
		},
	]

	const matchedPlaylists = dataPlaylists.filter(playlist => playlist.category_id === props.category_id)

	return (
		<div>
			<div className="cardsWrapInner">
				{matchedPlaylists.map((playlist) => (
					<div className="card">
					<div className="cardImage">
						<img src={playlist.img} alt="Pic 1"/>
					</div>
					<div className="cardContent">
						<h3>{playlist.name}</h3>
						<span>{playlist.desc}</span>
					</div>
					<span className="playIcon">
						<PlayIcon />
					</span>
				</div>
				))}
			</div>
		</div>
	)
}

export default Playlists