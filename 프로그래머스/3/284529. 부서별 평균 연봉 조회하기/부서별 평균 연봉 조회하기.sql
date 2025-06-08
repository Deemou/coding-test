-- 코드를 작성해주세요
SELECT dept_id,
       dept_name_en,
       ROUND(avg(sal)) as avg_sal
FROM HR_DEPARTMENT
JOIN HR_EMPLOYEES
USING(dept_id)
GROUP BY dept_id
ORDER BY avg_sal DESC