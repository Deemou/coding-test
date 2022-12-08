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
  return id.toLowerCase();
}

function removeAllCharactersExceptLowercaseNumberDashUnderscoreOrDot(id) {
  const removeRegex = /[^\w-.]/g;
  return id.replace(removeRegex, '');
}

function replaceConsecutiveDotsWithOneDot(id) {
  const dotRegex = /\.+/g;
  return id.replace(dotRegex, '.');
}

function removeDotsLocatedAtTheBeginningAndTheEnd(id) {
  const dotRegex = /^\.|\.$/g;
  return id.replace(dotRegex, '');
}

function addDefaultCharacterIfIdIsEmpty(id) {
  const char = 'a';
  const emptyRegex = /^$/;
  return id.replace(emptyRegex, char);
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