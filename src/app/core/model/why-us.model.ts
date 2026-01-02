export interface GetWhyUs {
  status: {
    code: number;
    message: string;
  }
  data: WhyUs[];
}

export interface WhyUs {
  title: string;
  description: string;
  icon: string;
}