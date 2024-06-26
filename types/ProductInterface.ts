export interface ProductResponse {
  product: Product;
}

export interface Product {
  site_id: string;
  country_default_time_zone: string;
  paging: Paging;
  results: Result[];
  sort: Sort;
  available_sorts: Sort[];
  filters: Filter[];
  available_filters: AvailableFilter[];
  pdp_tracking: PdpTracking;
  user_context: null; // You might want to change this to 'any' or a specific type if there's potential data
}

interface Paging {
  total: number;
  primary_results: number;
  offset: number;
  limit: number;
}

export interface Result {
  id: string;
  title: string;
  condition: string;
  thumbnail_id: string;
  catalog_product_id: null;
  listing_type_id: string;
  permalink: string;
  buying_mode: string;
  site_id: string;
  category_id: string;
  domain_id: string;
  thumbnail: string;
  currency_id: string;
  order_backend: number;
  price: number;
  original_price: number | null;
  sale_price: number | null;
  available_quantity: number;
  official_store_id: null;
  use_thumbnail_id: boolean;
  accepts_mercadopago: boolean;
  variation_filters: string[]; // Assuming it's always an array of strings
  shipping: Shipping;
  stop_time: string;
  seller: Seller;
  attributes: Attribute[];
  variations_data: { [key: string]: VariationData }; // Dictionary of variations
  installments: Installments | null;
  winner_item_id: null;
  catalog_listing: boolean;
  discounts: null;
  promotions: any[]; // Might want to define a specific interface for promotions later
  inventory_id: string | null;
}

interface Shipping {
  store_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: string;
  mode: string;
  tags: string[];
  benefits: null; // You could define a Benefits interface if needed
  promise: null; // Same here, a Promise interface might be useful
  shipping_score: number;
}

interface Seller {
  id: number;
  nickname: string;
}

interface Attribute {
  id: string;
  name: string;
  value_id: string | null;
  value_name: string | null;
  attribute_group_id: string;
  attribute_group_name: string;
  value_struct: ValueStruct | null;
  values: AttributeValue[];
  source: number;
  value_type: string;
}

interface AttributeValue {
  id: string | null;
  name: string | null;
  struct: ValueStruct | null;
  source?: number;
}

interface ValueStruct {
  number?: number;
  unit?: string;
}

interface VariationData {
  thumbnail: string;
  ratio: string;
  name: string;
  pictures_qty: number;
  price: number;
  user_product_id?: string;
  inventory_id?: string; // Optional for cases like the last result
  attributes: any[]; // Might need a more specific structure for attributes
}

interface Installments {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
}

interface Sort {
  id: string;
  name: string;
}

interface Filter {
  id: string;
  name: string;
  type: string;
  values: FilterValue[];
}

interface FilterValue {
  id: string;
  name: string;
  path_from_root?: { id: string; name: string }[]; // Optional for non-category filters
  results?: number;
}

interface AvailableFilter {
  id: string;
  name: string;
  type: string;
  values: AvailableFilterValue[];
}

interface AvailableFilterValue {
  id: string;
  name: string;
  results?: number;
}

interface PdpTracking {
  group: boolean;
  product_info: any[]; //  You might want to define a specific interface for product info
}
