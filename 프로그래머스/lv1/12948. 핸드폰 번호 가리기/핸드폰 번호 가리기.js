function solution(phone_number) {
  const stars = "*".repeat(phone_number.length - 4);
  const lastFourNumber = phone_number.slice(-4);
  return stars + lastFourNumber;
}
