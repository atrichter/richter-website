<script lang="ts">
  import ColorSwatch from '$lib/components/ColorSwatch.svelte'
  import { themeColors, themeFonts } from '$lib/theme'
</script>

<svelte:head>
  <title>Theme | Andrew Richter</title>
</svelte:head>

<main class="theme-page">
  <header class="container">
    <h1>Theme</h1>
    <p>Showcase of text, colors, and components.</p>
  </header>

  <section class="typography container layout-grid">
    <h2 class="col-span-4 lg:col-span-12">Typography</h2>

    {#each Object.entries(themeFonts) as [, font]}
      <div class="col-span-4 lg:col-span-6">
        <h3 style:font-family="{font.name}, {font.fallback}">{font.name}</h3>
        <p>
          {#each Object.entries(font.weights) as [weightName, weightValue]}
            <span
              class="capitalize inline-block whitespace-nowrap mr-4 text-3xl"
              style:font-family="{font.name}, {font.fallback}"
              style:font-weight={weightValue}
            >
              {weightName}
              <sup class="relative -top-6 -ml-2 text-xs">{weightValue}</sup>
            </span>
            <span
              class="italic capitalize inline-block whitespace-nowrap mr-4 text-3xl"
              style:font-family="{font.name}, {font.fallback}"
              style:font-weight={weightValue}
            >
              {weightName} italic
              <sup class="relative -top-6 -ml-2 text-xs">{weightValue}</sup>
            </span>
          {/each}
        </p>
      </div>
    {/each}

    <div class="col-span-4 lg:col-span-6">
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
      <p>The quick brown fox jumps over the <a href="/">lazy dog</a>.</p>

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

      <p><small>Small caption text</small></p>
    </div>
  </section>

  <section class="colors container layout-grid">
    <div class="col-span-4 lg:col-span-12 mb-8">
      <h2>Color Palette</h2>
      <p>Pairs of inverse colors.</p>
    </div>
    <div class="col-span-2 lg:col-span-4 grid grid-cols-2 gap-4">
      {#each Object.entries(themeColors) as [name, hex]}
        <ColorSwatch {name} {hex} />
      {/each}
    </div>
  </section>
</main>
