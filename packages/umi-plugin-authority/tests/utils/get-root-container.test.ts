import getRootContainerContent from '../../src/utils/get-root-container';

describe('getRootContainerContent', () => {
  it('should return content string when call getRootContainerContent', () => {
    const result = getRootContainerContent();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
