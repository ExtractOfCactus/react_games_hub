import React from "react";
import Chess from "./Chess";
import Board from "../Board";
import { shallow } from "enzyme";
import { setupChessStart } from "./ChessHelperService";

describe("Chess game at start", () => {
  const wrapper = shallow(<Chess />);

  it("renders the board", () => {
    expect(wrapper.containsMatchingElement(<Board />)).toEqual(true);
  });

  it("renders the home page button", () => {
    expect(wrapper.containsMatchingElement(<button>Home Page</button>)).toEqual(
      true
    );
  });

  it("renders a div for the status", () => {
    expect(wrapper.find(".game-info").text()).toEqual("status here");
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
});
