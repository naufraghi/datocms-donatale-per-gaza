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

## 2. Core Features

- **Homepage**: Display a grid or list of available "donation items". Each item will be visually represented and will show the person it's for.
- **Item Pages**: (Optional, can be a modal) A detailed view for each item, perhaps with a short story or context.
- **Donation Instructions Page**: A clear, simple page explaining how to donate using:
  - PayPal (e.g., PayPal.me link)
  - Satispay (e.g., QR Code and details)
  - Bank Transfer (IBAN and recipient details)
- **Content Management**: All content will be managed through a DatoCMS backend, allowing for easy updates without touching the code.
- **Netlify functions**: A function is used to add a donation event and link it to the item.
- **Forwardemail API**: The API is used to send a confirmation email to the donor and to the admins.
- **Language**: The entire frontend will be in Italian.

## 3. Rules

- Use the provided tooling to update the schema.
- Use build and check to validate developement steps.
- Ask me to check if the dev server is working.
