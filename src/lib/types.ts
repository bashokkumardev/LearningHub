export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  modules: string[];
  icon: string;
  color: string;
}

export interface ResumePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  formats: ("PDF" | "Word")[];
  deliveryDays: number;
  popular?: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  experience: string;
  salary: string;
  skills: string[];
  postedAt: string;
  applyUrl: string;
}

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpayPaymentResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: { error: { description: string } }) => void) => void;
}
