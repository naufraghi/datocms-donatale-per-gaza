// src/lib/types.d.ts

export interface DonationItem {
  id: string;
  title: string;
  personName: string;
  description: string;
  image: {
    url: string;
  };
  donation?: {
    id: string;
    donatedBy: string;
    donorName: string;
    donorEmail: string;
  };
  _status: string;
  _firstPublishedAt: string;
}
