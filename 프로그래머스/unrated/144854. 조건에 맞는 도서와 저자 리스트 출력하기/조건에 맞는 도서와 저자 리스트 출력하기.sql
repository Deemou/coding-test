-- 코드를 입력하세요
SELECT BOOK_ID, AUTHOR_NAME, LEFT(PUBLISHED_DATE, 10) AS PUBLISHED_DATE
FROM BOOK
JOIN AUTHOR USING (AUTHOR_ID)
WHERE CATEGORY = '경제'
ORDER BY PUBLISHED_DATE