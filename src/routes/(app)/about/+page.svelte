<script>
	import { testimonials } from '$lib/data/testimonials.js';

	const destinations = [
		'New York', 'London', 'Miami', 'Los Angeles', 'Mexico City',
		'Kenya', 'Ghana', 'Zimbabwe', 'New Zealand', 'Australia',
		'Dubai', 'Barbados', 'Jamaica', 'Washington D.C.', 'Honduras',
		'Portugal', 'Houston', 'Toronto', 'Puerto Rico', 'Prague',
		'Nigeria', 'Paris'
	];

	const marqueeRow1 = [...destinations, ...destinations];
	const marqueeRow2 = [...destinations, ...destinations];

	const travelPhotos = [
		{ src: '/images/team/img1 (1).jpeg', alt: 'Team travel photo 1' },
		{ src: '/images/team/img1 (2).jpeg', alt: 'Team travel photo 2' },
		{ src: '/images/team/img1 (3).jpeg', alt: 'Team travel photo 3' },
		{ src: '/images/team/img1 (4).jpeg', alt: 'Team travel photo 4' },
		{ src: '/images/team/img1 (5).jpeg', alt: 'Team travel photo 5' },
		{ src: '/images/team/img1 (6).jpeg', alt: 'Team travel photo 6' }
	];

	const stats = [
		{ value: '500+', label: 'Trips planned' },
		{ value: '15', label: 'Years in travel' },
		{ value: '40+', label: 'Destinations covered' },
		{ value: '98%', label: 'Would rebook' }
	];
</script>

<svelte:head>
	<title>About Us — WorldView Travel Service</title>
</svelte:head>

<section class="hero">
	<div class="container">
		<p class="hero-eyebrow">Our Story</p>
		<h1 class="hero-title">WE'VE BEEN<br />DOING THIS A WHILE</h1>
	</div>
</section>

<section class="story">
	<div class="container">
		<div class="story-grid">
			<div class="story-text">
				<h2 class="story-title">BUILT FROM A LOVE OF TRAVEL</h2>
				<p>
					WorldView started as a simple idea: that travel planning in Trinidad and Tobago deserved
					the same care and expertise that travellers elsewhere took for granted. Too many people
					were booking generic packages that didn't reflect what they actually wanted.
				</p>
				<p>
					We set out to fix that. Every package we offer — and every custom trip we plan — starts
					with a real conversation about what you're looking for, not a dropdown menu.
				</p>
				<p>
					We're based in Trinidad, we know the region, and we've done the research so you don't
					have to. That's the deal.
				</p>
				<a href="/curate" class="story-cta">Plan your trip with us</a>
			</div>

		</div>
	</div>
</section>

