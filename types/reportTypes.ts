export interface Reports {
  id: string;
  title: string;
  street: string;
  province: string;
  country: string;
  description: string;
  media?: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportsState {
  reports: Reports[];
  isLoading: boolean;
  error: string | null;
  setReports: (reports: Reports[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
