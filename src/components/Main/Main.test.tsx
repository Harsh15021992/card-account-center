import React from "react";
import Main from "./Main";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });
const setUp = () => {
  return shallow(<Main />);
};

describe("Main Component Test", () => {
  it("TO match snapshot", () => {
    const tree = shallow(<Main />);
    expect(tree).toMatchSnapshot();
  });

  it("should render account details element", () => {
    const component = setUp();
    const container = component.find(".info-container");
    expect(container.length).toBe(1);
  });

  it("add amount button button click", () => {
    const tree = shallow(<Main />);
    tree.find("#add-amount-button").simulate("click");
  });
  it("add select field change test", () => {
    const container = setUp();
    const selectEvent = { target: { value: "987654321098" } };
    container.find("#add-amount-button").simulate("click");
    container.find("#add-amount-select-field").simulate("change", selectEvent);
  });
  it("add input field change test", () => {
    const container = setUp();
    const inputEvent = { target: { value: "1000" } };
    container.find("#add-amount-button").simulate("click");
    container.find("#add-amount-field").simulate("change", inputEvent);
  });
  it("add amount button click test", () => {
    const container = setUp();
    container.find("#add-amount-button").simulate("click");
    container.find("#continue-add-amount-button").simulate("click");
  });
  it("cancel transaction button click test", () => {
    const container = setUp();
    container.find("#add-amount-button").simulate("click");
    container.find("#cancel-add-transaction").simulate("click");
  });

  it("withdraw amount button button click", () => {
    const tree = shallow(<Main />);
    tree.find("#withdraw-amount-button").simulate("click");
  });
  it("withdraw select field change test", () => {
    const container = setUp();
    const selectEvent = { target: { value: "987654321098" } };
    container.find("#withdraw-amount-button").simulate("click");
    container
      .find("#withdraw-amount-select-field")
      .simulate("change", selectEvent);
  });
  it("withdraw input field change test", () => {
    const container = setUp();
    const inputEvent = { target: { value: "1000" } };
    container.find("#withdraw-amount-button").simulate("click");
    container.find("#withdraw-amount-field").simulate("change", inputEvent);
  });
  it("withdraw amount button click test", () => {
    const container = setUp();
    container.find("#withdraw-amount-button").simulate("click");
    container.find("#continue-withdraw-amount-button").simulate("click");
  });
  it("cancel withdraw transaction button click test", () => {
    const container = setUp();
    container.find("#withdraw-amount-button").simulate("click");
    container.find("#cancel-withdraw-transaction").simulate("click");
  });
});
