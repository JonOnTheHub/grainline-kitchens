export type KitchenFinish = "oak" | "walnut" | "painted" | "steel" | "linoleum";

export type KitchenSpec = {
  component: string;
  dimension:  string;
  material:   string;
  tolerance:  string;
};

export type KitchenModel = {
  id:          string;
  slug:        string;
  name:        string;
  series:      string;
  finish:      KitchenFinish;
  description: string;
  philosophy:  string | null;
  price_from:  number;
  currency:    string;
  specs:       KitchenSpec[];
  images:      string[];
  is_featured: boolean;
  created_at:  string;
};