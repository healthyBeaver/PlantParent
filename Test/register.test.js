import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-dom/extend-expect";
import Register from "../screens/CreateAccount";
import { shallow, mount } from "enzyme";

window.alert = jest.fn();

test("render register input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Register />
  );
  const input = getByPlaceholderText("Enter your username");
  expect(input).toBeDefined();
});

test("render register name component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Register />
  );
  const input = getByPlaceholderText("Enter your preferred name");
  expect(input).toBeDefined();
});

test("render register email component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Register />
  );
  const input = getByPlaceholderText("Enter email");
  expect(input).toBeDefined();
});

test("render register password input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Register />
  );
  const password = getByPlaceholderText("Enter your password");
  expect(password).toBeDefined();
});

test("button 1 works", () => {
  window.alert.mockClear();
  const { getByTestId, getByText } = render(<Register />);
  fireEvent.press(getByTestId("button1"));
});

test("gives invalid", () => {
  const navigation = {
    navigate: () => {},
  };
  const wrapper = shallow(<Register navigation={navigation} />);
  wrapper.instance().createAccount();
  const spy = jest.spyOn(navigation, "navigate");
  expect(spy).toHaveBeenCalledTimes(0);
  window.alert.mockClear(); // restore the jsdom alert
});

test("gives invalid2", () => {
  const navigation = {
    navigate: () => {},
  };
  const wrapper = shallow(<Register navigation={navigation} />);
  wrapper.instance().checkFields();
  const spy = jest.spyOn(navigation, "navigate");
  expect(spy).toHaveBeenCalledTimes(0);
  window.alert.mockClear(); // restore the jsdom alert
});
