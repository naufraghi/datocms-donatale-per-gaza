/**
 * Donation Modal functionality
 * Handles modal opening/closing, form submission, and user interactions
 */

export interface DonationItemData {
  id: string;
  title: string;
  personName: string;
  description: string;
  imageUrl: string;
  donationCode: string;
}

export interface DonationFormData {
  donorName: string;
  donorEmail: string;
  donatedBy: string;
  itemId: string;
  donationCode: string;
}

export interface ApiResponse {
  message: string;
  donationEventId?: string;
}

export class DonationModal {
  private modal: HTMLDialogElement | null = null;
  private form: HTMLFormElement | null = null;
  private closeButton: HTMLButtonElement | null = null;
  private cardsContainer: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  /**
   * Initialize the donation modal by finding DOM elements and setting up event listeners
   */
  private init(): void {
    // Find DOM elements
    this.modal = document.getElementById('donation-modal') as HTMLDialogElement | null;
    this.form = document.getElementById('donation-form') as HTMLFormElement | null;
    this.closeButton = document.getElementById('modal-close-button') as HTMLButtonElement | null;
    this.cardsContainer = document.getElementById('donation-cards-container') as HTMLElement | null;

    if (!this.modal || !this.form || !this.closeButton || !this.cardsContainer) {
      console.warn('Donation modal: Required DOM elements not found');
      return;
    }

    this.setupEventListeners();
  }

  /**
   * Set up all event listeners for the modal
   */
  private setupEventListeners(): void {
    if (!this.cardsContainer || !this.closeButton || !this.form) return;

    // Event listener for opening the modal when clicking donation cards
    this.cardsContainer.addEventListener('click', this.handleCardClick.bind(this));

    // Event listener for closing the modal with the close button
    this.closeButton.addEventListener('click', this.handleCloseClick.bind(this));

    // Event listener for form submission
    this.form.addEventListener('submit', this.handleFormSubmit.bind(this));

    // Close modal when clicking outside (native <dialog> behavior)
    if (this.modal) {
      this.modal.addEventListener('click', this.handleOutsideClick.bind(this));
    }
  }

  /**
   * Handle clicks on donation cards
   */
  private handleCardClick(event: Event): void {
    const targetButton = (event.target as Element).closest(
      'button[data-item-id]',
    ) as HTMLButtonElement | null;
    if (!targetButton || targetButton.disabled) return;

    const itemData: DonationItemData = {
      id: targetButton.dataset.itemId || '',
      title: targetButton.dataset.itemTitle || '',
      personName: targetButton.dataset.itemPersonName || '',
      description: targetButton.dataset.itemDescription || '',
      imageUrl: targetButton.dataset.itemImageUrl || '',
      donationCode: targetButton.dataset.donationCode || '',
    };

    this.showModal(itemData);
  }

  /**
   * Handle close button clicks
   */
  private handleCloseClick(): void {
    if (this.modal) {
      this.modal.close();
    }
  }

  /**
   * Handle clicks outside the modal
   */
  private handleOutsideClick(event: Event): void {
    if (event.target === this.modal && this.modal) {
      this.modal.close();
    }
  }

  /**
   * Handle form submission
   */
  private async handleFormSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    if (!form) return;

    const formData = new globalThis.FormData(form);
    const submissionData = this.extractFormData(formData);

    if (!this.validateFormData(submissionData)) {
      return;
    }

