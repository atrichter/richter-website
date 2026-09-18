<script context="module" lang="ts">
  import type { Component } from 'svelte'

  export type ListItem = {
    date: string
    title: string
    subtitle: string
    description: string
    icon: Component
    website: string
    accentColor: string
  }
</script>

<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte'

  export let items: ListItem[] = []
</script>

<ul class="m-0 p-0">
  {#each items as item}
    <li
      class="layout-grid border-b-[0.5px] first:border-t-[0.5px] border-ink py-16 before:content-none sm:gap-4 lg:grid-cols-10"
    >
      <small class="m-0 col-start-3 col-span-2 row-start-1 text-right lg:col-span-1 lg:col-start-1 lg:text-left">
        {item.date}
      </small>
      <div class="row-start-2 col-span-4 lg:col-span-2 lg:col-start-3 lg:row-start-auto">
        <h3 class="m-0">{item.title}</h3>
        <h4 class="mt-1">{item.subtitle}</h4>
      </div>
      <p class="row-start-3 m-0 col-span-4 lg:col-span-3 lg:col-start-6 lg:row-start-auto">{item.description}</p>
      <div class="col-start-1 row-start-1 place-items-center self-start lg:col-start-10 lg:justify-self-end">
        <Button
          variant="outline"
          size="icon-lg"
          class="border-(--button-accent) text-(--button-accent) hover:bg-(--button-accent)! hover:text-(--color-paper)!"
          style={`--button-accent: ${item.accentColor}`}
          href={item.website}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${item.title} website`}
        >
          <svelte:component this={item.icon} class="size-5" />
        </Button>
      </div>
    </li>
  {/each}
</ul>
