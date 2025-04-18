// Mock configurations for Jest tests

// Mock for static files (images, css, etc)
export const fileMock = 'test-file-stub';

// Mock for style files
export const styleMock = {};

// Common mock implementations
export const mockNavigate = jest.fn();
export const mockLocation = {
  pathname: '/verify-email',
  search: '',
  hash: '',
  state: null
};

// Mock for window.matchMedia
export const matchMediaMock = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
});

// Mock for localStorage
export const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

// Mock for sessionStorage
export const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}; 