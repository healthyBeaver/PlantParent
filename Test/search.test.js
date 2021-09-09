import React from "react";
import "@testing-library/jest-dom/extend-expect";
import SearchArea from "../screens/SearchArea.js";

test("snapshot test of Search component", () => {
  const wrapper = shallow(<SearchArea />);
  expect(wrapper).toMatchSnapshot();
});
