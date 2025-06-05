-- 코드를 작성해주세요
SELECT year(ym) as year,
       ROUND(AVG(pm_val1), 2) as PM10,
       ROUND(AVG(pm_val2), 2) as 'PM2.5'
FROM AIR_POLLUTION
WHERE location2 = '수원'
GROUP BY year
ORDER BY year;