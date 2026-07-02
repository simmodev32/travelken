<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	const prefilledDestination = $page.url.searchParams.get('destination') || '';
	const prefilledPackage = $page.url.searchParams.get('package') || '';

	let { form } = $props();

	let flexibleDates = $state(false);
	let includeFlights = $state(false);
	let submitting = $state(false);
	let adults = $state(2);
	let children = $state(0);

	function clamp(value, min, max) {
		return Math.max(min, Math.min(max, value));
	}
</script>

<svelte:head>
	<title>Curated Packages — WorldView Travel Service</title>
</svelte:head>

<section class="hero">
	<div class="container">
		<p class="hero-eyebrow">Custom Packages</p>
		<h1 class="hero-title">LET'S PLAN<br />YOUR TRIP</h1>
		<p class="hero-sub">
			Tell us where you want to go and what you're after. We'll come back with a trip built for you.
		</p>
	</div>
</section>

<section class="form-section">
	<div class="container">
		{#if form?.success}
			<div class="success-card">
				<div class="success-icon" aria-hidden="true">✈</div>
				<h2 class="success-title">REQUEST RECEIVED</h2>
				<p class="success-body">
					Thanks for reaching out. A WorldView consultant will review your request and be in touch within 24 hours.
				</p>
				<a href="/packages" class="success-link">Browse packages while you wait</a>
			</div>
		{:else}
			<form
				method="POST"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}
			>
				{#if prefilledPackage}
					<input type="hidden" name="packageRef" value={prefilledPackage} />
				{/if}

				{#if form?.error}
					<div class="form-error" role="alert">{form.error}</div>
				{/if}

				<fieldset>
					<legend>Your details</legend>
					<div class="field-row">
						<div class="field">
							<label for="name">Full name <span class="req">*</span></label>
							<input id="name" name="name" type="text" required placeholder="Jane Ramkissoon" />
						</div>
						<div class="field">
							<label for="email">Email <span class="req">*</span></label>
							<input id="email" name="email" type="email" required placeholder="jane@example.com" />
						</div>
					</div>
					<div class="field-row">
						<div class="field">
							<label for="phone">Phone number</label>
							<input id="phone" name="phone" type="tel" placeholder="+1 (868) 000-0000" />
						</div>
						<div class="field">
							<label for="budget">Approximate budget (TTD)</label>
							<select id="budget" name="budget">
								<option value="">Select a range</option>
								<option value="under-5k">Under $5,000</option>
								<option value="5k-10k">$5,000 – $10,000</option>
								<option value="10k-20k">$10,000 – $20,000</option>
								<option value="20k-plus">$20,000+</option>
							</select>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Where & when</legend>
					<div class="field">
						<label for="destination">Destination(s) <span class="req">*</span></label>
						<input
							id="destination"
							name="destination"
							type="text"
							required
							placeholder="e.g. Barbados, or open to suggestions"
							value={prefilledDestination}
						/>
						<span class="field-hint">Name a specific place or describe the vibe you're after.</span>
					</div>

					<div class="toggle-row">
						<label class="toggle-label" for="flexibleToggle">
							<input
								id="flexibleToggle"
								name="flexibleDates"
								type="checkbox"
								bind:checked={flexibleDates}
								value="yes"
							/>
							<span class="toggle-track" aria-hidden="true"></span>
							My dates are flexible
						</label>
					</div>

					{#if !flexibleDates}
						<div class="field-row">
							<div class="field">
								<label for="departDate">Departure date</label>
								<input id="departDate" name="departDate" type="date" />
							</div>
							<div class="field">
								<label for="returnDate">Return date</label>
								<input id="returnDate" name="returnDate" type="date" />
							</div>
						</div>
					{/if}
				</fieldset>

				<fieldset>
					<legend>Group size</legend>
					<div class="guest-row">
						<div class="guest-counter">
							<span class="guest-label">Adults</span>
							<input type="hidden" name="adults" value={adults} />
							<div class="counter">
								<button type="button" onclick={() => (adults = clamp(adults - 1, 1, 20))} aria-label="Remove adult">−</button>
								<span class="counter-value">{adults}</span>
								<button type="button" onclick={() => (adults = clamp(adults + 1, 1, 20))} aria-label="Add adult">+</button>
							</div>
						</div>
						<div class="guest-counter">
							<span class="guest-label">Children <span class="field-hint">(under 12)</span></span>
							<input type="hidden" name="children" value={children} />
							<div class="counter">
								<button type="button" onclick={() => (children = clamp(children - 1, 0, 20))} aria-label="Remove child">−</button>
								<span class="counter-value">{children}</span>
								<button type="button" onclick={() => (children = clamp(children + 1, 0, 20))} aria-label="Add child">+</button>
							</div>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Add-ons & preferences</legend>

					<div class="toggle-row">
						<label class="toggle-label" for="flightsToggle">
							<input
								id="flightsToggle"
								name="includeFlights"
								type="checkbox"
								bind:checked={includeFlights}
								value="yes"
							/>
							<span class="toggle-track" aria-hidden="true"></span>
							Include flights in my package
						</label>
					</div>

					{#if includeFlights}
						<div class="field" style="margin-top: 1rem;">
							<label for="departure">Departing from</label>
							<input
								id="departure"
								name="departure"
								type="text"
								placeholder="e.g. Piarco International (POS)"
							/>
						</div>
					{/if}

					<div class="field" style="margin-top: 1rem;">
						<span class="guest-label">Travel style <span class="field-hint">(select all that apply)</span></span>
						<div class="checkbox-grid">
							{#each ['Beach & relaxation', 'Adventure & outdoors', 'Culture & history', 'Family-friendly', 'Romantic / honeymoon', 'Foodie & nightlife'] as style}
								<label class="checkbox-item">
									<input type="checkbox" name="styles" value={style} />
									{style}
								</label>
							{/each}
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Anything else?</legend>
					<div class="field">
						<label for="notes">Additional notes</label>
						<textarea
							id="notes"
							name="notes"
							rows="4"
							placeholder="Special occasions, dietary needs, accessibility requirements, anything that matters..."
						></textarea>
					</div>
				</fieldset>

				<button type="submit" class="submit-btn" disabled={submitting}>
					{submitting ? 'Sending...' : 'Send My Request'}
				</button>

				<p class="form-disclaimer">
					We'll review your request and get back to you within 24 hours. No commitment required.
				</p>
			</form>
		{/if}
	</div>
</section>

<style>
	.hero {
		background: linear-gradient(160deg, #050d1a 0%, #1a2d6b 100%);
		color: #ffffff;
		padding: 6rem 0 5rem;
		text-align: center;
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
		line-height: 1;
		color: #ffffff;
	}

	.hero-sub {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.7);
		max-width: 440px;
		margin: 1.25rem auto 0;
		line-height: 1.6;
	}

	.form-section {
		background: #f7f8fb;
		color: #1c1f2a;
		padding: 4rem 0 5rem;
	}

	form {
		max-width: 740px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	fieldset {
		border: 1px solid #e5e7eb;
		background: #ffffff;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	legend {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.1rem;
		letter-spacing: 0.06em;
		color: #1a2d6b;
		padding: 0 0.5rem;
	}

	.field { display: flex; flex-direction: column; gap: 0.4rem; }

	.field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	label {
		font-family: 'Inter', sans-serif;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #374151;
	}

	.guest-label {
		font-family: 'Inter', sans-serif;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #374151;
	}

	.req { color: #f5a623; }

	.field-hint {
		font-size: 0.72rem;
		color: #9ca3af;
		font-weight: 400;
	}

	input[type='text'],
	input[type='email'],
	input[type='tel'],
	input[type='date'],
	select,
	textarea {
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		color: #1c1f2a;
		background: #f7f8fb;
		border: 1px solid #d1d5db;
		padding: 0.7rem 0.9rem;
		border-radius: 2px;
		width: 100%;
		outline: none;
		transition: border-color 0.2s;
	}

	input:focus, select:focus, textarea:focus {
		border-color: #1a2d6b;
		background: #ffffff;
	}

	textarea { resize: vertical; min-height: 100px; }

	.toggle-row { display: flex; align-items: center; }

	.toggle-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		font-size: 0.85rem;
		font-weight: 500;
		color: #374151;
	}

	.toggle-label input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.toggle-track {
		display: inline-block;
		width: 40px;
		height: 22px;
		background: #d1d5db;
		border-radius: 999px;
		flex-shrink: 0;
		position: relative;
		transition: background 0.2s;
	}

	.toggle-track::after {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		width: 16px;
		height: 16px;
		background: #ffffff;
		border-radius: 50%;
		transition: transform 0.2s;
	}

	.toggle-label input:checked ~ .toggle-track { background: #1a2d6b; }
	.toggle-label input:checked ~ .toggle-track::after { transform: translateX(18px); }

	.guest-row { display: flex; gap: 3rem; }
	.guest-counter { display: flex; flex-direction: column; gap: 0.75rem; }

	.counter {
		display: flex;
		align-items: center;
		border: 1px solid #d1d5db;
		width: fit-content;
	}

	.counter button {
		width: 40px;
		height: 40px;
		font-size: 1.2rem;
		color: #1a2d6b;
		background: #f7f8fb;
		border: none;
		cursor: pointer;
		transition: background 0.15s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.counter button:hover { background: #e8edf5; }

	.counter-value {
		width: 48px;
		text-align: center;
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.4rem;
		letter-spacing: 0.04em;
		color: #1a2d6b;
	}

	.checkbox-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.6rem;
		margin-top: 0.25rem;
	}

	.checkbox-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'Inter', sans-serif;
		font-size: 0.82rem;
		font-weight: 400;
		color: #374151;
		cursor: pointer;
	}

	.checkbox-item input[type='checkbox'] {
		width: 16px;
		height: 16px;
		accent-color: #1a2d6b;
		flex-shrink: 0;
	}

	.submit-btn {
		max-width: 740px;
		margin: 0 auto;
		width: 100%;
		background: #1a2d6b;
		color: #ffffff;
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 1.1rem;
		border: none;
		cursor: pointer;
		transition: background 0.2s, opacity 0.2s;
	}

	.submit-btn:hover:not(:disabled) { background: #f5a623; color: #1a2d6b; }
	.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

	.form-disclaimer {
		max-width: 740px;
		margin: -1rem auto 0;
		font-family: 'Inter', sans-serif;
		font-size: 0.75rem;
		color: #9ca3af;
		text-align: center;
	}

	.form-error {
		max-width: 740px;
		margin: 0 auto;
		background: #fef2f2;
		border: 1px solid #fca5a5;
		color: #b91c1c;
		font-family: 'Inter', sans-serif;
		font-size: 0.85rem;
		padding: 0.9rem 1.25rem;
		border-radius: 2px;
	}

	.success-card {
		max-width: 500px;
		margin: 0 auto;
		background: #ffffff;
		border: 1px solid #e5e7eb;
		padding: 3rem 2.5rem;
		text-align: center;
	}

	.success-icon { font-size: 2.5rem; margin-bottom: 1rem; }

	.success-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2.2rem;
		letter-spacing: 0.06em;
		color: #1a2d6b;
		margin-bottom: 1rem;
	}

	.success-body {
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		line-height: 1.7;
		color: #4b5563;
		margin-bottom: 2rem;
	}

	.success-link {
		font-family: 'Inter', sans-serif;
		font-size: 0.82rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #1a2d6b;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	@media (max-width: 640px) {
		fieldset { padding: 1.25rem; }
		.field-row { grid-template-columns: 1fr; }
		.checkbox-grid { grid-template-columns: 1fr; }
		.guest-row { gap: 2rem; }
	}
</style>