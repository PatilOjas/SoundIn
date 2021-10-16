import React from "react";
import Playlists  from "./Playlists";
import {ReactComponent as PlayIcon} from '../svgs/play.svg'

const Categories = () => {
	const dataCategories = [
		{
			id: 0,
			name: 'Liked Songs',
			tagline: 'Music that suits you',
		},
		{
			id: 1,
			name: 'Focus',
			tagline: 'Music to help you concentrate',
		},
		{
			id: 2,
			name: 'Mood',
			tagline: 'Playlists to match your mood',
		},
		{
			id: 3,
			name: 'Soundtrack your home',
			tagline: '',
		},
		{
			id: 4,
			name: 'Kick back this Sunday...',
			tagline: '',
		},
	]
	return(
		<div className="mainInner">
			{dataCategories.map((category, id) => (
				<div className="cardsWrap" key={id}>
					<h2>{category.name}</h2>
					<p className="subText">{category.tagline}</p>
					<Playlists category_id = {category.id}/>
				</div>
			))}
		</div>
	)
}

export default Categories