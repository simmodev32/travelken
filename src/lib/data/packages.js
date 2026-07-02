export const categories = [
	{ id: 'beach', label: 'Beach' },
	{ id: 'adventure', label: 'Adventure' },
	{ id: 'family', label: 'Family' },
	{ id: 'honeymoon', label: 'Honeymoon' }
];

export const durations = [
	{ id: 'short', label: 'Short (1–4 days)' },
	{ id: 'mid', label: 'Mid (5–6 days)' },
	{ id: 'week', label: 'Week (7+)' }
];

export const prices = [
	{ id: 'under-5k', label: 'Under $5,000' },
	{ id: '5k-8k', label: '$5,000 – $8,000' },
	{ id: '8k-plus', label: '$8,000+' }
];

export const regions = [
	{ id: 'caribbean', label: 'Caribbean' },
	{ id: 'central-america', label: 'Central America' },
	{ id: 'south-america', label: 'South America' },
	{ id: 'north-america', label: 'North America' }
];

export const packages = [
	{
		id: 'end-of-year-cruise',
		title: 'End of Year Cruise',
		destination: 'Barbados & Eastern Caribbean',
		category: 'beach',
		region: 'caribbean',
		durationDays: 9,
		priceTTD: 14728,
		image: '/images/packages/end-of-year-cruise.webp',
		highlights: [
			'Return flights to & from Barbados',
			'2 nights in Barbados',
			'Caribbean cruise — St. Lucia, St. Kitts, Dominica, St. Maarten',
			'All taxes included'
		],
		description: 'Board in Barbados and sail through the Eastern Caribbean — St. Lucia, St. Kitts, Dominica, and St. Maarten. Travel dates: 11–19 December.'
	},
	{
		id: 'jamdown-in-jamrock',
		title: 'Jamdown in Jamrock',
		destination: 'Jamaica',
		category: 'beach',
		region: 'caribbean',
		durationDays: 5,
		priceTTD: 12900,
		image: '/images/packages/jamdown-in-jamrock.webp',
		highlights: [
			'Round-trip airfare options',
			'Comfortable accommodations',
			'Airport transfers',
			'All-inclusive or breakfast only upgrade available'
		],
		description: 'From the golden beaches of Negril to the bustling streets of Kingston — reggae beats, jerk flavours, waterfalls, and true Jamaican hospitality. 4 nights, double occupancy.'
	},
	{
		id: 'st-maarten-summer',
		title: 'Summer Time — St. Maarten',
		destination: 'St. Maarten',
		category: 'beach',
		region: 'caribbean',
		durationDays: 5,
		priceTTD: 12900,
		image: '/images/packages/st-maarten-summer.webp',
		highlights: [
			'Round-trip airfare options',
			'Comfortable accommodations',
			'Airport transfers',
			'All-inclusive or breakfast only upgrade available'
		],
		description: 'Sun, water sports, duty-free shopping, and catamaran cruises. St. Maarten delivers the full Caribbean experience. Double occupancy.'
	},
	{
		id: 'colombia-summer',
		title: 'Summer Adventure in Colombia',
		destination: 'Colombia',
		category: 'adventure',
		region: 'south-america',
		durationDays: 5,
		priceTTD: 14800,
		image: '/images/packages/colombia-summer.webp',
		highlights: [
			'Comfortable accommodations',
			'All-inclusive meals & drinks option',
			'Airport transfers included',
			'Seamless local guides'
		],
		description: 'From the colonial charm of Cartagena to the vibrant streets of Medellín and Caribbean beaches — culture, adventure, and cuisine await. 4 nights, double occupancy.'
	},
	{
		id: 'palance-in-panama',
		title: 'Palance in Panama',
		destination: 'Panama',
		category: 'adventure',
		region: 'central-america',
		durationDays: 4,
		priceTTD: 6680,
		image: '/images/packages/palance-in-panama.webp',
		highlights: [
			'Flights & transfers included',
			'4–5 star resorts — featured: Sheraton Grand Panama',
			'Daily meals & beverages available',
			'Excursions & activities upon request'
		],
		description: 'Luxury resorts, 18th-century culture, snorkeling, and the famous swimming pigs. Panama delivers it all. Aug 28–31. All-inclusive upgrade from TTD $8,680.'
	},
	{
		id: 'experience-guatemala',
		title: 'Experience Guatemala',
		destination: 'Guatemala',
		category: 'adventure',
		region: 'central-america',
		durationDays: 4,
		priceTTD: 6098,
		image: '/images/packages/experience-guatemala.webp',
		highlights: [
			'Flights & transfers included',
			'4–5 star resorts — featured: Barceló Guatemala City',
			'Daily meals & beverages available',
			'Excursions & activities upon request'
		],
		description: 'Ancient Mayan ruins, volcanic landscapes, and colonial cities. Where ancient culture meets natural wonder. Aug 28–31. All-inclusive packages from TTD $7,598.'
	},
	{
		id: 'vibes-in-st-vincent',
		title: 'Vibes in St. Vincent',
		destination: 'St. Vincent',
		category: 'beach',
		region: 'caribbean',
		durationDays: 4,
		priceTTD: 5997,
		image: '/images/packages/vibes-in-st-vincent.webp',
		highlights: [
			'Round-trip airfare included',
			'Airport transfers',
			'La Vue Boutique Hotel & Beach Club',
			'Daily breakfast, taxes & service fees included'
		],
		description: 'Volcanic landscapes, untouched beaches, and world-class hospitality at La Vue Boutique Hotel & Beach Club. Stay. Explore. Indulge. Aug 28–31. All-inclusive upgrade available.'
	},
	{
		id: 'explore-cancun',
		title: 'Explore Cancún',
		destination: 'Cancún, Mexico',
		category: 'beach',
		region: 'north-america',
		durationDays: 4,
		priceTTD: 5180,
		image: '/images/packages/explore-cancun.webp',
		highlights: [
			'Flights & transfers included',
			'Cyan Cancún Resort — 5 star',
			'Daily meals & beverages available',
			'Excursions & activities upon request'
		],
		description: 'White-sand beaches, turquoise waters, vibrant nightlife, and a gateway to Mayan culture — Chichen Itza, cenotes, and more. Aug 28–31. All-inclusive upgrade from TTD $7,990.'
	},
	{
		id: 'discover-punta-cana',
		title: 'Discover Punta Cana',
		destination: 'Punta Cana, Dominican Republic',
		category: 'beach',
		region: 'caribbean',
		durationDays: 4,
		priceTTD: 6765,
		image: '/images/packages/discover-punta-cana.webp',
		highlights: [
			'Flights & transfers included',
			'4–5 star resorts',
			'Daily meals & beverages available',
			'Excursions & activities upon request'
		],
		description: '50+ km of white-sand beaches, crystal-clear waters, and island excursions to Saona Island and Indigenous Eyes Ecological Park. Aug 28–31.'
	}
];