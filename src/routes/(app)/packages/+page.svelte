<script>
	import { packages, categories, durations, prices, regions } from '$lib/data/packages.js';

	let activeCategories = $state([]);
	let activeDurations = $state([]);
	let activePrices = $state([]);
	let activeRegions = $state([]);
	let openGroup = $state(null);

	function toggle(arr, id) {
		return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
	}

	function getDurationBucket(days) {
		if (days <= 4) return 'short';
		if (days <= 6) return 'mid';
		return 'week';
	}

	function getPriceBucket(price) {
		if (price < 5000) return 'under-5k';
		if (price <= 8000) return '5k-8k';
		return '8k-plus';
	}

	let filtered = $derived(
		packages.filter((pkg) => {
			const catOk = activeCategories.length === 0 || activeCategories.includes(pkg.category);
			const durOk = activeDurations.length === 0 || activeDurations.includes(getDurationBucket(pkg.durationDays));
			const priceOk = activePrices.length === 0 || activePrices.includes(getPriceBucket(pkg.priceTTD));
			const regionOk = activeRegions.length === 0 || activeRegions.includes(pkg.region);
			return catOk && durOk && priceOk && regionOk;
		})
	);

	let hasFilters = $derived(
		activeCategories.length > 0 ||
		activeDurations.length > 0 ||
		activePrices.length > 0 ||
		activeRegions.length > 0
	);

	function clearAll() {
		activeCategories = [];
		activeDurations = [];
		activePrices = [];
		activeRegions = [];
	}

	function toggleGroup(id) {
		openGroup = openGroup === id ? null : id;
	}

	function handleClickOutside(e) {
		if (!e.target.closest('.dropdown')) {
			openGroup = null;
		}
	}

	const filterGroups = [
		{
			id: 'category',
			label: 'Category',
			options: categories,
			get active() { return activeCategories; },
			toggle: (id) => { activeCategories = toggle(activeCategories, id); }
		},
		{
			id: 'duration',
			label: 'Duration',
			options: durations,
			get active() { return activeDurations; },
			toggle: (id) => { activeDurations = toggle(activeDurations, id); }
		},
		{
			id: 'price',
			label: 'Price (TTD)',
			options: prices,
			get active() { return activePrices; },
			toggle: (id) => { activePrices = toggle(activePrices, id); }
		},
		{
			id: 'region',
			label: 'Region',
			options: regions,
			get active() { return activeRegions; },
			toggle: (id) => { activeRegions = toggle(activeRegions, id); }
		}
	];

	function ttdFormat(n) {
		return `TTD ${n.toLocaleString('en-TT')}`;
	}

	const gradientMap = {
		beach:     'linear-gradient(160deg, #0d4f8a 0%, #4fb6e6 100%)',
		adventure: 'linear-gradient(160deg, #1a3a1a 0%, #2d6a2d 100%)',
		family:    'linear-gradient(160deg, #4a2800 0%, #c87020 100%)',
		honeymoon: 'linear-gradient(160deg, #3a0a2a 0%, #a03080 100%)'
	};
</script>

<svelte:document onclick={handleClickOutside} />

<svelte:head>
	<title>Packages — WorldView Travel Service</title>
</svelte:head>

