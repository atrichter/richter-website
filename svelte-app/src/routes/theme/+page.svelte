<script lang="ts">
  import ColorSwatch from '$lib/components/ColorSwatch.svelte'
  import { themeColors, themeFonts } from '$lib/theme'
</script>

<svelte:head>
  <title>Andrew Richter | Theme</title>
</svelte:head>

<main class="container-narrow">
  <header>
    <h1>Theme</h1>
    <p>Showcase of text, colors, and components.</p>
  </header>

  <section class="typography">
    <h2>Typography</h2>

    {#each Object.entries(themeFonts) as [, font]}
      <h3 style:font-family="{font.name}, {font.fallback}">{font.name}</h3>
      {#each Object.entries(font.weights) as [weightName, weightValue]}
        <small style:text-transform="capitalize">
          {weightName}
          {weightValue}
        </small>
        <p style:font-family="{font.name}, {font.fallback}" style:font-weight={weightValue} style:margin-top="0">
          The quick brown fox jumps over the lazy dog.
        </p>
        <small style:text-transform="capitalize">
          {weightName}
          {weightValue} italic
        </small>
        <p
          style:font-family="{font.name}, {font.fallback}"
          style:font-weight={weightValue}
          style:font-style="italic"
          style:margin-top="0"
        >
          The quick brown fox jumps over the lazy dog.
        </p>
      {/each}
    {/each}

    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>The quick brown fox jumps over the lazy dog.</p>

    <small>Small caption text</small>

    <ul>
      <li>First item</li>
      <li>
        Second item
        <ol>
          <li>First subitem</li>
          <li>Second subitem</li>
          <li>Third subitem</li>
        </ol>
      </li>
      <li>Third item</li>
    </ul>
  </section>

  <section class="colors">
    <h2>Colors</h2>
    <p>Pairs of inverse colors.</p>
    <div class="swatch-grid">
      {#each Object.entries(themeColors) as [name, hex]}
        <ColorSwatch {name} {hex} />
      {/each}
    </div>
  </section>
</main>

<style>
  .colors .swatch-grid {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    gap: 0.5rem;
    margin-top: 2rem;
  }
</style>
