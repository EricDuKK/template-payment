-- zpay 交易表
create table if not exists public.zpay_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  product_id text not null,
  out_trade_no text not null unique,
  trade_no text,
  name text not null,
  money text not null,
  type text not null,
  is_subscription boolean not null default false,
  subscription_period text,
  status text not null check (status in ('pending','paid','failed','completed')) default 'pending',
  paid_at timestamptz,
  subscription_start_at timestamptz,
  subscription_end_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 索引
create index if not exists idx_zpay_transactions_user on public.zpay_transactions(user_id);
create index if not exists idx_zpay_transactions_out_trade_no on public.zpay_transactions(out_trade_no);
create index if not exists idx_zpay_transactions_status on public.zpay_transactions(status);

-- 触发器：自动更新 updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_zpay_transactions_updated_at on public.zpay_transactions;
create trigger trg_zpay_transactions_updated_at
before update on public.zpay_transactions
for each row execute function public.set_updated_at();