<section class="stats">
	<div class="container">
		<div class="stats-grid">
			{#each stats as stat}
				<div class="stat">
					<span class="stat-value">{stat.value}</span>
					<span class="stat-label">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="team">
	<div class="team-header container">
		<div class="team-header-inner">
			<div>
				<p class="section-eyebrow">The team</p>
				<h2 class="section-title">WE'VE SEEN THE WORLD.<br />NOW WE PLAN YOURS.</h2>
			</div>
			<p class="team-desc">
				Our consultants aren't working from brochures. Between them they've landed in over 22
				countries across six continents — navigating layovers, boutique hotels, jungle lodges,
				and everything in between. That first-hand knowledge is what goes into every trip we plan.
				When we recommend somewhere, it's because one of us has stood there.
			</p>
		</div>
	</div>

	<div class="marquee-wrap" aria-hidden="true">
		<div class="marquee-row">
			<div class="marquee-track track-left">
				{#each marqueeRow1 as dest}
					<span class="dest-item">
						{dest}<span class="dest-dot">·</span>
					</span>
				{/each}
			</div>
		</div>
		<div class="marquee-row row-2">
			<div class="marquee-track track-right">
				{#each marqueeRow2 as dest}
					<span class="dest-item">
						{dest}<span class="dest-dot">·</span>
					</span>
				{/each}
			</div>
		</div>
	</div>

	<div class="photo-grid-wrap container">
		<p class="photo-label">Out in the field</p>
		<div class="photo-grid">
			{#each travelPhotos as photo, i}
				<div class="photo-slot" class:tall={i === 0 || i === 3}>
					{#if photo.src}
						<img src={photo.src} alt={photo.alt} />
					{:else}
						<div class="photo-placeholder">
							<span class="photo-placeholder-icon" aria-hidden="true">✈</span>
							<span class="photo-placeholder-text">Add photo</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="testimonials">
	<div class="container">
		<div class="section-header">
			<p class="section-eyebrow">What our clients say</p>
			<h2 class="section-title white">THEY WENT. THEY CAME BACK.<br />THEY TOLD THEIR FRIENDS.</h2>
		</div>
		<div class="testimonials-grid">
			{#each testimonials as t}
				<blockquote class="testimonial">
					<div class="testimonial-stars" aria-label="{t.rating} out of 5 stars">
						{#each Array(t.rating) as _}
							<span aria-hidden="true">★</span>
						{/each}
					</div>
					<p class="testimonial-quote">"{t.quote}"</p>
					<footer class="testimonial-footer">
						<strong class="testimonial-name">{t.name}</strong>
						<span class="testimonial-trip">{t.trip}</span>
					</footer>
				</blockquote>
			{/each}
		</div>
	</div>
</section>

<section class="page-cta">
	<div class="container">
		<h2 class="page-cta-title">READY WHEN YOU ARE</h2>
		<p class="page-cta-sub">Tell us where you want to go. We'll handle the rest.</p>
		<div class="page-cta-actions">
			<a href="/packages" class="btn-outline">Browse packages</a>
			<a href="/curate" class="btn-solid">Plan my custom trip</a>
		</div>
	</div>
</section>

<style>
	.hero {
		background: linear-gradient(160deg, #050d1a 0%, #1a2d6b 100%);
		color: #ffffff;
		padding: 6rem 0 5rem;
	}

	.hero-eyebrow {
		font-family: 'Dancing Script', cursive;
		font-size: 1.2rem;
		color: #f5a623;
		margin-bottom: 0.5rem;
	}

	.hero-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(3rem, 7vw, 5.5rem);
		letter-spacing: 0.06em;
		line-height: 1.05;
		color: #ffffff;
	}

	.story {
		background: #ffffff;
		color: #1c1f2a;
		padding: 5rem 0;
	}

	.story-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5rem;
		align-items: center;
	}

	.story-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2.2rem;
		letter-spacing: 0.04em;
		color: #1a2d6b;
		margin-bottom: 1.5rem;
		line-height: 1;
	}

	.story-text p {
		font-family: 'Inter', sans-serif;
		font-size: 0.95rem;
		line-height: 1.75;
		color: #4b5563;
		margin-bottom: 1.1rem;
	}

	.story-cta {
		display: inline-block;
		margin-top: 0.5rem;
		font-family: 'Inter', sans-serif;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #ffffff;
		background: #1a2d6b;
		padding: 0.8rem 1.75rem;
		text-decoration: none;
		transition: background 0.2s, color 0.2s;
	}

	.story-cta:hover { background: #f5a623; color: #1a2d6b; }



	.stats {
		background: #f7f8fb;
		padding: 4rem 0;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.4rem;
	}

	.stat-value {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 3.5rem;
		letter-spacing: 0.04em;
		color: #1a2d6b;
		line-height: 1;
	}

	.stat-label {
		font-family: 'Inter', sans-serif;
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #6b7280;
	}

	.team {
		background: #050d1a;
		color: #ffffff;
		padding: 5rem 0 0;
		overflow: hidden;
	}

	.team-header { padding-bottom: 4rem; }

	.team-header-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	.section-eyebrow {
		font-family: 'Dancing Script', cursive;
		font-size: 1.1rem;
		color: #f5a623;
		margin-bottom: 0.4rem;
	}

	.section-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(2rem, 4vw, 3rem);
		letter-spacing: 0.04em;
		color: #ffffff;
		line-height: 1.05;
	}

	.section-title.white { color: #ffffff; }

	.team-desc {
		font-family: 'Inter', sans-serif;
		font-size: 0.95rem;
		line-height: 1.75;
		color: rgba(255, 255, 255, 0.65);
		padding-top: 0.5rem;
	}

	.marquee-wrap {
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		overflow: hidden;
	}

	.marquee-row {
		overflow: hidden;
		padding: 1rem 0;
	}

	.row-2 { border-top: 1px solid rgba(255, 255, 255, 0.06); }

	.marquee-track {
		display: flex;
		width: max-content;
	}

	.track-left { animation: marqueeLeft 30s linear infinite; }
	.track-right { animation: marqueeRight 30s linear infinite; }

	@keyframes marqueeLeft {
		from { transform: translateX(0); }
		to   { transform: translateX(-50%); }
	}

	@keyframes marqueeRight {
		from { transform: translateX(-50%); }
		to   { transform: translateX(0); }
	}

	.dest-item {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.5rem;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.85);
		white-space: nowrap;
		display: inline-flex;
		align-items: center;
		padding: 0 0.5rem;
		transition: color 0.2s;
	}

	.dest-item:hover { color: #f5a623; }

	.dest-dot {
		color: #f5a623;
		margin-left: 0.75rem;
		font-size: 1rem;
		opacity: 0.6;
	}

	.photo-grid-wrap {
		padding-top: 4rem;
		padding-bottom: 5rem;
	}

	.photo-label {
		font-family: 'Inter', sans-serif;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.4);
		margin-bottom: 1.5rem;
	}

	.photo-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	.photo-slot {
		position: relative;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		aspect-ratio: 4/3;
	}

	.photo-slot.tall { aspect-ratio: 3/4; }

	.photo-slot img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.4s ease;
	}

	.photo-slot:hover img { transform: scale(1.04); }

	.photo-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-height: 160px;
	}

	.photo-placeholder-icon { font-size: 1.5rem; opacity: 0.2; }

	.photo-placeholder-text {
		font-family: 'Inter', sans-serif;
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.2);
	}

	.testimonials {
		background: #1a2d6b;
		padding: 5rem 0;
	}

	.section-header { margin-bottom: 3rem; }

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.testimonial {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.testimonial-stars { color: #f5a623; font-size: 0.9rem; letter-spacing: 0.1em; }

	.testimonial-quote {
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.85);
		flex: 1;
	}

	.testimonial-footer {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.testimonial-name {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1rem;
		letter-spacing: 0.06em;
		color: #ffffff;
	}

	.testimonial-trip {
		font-family: 'Inter', sans-serif;
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.page-cta {
		background: #f7f8fb;
		padding: 5rem 0;
		text-align: center;
	}

	.page-cta-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(2.5rem, 5vw, 4rem);
		letter-spacing: 0.06em;
		color: #1a2d6b;
		line-height: 1;
		margin-bottom: 0.75rem;
	}

	.page-cta-sub {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		color: #6b7280;
		margin-bottom: 2rem;
	}

	.page-cta-actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.btn-solid {
		font-family: 'Inter', sans-serif;
		font-size: 0.82rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #ffffff;
		background: #1a2d6b;
		padding: 0.85rem 2rem;
		text-decoration: none;
		transition: background 0.2s, color 0.2s;
	}

	.btn-solid:hover { background: #f5a623; color: #1a2d6b; }

	.btn-outline {
		font-family: 'Inter', sans-serif;
		font-size: 0.82rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #1a2d6b;
		background: transparent;
		padding: 0.85rem 2rem;
		text-decoration: none;
		border: 2px solid #1a2d6b;
		transition: background 0.2s, color 0.2s;
	}

	.btn-outline:hover { background: #1a2d6b; color: #ffffff; }

	@media (max-width: 1024px) {
		.testimonials-grid { grid-template-columns: 1fr; max-width: 560px; }
		.photo-grid { grid-template-columns: repeat(2, 1fr); }
		.photo-slot.tall { aspect-ratio: 4/3; }
	}

	@media (max-width: 768px) {
		.story-grid { grid-template-columns: 1fr; gap: 2.5rem; }
		.stats-grid { grid-template-columns: repeat(2, 1fr); }
		.team-header-inner { grid-template-columns: 1fr; gap: 1.5rem; }
	}

	@media (max-width: 640px) {
		.photo-grid { grid-template-columns: repeat(2, 1fr); }
		.page-cta-actions { flex-direction: column; }
	}
</style>