-- 코드를 입력하세요
SELECT p.product_id,
       p.product_name,
       SUM(p.price * o.amount) as total_sales
FROM FOOD_PRODUCT as p
JOIN FOOD_ORDER as o
USING(product_id)
WHERE o.produce_date LIKE '2022-05%'
GROUP BY p.product_id
ORDER BY total_sales DESC,
         p.product_id