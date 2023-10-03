import { goto } from "$app/navigation";
import persistStore from "./persistStore";

const auth = persistStore("auth", {
  isLoggedIn: false,
  token: "",
  email: "",
  firstName: "",
  lastName: "",
});

export const login = (payload: { email: string; password: string }) => {
  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      auth.set({
        email: res.email,
        token: res.token,
        firstName: res.firstName,
        lastName: res.lastName,
        isLoggedIn: true,
      });
      goto("/home");
    });
};

export const signUp = (payload: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
    }),
  });
};

export default auth;
