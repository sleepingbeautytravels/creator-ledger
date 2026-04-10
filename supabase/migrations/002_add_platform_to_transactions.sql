alter table public.transactions
add column if not exists platform text
check (platform in ('Instagram', 'YouTube', 'TikTok', 'Website', 'Blog', 'Podcast', 'Newsletter', 'Other'));
