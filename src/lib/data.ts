export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountedPrice: number;
  discount: number;
  image: string;
  category: 'women' | 'men' | 'kids';
  size: string;
  condition: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  description: string;
  details: {
    color: string;
    material: string;
    measurements?: string;
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Vintage Denim Jacket",
    brand: "Levi's",
    price: 89.99,
    
    discountedPrice: 69.99,
    discount: 22,
    
    image: "/images/women1.jpg", // assuming the image is in the 'public/images' folder
    category: "women",
    size: "M",
    condition: "Like new",
    seller: {
      id: "s1",
      name: "Emily Johnson",
      avatar: "https://i.pravatar.cc/150?img=29",
      rating: 4.8
    },
    description: "Classic Levi's denim jacket in excellent condition. Only worn a few times, great vintage look with no signs of wear.",
    details: {
      color: "Blue",
      material: "100% Cotton Denim",
      measurements: "Chest: 52cm, Length: 60cm, Sleeve: 64cm"
    }
  }
,

  {
    id: "2",
    name: "Cashmere Sweater",
    brand: "COS",
    price: 125,
    discountedPrice: 0,
    discount: 0,
    image: "/images/men1.jpg",
    category: "men",
    size: "S",
    condition: "Good",
    seller: {
      id: "s2",
      name: "Sophie Miller",
      avatar: "https://i.pravatar.cc/150?img=10",
      rating: 4.5
    },
    description: "Warm and soft cashmere sweater in great condition. Minimalist design that goes with everything.",
    details: {
      color: "Beige",
      material: "100% Cashmere"
    }
  },
  {
    id: "3",
    name: "Leather Sneakers",
    brand: "Adidas",
    price: 110,
    discountedPrice: 85,
    discount: 23,
    image: "/images/men4.jpg",
    category: "men",
    size: "EU 42",
    condition: "Very good",
    seller: {
      id: "s3",
      name: "Mark Wilson",
      avatar: "https://i.pravatar.cc/150?img=4",
      rating: 4.9
    },
    description: "Adidas Stan Smith sneakers in very good condition. Classic white leather with green detail.",
    details: {
      color: "White & Green",
      material: "Leather"
    }
  },
  {
    id: "4",
    name: "Silk Blouse",
    brand: "& Other Stories",
    price: 79.99,
    discountedPrice: 0,
    discount: 0,
    image: "/images/women2.jpg",
    category: "women",
    size: "L",
    condition: "Like new",
    seller: {
      id: "s4",
      name: "Anna Chen",
      avatar: "https://i.pravatar.cc/150?img=20",
      rating: 4.7
    },
    description: "Elegant silk blouse with button detail. Perfect for work or special occasions.",
    details: {
      color: "Off-white",
      material: "100% Silk"
    }
  },
  {
    id: "5",
    name: "Wool Coat",
    brand: "Arket",
    price: 199.99,
    discountedPrice: 139.99,
    discount: 30,
    image: "/images/men3.jpg",
    category: "men",
    size: "L",
    condition: "Good",
    seller: {
      id: "s5",
      name: "David Park",
      avatar: "https://i.pravatar.cc/150?img=8",
      rating: 4.6
    },
    description: "Timeless wool coat in a versatile gray color. Perfect for winter and fall seasons.",
    details: {
      color: "Gray",
      material: "80% Wool, 20% Polyester"
    }
  },
  {
    id: "6",
    name: "Kids Striped T-shirt",
    brand: "Zara Kids",
    price: 25.99,
    discountedPrice: 14.99,
    discount: 42,
    image: "/images/kids1.jpg",
    category: "kids",
    size: "Age 7-8",
    condition: "Very good",
    seller: {
      id: "s6",
      name: "Laura Smith",
      avatar: "https://i.pravatar.cc/150?img=18",
      rating: 4.8
    },
    description: "Cute striped t-shirt for kids. Comfortable cotton fabric, perfect for everyday wear.",
    details: {
      color: "Blue & White Stripes",
      material: "100% Cotton"
    }
  },
  {
    id: "7",
    name: "Leather Crossbody Bag",
    brand: "Mango",
    price: 65,
    discountedPrice: 0,
    discount: 0,
    image: "/images/men2.jpg",
    category: "men",
    size: "One size",
    condition: "Good",
    seller: {
      id: "s7",
      name: "Emma Roberts",
      avatar: "https://i.pravatar.cc/150?img=36",
      rating: 4.4
    },
    description: "Stylish leather crossbody bag with adjustable strap. Minimalist design, goes with any outfit.",
    details: {
      color: "Black",
      material: "Genuine Leather"
    }
  },
  {
    id: "8",
    name: "Men's Linen Shirt",
    brand: "H&M",
    price: 49.99,
    discountedPrice: 0,
    discount: 0,
    image: "/images/women4.jpg",
    category: "women",
    size: "XL",
    condition: "Like new",
    seller: {
      id: "s8",
      name: "James Brown",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4.7
    },
    description: "Lightweight linen shirt, perfect for summer days. Relaxed fit, only worn once.",
    details: {
      color: "Light Blue",
      material: "100% Linen"
    }
  },
  {
    id: "9",
    name: "Kids Winter Boots",
    brand: "North Face",
    price: 89.99,
    discountedPrice: 59.99,
    discount: 33,
    image: "/images/kids2.jpg",
    category: "kids",
    size: "EU 33",
    condition: "Good",
    seller: {
      id: "s9",
      name: "Olivia Johnson",
      avatar: "https://i.pravatar.cc/150?img=27",
      rating: 4.9
    },
    description: "Warm and waterproof winter boots for kids. Excellent quality with minor signs of use.",
    details: {
      color: "Navy Blue",
      material: "Synthetic with fleece lining"
    }
  },
  {
    id: "10",
    name: "Vintage High Waist Jeans",
    brand: "Weekday",
    price: 74.99,
    discountedPrice: 0,
    discount: 0,
    image: "/images/kids3.jpg",
    category: "kids",
    size: "W28 L32",
    condition: "Very good",
    seller: {
      id: "s10",
      name: "Nina Parker",
      avatar: "https://i.pravatar.cc/150?img=35",
      rating: 4.6
    },
    description: "Vintage-style high waist jeans in a classic blue wash. Mom fit, very comfortable and flattering.",
    details: {
      color: "Mid Blue",
      material: "100% Cotton Denim"
    }
  }
  
];
