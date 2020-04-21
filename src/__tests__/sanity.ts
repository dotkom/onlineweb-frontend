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

// Export nothing, which treats the test file as a module.
// TODO: Remove when actually importing something to test
export {};
