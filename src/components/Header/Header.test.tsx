import React from "react";
import Header from "./Header";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("Header Component Test", () => {
  const tree = shallow(<Header />);
  it("To match Snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
  it("should render header component text", () => {
    const container = tree.find(".logo-container");
    expect(container.length).toBe(1);
  });
});
