import { renderHook, act } from "@testing-library/react-hooks";
import { useDashboard } from "./hooks";
import axios from "axios";

jest.spyOn(console, "error").mockImplementation(() => {});

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  post: jest.fn(),
  get: jest.fn(),
  delete: jest.fn(),
}));

describe("useTasks", () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  test("should set initial user to empty strings", () => {
    const { result } = renderHook(() => useDashboard());
    const initialUser = { firstName: "", lastName: "", email: "", id: "" };
    expect(result.current.user).toEqual(initialUser);
  });

  test("should set initial users to empty array", () => {
    const { result } = renderHook(() => useDashboard());
    expect(result.current.users).toEqual([]);
  });

  test("should update user data when call handleChange", () => {
    const { result } = renderHook(() => useDashboard());
    const value = "Mo";
    const even = { target: { name: "firstName", value } };
    act(() => {
      result.current.handleChange(even);
    });
    expect(result.current.user.firstName).toEqual(value);
  });

  test("should add user data to users when call handleSubmit", async () => {
    const { result } = renderHook(() => useDashboard());

    const event1 = { target: { name: "firstName", value: "Mo" } };
    const event2 = { target: { name: "lastName", value: "Dwina" } };
    const event3 = { target: { name: "email", value: "b@b.com" } };

    act(() => {
      result.current.handleChange(event1);
    });

    act(() => {
      result.current.handleChange(event2);
    });

    act(() => {
      result.current.handleChange(event3);
    });

    act(() => {
      const event = { preventDefault: jest.fn() };
      result.current.handleSubmit(event);
    });

    await expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/users",
      expect.objectContaining({
        firstName: "Mo",
        lastName: "Dwina",
        email: "b@b.com",
      })
    );
  });

  test("should set initial user to empty strings when call handleSubmit", async () => {
    const { result } = renderHook(() => useDashboard());

    const event1 = { target: { name: "firstName", value: "Mo" } };
    const event2 = { target: { name: "lastName", value: "Dwina" } };
    const event3 = { target: { name: "email", value: "b@b.com" } };

    act(() => {
      result.current.handleChange(event1);
    });

    act(() => {
      result.current.handleChange(event2);
    });

    act(() => {
      result.current.handleChange(event3);
    });

    act(() => {
      const event = { preventDefault: jest.fn() };
      result.current.handleSubmit(event);
    });

    await expect(result.current.user).toEqual({
      firstName: "",
      lastName: "",
      email: "",
      id: "",
    });
  });

  test("should add userId to each user in users array when call handleSubmit", async () => {
    jest.useFakeTimers();
    const userId = new Date("01/01/2021").getTime();
    jest.setSystemTime(userId);

    const { result } = renderHook(() => useDashboard());

    act(() => {
      const event = { preventDefault: jest.fn() };
      result.current.handleSubmit(event);
    });

    await expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/users",
      expect.objectContaining({
        id: userId,
      })
    );
  });

  test("should handle addUser error when call handleSubmit and there is an error", async () => {
    const customError = { message: "There is an error occurred" };
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(customError.message))
    );
    const { result } = renderHook(() => useDashboard());

    try {
      const event = { preventDefault: jest.fn() };
      await result.current.handleSubmit(event);
    } catch (error) {
      expect(error.message).toEqual(customError.message);
    }
  });

  test("should return list of users when call fetchUsers", async () => {
    const users = [
      { firstName: "Mo", lastName: "Dwina", email: "b@b.com", id: "1234" },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: users }));

    const { result } = renderHook(() => useDashboard());

    await act(() => {
      result.current.fetchUsers();
    });

    await expect(result.current.users).toEqual(users);
  });

  test("should call post delete method with relevant user Id", async () => {
    const userId = "1234";
    const { result } = renderHook(() => useDashboard());

    await act(() => {
      result.current.handleDelete(userId);
    });

    await expect(axios.delete).toHaveBeenCalledWith(
      `http://localhost:5000/users/${userId}`
    );
  });

  test("should handle the error when call handleDelete and there is an error occurred", async () => {
    const userId = "1234";
    const customError = { message: "There is an error occurred" };

    axios.delete.mockImplementationOnce(() =>
      Promise.reject(new Error(customError.message))
    );

    const { result } = renderHook(() => useDashboard());

    try {
      await result.current.handleDelete(userId);
    } catch (error) {
      expect(error.message).toEqual(customError.message);
    }
  });
});
