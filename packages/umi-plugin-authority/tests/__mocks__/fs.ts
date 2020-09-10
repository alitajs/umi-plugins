interface FS {
  existsSync: (filePath: string) => boolean;
  readFileSync: (filePath: string) => string;
  readdirSync: (dirPath: string) => string;
}

const fs = jest.genMockFromModule<FS>('fs');

const PathToAuthority = 'path/to/authority';

function existsSync(filePath: string): boolean {
  if (filePath.startsWith(PathToAuthority)) {
    return true;
  } else if (filePath.endsWith('path/to/js.js')) {
    return true;
  } else if (filePath.endsWith('path/to/no/export/authority.ts')) {
    return true;
  }
  return false;
}

function readFileSync(filePath: string): string {
  if (filePath.startsWith(PathToAuthority)) {
    return 'export default';
  }
  return 'Invalid content';
}

function readdirSync(dirPath: string): string {
  return 'test';
}

fs.existsSync = existsSync;
fs.readFileSync = readFileSync;
fs.readdirSync = readdirSync;

export default fs;
