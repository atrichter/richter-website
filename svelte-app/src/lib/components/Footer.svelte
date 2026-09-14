<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte'
</script>

<footer class="container layout-grid mt-16 pt-16 pb-24 gap-y-16">
  <div class="col-span-4 lg:col-span-4">
    <h2 class="footer-heading">Andrew Richter</h2>
    <p class="text-gray">Portland, OR</p>
  </div>

  <div class="col-span-2 lg:col-span-2 lg:col-start-9">
    <h2 class="footer-heading">Explore</h2>
    <ul>
      <li><Button variant="link" class="px-0 text-gray hover:text-slate" href="/theme">Theme</Button></li>
    </ul>
  </div>

  <div class="col-span-2 lg:col-span-2 lg:col-start-11">
    <h2 class="footer-heading">Connect</h2>
    <ul>
      <li>
        <Button variant="link" class="px-0 text-gray hover:text-slate" href="mailto:contact@andrewtrichter.com">
          Email
        </Button>
      </li>
      <li>
        <Button
          variant="link"
          class="px-0 text-gray hover:text-slate"
          href="https://github.com/atrichter/richter-website"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </Button>
      </li>
      <li>
        <Button
          variant="link"
          class="px-0 text-gray hover:text-slate"
          href="https://www.linkedin.com/in/andrewtrichter/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </Button>
      </li>
    </ul>
  </div>
</footer>

<style>
  .footer-heading {
    color: var(--color-slate);
    font-family: var(--font-lato);
    font-weight: var(--font-weight-lato-bold);
    font-size: var(--text-sm);
    font-style: normal;
    margin: var(--spacing-2) 0;
  }

  .footer-heading::after {
    content: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-top: var(--spacing-4);
  }

  li::before {
    content: none;
  }
</style>
