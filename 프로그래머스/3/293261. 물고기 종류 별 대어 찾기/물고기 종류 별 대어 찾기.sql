-- 코드를 작성해주세요
SELECT id,
       fish_name,
       length
FROM FISH_INFO
JOIN FISH_NAME_INFO
USING(fish_type)
WHERE (fish_type, length) IN (
        SELECT fish_type,
               MAX(length)
        FROM FISH_INFO
        GROUP BY fish_type
      )
ORDER BY id;