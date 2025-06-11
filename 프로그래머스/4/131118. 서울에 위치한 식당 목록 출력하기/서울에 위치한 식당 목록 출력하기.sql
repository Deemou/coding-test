-- 코드를 입력하세요
SELECT rest_id,
       rest_name,
       food_type,
       favorites,
       address,
       ROUND(AVG(REVIEW_SCORE), 2) as score      
FROM REST_REVIEW
JOIN REST_INFO
USING(rest_id)
WHERE address LIKE '서울%'
GROUP BY rest_id
ORDER BY score DESC,
         favorites DESC;