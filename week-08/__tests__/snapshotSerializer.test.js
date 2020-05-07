import serializer from '../src/my-serializer-module';

expect.addSnapshotSerializer(serializer);

it('snapshot object', () => {
  const bar = {
    foo: {
      x: 1,
      y: 2,
    },
  };

  expect(bar).toMatchSnapshot();
});