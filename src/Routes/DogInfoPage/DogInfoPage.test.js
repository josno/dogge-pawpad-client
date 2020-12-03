import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import DogInfoPage from "./DogInfoPage";

describe("<AddNewDog />", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(
			<BrowserRouter>
				<DogInfoPage
					match={{ params: { dogId: 1 }, isExact: true, path: "", url: "" }}
				/>
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});

	it("renders as expected", () => {
		const tree = renderer
			.create(
				<BrowserRouter>
					<DogInfoPage
						match={{ params: { dogId: 1 }, isExact: true, path: "", url: "" }}
					/>
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
