<script lang="ts">
  import { reveal } from '$lib/actions/reveal'
  import glassCaseUrl from '$lib/assets/images/jujitsu/glassCase.gif?url'
  import teamRankingsUrl from '$lib/assets/images/jujitsu/usaUltimate-teamRankings-dIII-2020.pdf?url'

  type Tournament = {
    title: string
    image: string
    gallery: string
    placement?: string
    placementUrl?: string
    items: number
  }

  type Season = { year: string; tournaments: Tournament[] }

  const images = import.meta.glob('/src/lib/assets/images/jujitsu/*.jpg', {
    eager: true,
    query: { enhanced: true, imgWidth: '768' },
  }) as Record<string, { default: string }>

  const linkedAssets: Record<string, string> = {
    'glassCase.gif': glassCaseUrl,
    'usaUltimate-teamRankings-dIII-2020.pdf': teamRankingsUrl,
  }
  const assetUrl = (path: string) =>
    path.startsWith('http') ? path : (linkedAssets[path] ?? images[`/src/lib/assets/images/jujitsu/${path}`])

  const seasons: Season[] = [
    {
      year: '2020-2021',
      tournaments: [
        {
          title: 'Regionals',
          image: 'regionals-2021.jpg',
          gallery: 'https://photos.app.goo.gl/ztsmhx32gQUNBWhh9',
          placement: '6th place',
          placementUrl: 'https://play.usaultimate.org/events/South-Central-D-III-College-Mens-Regionals-2021/',
          items: 334,
        },
      ],
    },
    {
      year: '2019-2020',
      tournaments: [
        {
          title: 'Tsunami B',
          image: 'tsunamiB-2019.jpg',
          gallery: 'https://photos.app.goo.gl/hSsUdvS8FcrzDh7a7',
          items: 117,
        },
        {
          title: 'Windy City Invite',
          image: 'windyCityInvite-2019.jpg',
          gallery: 'https://photos.app.goo.gl/tkL6tzs79A8jfozt5',
          placement: '8th place',
          placementUrl: 'https://play.usaultimate.org/events/Windy-City-Invite2/',
          items: 311,
        },
        {
          title: 'MLC',
          image: 'mlc-2019.jpg',
          gallery: 'https://photos.app.goo.gl/2ZXYRZkbdFL7cd316',
          items: 200,
        },
        {
          title: 'TUB',
          image: 'tub-2019.jpg',
          gallery: 'https://photos.app.goo.gl/QzFiGNDpuxcLgZJG8',
          placement: '3rd place',
          placementUrl: 'https://play.usaultimate.org/events/North-College-Mixed-Regional-Championship-2019/',
          items: 264,
        },
        {
          title: 'Dust Bowl',
          image: 'dustBowl-2020.jpg',
          gallery: 'https://photos.app.goo.gl/F9bpeDMYkXDV2xTP9',
          placement: '4th place',
          placementUrl: 'https://play.usaultimate.org/events/Dust-Bowl-2020/',
          items: 181,
        },
        {
          title: 'Midwest Throwdown',
          image: 'midwestThrowdown-2020.jpg',
          gallery: 'https://photos.app.goo.gl/TGQ5Fa5EzT4ZUEeS8',
          placement: '11th place',
          placementUrl: 'https://play.usaultimate.org/events/Midwest-Throwdown-2020/',
          items: 151,
        },
        {
          title: 'D-III Nationals',
          image: 'nationals-2020.jpg',
          gallery: 'glassCase.gif',
          placement: '8th in D-III',
          placementUrl: 'usaUltimate-teamRankings-dIII-2020.pdf',
          items: 1,
        },
      ],
    },
    {
      year: '2018-2019',
      tournaments: [
        {
          title: 'Grinnell',
          image: 'grinnell-2018.jpg',
          gallery: 'https://photos.app.goo.gl/UQtRniCsUnTXnNX48',
          items: 240,
        },
        {
          title: 'Glory Days',
          image: 'gloryDays-2018.jpg',
          gallery: 'https://photos.app.goo.gl/fWCnJEMid3m2Px1t6',
          placement: '2nd place',
          placementUrl: 'https://play.usaultimate.org/events/Glory-Days-2018/',
          items: 369,
        },
        {
          title: 'MLC',
          image: 'mlc-2018.jpg',
          gallery: 'https://photos.app.goo.gl/MhZ1VfKYPSFvCPRY6',
          items: 104,
        },
        {
          title: 'TUB',
          image: 'tub-2018.jpg',
          gallery: 'https://photos.app.goo.gl/xVbKBQFGj2fTcrFm7',
          placement: '1st place',
          placementUrl: 'https://play.usaultimate.org/events/South-College-Mixed-Regional-2018/',
          items: 226,
        },
        {
          title: 'Harvest',
          image: 'harvest-2018.jpg',
          gallery: 'https://photos.app.goo.gl/YTA9nVccok2ZtFVT7',
          items: 127,
        },
        {
          title: 'Jaxx Jamboree',
          image: 'jaxx-2019.jpg',
          gallery: 'https://photos.app.goo.gl/wJfzEDy5PBwrqhGK6',
          placement: '1st place',
          placementUrl: 'https://play.usaultimate.org/events/First-Annual-Jaxx-Jamboree/',
          items: 195,
        },
        {
          title: 'Meltdown',
          image: 'meltdown-2019.jpg',
          gallery: 'https://photos.app.goo.gl/pcDnMjQi34Ux61zv7',
          placement: '2nd place',
          placementUrl: 'https://play.usaultimate.org/events/Meltdown-2019/',
          items: 269,
        },
        {
          title: 'Conferences',
          image: 'conferences-2019.jpg',
          gallery: 'https://photos.app.goo.gl/3PJeDZgV4rs9NGbL8',
          placement: '2nd place',
          placementUrl: 'https://play.usaultimate.org/events/Ozarks-D-III-College-Mens-CC-2019/',
          items: 65,
        },
        {
          title: 'Regionals',
          image: 'regionals-2019.jpg',
          gallery: 'https://photos.app.goo.gl/95wZX5Qw2Sghngp58',
          placement: '6th place',
          placementUrl: 'https://play.usaultimate.org/events/South-Central-D-III-College-Mens-Regionals-2019/',
          items: 293,
        },
      ],
    },
    {
      year: '2017-2018',
      tournaments: [
        {
          title: 'Green & Black',
          image: 'greenAndBlack-2017.jpg',
          gallery: 'https://photos.app.goo.gl/9NHxFZBPeb3r6msLA',
          items: 73,
        },
        {
          title: 'Grinnell',
          image: 'grinnell-2017.jpg',
          gallery: 'https://photos.app.goo.gl/fM98etBxFQBriSTV7',
          items: 165,
        },
        {
          title: 'Glory Days',
          image: 'gloryDays-2017.jpg',
          gallery: 'https://photos.app.goo.gl/ebgN5rVCBxmJA5mv8',
          items: 187,
        },
        {
          title: 'MLC',
          image: 'mlc-2017.jpg',
          gallery: 'https://photos.app.goo.gl/p2Vpj9BUF7h1j1MK9',
          items: 330,
        },
        {
          title: 'Harvest',
          image: 'harvest-2017.jpg',
          gallery: 'https://photos.app.goo.gl/2o26DmWZq8VBvgBa8',
          items: 210,
        },
        {
          title: 'TUB',
          image: 'tub-2017.jpg',
          gallery: 'https://photos.app.goo.gl/hTfMppiismMnQxdC8',
          placement: '7th place',
          placementUrl: 'https://play.usaultimate.org/events/South-College-Mixed-Regional-2017/',
          items: 346,
        },
        {
          title: 'Midwest Throwdown',
          image: 'midwestThrowdown-2018.jpg',
          gallery: 'https://photos.app.goo.gl/5gwxw8yHvEAhYqXs6',
          placement: '10th place',
          placementUrl: 'https://play.usaultimate.org/events/Midwest-Throwdown-2018/',
          items: 312,
        },
        {
          title: 'Meltdown',
          image: 'meltdown-2018.jpg',
          gallery: 'https://photos.app.goo.gl/skL5cjBWfHJ7m2ya6',
          placement: '5th place',
          placementUrl: 'https://play.usaultimate.org/events/Meltdown-2018/',
          items: 276,
        },
      ],
    },
    {
      year: '2016-2017',
      tournaments: [
        {
          title: 'Conferences',
          image: 'conferences-2017.jpg',
          gallery: 'https://photos.app.goo.gl/d22odJYtaahEtQgw5',
          items: 419,
        },
      ],
    },
  ]

  const videos = [
    { title: '5 Years (Sean Eberle for Donovan)', url: 'https://www.youtube.com/watch?v=QUFPm9qjshw' },
    { title: 'JujiTSU Highlights - Windy City Invite 2019', url: 'https://www.youtube.com/watch?v=C1i27EgKkJY' },
    { title: 'JujiTSU Having Fun', url: 'https://www.youtube.com/watch?v=k_9MAdkCkhk' },
    { title: "Spring 2019 JujiTSU Men's Ultimate Highlights", url: 'https://www.youtube.com/watch?v=baeK7h15VTI' },
    { title: 'Bloopers', url: 'https://www.youtube.com/watch?v=2-a_sErhuCg' },
    { title: "JujiTSU Men's Ultimate Hype Vid", url: 'https://www.youtube.com/watch?v=3NZWffZXL90' },
    { title: 'JujiTSU vs. Colorado MLC 2018', url: 'https://www.youtube.com/watch?v=UvGz6MFFSqw' },
    { title: 'JujiTSU vs. Mizzou MLC 2018', url: 'https://www.youtube.com/watch?v=vNLmvMWTPCA' },
    { title: 'HYDRa - Truman State MLC 2017', url: 'https://www.youtube.com/watch?v=oex1O-BV6AI' },
    { title: 'Truman State vs. Brandeis', url: 'https://www.youtube.com/watch?v=2Zx-KGUfToI' },
    { title: 'UNT vs Truman St @ Dust Bowl', url: 'https://www.youtube.com/watch?v=gH_mEUFSKP4' },
    { title: 'Dust Bowl 2017: UTD "WOOF" vs Truman State', url: 'https://www.youtube.com/watch?v=krPxf23Ktxo' },
    { title: 'Colorado Mines vs. Truman State, Dust Bowl 2017', url: 'https://www.youtube.com/watch?v=2LXkwX-nvr8' },
    { title: 'Truman State vs Valparaiso (Glory Days 2016)', url: 'https://www.youtube.com/watch?v=QkG-23p8hX0' },
    { title: 'JujiTSU Ultimate Frisbee Truman State University', url: 'https://www.youtube.com/watch?v=uTdjZ1zpLcQ' },
  ] as const
