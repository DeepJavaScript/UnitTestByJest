"use strict";

import React from "react";
import Link from "../Link.react";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <a
      className="normal"
      href="http://www.facebook.com"
      onMouseEnter={[Function]}
      onMouseLeave={[Function]}
    >
      Facebook
    </a>
  `);
});

// 把 facebook 改成 ig
// it('renders correctly', () => {
//   const tree = renderer
//     .create(<Link page="http://www.instagram.com">Instagram</Link>)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('renders as an anchor when no page is set', () => {
//   const tree = renderer.create(<Link>Facebook</Link>).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('properly escapes quotes', () => {
//   const tree = renderer
//     .create(<Link>{"\"Facebook\" \\'is \\ 'awesome'"}</Link>)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('changes the class when hovered', () => {
//   const component = renderer.create(
//     <Link page="http://www.facebook.com">Facebook</Link>,
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseEnter();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseLeave();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
