import React from "react";
import AddSong  from "./AddSong";
import { Link } from "react-router-dom";


function Library(){
	return(
		<div>
			<Link to="addsong" className="library-addsong-btn" >
				<h1 className="btn">Add Your own Song</h1>
			</Link>
		</div>
	)
}

export default Library