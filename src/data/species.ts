import type { Characteristic } from "./characterisic";
import { newRoll, type Roll } from "./common";
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

type CharacteristicRolls = Readonly<Record<Characteristic, Roll>>;

export function getCharacteristicRolls(species: Species): CharacteristicRolls {
    switch (species) {
        case 'Dwarf':
            return {
                Strength: newRoll(2, 6, 9),
                Constitution: newRoll(2, 6, 9),
                Size: newRoll(2, 4, 4),
                Dexterity: newRoll(3, 6, 0),
                Intelligence: newRoll(2, 6, 6),
                Power: newRoll(3, 6, 0),
                Charisma: newRoll(2, 6, 2),
            };
        case 'Elf':
            return {
                Strength: newRoll(2, 6, 4),
                Constitution: newRoll(3, 6, 0),
                Size: newRoll(2, 6, 4),
                Dexterity: newRoll(2, 6, 9),
                Intelligence: newRoll(2, 6, 7),
                Power: newRoll(2, 6, 7),
                Charisma: newRoll(3, 6, 0),
            };
        case 'Gnome':
            return {
                Strength: newRoll(2, 6, 1),
                Constitution: newRoll(2, 6, 6),
                Size: newRoll(1, 3, 2),
                Dexterity: newRoll(3, 6, 2),
                Intelligence: newRoll(2, 6, 8),
                Power: newRoll(2, 6, 7),
                Charisma: newRoll(3, 6, 0),
            };
        case 'Half-Elf':
            return {
                Strength: newRoll(3, 6, 0),
                Constitution: newRoll(3, 6, 0),
                Size: newRoll(2, 6, 6),
                Dexterity: newRoll(2, 6, 6),
                Intelligence: newRoll(2, 6, 6),
                Power: newRoll(2, 6, 6),
                Charisma: newRoll(3, 6, 0),
            };
        case 'Half-Orc':
            return {
                Strength: newRoll(2, 6, 9),
                Constitution: newRoll(2, 6, 6),
                Size: newRoll(2, 6, 9),
                Dexterity: newRoll(3, 6, 0),
                Intelligence: newRoll(2, 6, 5),
                Power: newRoll(3, 6, 0),
                Charisma: newRoll(2, 6, 1),
            };
        case 'Halfling':
            return {
                Strength: newRoll(2, 6, 1),
                Constitution: newRoll(2, 6, 7),
                Size: newRoll(1, 4, 5),
                Dexterity: newRoll(3, 6, 3),
                Intelligence: newRoll(2, 6, 6),
                Power: newRoll(2, 6, 9),
                Charisma: newRoll(2, 6, 5),
            };
        case 'Human':
            return {
                Strength: newRoll(3, 6, 0),
                Constitution: newRoll(3, 6, 0),
                Size: newRoll(2, 6, 6),
                Dexterity: newRoll(3, 6, 0),
                Intelligence: newRoll(2, 6, 6),
                Power: newRoll(3, 6, 0),
                Charisma: newRoll(3, 6, 0),
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

export function getStartingAgeRange(species: Species): Roll {
    switch (species) {
        case 'Dwarf': return newRoll(5, 6, 40);
        case 'Elf': return newRoll(5, 6, 100);
        case 'Gnome': return newRoll(3, 12, 60);
        case 'Half-Elf': return newRoll(1, 6, 15);
        case 'Half-Orc': return newRoll(1, 4, 14);
        case 'Halfling': return newRoll(3, 4, 20);
        case 'Human': return newRoll(1, 4, 15);
    }
}

export function getMovementinFeet(species: Species): number {
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
        case 'Human':
            return 20;
        case 'Halfling':
            return 15;
    }
}