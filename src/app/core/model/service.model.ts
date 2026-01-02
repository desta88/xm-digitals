export interface GetService {
  status: {
    code: number;
    message: string;
  }
  data: Service[];
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  outcomeDescription?: string;
  metaTitle: string;
  metaDescription: string;
  banner: string;
  ctaTitle?: string;
  ctaUrl?: string;
  titleContent?: string;
  content?: any | null;
  serviceCluster?: ServiceCluster[] | null;
}

export interface ServiceCluster {
  title: string;
  serviceSubCluster: ServiceSubCluster[] | null;
  customCol?: string | null;
}

export interface ServiceSubCluster {
  title: string;
  description: string;
  link: Link[] | null;
  customBg?: string | null;
}

export interface Link {
  ctaTitle: string;
  ctaUrl: string;
}

export interface GetDetailService {
  status: {
    code: number;
    message: string;
  }
  data: DetailService[];
}

export interface DetailService {
  banner: string;
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  content?: any;
  ctaTitle?: string;
  ctaUrl?: string;
}