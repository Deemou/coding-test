-- 코드를 입력하세요
SELECT ANIMAL_ID, NAME, SEX_UPON_INTAKE FROM ANIMAL_INS
    WHERE FIND_IN_SET(NAME, 'Lucy,Ella,Pickle,Rogan,Sabrina,Mitty')
    ORDER BY ANIMAL_ID