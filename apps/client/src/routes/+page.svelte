<script lang="ts">
  import type { Switch } from "../types";
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  let toggle: Switch = "SIGNUP";

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must not exceed 32 characters")
        .oneOf([yup.ref("confirmPassword")], "Passwords must match"),
      confirmPassword: yup
        .string()
        .required("Confirm password is required")
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must not exceed 32 characters")
        .oneOf([yup.ref("password")], "Passwords must match"),
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
    }),
    onSubmit: (values) => {
      fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        }),
      });
    },
  });
</script>

<svelte:head>
  <title>Sve nest</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col justify-center items-center h-screen">
  <div class="flex d-flex flex-column">
    <button
      on:click={() => (toggle = "LOGIN")}
      class="bg-indigo-500 p-2 rounded-md text-base text-white mx-2"
      >Login</button
    >
    <button
      on:click={() => (toggle = "SIGNUP")}
      class="bg-indigo-700 p-2 rounded-md text-base text-white">Signup</button
    >
  </div>
  <div class="w-full">
    <form
      on:submit|preventDefault={handleSubmit}
      class="flex flex-col items-center w-full justify-center"
    >
      {#if toggle === "LOGIN"}
        <input
          placeholder="Please Enter Your Email"
          class="h-8 rounded-md px-2 w-72 my-[6px] outline-none"
          type="email"
        />
        <input
          placeholder="Please Enter Your Password"
          class="h-8 rounded-md px-2 w-72 my-[6px] outline-none"
          type="password"
        />
      {:else}
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
        <input
          placeholder="Please Confirm Your Password"
          class="h-8 rounded-md px-2 w-72 my-[6px] outline-none"
          type="password"
          on:change={handleChange}
          bind:value={$form.confirmPassword}
        />
        {#if $errors.confirmPassword}
          <p class="text-red-500">{$errors.confirmPassword}</p>
        {/if}
        <input
          placeholder="Please Enter Your First Name"
          class="h-8 rounded-md px-2 w-72 my-[6px] outline-none"
          type="text"
          on:change={handleChange}
          bind:value={$form.firstName}
        />
        {#if $errors.firstName}
          <p class="text-red-500">{$errors.firstName}</p>
        {/if}
        <input
          placeholder="Please Enter Your Last Name"
          class="h-8 rounded-md px-2 w-72 my-[6px] outline-none"
          type="text"
          on:change={handleChange}
          bind:value={$form.lastName}
        />
        {#if $errors.lastName}
          <p class="text-red-500">{$errors.lastName}</p>
        {/if}
      {/if}
      <button
        class={"bg-indigo-500 p-2 rounded-md text-base text-white"}
        type="submit">Submit</button
      >
    </form>
  </div>
</section>

<style>
</style>
