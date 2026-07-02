import { fail } from '@sveltejs/kit';
import { RESEND_API_KEY, FROM_EMAIL, TO_EMAIL } from '$env/static/private';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');
const SUBMISSIONS_FILE = join(DATA_DIR, 'submissions.json');

function buildAgencyEmail(data) {
	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Inter, sans-serif; background: #f7f8fb; margin: 0; padding: 0; }
    .wrap { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: #1a2d6b; padding: 2rem; text-align: center; }
    .header h1 { font-family: Georgia, serif; color: #ffffff; font-size: 1.6rem; margin: 0; letter-spacing: 0.06em; }
    .header p { color: #f5a623; font-size: 0.85rem; margin: 0.4rem 0 0; }
    .body { padding: 2rem; }
    .label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; margin-bottom: 0.25rem; }
    .value { font-size: 0.95rem; color: #1c1f2a; margin-bottom: 1.25rem; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 1.5rem 0; }
    .highlight { background: #f7f8fb; border-left: 3px solid #f5a623; padding: 1rem 1.25rem; margin-bottom: 1.25rem; }
    .footer { background: #050d1a; padding: 1.25rem 2rem; text-align: center; }
    .footer p { color: rgba(255,255,255,0.5); font-size: 0.72rem; margin: 0; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>WORLDVIEW TRAVEL SERVICE</h1>
      <p>New Package Request</p>
    </div>
    <div class="body">
      <div class="highlight">
        <div class="label">Package</div>
        <div class="value" style="font-size:1.1rem; font-weight:600;">${data.packageTitle}</div>
        <div class="label">Destination</div>
        <div class="value">${data.destination}</div>
      </div>
      <div class="label">Full Name</div>
      <div class="value">${data.name}</div>
      <div class="label">Email</div>
      <div class="value">${data.email}</div>
      <div class="label">Phone</div>
      <div class="value">${data.phone || 'Not provided'}</div>
      <hr class="divider" />
      <div class="label">Travel Dates</div>
      <div class="value">${data.flexibleDates === 'yes' ? 'Flexible' : `${data.departDate || 'TBD'} → ${data.returnDate || 'TBD'}`}</div>
      <div class="label">Group Size</div>
      <div class="value">${data.adults} adult${data.adults > 1 ? 's' : ''}${data.children > 0 ? `, ${data.children} child${data.children > 1 ? 'ren' : ''}` : ''}</div>
      ${data.notes ? `<hr class="divider" /><div class="label">Additional Notes</div><div class="value">${data.notes}</div>` : ''}
    </div>
    <div class="footer">
      <p>WorldView Travel Service · worldviewtravelservicett@gmail.com · 731-9636 / 325-3964</p>
    </div>
  </div>
</body>
</html>`.trim();
}

function buildClientEmail(name, packageTitle, destination) {
	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Inter, sans-serif; background: #f7f8fb; margin: 0; padding: 0; }
    .wrap { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: #1a2d6b; padding: 2.5rem 2rem; text-align: center; }
    .header h1 { font-family: Georgia, serif; color: #ffffff; font-size: 1.6rem; margin: 0 0 0.5rem; letter-spacing: 0.06em; }
    .header p { color: #f5a623; font-size: 0.9rem; margin: 0; font-style: italic; }
    .body { padding: 2rem; color: #1c1f2a; }
    .body p { font-size: 0.95rem; line-height: 1.7; color: #4b5563; margin-bottom: 1rem; }
    .pkg { font-size: 1.2rem; font-weight: 700; color: #1a2d6b; text-align: center; padding: 1.25rem; background: #f7f8fb; margin: 1.5rem 0; border-left: 4px solid #f5a623; }
    .contact { background: #1a2d6b; color: #ffffff; padding: 1.25rem 2rem; }
    .contact p { font-size: 0.82rem; color: rgba(255,255,255,0.8); margin: 0.25rem 0; }
    .footer { padding: 1rem 2rem; text-align: center; }
    .footer p { font-size: 0.72rem; color: #9ca3af; margin: 0; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>WORLDVIEW TRAVEL SERVICE</h1>
      <p>Connecting You to the World</p>
    </div>
    <div class="body">
      <p>Hi ${name},</p>
      <p>We've received your request for the following package and we're already looking into availability for you.</p>
      <div class="pkg">${packageTitle}<br/><span style="font-size:0.85rem; font-weight:400; color:#6b7280;">${destination}</span></div>
      <p>One of our travel consultants will be in touch within <strong>24 hours</strong> to confirm details and next steps.</p>
      <p style="color: #1a2d6b; font-weight: 600;">— The WorldView Team</p>
    </div>
    <div class="contact">
      <p>📞 731-9636 / 325-3964</p>
      <p>✉️ worldviewtravelservicett@gmail.com</p>
      <p>📍 139 Eastern Main Road, Arouca</p>
    </div>
    <div class="footer">
      <p>© WorldView Travel Service · Trinidad & Tobago</p>
    </div>
  </div>
</body>
</html>`.trim();
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name           = data.get('name')?.toString().trim() ?? '';
		const email          = data.get('email')?.toString().trim() ?? '';
		const phone          = data.get('phone')?.toString().trim() ?? '';
		const packageId      = data.get('packageId')?.toString() ?? '';
		const packageTitle   = data.get('packageTitle')?.toString() ?? '';
		const destination    = data.get('destination')?.toString() ?? '';
		const flexibleDates  = data.get('flexibleDates')?.toString() ?? '';
		const departDate     = data.get('departDate')?.toString() ?? '';
		const returnDate     = data.get('returnDate')?.toString() ?? '';
		const adults         = parseInt(data.get('adults')?.toString() ?? '1', 10);
		const children       = parseInt(data.get('children')?.toString() ?? '0', 10);
		const notes          = data.get('notes')?.toString().trim() ?? '';

		if (!name)                         return fail(400, { error: 'Full name is required.' });
		if (!email || !email.includes('@')) return fail(400, { error: 'A valid email is required.' });

		const formData = {
			name, email, phone, packageId, packageTitle,
			destination, flexibleDates, departDate, returnDate,
			adults, children, notes
		};

		try {
			const { Resend } = await import('resend');
			const resend = new Resend(RESEND_API_KEY);

			await resend.emails.send({
				from: FROM_EMAIL,
				to: TO_EMAIL,
				subject: `Package Request — ${packageTitle} (${name})`,
				html: buildAgencyEmail(formData)
			});

			await resend.emails.send({
				from: FROM_EMAIL,
				to: email,
				subject: `We received your request — WorldView Travel Service`,
				html: buildClientEmail(name, packageTitle, destination)
			});
		} catch (err) {
			console.error('Resend error:', err);
		}

		try {
			mkdirSync(DATA_DIR, { recursive: true });
			const existing = existsSync(SUBMISSIONS_FILE)
				? JSON.parse(readFileSync(SUBMISSIONS_FILE, 'utf-8'))
				: [];
			existing.push({ id: `sub_${Date.now()}`, createdAt: new Date().toISOString(), ...formData });
			writeFileSync(SUBMISSIONS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
		} catch (err) {
			console.error('File write error:', err);
		}

		return { success: true };
	}
};