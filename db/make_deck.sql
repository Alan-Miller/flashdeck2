insert into decks (user_id, deck_name)
values ($1, $2);

select * from decks 
where user_id = $1
order by deck_name;