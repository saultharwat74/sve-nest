<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  let state: string = "";
  const handleLogin = () => {
    fetch("api/auth/login", {
      method: "POST",
    }).then((res) => res.json()).then((data) => {
      state = data.msg;
    })
  }
  const handleSignUp = () => {
    fetch("api/auth/signup", {
      method: "POST",
    }).then((res) => res.json()).then((data) => {
      state = data.msg;
    })
  }
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>
  <span>{state}</span>
  <div class="buttons">
    <button type="button" on:click={handleLogin}>Login</button>
    <button type="button" on:click={handleSignUp}>SignUp</button>
  </div>
 
</main>

<style>
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 20px;
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
