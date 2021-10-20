import React from "react";
import Categories from './Categories'
import Library from './Library.js'
import { Switch, Route } from "react-router-dom";
import PlaylistPage from "./pages/Playlist";
import AddSong from "./AddSong";

const Main = () => {
	return(
		<div className="main">
			<div className="upperNav">
				Navigation
			</div>
			<div className="mainContent">
				<Switch>
					<Route path="/" exact component={Categories}></Route>
					<Route path="/concert"></Route>
					<Route path="/library" exact component={Library}></Route>
					<Route path="/playlist/:id" component={PlaylistPage}></Route>
					<Route path="/addsong" component={AddSong}></Route>
				</Switch>		
			</div>
		</div>
	)
}

export default Main