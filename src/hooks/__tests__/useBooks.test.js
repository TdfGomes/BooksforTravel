import { renderHook } from "@testing-library/react-hooks";
import useBooks from "../useBooks";

const mockedWorksData = {
  works: [
    { title: "Book Title About Porto", cover_id: 1234, key: "/path/to/book_1" },
    {
      title: "Another Book Title About Porto",
      cover_id: 42312,
      key: "/path/to/book_2",
    },
    {
      title: "Awesome trip to Porto",
      cover_id: 123421,
      key: "/path/to/book_3",
    },
    {
      title: "Why not ?",
      cover_id: 23452,
      key: "/path/to/book_4",
    },
  ],
};

const mockFetch = (mockData) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
};

const mockFetchError = (error) => {
  global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

const mockFetchCleanUp = () => {
  global.fetch.mockClear();
  delete global.fetch;
};

afterEach(() => {
  mockFetchCleanUp();
});

test("useBooks: initial state of success", async () => {
  mockFetch(mockedWorksData);
  const { result, waitForNextUpdate } = renderHook(() => useBooks("Porto"));
  expect(result.current).toMatchObject({
    isLoading: true,
    error: null,
    books: [],
  });
  await waitForNextUpdate();
  expect(result.current).toMatchObject({
    isLoading: false,
    error: null,
    books: mockedWorksData.works,
  });
});

test("useBooks: error state", async () => {
  mockFetchError("Networking error");
  const { result, waitForNextUpdate } = renderHook(() => useBooks("Porto"));
  expect(result.current).toMatchObject({
    isLoading: true,
    error: null,
    books: [],
  });
  await waitForNextUpdate();
  expect(result.current).toMatchObject({
    isLoading: false,
    error: "Networking error",
    books: [],
  });
});
