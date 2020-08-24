import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("Navigation render", () => {
	it(`renders without crashing`, () => {
		const div = document.createElement("div");
		ReactDOM.render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});

	it(`renders the UI as expected and matches the snapshot`, () => {
		const wrapper = renderer.create(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it(`renders elements as written`, () => {
		const wrapper = mount(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);
		expect(wrapper.text("Pawpad")).toBeTruthy();
		expect(wrapper.text("Signup")).toBeTruthy();
	});
});
