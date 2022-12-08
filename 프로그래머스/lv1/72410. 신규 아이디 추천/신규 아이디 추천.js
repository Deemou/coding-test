function solution(new_id) {
  let recommendationID = replaceAllUppercaseWithLowercase(new_id);
  recommendationID = removeAllCharactersExceptLowercaseNumberDashUnderscoreOrDot(recommendationID);
  recommendationID = replaceConsecutiveDotsWithOneDot(recommendationID);
  recommendationID = removeDotsLocatedAtTheBeginningAndTheEnd(recommendationID);
  recommendationID = addDefaultCharacterIfIdIsEmpty(recommendationID);
  recommendationID = removeAllCharactersExceptTheFirstFifteen(recommendationID);
  recommendationID = removeDotsLocatedAtTheBeginningAndTheEnd(recommendationID);
  recommendationID = repeatLastCharacterUntilLengthOfIdIsEqualOrMoreThanThree(recommendationID);
  return recommendationID;
}

function replaceAllUppercaseWithLowercase(id) {
  const uppercaseRegex = /[A-Z]/g;
  return id.replace(uppercaseRegex, (match) => match.toLowerCase());
}

function removeAllCharactersExceptLowercaseNumberDashUnderscoreOrDot(id) {
  const reserveRegex = /[a-z]|[0-9]|\-|\_|\./g;
  return id.match(reserveRegex).join('');
}

function replaceConsecutiveDotsWithOneDot(id) {
  const dotRegex = /\.{1,}/g;
  return id.replace(dotRegex, '.');
}

function removeDotsLocatedAtTheBeginningAndTheEnd(id) {
  const startIndex = id.startsWith('.') ? 1 : 0;
  const endIndex = id.endsWith('.') ? id.length - 1 : id.length;
  return id.slice(startIndex, endIndex);
}

function addDefaultCharacterIfIdIsEmpty(id) {
  if (id.length > 0) return id;

  const char = 'a';
  return char;
}

function removeAllCharactersExceptTheFirstFifteen(id) {
  const maxLimit = 15;
  return id.slice(0, maxLimit);
}

function repeatLastCharacterUntilLengthOfIdIsEqualOrMoreThanThree(id) {
  const minLimit = 3;
  const len = id.length;
  if (len >= minLimit) return id;
  return id + id[len - 1].repeat(minLimit - len);
}

const recommendationID = '=.=';
solution(recommendationID);
