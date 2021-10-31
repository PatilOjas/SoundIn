import './App.scss';
import Nav from './components/Nav'
import Main from './components/Main' 
import AudioControls from './components/AudioControls'
import Login from './components/Login';


function App() {
  return (
	<div className="outerWrap">
		<div className="App">
			<Nav />
			<Main />
		</div>
		<div className="musicControls">
			<AudioControls />
		</div>
	</div>
	// <Login />
  );
}

export default App;
