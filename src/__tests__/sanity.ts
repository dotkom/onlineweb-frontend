// @ts-ignore
describe('The Human Condition', () => {
  it('we are sane', () => {
    expect(true === true);
    expect(!false);
    expect(true);
    for (let i = 0; i < 100; i++) {
      expect(i === i);
    }
  });
});
