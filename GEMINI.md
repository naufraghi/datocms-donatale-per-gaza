# Donatale Project - Gemini Development Plan

This document outlines the plan for creating the Donatale website, a platform for collecting donations for families in need.

## 1. Project Overview

- **Project Name**: Donatale
- **Project URL**: https://donatale-per-gaza.netlify.app/
- **Objective**: Create a static website in Italian to showcase symbolic donation items (e.g., "a pullover for Mary"). The site will guide users on how to donate through external methods like PayPal, Satispay, or bank transfer, avoiding direct payment processing and fees.
- **Key Technologies**:
  - **CMS**: DatoCMS (for managing content like families, people, and donation items).
  - **Frontend Framework**: Astro with TypeScript.
  - **Package Manager**: npm (managed by nvm).
  - **Styling**: Tailwind CSS.
  - **Deployment**: Netlify.

## Development Environment

This project uses `nvm` (Node Version Manager) to manage the Node.js version. The required version is specified in the `.nvmrc` file. To set up the environment, run `nvm use` in the project's root directory. This will automatically switch to the correct Node.js version. Dependencies are managed with `npm`.

## 2. Core Features

- **Homepage**: Display a grid or list of available "donation items". Each item will be visually represented and will show the person it's for.
- **Item Pages**: (Optional, can be a modal) A detailed view for each item, perhaps with a short story or context.
- **Donation Instructions Page**: A clear, simple page explaining how to donate using:
  - PayPal (e.g., PayPal.me link)
  - Satispay (e.g., QR Code and details)
  - Bank Transfer (IBAN and recipient details)
- **Content Management**: All content will be managed through a DatoCMS backend, allowing for easy updates without touching the code.
- **Responsive Design**: The website will be fully responsive and accessible on both desktop and mobile devices.
- **Language**: The entire frontend will be in Italian.

## 3. Development Plan

I will implement the project in the following phases:

### Phase 1: Project Scaffolding

1.  **Initialize Astro Project**: Set up a new Astro application with TypeScript.
2.  **Integrate Tailwind CSS**: Configure Tailwind CSS for utility-first styling.
3.  **Define Project Structure**: Create the basic folder structure for pages, components, and services.

### Phase 2: DatoCMS Integration

1.  **Model Definition**: We are using a simplified schema with a single model:
    - **`DonationItem`**: This model holds all the information for a donation. It should have fields like `title` (text), `person_name` (text), `description` (text), `image` (image), and `donated` (boolean).
2.  **API Client**: Create a client to connect to the DatoCMS GraphQL API and fetch the required data. This will require a read-only API token from you.

### Phase 3: Frontend Development

1.  **Component Creation**:
    - `Header/Navbar`: For site navigation.
    - `Footer`: With essential links and information.
    - `DonationCard`: A component to display each symbolic item on the homepage.
2.  **Page Implementation**:
    - **`pages/index.astro`**: The homepage, which will fetch and display all `DonationItem` records from DatoCMS.
    - **`pages/come-donare.astro`**: The "How to Donate" page with static instructions.
3.  **Styling**: Apply styling using Tailwind CSS to create a clean, modern, and user-friendly interface.

### Phase 4: Deployment

1.  **Netlify Configuration**: Prepare the project for deployment on Netlify.
2.  **Environment Variables**: I will instruct you on how to set up the necessary environment variables on Netlify (e.g., `DATOCMS_API_TOKEN`).
3.  **Build & Deploy**: The site will be automatically built and deployed by Netlify whenever changes are pushed to the main branch or content is updated in DatoCMS (using webhooks).

## 4. What I'll Need from You

- **DatoCMS API Token**: I will need a read-only API token for your DatoCMS project to fetch content.
- **Donation Details**: The specific links, IBAN, and any other details for the donation methods.
- **Text Content**: While I can use placeholder text, you will need to provide the final Italian copy for the pages.
