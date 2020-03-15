create or replace view v_order_details as
select
    od.id as order_details_id,
    ua.id as user_account_id,
    productsummary.product_count as product_count,
    productsummary.price_sum as price_sum,
    od.invoice_name,
    od.invoice_address_id,
    od.shipping_address_id,
    od.order_date
from order_details od
    inner join user_account ua on od.user_account_id = ua.id
    inner join (
        select od.id as order_details_id, sum(op.quantity) as product_count, sum(p.price * op.quantity) as price_sum
        from order_details od
        inner join ordered_product op on od.id = op.order_details_id
        inner join product p on op.product_id = p.id
        group by od.id
    ) productsummary on od.id = productsummary.order_details_id;