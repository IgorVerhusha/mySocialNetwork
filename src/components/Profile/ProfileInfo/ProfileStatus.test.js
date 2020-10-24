import React from 'react';
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";




describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="status" />);
    const instance = component.root
    expect(instance.props.status).toBe("status");
  });


  test('it should be contains span', () => {
    const component = create(<ProfileStatus text="SUBSCRIBE TO BASIC" />);
  const root = component.root;
    const span = root.findByType("span");
    expect(span).not.toBeNull();
  });

  test('span should contains correct status', () => {
    const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.children[0]).toBe("SUBSCRIBE TO BASIC")
  });

  test('span should be displayed input', () => {

    const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC" />);
    const root = component.root;
    const span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("SUBSCRIBE TO BASIC")
  });
});