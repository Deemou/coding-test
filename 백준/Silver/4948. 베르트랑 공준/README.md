# [Silver II] 베르트랑 공준 - 4948 

[문제 링크](https://www.acmicpc.net/problem/4948) 

### 성능 요약

메모리: 10844 KB, 시간: 1192 ms

### 분류

수학, 정수론, 소수 판정, 에라토스테네스의 체

### 문제 설명

<p>If n is a positive integer, there exists at least one prime number greater than n and less than or equal to 2n. This fact is known as Chebyshev's theorem or the Bertrand-Chebyshev theorem, which had been conjectured by Joseph Louis François Bertrand (1822–1900) and was proven by Pafnuty Lvovich Chebyshev (Пафнутий Львович Чебышёв, 1821–1894) in 1850. Srinivasa Aiyangar Ramanujan (1887–1920) gave an elementary proof in his paper published in 1919. Paul Erdős (1913–1996) discovered another elementary proof in 1932.</p>

<p>For example, there exist 4 prime numbers greater than 10 and less than or equal to 20, i.e. 11, 13, 17 and 19. There exist 3 prime numbers greater than 14 and less than or equal to 28, i.e. 17, 19 and 23.</p>

<p>Your mission is to write a program that counts the prime numbers greater than n and less than or equal to 2n for each given positive integer n. Using such a program, you can verify Chebyshev's theorem for individual positive integers.</p>

### 입력 

 <p>The input is a sequence of datasets. A dataset is a line containing a single positive integer n. You may assume n ≤ 123456.</p>

<p>The end of the input is indicated by a line containing a single zero. It is not a dataset.</p>

### 출력 

 <p>The output should be composed of as many lines as the input datasets. Each line should contain a single integer and should never contain extra characters.</p>

<p>The output integer corresponding to a dataset consisting of an integer n should be the number of the prime numbers p satisfying n < p ≤ 2n.</p>

