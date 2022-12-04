function solution(N, stages) {
  const stage = new Stage(N, stages);
  return stage.getStagesSortedInDescendingOrderOfFailureRate();
}

class Stage {
  #numberOfUsers;
  #currentStageOfUsers;
  #stages;

  constructor(numberOfStages, currentStageOfUsers) {
    this.#numberOfUsers = currentStageOfUsers.length;
    this.#currentStageOfUsers = currentStageOfUsers;
    this.initStages(numberOfStages);
    this.setNumberOfCurrentUsers();
    this.setFailureRate();
  }

  initStages(numberOfStages) {
    const stages = [];
    for (let i = 0; i <= numberOfStages; i++) {
      const stage = this.getInitializedStage(i);
      stages.push(stage);
    }
    this.#stages = stages;
  }

  getInitializedStage(number) {
    const stage = { number: number + 1, numberOfCurrentUsers: 0, failureRate: 0 };
    Object.seal(stage);
    return stage;
  }

  setNumberOfCurrentUsers() {
    this.#currentStageOfUsers.forEach((stage) => {
      this.#stages[stage - 1].numberOfCurrentUsers += 1;
    });
  }

  setFailureRate() {
    let numberOfTotalReachedUsers = this.#numberOfUsers;

    for (let i = 0; i < this.#stages.length; i++) {
      const numberOfCurrentUsers = this.#stages[i].numberOfCurrentUsers;
      const failureRate = this.getFailureRate(numberOfCurrentUsers, numberOfTotalReachedUsers);
      numberOfTotalReachedUsers -= numberOfCurrentUsers;
      this.#stages[i].failureRate = failureRate;
    }
  }

  getFailureRate(numberOfCurrentUsers, numberOfTotalReachedUsers) {
    return numberOfCurrentUsers == 0 ? 0 : numberOfCurrentUsers / numberOfTotalReachedUsers;
  }

  getStagesSortedInDescendingOrderOfFailureRate() {
    const stagesSortedInDescendingOrderOfFailureRate = [];
    const stages = this.#stages.slice(0, -1);

    stages.sort((stage1, stage2) => stage2.failureRate - stage1.failureRate);
    stages.forEach((stage) => {
      stagesSortedInDescendingOrderOfFailureRate.push(stage.number);
    });
    return stagesSortedInDescendingOrderOfFailureRate;
  }
}
