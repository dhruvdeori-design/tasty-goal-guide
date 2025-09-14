create table if not exists recipes (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  cooking_time integer not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  calories integer not null,
  image text,
  category text[] not null,
  ingredients text[] not null,
  instructions text[] not null,
  dietary_info jsonb not null default '{
    "vegetarian": false,
    "vegan": false,
    "glutenFree": false,
    "dairyFree": false
  }',
  ratings numeric not null default 0 check (ratings >= 0 and ratings <= 5),
  review_count integer not null default 0
);

create table if not exists user_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  dietary_restrictions jsonb not null default '{
    "vegetarian": false,
    "vegan": false,
    "glutenFree": false,
    "dairyFree": false
  }',
  favorite_categories text[] not null default '{}',
  cooking_skill_level text not null default 'beginner' check (cooking_skill_level in ('beginner', 'intermediate', 'advanced')),
  preferred_cooking_time integer not null default 60,
  calorie_preference jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

create trigger set_updated_at before update on user_preferences
  for each row execute procedure set_updated_at();