import { getProjectName } from './utils';

describe('getProjectName', () => {
  it('lins', () => {
    expect(getProjectName('lins')).toEqual('lins');
  });

  it('lins-plus', () => {
    expect(getProjectName('lins-plus')).toEqual('linsPlus');
  });

  it('@alita/lins', () => {
    expect(getProjectName('@alita/lins')).toEqual('lins');
  });

  it('@alita/lins-plus', () => {
    expect(getProjectName('@alita/lins-plus')).toEqual('linsPlus');
  });
})
