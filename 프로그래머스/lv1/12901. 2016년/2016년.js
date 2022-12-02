function solution(a, b) {
  const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const DAYS_OF_MONTHS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_WEEK = 7;
  const givenMonth = 1;
  const givenDay = 1 + 2;
  const givenDayOfTheWeek = 5 + 2;
  let totalDays = 0;
  for (let month = givenMonth; month < a; month++) {
    totalDays += DAYS_OF_MONTHS[month - 1];
  }
  totalDays += b - givenDay;
  const dayOfTheWeek = Number((totalDays + givenDayOfTheWeek) % DAYS_OF_WEEK);

  return DAYS[dayOfTheWeek];
}
