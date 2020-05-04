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

// 總是失敗
it.skip('will fail every time', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };

  expect(user).toMatchSnapshot();
});

it('will check the matchers and pass', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };

  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});

it('will check the values and pass', () => {
  const user = {
    createdAt: new Date(),
    name: 'Bond... James Bond',
  };

  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    name: 'Bond... James Bond',
  });
});