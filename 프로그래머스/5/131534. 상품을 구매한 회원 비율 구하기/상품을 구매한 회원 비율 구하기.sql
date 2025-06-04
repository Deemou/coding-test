-- 코드를 입력하세요
SELECT YEAR(sales_date) as year,
       MONTH(sales_date) as month,
       COUNT(DISTINCT user_id) as purchased_users,
       ROUND(COUNT(DISTINCT user_id) / (
           SELECT COUNT(*) 
           FROM USER_INFO 
           WHERE YEAR(joined) = 2021
       ), 1) as purchased_ratio
FROM USER_INFO
JOIN ONLINE_SALE
USING(user_id)
WHERE YEAR(joined) = 2021
GROUP BY year,
         month
ORDER BY year,
         month;