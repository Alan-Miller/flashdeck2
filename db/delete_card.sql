delete from cards 
where user_id = $1
and id = $2;

select * from cards 
where user_id = $1
order by front;