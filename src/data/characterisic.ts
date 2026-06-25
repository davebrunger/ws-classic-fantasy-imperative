import { getCharacteristicRolls, type Species } from "./species";

export const characteristicNames = [
    'Strength',
    'Constitution',
    'Size',
    'Dexterity',
    'Intelligence',
    'Power',
    'Charisma'
] as const;

export type Characteristic = (typeof characteristicNames)[number];

export type Characteristics = Readonly<Record<Characteristic, number>>;

export function isCharacteristic(value: unknown): value is Characteristic {
    return typeof value === 'string' && characteristicNames.includes(value as Characteristic);
}

export function rollCharacteristic(dice: number, sides: number, modifier: number) {
    let total = 0;
    for (let i = 0; i < dice; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    return total + modifier;
}

export function rollCharacteristics(species: Species): Characteristics {
    const rolls = getCharacteristicRolls(species);

    return {
        Strength: rollCharacteristic(rolls.Strength.dice, rolls.Strength.sides, rolls.Strength.modifier),
        Constitution: rollCharacteristic(rolls.Constitution.dice, rolls.Constitution.sides, rolls.Constitution.modifier),
        Size: rollCharacteristic(rolls.Size.dice, rolls.Size.sides, rolls.Size.modifier),
        Dexterity: rollCharacteristic(rolls.Dexterity.dice, rolls.Dexterity.sides, rolls.Dexterity.modifier),
        Intelligence: rollCharacteristic(rolls.Intelligence.dice, rolls.Intelligence.sides, rolls.Intelligence.modifier),
        Power: rollCharacteristic(rolls.Power.dice, rolls.Power.sides, rolls.Power.modifier),
        Charisma: rollCharacteristic(rolls.Charisma.dice, rolls.Charisma.sides, rolls.Charisma.modifier),
    };
}

export function getActionPoints(_: Characteristics): number {
    return 2;
}

export function getDamageModifier(characteristics: Characteristics): string {
    const total = characteristics.Strength + characteristics.Size;
    if (total <= 5) {
        return "-1d8";
    } else if (total <= 10) {
        return "-1d6";
    } else if (total <= 15) {
        return "-1d4";
    } else if (total <= 20) {
        return "-1d2";
    } else if (total <= 25) {
        return "+0";
    } else if (total <= 30) {
        return "+1d2";
    } else if (total <= 35) {
        return "+1d4";
    } else if (total <= 40) {
        return "+1d6";
    } else {
        return "+1d8";
    }
}

export function getExperienceModifier(characteristics: Characteristics): string {
    const experienceModifier = Math.ceil(characteristics.Charisma / 6) - 2;
    if (experienceModifier < 0) {
        return `${experienceModifier}`;
    } else {
        return `+${experienceModifier}`;
    }
}

export function getHealingRate(characteristics: Characteristics): number {
    return Math.ceil(characteristics.Constitution / 6);
}

export function getInitiative(characteristics: Characteristics): number {
    return Math.ceil((characteristics.Dexterity + characteristics.Intelligence) / 2)
}

export function getLuckPoints(characteristics: Characteristics): number {
    return Math.ceil(characteristics.Power / 6);
}

export function getMagicPoints(characteristics: Characteristics): number {
    return characteristics.Power;
}