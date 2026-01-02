export interface GetInsight {
  status: {
    code: number;
    message: string;
  }
  data: Insight[];
}

export interface Insight {
  banner: string;
  slug: string;
  title: string;
  description: string;
  outcomeTitle?: string;
  outcomeDescription?: string;
  metaTitle: string;
  metaDescription: string;
  contentDescription?: string;
  content?: any;
  ctaTitle?: string;
  ctaUrl?: string;
}