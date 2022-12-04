//스테이지별 유저수 구하기
//실패율 구하기
function solution(N, stages) {
  const game = new Game(N, stages);
  return game.getStagesSortedInDescendingOrderOfFailureRate();
}

class Game {
  #numberOfStages;
  #numberOfUsers;
  #currentStageOfUsers;
  constructor(numberOfStages, currentStageOfUsers) {
    this.#numberOfStages = numberOfStages;
    this.#numberOfUsers = currentStageOfUsers.length;
    this.#currentStageOfUsers = currentStageOfUsers;
  }

  getStagesSortedInDescendingOrderOfFailureRate() {
    const stagesSortedInDescendingOrderOfFailureRate = [];
    const stagesWithFailureRate = this.getStagesWithFailureRate();

    stagesWithFailureRate.sort((stage1, stage2) => stage2.failureRate - stage1.failureRate);
    stagesWithFailureRate.forEach((stage) => {
      stagesSortedInDescendingOrderOfFailureRate.push(stage.number);
    });

    return stagesSortedInDescendingOrderOfFailureRate;
  }

  getStagesWithFailureRate() {
    const stagesWithFailureRate = [];
    const numberOfCurrentUsersByStage = this.getNumberOfCurrentUsersByStage();
    let numberOfTotalReachedUsers = this.#numberOfUsers;

    for (let i = 0; i < this.#numberOfStages; i++) {
      const numberOfCurrentUsers = numberOfCurrentUsersByStage[i];
      const failureRate = this.getFailureRate(numberOfCurrentUsers, numberOfTotalReachedUsers);
      numberOfTotalReachedUsers -= numberOfCurrentUsers;
      const stage = {
        number: i + 1,
        failureRate: failureRate
      };
      stagesWithFailureRate.push(stage);
    }
    return stagesWithFailureRate;
  }
  getNumberOfCurrentUsersByStage() {
    const numberOfCurrentUsersByStage = this.#currentStageOfUsers.reduce(
      (numberOfCurrentUsersByStage, stage) => {
        numberOfCurrentUsersByStage[stage - 1] += 1;
        return numberOfCurrentUsersByStage;
      },
      new Array(this.#numberOfStages + 1).fill(0)
    );
    return numberOfCurrentUsersByStage;
  }

  getFailureRate(numberOfCurrentUsers, numberOfTotalReachedUsers) {
    return numberOfCurrentUsers == 0 ? 0 : numberOfCurrentUsers / numberOfTotalReachedUsers;
  }
}
