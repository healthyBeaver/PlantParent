import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../screens/Login";
import "@testing-library/jest-dom/extend-expect";
import getByTestId from "@testing-library/dom";
import ReactTestUtils from "react-dom/test-utils"; // ES6
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

window.alert = jest.fn();

test("render Login input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Login />
  );
  const input = getByPlaceholderText("Username or email");
  expect(input).toBeDefined();
});

test("render password input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Login />
  );
  const password = getByPlaceholderText("Password");
  expect(password).toBeDefined();
});

test("renders without crashing", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Login />
  );
});

test("render password input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Login />
  );
  const password = getByTestId("button1");
  expect(password).toBeDefined();
});

test("calls login correctly", () => {
  const { getByTestId, getByText } = render(<Login />);
  fireEvent.press(getByTestId("button1"));
});

test("snapshot test of Login component", () => {
  const wrapper = shallow(<Login />);
  expect(wrapper).toMatchSnapshot();
});

test("gives invalid", () => {
  const navigation = {
    navigate: () => {},
  };
  const wrapper = shallow(<Login navigation={navigation} />);
  wrapper.instance().login();
  const spy = jest.spyOn(navigation, "navigate");
  expect(spy).toHaveBeenCalledTimes(0);
  window.alert.mockClear(); // restore the jsdom alert
});
