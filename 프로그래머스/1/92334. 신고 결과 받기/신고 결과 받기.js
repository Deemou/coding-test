function solution(id_list, report, k) {
    const reportedCount = new Map();
    const reportedBy = new Map(id_list.map(id => [id, []]));

    for (const info of [...new Set(report)]) {
        const [reporter, reported] = info.split(' ');
        reportedBy.get(reporter).push(reported);
        reportedCount.set(reported, (reportedCount.get(reported) || 0) + 1);
    }

    const answer = id_list.map(id => {
        return [...reportedBy.get(id)].filter(reportedId => reportedCount.get(reportedId) >= k).length;
    });

    return answer;
}
