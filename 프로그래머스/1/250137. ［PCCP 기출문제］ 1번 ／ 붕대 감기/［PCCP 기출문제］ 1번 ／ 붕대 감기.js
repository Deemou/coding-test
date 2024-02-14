function solution(bandage, health, attacks) {
    const [t, x, y] = bandage;
    let lastAttackTime = attacks[0][0];
    let currentHealth = health - attacks[0][1];
    
    for(let i=1; i<attacks.length; i++) {
        const [attackTime, damage] = attacks[i];
        const healTime = attackTime - lastAttackTime - 1;
        const healAmount = healTime * x + Math.floor(healTime/t) * y;
        currentHealth = Math.min(health, currentHealth + healAmount) - damage
        if(currentHealth <= 0) return -1
        
        lastAttackTime = attackTime;
    }
    
    return currentHealth;
}