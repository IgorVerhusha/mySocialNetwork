import React from 'react'
import ReactDOM from 'react-dom'
import SamuraiJsApp from './App'
import { create } from 'react-test-renderer'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SamuraiJsApp />, div)
  ReactDOM.unmountComponentAtNode(div)
})

// describe("Button component", () => {
//   test("it shows the expected text when clicked (testing the wrong way!)", () => {
//     const component = create(<Button text="SUBSCRIBE TO BASIC" />);
//     const instance = component.getInstance();
//     expect(instance.state.text).toBe("");
//   });
// });
