import { writable } from "svelte/store";

export const auth = writable<{
  isLoggedIn: boolean;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
}>({
  email: "",
  firstName: "",
  lastName: "",
  token: "",
  isLoggedIn: false,
});


export const login = () => {
    
}