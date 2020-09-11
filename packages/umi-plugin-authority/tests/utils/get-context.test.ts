import getAccessContent from '../../src/utils/get-context';

describe('getAccessContent', () => {
  it('should return content string when call getAccessContent', () => {
    const result = getAccessContent();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
