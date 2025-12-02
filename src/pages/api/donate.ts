import type { APIRoute } from 'astro';
import { handleUnexpectedError, invalidRequestResponse, successfulResponse } from './utils';
import { buildClient } from '@datocms/cma-client';
import { DATOCMS_CMA_TOKEN } from 'astro:env/server'; // Removed ADMIN_EMAIL import
import { sendAdminNotification, sendDonorConfirmation } from '~/lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const { itemId, donationCode, donorName, donorEmail, donatedBy } = body;

    // Basic validation
    if (!itemId || !donationCode || !donorName || !donorEmail || !donatedBy) {
      return invalidRequestResponse('Missing required fields');
    }

    // Initialize DatoCMS CMA client
    const client = buildClient({ apiToken: DATOCMS_CMA_TOKEN });

    // --- Start transaction-like process ---

    // 1. Fetch the DonationItem to check its status and version for optimistic locking
    const item = (await client.items.find(itemId)) as any; // Cast item to any temporarily

    if (item.donation) {
      // Item is already donated, return an error
      return invalidRequestResponse('Donation item already donated or in progress', 409);
    }

    // Find DonationEvent model ID dynamically
    const itemTypes = await client.itemTypes.list();
    const donationEventModel = itemTypes.find(
      (type: any) => type.api_key === 'donation_event',
    ); // Explicitly type 'type' as any temporarily

    // 2. Create the DonationEvent
    const donationEvent = await client.items.create({
      item_type: { type: 'item_type', id: donationEventModel!.id }, // Added non-null assertion
      donor_name: donorName,
      donor_email: donorEmail,
      donated_by: donatedBy,
    });

    // 3. Update the DonationItem
    // Mark as donated and link to the new DonationEvent
    await client.items.update(itemId, {
      donation: donationEvent.id, // Assuming API ID for link field is 'donation'
      // _version: item._version, // Use optimistic locking if DatoCMS supports it easily or if needed
    });

    // --- End transaction-like process ---

    // Send emails
    const itemName = item.title as string;

    // Send confirmation to donor
    await sendDonorConfirmation(donorEmail, donorName, itemName, donationCode);

    // Send notification to admin
    await sendAdminNotification(
      donationEvent.id,
      itemName,
      donorName,
      donorEmail,
      donatedBy,
      donationCode,
    );

    return successfulResponse({
      message: 'Donation processed successfully',
      donationEventId: donationEvent.id,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
};