</script>

<svelte:head>
  <title>Jujitsu | Andrew Richter</title>
</svelte:head>

<main>
  <header use:reveal class:reveal class="container layout-grid py-16">
    <div class="col-span-4 lg:col-span-10 lg:col-start-2">
      <h1>Truman State Ultimate</h1>
      <p>
        I joined JujiTSU college men's club ultimate frisbee team in 2016 and served as captain, PR, photographer, and
        designer.
      </p>
      <p>
        Photo albums are linked on this page, original files for logos, posters, and more can be found <a
          href="https://drive.google.com/drive/folders/1yHn1cPDyrmpqni8Ws7BCDGVxZnKZtlLZ?usp=sharing"
          target="_blank"
          rel="noreferrer">here</a
        >.
      </p>
    </div>
  </header>

  <div class="container pb-24">
    <section class="layout-grid" aria-label="Tournament photos">
      <div class="col-span-4 layout-grid lg:col-span-10 lg:col-start-2 lg:grid-cols-10">
        {#each seasons as season}
          <div use:reveal class:reveal class="col-span-4 layout-grid mb-16 lg:col-span-10 lg:grid-cols-10">
            <h2 id="season-{season.year}" class="col-span-4 mb-6 lg:col-span-10">
              {season.year}
            </h2>
            {#each season.tournaments as tournament}
              <div class="col-span-2 min-w-0 pb-6 sm:col-span-1 lg:col-span-2">
                <a
                  class="group block overflow-hidden rounded-xl bg-muted"
                  href={assetUrl(tournament.gallery)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View {tournament.title} photos"
                >
                  <enhanced:img
                    class="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                    sizes="(min-width: 64rem) 17vw, (min-width: 32rem) 25vw, 50vw"
                    src={images[`/src/lib/assets/images/jujitsu/${tournament.image}`].default}
                    alt={tournament.title}
                    loading="lazy"
                  />
                </a>
                <h3 class="mt-3 mb-0">
                  <a class="text-ink font-bold" href={assetUrl(tournament.gallery)} target="_blank" rel="noreferrer">
                    {tournament.title}
                  </a>
                </h3>
                <small>
                  {#if tournament.placement && tournament.placementUrl}
                    <a class="text-gray" href={assetUrl(tournament.placementUrl)} target="_blank" rel="noreferrer">
                      {tournament.placement}
                    </a>
                    <span aria-hidden="true"> | </span>
                  {/if}
                  {tournament.items}
                  {tournament.items === 1 ? 'item' : 'items'}
                </small>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </section>

    <section use:reveal class:reveal class="layout-grid pt-12" aria-labelledby="videos-heading">
      <div class="col-span-4 lg:col-span-10 lg:col-start-2">
        <h2 id="videos-heading" class="mb-2">Videos</h2>
        <p class="mb-6">Video credit to the publishing channels.</p>
        <ul>
          {#each videos as video}
            <li><a href={video.url} target="_blank" rel="noreferrer">{video.title}</a></li>
          {/each}
        </ul>
      </div>
    </section>
  </div>
</main>
