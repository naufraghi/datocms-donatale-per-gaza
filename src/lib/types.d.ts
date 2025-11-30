// src/lib/types.d.ts

export interface DonationItem {
  id: string;
  title: string;
  personName: string;
  description: string;
  image: {
    url: string;
  };
  donated: boolean;
}
