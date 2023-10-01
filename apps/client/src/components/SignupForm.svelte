<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { signupSchema } from "../schema";

  const { form, handleChange, handleSubmit, errors } = createForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    onSubmit(values) {
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
    validationSchema: signupSchema,
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
  <button
    class={"bg-indigo-500 p-2 rounded-md text-base text-white"}
    type="submit">Submit</button
  >
</form>