<div class="filter-bar">
	<div class="container">
		<div class="filter-row">
			<div class="dropdowns">
				{#each filterGroups as group}
					<div class="dropdown">
						<button
							class="dropdown-btn"
							class:has-selection={group.active.length > 0}
							class:open={openGroup === group.id}
							onclick={(e) => { e.stopPropagation(); toggleGroup(group.id); }}
						>
							<span class="dropdown-label">{group.label}</span>
							{#if group.active.length > 0}
								<span class="badge">{group.active.length}</span>
							{/if}
							<svg
								class="chevron"
								class:rotated={openGroup === group.id}
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
							>
								<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>

						{#if openGroup === group.id}
							<div
								class="dropdown-panel"
								role="listbox"
								tabindex="-1"
								onclick={(e) => e.stopPropagation()}
								onkeydown={(e) => e.stopPropagation()}
							>
								{#each group.options as opt}
									<label class="option">
										<input
											type="checkbox"
											checked={group.active.includes(opt.id)}
											onchange={() => group.toggle(opt.id)}
										/>
										<span class="option-label">{opt.label}</span>
										{#if group.active.includes(opt.id)}
											<span class="option-check" aria-hidden="true">✓</span>
										{/if}
									</label>
								{/each}
								{#if group.active.length > 0}
									<button
										class="clear-group"
										onclick={() => {
											if (group.id === 'category') activeCategories = [];
											if (group.id === 'duration') activeDurations = [];
											if (group.id === 'price') activePrices = [];
											if (group.id === 'region') activeRegions = [];
										}}
									>
										Clear
									</button>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class="filter-meta">
				<span class="result-count">
					{filtered.length} package{filtered.length !== 1 ? 's' : ''}
					{#if hasFilters}<span class="filtered-note"> — filtered</span>{/if}
				</span>
				{#if hasFilters}
					<button class="clear-all" onclick={clearAll}>Clear all</button>
				{/if}
			</div>
		</div>
	</div>
</div>

<section class="grid-section">
	<div class="container">
		{#if filtered.length === 0}
			<div class="empty">
				<p class="empty-title">NO PACKAGES MATCH</p>
				<p class="empty-sub">Try removing a filter or two.</p>
				<button class="empty-clear" onclick={clearAll}>Clear all filters</button>
			</div>
		{:else}
			<div class="grid">
				{#each filtered as pkg (pkg.id)}
					<article class="card">
						<div class="card-image">
							{#if pkg.image}
								<img
									src={pkg.image}
									alt={pkg.title}
									class="card-img"
									onerror={(e) => {
										e.currentTarget.style.display = 'none';
										e.currentTarget.nextElementSibling.style.display = 'block';
									}}
								/>
								<div
									class="card-img-fallback"
									style="background: {gradientMap[pkg.category]}; display: none;"
								></div>
							{:else}
								<div
									class="card-img-fallback"
									style="background: {gradientMap[pkg.category]};"
								></div>
							{/if}
							<span class="card-duration">{pkg.durationDays} days</span>
							<span class="card-region">{pkg.region.replace(/-/g, ' ')}</span>
						</div>

						<div class="card-body">
							<div class="card-meta">
								<span class="card-destination">{pkg.destination}</span>
								<span class="card-category">{pkg.category}</span>
							</div>

							<h2 class="card-title">{pkg.title}</h2>
							<p class="card-desc">{pkg.description}</p>

							<ul class="card-highlights">
								{#each pkg.highlights as h}
									<li>{h}</li>
								{/each}
							</ul>

							<div class="card-footer">
								<div class="card-price">
									<span class="price-label">from</span>
									<span class="price-value">{ttdFormat(pkg.priceTTD)}</span>
									<span class="price-label">per person</span>
								</div>
								
								<a href="/curate?destination={encodeURIComponent(pkg.destination)}&package={pkg.id}"
									class="card-cta"
								>
									Request
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>

<section class="bottom-cta">
	<div class="container">
		<div class="bottom-cta-inner">
			<div>
				<h2 class="bottom-cta-title">DON'T SEE WHAT YOU'RE LOOKING FOR?</h2>
				<p class="bottom-cta-sub">Tell us where you want to go. We'll build it for you.</p>
			</div>
			<a href="/curate" class="bottom-cta-btn">Plan My Custom Trip</a>
		</div>
	</div>
</section>

<style>
	/* ── Filter bar ──────────────────────────────────────── */
	.filter-bar {
		position: sticky;
		top: 118px;
		z-index: 50;
		background: #ffffff;
		border-bottom: 1px solid #e5e7eb;
		padding: 1rem 0;
	}

	.filter-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}

	.dropdowns {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.dropdown { position: relative; }

	.dropdown-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'Inter', sans-serif;
		font-size: 0.82rem;
		font-weight: 500;
		color: #374151;
		background: #ffffff;
		border: 1px solid #e5e7eb;
		padding: 0.55rem 1rem;
		cursor: pointer;
		border-radius: 4px;
		transition: all 0.15s ease;
		white-space: nowrap;
	}

	.dropdown-btn:hover { border-color: #1a2d6b; color: #1a2d6b; }

	.dropdown-btn.has-selection {
		border-color: #1a2d6b;
		background: #1a2d6b;
		color: #ffffff;
	}

	.dropdown-btn.open {
		border-color: #1a2d6b;
		box-shadow: 0 0 0 3px rgba(26, 45, 107, 0.1);
	}

	.dropdown-label { font-weight: 600; }

	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		background: #f5a623;
		color: #1a2d6b;
		font-size: 0.65rem;
		font-weight: 700;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.chevron {
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}

	.chevron.rotated { transform: rotate(180deg); }

	.dropdown-panel {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		min-width: 200px;
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 6px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
		padding: 0.5rem;
		z-index: 100;
		animation: panelIn 0.15s ease;
	}

	@keyframes panelIn {
		from { opacity: 0; transform: translateY(-6px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 0.75rem;
		border-radius: 4px;
		cursor: pointer;
		transition: background 0.12s;
	}

	.option:hover { background: #f7f8fb; }

	.option input[type='checkbox'] {
		width: 15px;
		height: 15px;
		accent-color: #1a2d6b;
		flex-shrink: 0;
		cursor: pointer;
	}

	.option-label {
		font-family: 'Inter', sans-serif;
		font-size: 0.82rem;
		color: #374151;
		flex: 1;
	}

	.option-check {
		font-size: 0.72rem;
		color: #1a2d6b;
		font-weight: 700;
	}

	.clear-group {
		display: block;
		width: 100%;
		margin-top: 0.25rem;
		padding: 0.5rem 0.75rem;
		font-family: 'Inter', sans-serif;
		font-size: 0.75rem;
		font-weight: 600;
		color: #9ca3af;
		background: none;
		border: none;
		border-top: 1px solid #f3f4f6;
		cursor: pointer;
		text-align: left;
		transition: color 0.15s;
	}

	.clear-group:hover { color: #1a2d6b; }

	.filter-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-shrink: 0;
	}

	.result-count {
		font-family: 'Inter', sans-serif;
		font-size: 0.78rem;
		color: #9ca3af;
		white-space: nowrap;
	}

	.filtered-note { color: #f5a623; font-weight: 600; }

	.clear-all {
		font-family: 'Inter', sans-serif;
		font-size: 0.75rem;
		font-weight: 600;
		color: #6b7280;
		background: none;
		border: none;
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 3px;
		padding: 0;
		transition: color 0.15s;
		white-space: nowrap;
	}

	.clear-all:hover { color: #1a2d6b; }

	/* ── Grid ────────────────────────────────────────────── */
	.grid-section {
		background: #f7f8fb;
		padding: 3rem 0 5rem;
		min-height: 40vh;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	/* ── Card ────────────────────────────────────────────── */
	.card {
		background: #ffffff;
		border: 1px solid #e5e7eb;
		display: flex;
		flex-direction: column;
		transition: box-shadow 0.2s ease, transform 0.2s ease;
	}

	.card:hover {
		box-shadow: 0 12px 40px rgba(26, 45, 107, 0.1);
		transform: translateY(-3px);
	}

	.card-image {
		height: 200px;
		position: relative;
		flex-shrink: 0;
		overflow: hidden;
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.4s ease;
	}

	.card:hover .card-img { transform: scale(1.04); }

	.card-img-fallback {
		position: absolute;
		inset: 0;
	}

	.card-duration,
	.card-region {
		position: absolute;
		font-family: 'Inter', sans-serif;
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #ffffff;
		background: rgba(0, 0, 0, 0.45);
		padding: 0.25rem 0.6rem;
		backdrop-filter: blur(4px);
	}

	.card-duration { top: 0.75rem; left: 0.75rem; }
	.card-region { bottom: 0.75rem; right: 0.75rem; }

	.card-body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		flex: 1;
	}

	.card-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-destination {
		font-family: 'Inter', sans-serif;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #1a2d6b;
	}

	.card-category {
		font-family: 'Inter', sans-serif;
		font-size: 0.68rem;
		color: #9ca3af;
		text-transform: capitalize;
	}

	.card-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.5rem;
		letter-spacing: 0.04em;
		color: #1a2d6b;
		line-height: 1;
	}

	.card-desc {
		font-family: 'Inter', sans-serif;
		font-size: 0.8rem;
		line-height: 1.6;
		color: #6b7280;
	}

	.card-highlights {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}

	.card-highlights li {
		font-family: 'Inter', sans-serif;
		font-size: 0.75rem;
		color: #374151;
		padding-left: 1rem;
		position: relative;
		line-height: 1.5;
	}

	.card-highlights li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #f5a623;
		font-weight: 700;
	}

	.card-footer {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 0.75rem;
		border-top: 1px solid #f3f4f6;
		margin-top: auto;
	}

	.card-price { display: flex; flex-direction: column; gap: 0.1rem; }

	.price-label {
		font-family: 'Inter', sans-serif;
		font-size: 0.62rem;
		color: #9ca3af;
	}

	.price-value {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.35rem;
		color: #1a2d6b;
		letter-spacing: 0.04em;
		line-height: 1;
	}

	.card-cta {
		font-family: 'Inter', sans-serif;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #ffffff;
		background: #1a2d6b;
		padding: 0.6rem 1.1rem;
		text-decoration: none;
		transition: background 0.2s, color 0.2s;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.card-cta:hover { background: #f5a623; color: #1a2d6b; }

	/* ── Empty ───────────────────────────────────────────── */
	.empty {
		text-align: center;
		padding: 6rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.empty-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2rem;
		letter-spacing: 0.06em;
		color: #1a2d6b;
	}

	.empty-sub {
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		color: #9ca3af;
	}

	.empty-clear {
		margin-top: 0.5rem;
		font-family: 'Inter', sans-serif;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #ffffff;
		background: #1a2d6b;
		padding: 0.7rem 1.5rem;
		border: none;
		cursor: pointer;
		transition: background 0.2s, color 0.2s;
	}

	.empty-clear:hover { background: #f5a623; color: #1a2d6b; }

	/* ── Bottom CTA ──────────────────────────────────────── */
	.bottom-cta {
		background: #1a2d6b;
		padding: 4rem 0;
	}

	.bottom-cta-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	.bottom-cta-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		letter-spacing: 0.04em;
		color: #ffffff;
		line-height: 1;
		margin-bottom: 0.4rem;
	}

	.bottom-cta-sub {
		font-family: 'Inter', sans-serif;
		font-size: 0.88rem;
		color: rgba(255, 255, 255, 0.65);
	}

	.bottom-cta-btn {
		flex-shrink: 0;
		font-family: 'Inter', sans-serif;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #1a2d6b;
		background: #f5a623;
		padding: 0.9rem 2rem;
		text-decoration: none;
		transition: background 0.2s;
	}

	.bottom-cta-btn:hover { background: #ffc862; }

	/* ── Responsive ──────────────────────────────────────── */
	@media (max-width: 1024px) {
		.grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (max-width: 768px) {
		.filter-row { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
		.filter-meta { width: 100%; justify-content: space-between; }
		.filter-bar { top: 102px; }
	}

	@media (max-width: 640px) {
		.grid { grid-template-columns: 1fr; }
		.filter-bar { position: static; }
		.bottom-cta-inner { flex-direction: column; text-align: center; }
	}
</style>