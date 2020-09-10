import getContent from '../../src/utils/get-content';

describe('getAccessContent', () => {
  it('should return content string when call getAccessContent', () => {
    const result = getContent();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
