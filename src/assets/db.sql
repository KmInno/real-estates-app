CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric,
  location text,
  image_url text,
  owner_id uuid REFERENCES users(id),
  created_at timestamp DEFAULT now()
);

CREATE TABLE bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id),
  user_id uuid REFERENCES users(id),
  amount numeric NOT NULL,
  created_at timestamp DEFAULT now()
);

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  phone text,
  role text DEFAULT 'buyer', -- buyer, seller, admin
  created_at timestamp DEFAULT now()
);

CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text, -- house, land, building, farmland
  status text DEFAULT 'available', -- available, sold, leased
  price numeric,
  country text,
  city text,
  address text,
  image_url text,
  owner_id uuid REFERENCES profiles(id),
  created_at timestamp DEFAULT now()
);

CREATE TABLE property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  image_url text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE auctions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid UNIQUE REFERENCES properties(id) ON DELETE CASCADE,
  start_time timestamp,
  end_time timestamp,
  starting_price numeric,
  current_price numeric,
  status text DEFAULT 'upcoming', -- upcoming, active, ended
  created_at timestamp DEFAULT now()
);

CREATE TABLE bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id uuid REFERENCES auctions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id),
  amount numeric NOT NULL,
  created_at timestamp DEFAULT now()
);

CREATE TABLE favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  property_id uuid REFERENCES properties(id),
  created_at timestamp DEFAULT now(),
  UNIQUE(user_id, property_id)
);

CREATE TABLE inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id),
  user_id uuid REFERENCES profiles(id),
  message text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE leases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id),
  tenant_id uuid REFERENCES profiles(id),
  start_date date,
  end_date date,
  rent_amount numeric,
  status text DEFAULT 'active',
  created_at timestamp DEFAULT now()
);