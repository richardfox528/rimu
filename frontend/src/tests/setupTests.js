import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { matchMediaMock, localStorageMock, sessionStorageMock } from './mocks';

// Setup global TextEncoder and TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Setup window.matchMedia mock
window.matchMedia = window.matchMedia || matchMediaMock;

// Setup localStorage mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Setup sessionStorage mock
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

// Suppress console errors during tests
console.error = jest.fn();

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Mock para react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock para react-leaflet
jest.mock('react-leaflet', () => {
  const BaseLayer = ({ children }) => <div data-testid="base-layer">{children}</div>;
  const Overlay = ({ children }) => <div data-testid="overlay">{children}</div>;
  
  return {
    MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: () => <div data-testid="marker" />,
    Popup: ({ children }) => <div data-testid="popup">{children}</div>,
    LayersControl: Object.assign(
      ({ children }) => <div data-testid="layers-control">{children}</div>,
      {
        BaseLayer,
        Overlay
      }
    ),
  };
}); 