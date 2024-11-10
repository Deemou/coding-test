class Member {
  #name;
  #referral;
  #earning;

  constructor(name, referral) {
    this.#name = name;
    this.#referral = referral;
    this.#earning = 0;
  }

  getName() {
    return this.#name;
  }

  getReferral() {
    return this.#referral;
  }

  getEarning() {
    return this.#earning;
  }

  updateEarning(earning) {
    this.#earning += earning;
  }
}

function solution(enrolls, referrals, sellers, amounts) {
  const result = [];
  const CENTER = "-";
  const COMMISSION_RATE = 0.1;
  const PRICE = 100;
  const members = new Map();

  for (let i = 0; i < enrolls.length; i++) {
    const name = enrolls[i];
    const referral = referrals[i];
    const member = new Member(name, referral);
    members.set(name, member);
  }

  for (let i = 0; i < sellers.length; i++) {
    let seller = sellers[i];
    let amount = amounts[i] * PRICE;

    while (amount !== 0 && seller !== CENTER) {
      const commission = Math.floor(amount * COMMISSION_RATE);
      const profit = amount - commission;
      const member = members.get(seller);
      member.updateEarning(profit);
      seller = member.getReferral();
      amount = commission;
    }
  }

  for (const [k, v] of members) {
    result.push(v.getEarning());
  }

  return result;
}
