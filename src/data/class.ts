import type { SkillOption } from "./skill";

export const classNames = ["Cleric", "Fighter", "Mage", "Rogue"] as const;

export type Class = (typeof classNames)[number];

export function isClass(value: unknown): value is Class {
    return typeof value === 'string' && classNames.includes(value as Class);
}

export function getSkillOptions(characterClass: Class): SkillOption[] {
    switch (characterClass) {
        case 'Cleric':
            return [
                { skills: ['Combat Skill (Cleric)'], quickPick: 15 },
                { skills: ['First Aid'], quickPick: 5 },
                { skills: ['Influence'], quickPick: 5 },
                { skills: ['Insight'], quickPick: 10 },
                { skills: ['Willpower'], quickPick: 15 },
                { skills: ['Channel'], quickPick: 15 },
                { skills: ['Courtesy'], quickPick: 10 },
                { skills: ['Devotion'], quickPick: 15 },
                { skills: [{ name: 'Lore', specialization: 'Religion' }], quickPick: 5 },
                { skills: [{ name: 'Language' }, { name: 'Lore' }, 'Oratory' ], quickPick: 5 },
            ];
        case 'Fighter':
            return [
                { skills: ['Athletics'], quickPick: 10 },
                { skills: ['Boating', 'Ride'], quickPick: 5 },
                { skills: ['Brawn'], quickPick: 15 },
                { skills: ['Combat Skill (Fighter)'], quickPick: 15 + 5 },
                { skills: ['Endurance'], quickPick: 15 },
                { skills: ['Evade'], quickPick: 10 },
                { skills: ['Unarmed Combat'], quickPick: 10 + 5 },
                { skills: ['Intimidation'], quickPick: 10 },
                { skills: ['Gambling', 'Survival', { name: 'Navigation' }], quickPick: 5 },
                { skills: ['Gambling', 'Survival', { name: 'Navigation' }], quickPick: 5 },
            ];
        case 'Mage':
            return [
                { skills: ['Combat Skill (Mage)'], quickPick: 0 },
                { skills: ['Evade'], quickPick: 10 },
                { skills: ['First Aid'], quickPick: 5 },
                { skills: ['Influence'], quickPick: 5 },
                { skills: ['Insight'], quickPick: 5 },
                { skills: ['Locale'], quickPick: 5 },
                { skills: ['Perception'], quickPick: 5 },
                { skills: ['Willpower'], quickPick: 15 },
                { skills: ['Arcane Casting'], quickPick: 15 },
                { skills: ['Arcane Knowledge'], quickPick: 15 },
                { skills: [{ name: 'Language' }], quickPick: 5 },
                { skills: [{ name: 'Language' }, { name: 'Lore' }], quickPick: 5 },
                { skills: [{ name: 'Lore', specialization: 'Alchemy' }], quickPick: 10 },
            ];
        case 'Rogue':
            return [
                { skills: ['Athletics'], quickPick: 15 },
                { skills: ['Combat Skill (Rogue)'], quickPick: 10 },
                { skills: ['Deceit'], quickPick: 5 },
                { skills: ['Evade'], quickPick: 15 },
                { skills: ['Insight'], quickPick: 5 },
                { skills: ['Perception'], quickPick: 5 },
                { skills: ['Stealth'], quickPick: 15 },
                { skills: [{ name: 'Language', specialization: "Thieves' Cant" }], quickPick: 40 },
                { skills: ['Lockpicking'], quickPick: 10 },
                { skills: ['Mechanisms'], quickPick: 10 },
                { skills: ['Acrobatics', 'Acting', 'Commerce', 'Disguise', 'Intimidation', 'Seduction', 'Sleight', 'Streetwise'], quickPick: 5 },
                { skills: ['Acrobatics', 'Acting', 'Commerce', 'Disguise', 'Intimidation', 'Seduction', 'Sleight', 'Streetwise'], quickPick: 5 },
            ];
    }
}