const L = {
  Icon: {
    Default: {
      prototype: {},
      mergeOptions: jest.fn(),
    },
  },
  divIcon: jest.fn(() => ({})),
  latLngBounds: jest.fn(() => ({
    extend: jest.fn(),
  })),
  map: jest.fn(),
  marker: jest.fn(),
  tileLayer: jest.fn(),
};

export default L;
export const Icon = L.Icon;
export const divIcon = L.divIcon;
export const latLngBounds = L.latLngBounds;
