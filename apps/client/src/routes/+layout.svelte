<script>
  import "./styles.css";
  import "../app.css";
  import { onMount } from "svelte";
  import { auth } from "../stores";
  import { goto } from "$app/navigation";
  onMount(() => {
    if ($auth.isLoggedIn) {
      goto("/home");
    } else {
      goto("/");
    }
  });
</script>

<div class="app">
  <main>
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
