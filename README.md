# Multiverse Adventurers Guild - React Website

A modern React-based website for the Multiverse Adventurers Guild, upgraded from Wix.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/JohnBieniek/MultiverseAdventurersGuild.git
cd MultiverseAdventurersGuild
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The site will open at `http://localhost:3000`.

## Project Structure

```text
src/
|-- components/
|   |-- Navigation.jsx
|   |-- Navigation.css
|   |-- Footer.jsx
|   `-- Footer.css
|-- pages/
|   |-- Home.jsx
|   |-- About.jsx
|   |-- CharacterCreation.jsx
|   |-- Contact.jsx
|   `-- pages.css
|-- App.jsx
|-- App.css
|-- main.jsx
`-- index.css
```

## Pages

- **Home** - Welcome page with featured content
- **About** - Guild information and team members
- **Character Creation** - Character creation information and tools
- **Contact** - Contact form and information

## Customization

Replace placeholder content in each page component with your actual content from the Wix site:

- Update text and descriptions
- Add your images and media
- Configure navigation links
- Update footer information

## TODO

- Make the contact form send email directly with EmailJS instead of opening the visitor's email app.
  - EmailJS has a free plan with 200 monthly requests, 2 email templates, requests up to 50Kb, and limited contact history.
  - Create an EmailJS account and template, then add these Vite environment variables:
    - `VITE_EMAILJS_SERVICE_ID`
    - `VITE_EMAILJS_TEMPLATE_ID`
    - `VITE_EMAILJS_PUBLIC_KEY`
  - Wire `src/pages/Contact.jsx` to submit through EmailJS and show success/error states.

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/` directory.

## Technologies Used

- React 18
- React Router v6
- Vite
- CSS3

## License

All rights reserved - Multiverse Adventurers Guild
