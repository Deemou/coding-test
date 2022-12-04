//효율성은 떨어지는 간단한 버전
function solution(N, stages) {
  const NUMBER = 0;
  const FAILURE_RATE = 1;
  const stagesWithFailureRate = [];
  for (let i = 1; i <= N; i++) {
    const numberOfTotalReachedUsers = stages.filter((stage) => stage >= i).length;
    const numberOfCurrentUsers = stages.filter((stage) => stage === i).length;
    const failureRate = numberOfCurrentUsers / numberOfTotalReachedUsers;
    stagesWithFailureRate.push([i, failureRate]);
  }
  stagesWithFailureRate.sort((stage1, stage2) => stage2[FAILURE_RATE] - stage1[FAILURE_RATE]);
  return stagesWithFailureRate.map((stage) => stage[NUMBER]);
}
