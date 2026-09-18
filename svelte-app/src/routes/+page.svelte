<script lang="ts">
  import BlockLogo from '$lib/components/logos/BlockLogo.svelte'
  import SixDegreesLogo from '$lib/components/logos/SixDegreesLogo.svelte'
  import CernerLogo from '$lib/components/logos/CernerLogo.svelte'
  import TrumanLogo from '$lib/components/logos/TrumanLogo.svelte'

  import Intro from '$lib/components/Intro.svelte'
  import List, { type ListItem } from '$lib/components/ExperienceList.svelte'

  // let { data } = $props()
  // const homepage = $derived(data?.homepage ?? null)
  const experience: ListItem[] = [
    {
      date: '2022-2026',
      title: 'Block',
      subtitle: 'Software Engineer',
      description:
        "Full-stack engineer building and maintaining Block's public website and an internal CMS, owning projects spanning content infrastructure, careers platform integrations, and compliance-critical product work.",
      icon: BlockLogo,
      website: 'https://block.xyz',
      accentColor: 'var(--color-ink)',
    },
    {
      date: '2020-2022',
      title: '6 Degrees Health',
      subtitle: 'Software Developer',
      description:
        'Healthcare startup full-stack developer, building internal tooling and mobile app features while improving backend reliability and performance.',
      icon: SixDegreesLogo,
      website: 'https://6degreeshealth.com',
      accentColor: 'var(--color-orange)',
    },
    {
      date: '2019',
      title: 'Oracle Health (formerly Cerner)',
      subtitle: 'Software Intern',
      description:
        'Built a full-stack internal tool for managing patient charting content licenses, covering both frontend interface and backend data model.',
      icon: CernerLogo,
      website: 'https://www.oracle.com/health',
      accentColor: 'var(--color-ocean)',
    },
    {
      date: '2016-2020',
      title: 'Truman State University',
      subtitle: 'B.S. Computer Science, Minor in Design',
      description:
        'Graduated Summa Cum Laude with Departmental Honors, combining technical coursework with design training and recognized with a competitive, department-wide scholarship.',
      icon: TrumanLogo,
      website: 'https://www.truman.edu',
      accentColor: 'var(--color-purple)',
    },
  ]
</script>

<svelte:head>
  <title>Andrew Richter</title>
</svelte:head>

<main class="homepage">
  <Intro />

  <section class="experience container layout-grid mt-24">
    <div class="col-span-4 lg:col-span-10 lg:col-start-2 mb-12">
      <h2>My Experience</h2>
      <p>
        See my <a href="/resume.pdf" target="_blank" rel="noreferrer">resume</a> for more information.
      </p>
    </div>
    <div class="col-span-4 lg:col-span-10 lg:col-start-2">
      <List items={experience} />
    </div>
  </section>
</main>
