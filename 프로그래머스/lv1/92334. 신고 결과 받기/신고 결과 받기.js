function solution(id_list, report, k) {
  const reportLogs = [...new Set(report)].map((reportLog) => {
    return reportLog.split(" ");
  });
  const reportedUsersCount = new Map();
  reportLogs.forEach(([_, reportedUser]) => {
    reportedUsersCount.set(
      reportedUser,
      reportedUsersCount.get(reportedUser) + 1 || 1
    );
  });

  const numOfIncomingMails = new Array(id_list.length).fill(0);
  for (const [user, reportedUser] of reportLogs) {
    if (reportedUsersCount.get(reportedUser) < k) continue;
    const index = id_list.indexOf(user);
    numOfIncomingMails[index] += 1;
  }
  return numOfIncomingMails;
}
