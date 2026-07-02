<script>
	import { page } from '$app/stores';

	const leftLinks = [
		{ label: 'Packages', href: '/packages', external: false },
		{ label: 'Curated', href: '/curate', external: false }
	];

	const rightLinks = [
		{ label: 'Book Your Trip', href: 'https://your-booking-link.com', external: true },
		{ label: 'About', href: '/about', external: false }
	];

	const allLinks = [...leftLinks, ...rightLinks];

	let menuOpen = $state(false);

	function toggleMenu() { menuOpen = !menuOpen; }
	function closeMenu() { menuOpen = false; }

	function isActive(href) {
		if (href.startsWith('http')) return false;
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}
</script>

<nav class="nav" class:menu-open={menuOpen}>
	<div class="nav-inner container">
		<ul class="nav-links left" role="list">
			{#each leftLinks as link}
				<li>
					
					<a href={link.href}
						class="nav-link"
						class:active={isActive(link.href)}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<a href="/packages" class="logo" onclick={closeMenu}>
			<span class="logo-main">WorldView</span>
			<span class="logo-sub">Travel Service</span>
		</a>

		<ul class="nav-links right" role="list">
			{#each rightLinks as link}
				<li>
					
					<a href={link.href}
						class="nav-link"
						class:active={isActive(link.href)}
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noopener noreferrer' : undefined}
					>
						{link.label}
						{#if link.external}<span class="ext" aria-hidden="true">↗</span>{/if}
					</a>
				</li>
			{/each}
			<li>
				<a href="/curate" class="nav-cta">Plan My Trip</a>
			</li>
		</ul>

		<button
			class="hamburger"
			onclick={toggleMenu}
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
		>
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</button>
	</div>

	<!-- Ticker -->
	<div class="ticker-wrap" aria-label="Promotion">
		<div class="ticker-track">
			{#each Array(12) as _}
				<span class="ticker-item">
					🎉 Book now for a chance to win a <strong>TTD $2,500 grocery shopping spree</strong>
					<span class="ticker-dot">·</span>
				</span>
			{/each}
		</div>
	</div>

	{#if menuOpen}
		<div class="mobile-menu" role="dialog" aria-label="Site navigation">
			<ul role="list">
				{#each allLinks as link}
					<li>
						
						<a href={link.href}
							class="mobile-link"
							class:active={isActive(link.href)}
							target={link.external ? '_blank' : undefined}
							rel={link.external ? 'noopener noreferrer' : undefined}
							onclick={closeMenu}
						>
							{link.label}
							{#if link.external}<span aria-hidden="true"> ↗</span>{/if}
						</a>
					</li>
				{/each}
			</ul>
			<a href="/curate" class="mobile-cta" onclick={closeMenu}>Plan My Trip</a>
		</div>
	{/if}
</nav>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 100;
		width: 100%;
		background: #1a2d6b;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.nav-inner {
		height: 76px;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
	}

	.logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		line-height: 1;
	}

	.logo-main {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.8rem;
		letter-spacing: 0.14em;
		color: #ffffff;
		line-height: 1;
	}

	.logo-sub {
		font-family: 'Dancing Script', cursive;
		font-size: 0.72rem;
		color: #f5a623;
		letter-spacing: 0.06em;
		margin-top: -2px;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		list-style: none;
	}

	.nav-links.left { justify-content: flex-end; }
	.nav-links.right { justify-content: flex-start; }

	.nav-link {
		font-family: 'Inter', sans-serif;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: rgba(255, 255, 255, 0.75);
		padding: 0.45rem 0.9rem;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.2em;
		position: relative;
		transition: color 0.2s;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0.2rem;
		left: 0.9rem;
		right: 0.9rem;
		height: 1px;
		background: #f5a623;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.2s ease;
	}

	.nav-link:hover { color: #ffffff; }

	.nav-link:hover::after,
	.nav-link.active::after { transform: scaleX(1); }

	.nav-link.active { color: #ffffff; }

	.ext { font-size: 0.7rem; opacity: 0.7; }

	.nav-cta {
		font-family: 'Inter', sans-serif;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #1a2d6b;
		background: #f5a623;
		padding: 0.5rem 1.1rem;
		text-decoration: none;
		margin-left: 0.5rem;
		transition: background 0.2s, transform 0.15s;
		flex-shrink: 0;
	}

	.nav-cta:hover { background: #ffc862; transform: translateY(-1px); }

	/* ── Ticker ─────────────────────────────────────────── */
	.ticker-wrap {
		width: 100%;
		background: #f5a623;
		overflow: hidden;
		padding: 0.45rem 0;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
	}

	.ticker-track {
		display: flex;
		width: max-content;
		animation: ticker 60s linear infinite;
	}

	.ticker-track:hover { animation-play-state: paused; }

	.ticker-item {
		font-family: 'Inter', sans-serif;
		font-size: 0.78rem;
		font-weight: 500;
		color: #1a2d6b;
		white-space: nowrap;
		padding: 0 1rem;
	}

	.ticker-item strong { font-weight: 700; }

	.ticker-dot { margin-left: 1rem; opacity: 0.5; }

	@keyframes ticker {
		from { transform: translateX(0); }
		to   { transform: translateX(-50%); }
	}

	/* ── Hamburger ──────────────────────────────────────── */
	.hamburger {
		display: none;
		flex-direction: column;
		gap: 5px;
		padding: 0.5rem;
		cursor: pointer;
		background: none;
		border: none;
		flex-shrink: 0;
	}

	.bar {
		display: block;
		width: 24px;
		height: 2px;
		background: #ffffff;
		border-radius: 2px;
		transition: transform 0.25s ease, opacity 0.2s ease;
	}

	.menu-open .hamburger .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
	.menu-open .hamburger .bar:nth-child(2) { opacity: 0; }
	.menu-open .hamburger .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

	/* ── Mobile overlay ─────────────────────────────────── */
	.mobile-menu {
		display: none;
		background: #1a2d6b;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: 1.5rem 1.5rem 2.5rem;
	}

	.mobile-menu ul { list-style: none; display: flex; flex-direction: column; }

	.mobile-link {
		display: block;
		font-family: 'Inter', sans-serif;
		font-size: 1.2rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.8);
		padding: 1rem 0.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		text-decoration: none;
		transition: color 0.2s;
	}

	.mobile-link:hover,
	.mobile-link.active { color: #f5a623; }

	.mobile-cta {
		display: block;
		margin-top: 1.5rem;
		font-family: 'Inter', sans-serif;
		font-size: 0.88rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		text-align: center;
		color: #1a2d6b;
		background: #f5a623;
		padding: 1rem;
		text-decoration: none;
		transition: background 0.2s;
	}

	.mobile-cta:hover { background: #ffc862; }

	/* ── Responsive ─────────────────────────────────────── */
	@media (max-width: 768px) {
		.nav-links { display: none; }

		.nav-inner {
			grid-template-columns: 1fr auto;
		}

		.logo { align-items: flex-start; }
		.hamburger { display: flex; }
		.mobile-menu { display: block; }

		.ticker-item { font-size: 0.68rem; }
		.ticker-wrap { padding: 0.35rem 0; }
		.nav-inner { height: 60px; }
	}
</style>