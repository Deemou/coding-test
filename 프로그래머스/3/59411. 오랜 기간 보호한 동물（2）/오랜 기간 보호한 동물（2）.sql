-- 코드를 입력하세요
SELECT i.animal_id,
       i.name
FROM ANIMAL_INS as i
JOIN ANIMAL_OUTS as o
USING(animal_id)
ORDER BY DATEDIFF(i.datetime, o.datetime)
LIMIT 2;