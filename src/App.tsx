import { Suspense } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "./pages/MainPage/MainPage async";
import useTheme from "./theme/useTheme";
import { classNames } from "./helpers/classNames/classNames";

const App = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className={classNames("app", { selected: true }, [theme])}>
			<Link to="/about">About</Link>
			<Link to="/main">Main</Link>
			<button onClick={toggleTheme}>Theme</button>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/about" element={<AboutPageAsync />} />
					<Route path="/main" element={<MainPageAsync />} />
				</Routes>
			</Suspense>
		</div>
	);
};

export default App;
