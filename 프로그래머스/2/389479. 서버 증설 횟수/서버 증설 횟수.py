def solution(players, m, k):
    server_release = [0 for _ in range(len(players))]
    current_servers = 0
    answer = 0

    for i, player in enumerate(players):
        needed_servers = player // m
        current_servers += server_release[i]
        extra_servers = needed_servers - current_servers

        if extra_servers > 0:
            answer += extra_servers
            current_servers += extra_servers

            if i + k < len(server_release):
                server_release[i + k] -= extra_servers

    return answer