export type Roll = {
    readonly dice: number;
    readonly sides: number;
    readonly modifier: number;
}

export function newRoll(dice: number, sides: number, modifier: number): Roll {
    return { dice, sides, modifier };
}

export function roll(roll: Roll) {
    let total = 0;
    for (let i = 0; i < roll.dice; i++) {
        total += Math.floor(Math.random() * roll.sides) + 1;
    }
    return total + roll.modifier;
}
