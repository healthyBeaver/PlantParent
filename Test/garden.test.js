import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react-native";
import Garden from "../screens/GardenArea";
import { login } from "../screens/Login";
import "@testing-library/jest-dom/extend-expect";
import getByTestId from "@testing-library/dom";
import ReactTestUtils from "react-dom/test-utils"; // ES6
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

test("snapshot test of Garden component", () => {
  let route = {
    params: {
      userID: "60503726095b5333d0969cf8"
    }
  }
  const wrapper = shallow(<Garden route={route}/>);
  expect(wrapper).toMatchSnapshot();
});


test("renders without crashing", () => {
  let route = {
    params: {
      userID: "60503726095b5333d0969cf8"
    }
  }
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Garden route={route}/>
  );
});
 
