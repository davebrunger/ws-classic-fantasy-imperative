import type { Characteristic } from "./characterisic";
import type { Culture } from "./culture";
import type { SkillOption } from "./skill";

export const speciesNames = [
    'Dwarf',
    'Elf',
    'Gnome',
    'Half-Elf',
    'Half-Orc',
    'Halfling',
    'Human'
] as const;

export type Species = (typeof speciesNames)[number];

export function isSpecies(value: unknown): value is Species {
    return typeof value === 'string' && speciesNames.includes(value as Species);
}

export function getMovementRate(species: Species): number {
    switch (species) {
        case 'Dwarf':
            return 15;
        case 'Elf':
            return 20;
        case 'Gnome':
            return 15;
        case 'Half-Elf':
            return 20;
        case 'Half-Orc':
            return 20;
        case 'Halfling':
            return 15;
        case 'Human':
            return 20;
    }
}

type CharacteristicRoll = {
    readonly dice: number;
    readonly sides: number;
    readonly modifier: number;
}

function rollCharacteristic(dice: number, sides: number, modifier: number): CharacteristicRoll {
    return {
        dice,
        sides,
        modifier
    };
}

type CharacteristicRolls = Readonly<Record<Characteristic, CharacteristicRoll>>;

export function getCharacteristicRolls(species: Species): CharacteristicRolls {
    switch (species) {
        case 'Dwarf':
            return {
                Strength: rollCharacteristic(2, 6, 9),
                Constitution: rollCharacteristic(2, 6, 9),
                Size: rollCharacteristic(2, 4, 4),
                Dexterity: rollCharacteristic(3, 6, 0),
                Intelligence: rollCharacteristic(2, 6, 6),
                Power: rollCharacteristic(3, 6, 0),
                Charisma: rollCharacteristic(2, 6, 2),
            };
        case 'Elf':
            return {
                Strength: rollCharacteristic(2, 6, 4),
                Constitution: rollCharacteristic(3, 6, 0),
                Size: rollCharacteristic(2, 6, 4),
                Dexterity: rollCharacteristic(2, 6, 9),
                Intelligence: rollCharacteristic(2, 6, 7),
                Power: rollCharacteristic(2, 6, 7),
                Charisma: rollCharacteristic(3, 6, 0),
            };
        case 'Gnome':
            return {
                Strength: rollCharacteristic(2, 6, 1),
                Constitution: rollCharacteristic(2, 6, 6),
                Size: rollCharacteristic(1, 3, 2),
                Dexterity: rollCharacteristic(3, 6, 2),
                Intelligence: rollCharacteristic(2, 6, 8),
                Power: rollCharacteristic(2, 6, 7),
                Charisma: rollCharacteristic(3, 6, 0),
            };
        case 'Half-Elf':
            return {
                Strength: rollCharacteristic(3, 6, 0),
                Constitution: rollCharacteristic(3, 6, 0),
                Size: rollCharacteristic(2, 6, 6),
                Dexterity: rollCharacteristic(2, 6, 6),
                Intelligence: rollCharacteristic(2, 6, 6),
                Power: rollCharacteristic(2, 6, 6),
                Charisma: rollCharacteristic(3, 6, 0),
            };
        case 'Half-Orc':
            return {
                Strength: rollCharacteristic(2, 6, 9),
                Constitution: rollCharacteristic(2, 6, 6),
                Size: rollCharacteristic(2, 6, 9),
                Dexterity: rollCharacteristic(3, 6, 0),
                Intelligence: rollCharacteristic(2, 6, 5),
                Power: rollCharacteristic(3, 6, 0),
                Charisma: rollCharacteristic(2, 6, 1),
            };
        case 'Halfling':
            return {
                Strength: rollCharacteristic(2, 6, 1),
                Constitution: rollCharacteristic(2, 6, 7),
                Size: rollCharacteristic(1, 4, 5),
                Dexterity: rollCharacteristic(3, 6, 3),
                Intelligence: rollCharacteristic(2, 6, 6),
                Power: rollCharacteristic(2, 6, 9),
                Charisma: rollCharacteristic(2, 6, 5),
            };
        case 'Human':
            return {
                Strength: rollCharacteristic(3, 6, 0),
                Constitution: rollCharacteristic(3, 6, 0),
                Size: rollCharacteristic(2, 6, 6),
                Dexterity: rollCharacteristic(3, 6, 0),
                Intelligence: rollCharacteristic(2, 6, 6),
                Power: rollCharacteristic(3, 6, 0),
                Charisma: rollCharacteristic(3, 6, 0),
            };
    }
}

export function getAvailableCultures(species: Species): Culture[] {

    const humanCultures: Culture[] = [
        'Barbarian, Warrior Type',
        'Barbarian, Wise Person',
        'Civilizied, Street Smart',
        'Civilizied, Book Smart',
        'Nomad, Warrior Type',
        'Nomad, Wise Person',
        'Primitive, Warrior Type',
        'Primitive, Wise Person'
    ];

    switch (species) {
        case 'Dwarf':
            return ['Dwarf'];
        case 'Elf':
            return ['Elf'];
        case 'Gnome':
            return ['Gnome'];
        case 'Half-Elf':
            return ['Raised as Elf', ...humanCultures];
        case 'Half-Orc':
            return ['Raised as Orc', ...humanCultures];
        case 'Halfling':
            return ['Halfling'];
        case 'Human':
            return humanCultures;
    }
}

export function getSkillOptions(_: Species): SkillOption[] {
    return [
        { skills: ['Customs'], quickPick: 40 },
        { skills: ['Native Tongue'], quickPick: 40 },
    ];
}

