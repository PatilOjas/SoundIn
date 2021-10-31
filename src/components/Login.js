import React from "react";
import Logo from './logo.png'

function Login(){
	return(
		<div className="login-container">
			<div className="branding">
				<img src={Logo} alt="SoundIN" />
				<h1>SoundIn</h1>
			</div>
			<form className="login-form" id="loginForm" method="POST">
				<label htmlFor="email">Enter email:</label>
				<br />
				<input type="email" name="email" id="email" required />
				<br />
				<br />
				<label htmlFor="password">Enter password:</label>
				<br />
				<input type="password" name="password" id="password" required />
				<br />
			</form>
			<button className="loginSubmit" type="submit" value="Submit" form="loginForm">Log in</button>
			<div className="or">
				<h2>OR</h2>
				<div id="g_id_onload"
					data-client_id="56645585577-r7bbi3tqdfpvlvmpif2mqkp9s7eo44rn.apps.googleusercontent.com"
					// data-login_uri="https://your.domain/your_login_endpoint"
					data-auto_prompt="false">
				</div>
				<div class="g_id_signin"
					data-type="standard"
					data-size="large"
					data-theme="outline"
					data-text="sign_in_with"
					data-shape="rectangular"
					data-logo_alignment="left">
				</div>
			</div>
		</div>
	)
}

export default Login