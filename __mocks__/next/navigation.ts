const push = jest.fn();
const back = jest.fn();
const replace = jest.fn();

export const useRouter = () => ({
  push,
  back,
  replace,
  prefetch: jest.fn(),
  refresh: jest.fn(),
});

export const usePathname = () => "/";
export const useSearchParams = () => new URLSearchParams();
export const notFound = jest.fn();
