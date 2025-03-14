export const donationAmounts = [
  { value: 25000, label: "IDR 25K" },
  { value: 50000, label: "IDR 50K" },
  { value: 75000, label: "IDR 75K" },
  { value: 100000, label: "IDR 100K" },
  { value: 150000, label: "IDR 150K" },
  { value: 200000, label: "IDR 200K" },
  { value: 300000, label: "IDR 300K" },
  { value: 500000, label: "IDR 500K" },
  { value: 1000000, label: "IDR 1.000K" },
];

export interface DonationPayload {
  phone: string;
  amount: number;
}

export interface DonationResponse {
  message: string;
  transaction: {
    token: string;
    redirect_url: string;
  };
}
