import { IApi } from 'umi';
import registerAuthorityPlugin from '../src/index';

jest.mock('fs');

let mockApi: IApi;

describe('PluginrAuthority', () => {
  beforeEach(() => {
    mockApi = {
      paths: {
        absTmpPath: '/workspace/project/src/page/.umi',
        absSrcPath: '/workspace/project/src',
      },
      onGenerateFiles: (cb: () => void) => {
        cb();
      },
      writeTmpFile: jest.fn(),
      addRuntimePlugin: jest.fn(),
      addUmiExports: jest.fn(),
      addTmpGenerateWatcherPaths: jest.fn(),
      utils: {
        winPath: jest
          .fn()
          .mockImplementation((input: string) => input.replace(/\\/g, '/')),
      },
    } as any;
  });

  it('should run correctly when authority file is defined and default exporting a function', () => {
    mockApi.paths.absSrcPath = 'path/to';
    registerAuthorityPlugin(mockApi);
    expect(mockApi.writeTmpFile).toHaveBeenCalledTimes(4);
    expect(mockApi.addUmiExports).toHaveBeenCalledTimes(1);
    expect(mockApi.addTmpGenerateWatcherPaths).toHaveBeenCalledTimes(1);
    expect(mockApi.utils.winPath).toHaveBeenCalledTimes(2);
  });

  it('should not writeTmpFile and not addRuntimePlugin if there is no authority file', () => {
    mockApi.utils.winPath = jest.fn(() => 'not/exist/path');
    registerAuthorityPlugin(mockApi);
    expect(mockApi.writeTmpFile).not.toBeCalled();
    expect(mockApi.addRuntimePlugin).not.toBeCalled();
  });
});
