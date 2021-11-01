import { renderHook, act } from "@testing-library/react-hooks";
import { useDashboard } from "./hooks";
import axios from "axios";

jest.spyOn(console, "error").mockImplementation(() => {});

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  post: jest.fn(),
  get: jest.fn(),
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

  test("should addUser when call handleSubmit", async () => {
    jest.useFakeTimers();
    const userId = new Date("01/01/2021").getTime();
    jest.setSystemTime(userId);

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
      {
        id: userId,
        firstName: "Mo",
        email: "b@b.com",
        lastName: "Dwina",
      }
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

    expect(result.current.user).toEqual({
      firstName: "",
      lastName: "",
      email: "",
      id: "",
    });
  });

  test("should add userId to new user when call handleSubmit", async () => {
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
      expect.objectContaining({ id: userId })
    );
  });
});
