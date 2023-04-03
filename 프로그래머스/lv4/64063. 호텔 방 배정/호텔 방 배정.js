function solution(k, room_number) {
  const answer = [];
  const used = new Map();

  room_number.forEach((num) => {
    const tmp = [];
    let room = num;

    while (true) {
      if (!used.has(room)) {
        used.set(room, room + 1);
        answer.push(room);

        tmp.forEach((tmpNum) => {
          used.set(tmpNum, room + 1);
        });
        break;
      }
      room = used.get(room);
      tmp.push(room);
    }
  });
  return answer;
}

//재귀
// const solution = (k, room_number) => {
//   const used = new Map();
//   return room_number.map((number) => findRoom(number, used));
// };

// function findRoom(room, used) {
//   if (used.get(room) == undefined) {
//     used.set(room, room + 1);
//     return room;
//   }
//   let next = findRoom(used.get(room), used);
//   used.set(room, next + 1);
//   return next;
// }