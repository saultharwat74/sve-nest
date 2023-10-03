<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { loginSchema } from "../schema";
  import { auth, login } from "../stores";
  import { goto } from "$app/navigation";

  const { form, handleChange, handleSubmit, errors } = createForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit(values) {
      login(values);
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
