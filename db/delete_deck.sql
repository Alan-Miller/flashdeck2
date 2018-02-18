delete from decks 
where user_id = $1
and id = $2;

select * from decks 
where user_id = $1
order by deck_name;