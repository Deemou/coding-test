-- 코드를 작성해주세요
SELECT COUNT(*) as fish_count,
       fish_name
FROM FISH_INFO
JOIN FISH_NAME_INFO
USING(fish_type)
GROUP BY fish_name
ORDER BY fish_count DESC;