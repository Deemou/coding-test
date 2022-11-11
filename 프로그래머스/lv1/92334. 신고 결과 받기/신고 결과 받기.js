function solution(id_list, report, k) {
  const reportedUsers = report.reduce((reportedUsers, reportLog) => {
    const [user, reportedUser] = reportLog.split(" ");
    if (!reportedUsers.has(reportedUser))
      reportedUsers.set(reportedUser, new Set());

    const usersWhoReported = reportedUsers.get(reportedUser).add(user);
    reportedUsers.set(reportedUser, usersWhoReported);
    return reportedUsers;
  }, new Map());
  const answer = new Array(id_list.length).fill(0);
  reportedUsers.forEach((usersWhoReported) => {
    if (usersWhoReported.size >= k) {
      usersWhoReported.forEach((user) => {
        const index = id_list.indexOf(user);
        answer[index] += 1;
      });
    }
  });
  return answer;
}
