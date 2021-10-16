import React from "react";
import {ReactComponent as HomeIcon} from '../svgs/home.svg'
import {ReactComponent as LibraryIcon} from '../svgs/library.svg'
import {ReactComponent as SearchIcon} from '../svgs/search.svg'
import { Link } from "react-router-dom";
import Logo from './logo.png'

const Nav = () => {
	return(
		<div className="navBar">
			<div className="logo">
				<img src={Logo} alt="logo" className="logoImg"/>
				<p className="logoText">SoundIn</p>
			</div>
			<ul>
				<Link to="/">
				<li className="active">
					<HomeIcon />
					Home
				</li>
				</Link>
				<Link to="/search">
				<li >
					<SearchIcon />
					Search
				</li>
				</Link>
				<Link to="/your-library">
				<li >
					<LibraryIcon />
					Your Library	
				</li>
				</Link>
			</ul>
			<div className="cookies">
				<span>Cookies</span>
				<span>Privacy Policy</span>
			</div>
		</div>
	)
}

export default Nav