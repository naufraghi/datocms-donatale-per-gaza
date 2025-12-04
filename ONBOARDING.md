# Welcome to the Donatale Project!

This document provides a quick overview of the project's tech stack and folder structure to get you started.

## Tech Stack

This is a static website built with [Astro](https://astro.build/), a modern frontend framework for building fast, content-driven websites.

- **Framework**: [Astro](https://astro.build/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [npm](https://www.npmjs.com/) (managed with [nvm](https://github.com/nvm-sh/nvm))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [DatoCMS](https://www.datocms.com/) for content management.
- **Deployment**: [Netlify](https://www.netlify.com/)

## Folder Structure

The project follows a standard Astro project structure. Here are the most important directories and files:

- **/src**: This is where all the source code for the website lives.
  - **/src/components**: Contains reusable Astro components (e.g., `Header`, `Footer`, `DonationCard`).
  - **/src/layouts**: Defines the main layout structure for pages. `Layout.astro` is the primary layout file.
  - **/src/lib**: Holds various helper functions, type definitions, and the DatoCMS client configuration.
    - **/src/lib/datocms**: Contains all the logic for fetching data from DatoCMS, including GraphQL queries and fragments.
  - **/src/pages**: Contains the pages of the website. Each `.astro` file in this directory becomes a page on the site.
    - **/src/pages/api**: Contains server-side API endpoints (Astro API routes).

- **/public**: This directory is for static assets that don't need to be processed, such as images, fonts, or `.gitkeep`.

- **Configuration Files**:
  - `astro.config.mjs`: The main configuration file for Astro.
  - `tailwind.config.mjs`: The configuration file for Tailwind CSS, where you can customize the design system.
  - `datocms.json` & `schema.graphql`: Configuration and schema files for the DatoCMS integration.
  - `netlify.toml`: The configuration file for deploying the site on Netlify.
  - `package.json`: Defines the project's dependencies and scripts.

## Getting Started

1.  **Install dependencies**: `npm install`
2.  **Start the development server**: `npm run dev`
3.  **Build the project**: `npm run build`

Happy coding!
