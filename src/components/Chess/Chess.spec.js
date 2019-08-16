import React from "react";
import Chess from "./Chess";
import Board from "../Board";
import { shallow, mount } from "enzyme";
import { setupChessStart } from "./ChessHelperService";

describe("Chess game at start", () => {
  const wrapper = shallow(<Chess />);

  it("renders anything", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the board", () => {
    expect(wrapper.containsMatchingElement(<Board />)).toEqual(true);
  });

  it("renders the home page button", () => {
    expect(wrapper.containsMatchingElement(<button>Home Page</button>)).toEqual(
      true
    );
  });

  it("renders a div for the status", () => {
    expect(wrapper.find(".game-info").text()).toEqual("Next player");
  });

  it("can populate board with pieces", () => {
    const squares = setupChessStart();
    expect(squares[0]).toEqual("bR");
    expect(squares[4]).toEqual("bK");
    expect(squares[6]).toEqual("bN");
    expect(squares[10]).toEqual("bp");
    expect(squares[30]).toEqual(null);
    expect(squares[52]).toEqual("wp");
    expect(squares[59]).toEqual("wQ");
    expect(squares[61]).toEqual("wB");
    expect(squares[63]).toEqual("wR");
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("A pawn can", () => {
  const wrapper = mount(<Chess />);
  // console.log(wrapper.debug());

  it("be found starting at A2 (square 48)", () => {
    const squareA2 = wrapper.find('#square-48');
    expect(squareA2.find('#wp')).toHaveLength(1);
  });

  it("not be found starting at A3 (square 40)", () => {
    const squareA3 = wrapper.find('#square-40');
    expect(squareA3.find('#wp')).toHaveLength(0);
  });

  it("move forward one space", () => {
      let squareA2 = wrapper.find('#square-48');
      squareA2.simulate('click');
      
      let squareA3 = wrapper.find('#square-40');
      squareA3.simulate('click');

      squareA2 = wrapper.find('#square-48');
      squareA3 = wrapper.find('#square-40');
      expect(squareA2.find('#wp')).toHaveLength(0);
      expect(squareA3.find('#wp')).toHaveLength(1);
  });
});
