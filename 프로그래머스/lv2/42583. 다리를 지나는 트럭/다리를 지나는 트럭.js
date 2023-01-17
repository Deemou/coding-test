function solution(bridge_length, weight, truck_weights) {
  const TRUCK_WEIGHT = 0;
  const OUT_TIME = 1;
  let time = 1,
    passing = [],
    totalWeight = 0;

  while (passing.length || truck_weights.length) {
    if (totalWeight + truck_weights[0] <= weight) {
      totalWeight += truck_weights[0];
      passing.push([truck_weights.shift(), time + bridge_length]);
    } else time = passing[0][OUT_TIME] - 1;

    time++;
      
    if (passing[0][OUT_TIME] === time) totalWeight -= passing.shift()[TRUCK_WEIGHT];
  }
  return time;
}