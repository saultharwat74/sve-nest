<script lang="ts">
  import { afterUpdate } from "svelte";
  import LoginForm from "../components/LoginForm.svelte";
  import SignupForm from "../components/SignupForm.svelte";
  import type { Switch } from "../types";

  let toggle: Switch = "SIGNUP";
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
    {#if toggle === "LOGIN"}
      <LoginForm />
    {:else}
      <SignupForm />
    {/if}
  </div>
</section>

<style>
</style>
