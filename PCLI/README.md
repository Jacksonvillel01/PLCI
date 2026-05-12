# Prayerline Church International Website

## Contact Form Setup

The contact form uses Formspree for form processing. To make it work:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy the form endpoint URL (looks like: https://formspree.io/f/xxxxxxxx)
3. Replace `YOUR_FORM_ID` in the contact form action URL in `index.html` with your actual form ID
4. The form will now send emails to your Formspree account

Example:
```html
<form action="https://formspree.io/f/your-actual-form-id" method="POST">
```

## Mobile Money Donation Setup

The donation section now uses mobile money accounts for donations. The current setup includes:

- **MTN Mobile Money**: +233 594 485 384
- **Vodafone Cash**: +233 594 485 384
- **AirtelTigo Money**: +233 594 485 384

All accounts are under "Prayerline Church Int'l" with reference "Offering/Donation".

### To Update Account Details:

1. Open `index.html`
2. Find the donation section (around line 602)
3. Update the phone numbers in the mobile money cards
4. Update the account names if needed
5. Update the reference text if desired

### Features:

- Copy-to-clipboard functionality for easy phone number copying
- Responsive design for mobile and desktop
- Clear instructions for each mobile money provider
- Professional styling with network-specific branding

## Features

- Responsive design for mobile and desktop
- Contact form with email integration
- Sermon audio player
- Photo gallery with filtering
- Google Maps integration
- Multi-branch support
- Mobile money donation integration

## File Structure

- `index.html` - Main homepage
- `branches.html` - Branch locations
- `allsermon.html` - Sermon listings
- `prayergarden.html` - Prayer garden page
- `a.html` - Gallery page
- `styles.css` - Main stylesheet
- `js/script.js` - Main JavaScript functionality
- `resources/` - Images, audio, and other assets

## Development

Developed by JKSN_Ville