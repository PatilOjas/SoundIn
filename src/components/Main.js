import React from "react";
import {ReactComponent as PlayIcon} from '../svgs/play.svg'
import Categories from './Categories'

const Main = () => {
	return(
		<div className="main">
			<div className="upperNav">
				dummy
			</div>
			<div className="mainContent">
				<div className="cardsWrap">
					<h1>Uniquely Yours</h1>
					<div className="card">
						<div className="cardImage">
							<img src="https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="Pic 1"/>
						</div>
						<div className="cardContent">
							<h3>Liked Songs</h3>
						</div>
						<span className="playIcon">
							<PlayIcon />
						</span>
					</div>
				</div>	
			
				<Categories />
			</div>
		</div>
	)
}

export default Main