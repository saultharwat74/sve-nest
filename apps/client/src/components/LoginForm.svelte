<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { loginSchema } from "../schema";
  import { auth } from "../stores/auth";
  import { redirect } from "@sveltejs/kit";

  const { form, handleChange, handleSubmit, errors } = createForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit(values) {
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
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

        });
    },
    validationSchema: loginSchema,
  });
</script>

<form
  class="flex flex-col items-center w-full justify-center"
  on:submit|preventDefault={handleSubmit}
>
  <input
    placeholder="Please Enter Your Email"
    class="h-8 rounded-md px-2 w-72 my-[6px] outline-none"
    type="email"
    on:change={handleChange}
    bind:value={$form.email}
  />
  {#if $errors.email}
    <p class="text-red-500">{$errors.email}</p>
  {/if}
  <input
    placeholder="Please Enter Your Password"
    class="h-8 rounded-md px-2 w-72 my-[6px] outline-none"
    type="password"
    on:change={handleChange}
    bind:value={$form.password}
  />
  {#if $errors.password}
    <p class="text-red-500">{$errors.password}</p>
  {/if}

  <button
    class={"bg-indigo-500 p-2 rounded-md text-base text-white"}
    type="submit">Submit</button
  >
</form>
