function solution(players, callings) {
    const playerToRank = new Map();
    players.forEach((player, idx) => playerToRank.set(player, idx));
    callings.forEach(calling => {
        const rank = playerToRank.get(calling);
        [players[rank - 1], players[rank]] = [players[rank], players[rank - 1]];
        playerToRank.set(calling, rank - 1);
        playerToRank.set(players[rank], rank);
    });

    return players;
}