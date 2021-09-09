import React from "react";

import Profile from "../screens/Profile";
import "@testing-library/jest-dom/extend-expect";

import { shallow } from "enzyme";

test("snapshot test of Login component", () => {
  const wrapper = shallow(<Profile />);
  expect(wrapper).toMatchSnapshot();
});