    await this.submitDonation(submissionData);
  }

  /**
   * Extract and format form data
   */
  private extractFormData(formData: globalThis.FormData): DonationFormData {
    const donorName = String(formData.get('donorName') || '');
    const donorEmail = String(formData.get('donorEmail') || '');
    let donatedBy = String(formData.get('donatedBy') || '');
    const itemId = String(formData.get('itemId') || '');
    const donationCode = String(formData.get('donationCode') || '');

    // Default donatedBy to donorName if not provided
    if (!donatedBy) {
      donatedBy = donorName;
    }

    return {
      donorName,
      donorEmail,
      donatedBy,
      itemId,
      donationCode,
    };
  }

  /**
   * Validate form data
   */
  private validateFormData(data: DonationFormData): boolean {
    const { donorName, donorEmail, itemId, donationCode } = data;

    if (!donorName || !donorEmail || !itemId || !donationCode) {
      this.showError('Per favore, compila tutti i campi obbligatori.');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail)) {
      this.showError('Per favore, inserisci un indirizzo email valido.');
      return false;
    }

    return true;
  }

  /**
   * Submit donation to the API
   */
  private async submitDonation(data: DonationFormData): Promise<void> {
    try {
      // Show loading state
      this.setLoadingState(true);

      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as ApiResponse;

      if (response.ok) {
        this.handleSuccess(result);
      } else {
        this.handleError(result);
      }
    } catch (error) {
      console.error('Network or unexpected error:', error);
      this.showError('Si è verificato un errore inaspettato. Riprova più tardi.');
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * Handle successful donation
   */
  private handleSuccess(result: ApiResponse): void {
    console.log('API response:', result);

    if (this.modal) {
      this.modal.close();
    }

    this.showSuccess(
      'Grazie per la tua donazione! Abbiamo registrato la tua intenzione e riceverai presto una email di conferma.',
    );

    // Reload page after a short delay to show updated state
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  /**
   * Handle API errors
   */
  private handleError(result: ApiResponse): void {
    console.error('API error:', result);
    this.showError(`Errore nella donazione: ${result.message || 'Si è verificato un errore.'}`);
  }

  /**
   * Show the modal with item data
   */
  public showModal(itemData: DonationItemData): void {
    if (!this.modal) return;

    this.populateModal(itemData);
    this.modal.showModal();
  }

  /**
   * Populate modal content with item data
   */
  private populateModal(itemData: DonationItemData): void {
    // Set text content
    const titleElement = document.getElementById('modal-item-title');
    const descriptionElement = document.getElementById('modal-item-description');
    const codeElement = document.getElementById('modal-donation-code');

    if (titleElement) titleElement.textContent = itemData.title;
    if (descriptionElement) descriptionElement.textContent = itemData.description;
    if (codeElement) codeElement.textContent = itemData.donationCode;

    // Handle image
    const imageElement = document.getElementById('modal-item-image') as HTMLImageElement | null;
    if (imageElement) {
      if (itemData.imageUrl) {
        imageElement.src = itemData.imageUrl;
        imageElement.classList.remove('hidden');
      } else {
        imageElement.classList.add('hidden');
      }
    }

    // Populate hidden form fields
    this.setInputElementValue('form-item-id', itemData.id);
    this.setInputElementValue('form-donation-code', itemData.donationCode);

    // Reset donor-specific fields
    this.setInputElementValue('donorName', '');
    this.setInputElementValue('donorEmail', '');
    this.setInputElementValue('donatedBy', '');
  }

  /**
   * Safely set an HTMLInputElement value
   */
  private setInputElementValue(id: string, value: string): void {
    const element = document.getElementById(id) as HTMLInputElement | null;
    if (element) {
      element.value = value;
    }
  }

  /**
   * Set loading state on the form
   */
  private setLoadingState(isLoading: boolean): void {
    if (!this.form) return;

    const submitButton = this.form.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement | null;
    if (submitButton) {
      submitButton.disabled = isLoading;
      submitButton.textContent = isLoading ? 'Invio in corso...' : 'Dona ora';
    }
  }

  /**
   * Show success message (using alert for now, will be replaced with toast in Phase 2)
   */
  private showSuccess(message: string): void {
    alert(message);
  }

  /**
   * Show error message (using alert for now, will be replaced with toast in Phase 2)
   */
  private showError(message: string): void {
    alert(message);
  }
}

/**
 * Initialize the donation modal when the DOM is ready
 */
export function initDonationModal(): DonationModal {
  return new DonationModal();
}
