import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./static/assets/styles.css";

import { useSelector } from "react-redux";

import Home from "./components/Home";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UnAuthorized from "./components/UnAuthorized";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
	palette: {
		primary: { main: "#288BEB", dark: "#B23850" },
		secondary: { main: "#B23850" }
	}
});

function App() {
	const areLog = useSelector(state => state.logUser.loggedIn);
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route path="/login" component={Login} />

						<Route path="/signIn" component={SignIn} />

						<Route path="/about">
							<div>
								<h1>Hello world</h1>
							</div>
						</Route>
						<ProtectedRoute path="/dashboard" user={areLog} component={Dashboard} />
						<Route path="/unauthorized" component={UnAuthorized} />
						<Route path="/" component={Home} />
					</Switch>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;
