import React from "react";
import Playlists  from "./Playlists";

const Categories = () => {
	const dataCategories = [
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
		<div>
			{dataCategories.map((category) => (
				<div className="cardsWrap">
					<h2>{category.name}</h2>
					<p className="subText">{category.tagline}</p>
					<Playlists category_id = {category.id}/>
				</div>
			))}
		</div>
	)
}

export default Categories