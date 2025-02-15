export interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
export interface ImageObj {
  image?: string;
  onClick?: () => void;
  name?: React.ReactNode;
  price?: number | string;
  type?: string | undefined;
  className?: string;
}

export type ProductProps = {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  rating?: number;
  images?: string[];
  numReviews?: number;
  category?: string;
  updatedAt?: string;
  createdAt?: string;
  stock?: number;
};

export const productInitialState = {
  _id: "",
  name: "",
  description: "",
  price: 0,
  rating: 0,
  images: [],
  numReviews: 0,
  category: "",
  updatedAt: "",
  createdAt: "",
  stock: 0,
};
