import type { ProfessionalSkill, Skill, StandardSkill } from "./skill";

export const cultureNames = [
    'Barbarian, Warrior Type',
    'Barbarian, Wise Person',
    'Civilizied, Street Smart',
    'Civilizied, Book Smart',
    'Nomad, Warrior Type',
    'Nomad, Wise Person',
    'Primitive, Warrior Type',
    'Primitive, Wise Person',
    'Dwarf',
    'Elf',
    'Gnome',
    'Raised as Elf',
    'Raised as Orc',
    'Halfling'
] as const;

export type Culture = (typeof cultureNames)[number];

export function isCulture(value: unknown): value is Culture {
    return typeof value === 'string' && cultureNames.includes(value as Culture);
}

export type SkillOption = {
    readonly skills: Skill[];
    readonly quickPick: number;
}

export function getSkillOptions(culture: Culture): SkillOption[] {
    switch (culture) {
        case 'Barbarian, Warrior Type':
            return [
                { skills: ['Athletics'], quickPick: 10 },
                { skills: ['Brawn'], quickPick: 10 },
                { skills: ['Endurance'], quickPick: 15 },
                { skills: ['First Aid'], quickPick: 5 },
                { skills: ['Locale'], quickPick: 10 },
                { skills: ['Perception'], quickPick: 10 },
                { skills: ['Boating', 'Ride'], quickPick: 10 },
                { skills: ['Navigation'], quickPick: 10 },
                { skills: ['Seamanship', 'Survival'], quickPick: 10 },
                { skills: ['Track'], quickPick: 10 },
            ];
        case 'Barbarian, Wise Person':
            return [
                { skills: ['Athletics'], quickPick: 5 },
                { skills: ['Endurance'], quickPick: 5 },
                { skills: ['First Aid'], quickPick: 15 },
                { skills: ['Locale'], quickPick: 15 },
                { skills: ['Perception'], quickPick: 15 },
                { skills: ['Boating', 'Ride'], quickPick: 10 },
                { skills: ['Healing'], quickPick: 10 },
                { skills: ['Language'], quickPick: 10 },
                { skills: ['Lore'], quickPick: 15 },
            ];
        case 'Civilizied, Street Smart':
            return [
                { skills: ['Conceal'], quickPick: 10 },
                { skills: ['Deceit'], quickPick: 15 },
                { skills: ['Drive'], quickPick: 5 },
                { skills: ['Influence'], quickPick: 10 },
                { skills: ['Insight'], quickPick: 10 },
                { skills: ['Locale'], quickPick: 10 },
                { skills: ['Willpower'], quickPick: 10 },
                { skills: ['Craft'], quickPick: 5 },
                { skills: ['Commerce'], quickPick: 10 },
                { skills: ['Streetwise'], quickPick: 15 },
            ];
        case 'Civilizied, Book Smart':
            return [
                { skills: ['Conceal'], quickPick: 5 },
                { skills: ['Deceit'], quickPick: 5 },
                { skills: ['Drive'], quickPick: 5 },
                { skills: ['Influence'], quickPick: 10 },
                { skills: ['Insight'], quickPick: 15 },
                { skills: ['Locale'], quickPick: 15 },
                { skills: ['Willpower'], quickPick: 10 },
                { skills: ['Commerce'], quickPick: 10 },
                { skills: ['Language', 'Lore'], quickPick: 10 },
                { skills: ['Lore', 'Musicianship'], quickPick: 15 },
            ];
        case 'Nomad, Warrior Type':
            return [
                { skills: ['Endurance'], quickPick: 10 },
                { skills: ['First Aid'], quickPick: 5 },
                { skills: ['Locale'], quickPick: 5 },
                { skills: ['Perception'], quickPick: 10 },
                { skills: ['Stealth'], quickPick: 10 },
                { skills: ['Athletics', 'Boating', 'Drive', 'Ride', 'Swim'], quickPick: 15 },
                { skills: ['Athletics', 'Boating', 'Drive', 'Ride', 'Swim'], quickPick: 15 },
                { skills: ['Navigation'], quickPick: 10 },
                { skills: ['Survival'], quickPick: 10 },
                { skills: ['Track'], quickPick: 10 },
            ];
        case 'Nomad, Wise Person': // Missing Lore 15, Which is erronously listed in the book as a standard skill.
            return [
                { skills: ['Endurance'], quickPick: 5 },
                { skills: ['First Aid'], quickPick: 15 },
                { skills: ['Locale'], quickPick: 10 },
                { skills: ['Perception'], quickPick: 10 },
                { skills: ['Stealth'], quickPick: 5 },
                { skills: ['Athletics', 'Boating', 'Drive', 'Ride', 'Swim'], quickPick: 5 },
                { skills: ['Athletics', 'Boating', 'Drive', 'Ride', 'Swim'], quickPick: 5 },
                { skills: ['Healing'], quickPick: 10 },
                { skills: ['Language'], quickPick: 10 },
                { skills: ['Lore'], quickPick: 10 },
            ];
        case 'Primitive, Warrior Type':
            return [
                { skills: ['Brawn'], quickPick: 10 },
                { skills: ['Endurance'], quickPick: 10 },
                { skills: ['Evade'], quickPick: 10 },
                { skills: ['Locale'], quickPick: 5 },
                { skills: ['Perception'], quickPick: 10 },
                { skills: ['Stealth'], quickPick: 15 },
                { skills: ['Athletics', 'Boating', 'First Aid', 'Swim'], quickPick: 10 },
                { skills: ['Survival'], quickPick: 10 },
                { skills: ['Track'], quickPick: 10 },
                { skills: ['Athletics', 'Boating', 'First Aid', 'Navigation', 'Swim'], quickPick: 10 },
            ];
        case 'Primitive, Wise Person':
            return [
                { skills: ['Endurance'], quickPick: 5 },
                { skills: ['Evade'], quickPick: 5 },
                { skills: ['First Aid'], quickPick: 15 },
                { skills: ['Locale'], quickPick: 15 },
                { skills: ['Perception'], quickPick: 15 },
                { skills: ['Stealth'], quickPick: 5 },
                { skills: ['Athletics', 'Boating', 'Swim'], quickPick: 5 },
                { skills: ['Healing'], quickPick: 10 },
                { skills: ['Language'], quickPick: 10 },
                { skills: ['Lore'], quickPick: 15 },
            ];
        case 'Dwarf':
            return [
                { skills: ['Athletics'], quickPick: 10 },
                { skills: ['Brawn'], quickPick: 15 },
                { skills: ['Endurance'], quickPick: 10 },
                { skills: ['Evade'], quickPick: 10 },
                { skills: ['Locale'], quickPick: 10 },
                { skills: ['Perception'], quickPick: 5 },
                { skills: ['Willpower'], quickPick: 10 },
                { skills: ['Commerce', 'Mechanisms'], quickPick: 10 },
                { skills: ['Craft'], quickPick: 10 },
                { skills: ['Survival'], quickPick: 10 },
            ];
        case 'Elf':
            return [
                { skills: ['Conceal'], quickPick: 5 },
                { skills: ['Influence'], quickPick: 10 },
                { skills: ['Insight'], quickPick: 10 },
                { skills: ['Locale'], quickPick: 10 },
                { skills: ['Perception'], quickPick: 15 },
                { skills: ['Stealth'], quickPick: 10 },
                { skills: ['Willpower'], quickPick: 10 },
                { skills: ['Survival'], quickPick: 10 },
                { skills: ['Language', 'Lore', 'Musicianship'], quickPick: 10 },
                { skills: ['Language', 'Lore', 'Musicianship'], quickPick: 10 },
            ];
        case 'Gnome':
            return [
                { skills: ['Deceit'], quickPick: 10 },
                { skills: ['Evade'], quickPick: 15 },
                { skills: ['Insight'], quickPick: 10 },
                { skills: ['Locale'], quickPick: 10 },
                { skills: ['Perception'], quickPick: 5 },
                { skills: ['Stealth'], quickPick: 10 },
                { skills: ['Willpower'], quickPick: 10 },
                { skills: ['Commerce'], quickPick: 10 },
                { skills: ['Craft'], quickPick: 10 },
                { skills: ['Mechanisms', 'Survival'], quickPick: 10 },
            ];
        case 'Raised as Elf':
            return [
                { skills: ['Conceal'], quickPick: 10 },
                { skills: ['Influence'], quickPick: 10 },
                { skills: ['Insight'], quickPick: 10 },
                { skills: ['Locale'], quickPick: 10 },
                { skills: ['Perception'], quickPick: 10 },
                { skills: ['Stealth'], quickPick: 10 },
                { skills: ['Willpower'], quickPick: 10 },
                { skills: ['Language'], quickPick: 10 },
                { skills: ['Lore'], quickPick: 10 },
                { skills: ['Musicianship', 'Survival'], quickPick: 10 },
            ];
        case 'Raised as Orc':
            return [
                { skills: ['Athletics'], quickPick: 15 },
                { skills: ['Brawn'], quickPick: 15 },
                { skills: ['Endurance'], quickPick: 15 },
                { skills: ['Evade'], quickPick: 10 },
                { skills: ['First Aid'], quickPick: 5 },
                { skills: ['Locale'], quickPick: 5 },
                { skills: ['Perception'], quickPick: 5 },
                { skills: ['Navigation'], quickPick: 10 },
                { skills: ['Survival'], quickPick: 10 },
                { skills: ['Track'], quickPick: 10 },
            ];
        case 'Halfling':
            return [
                { skills: ['Dance', 'Sing'], quickPick: 5 },
                { skills: ['Evade'], quickPick: 15 },
                { skills: ['Insight'], quickPick: 5 },
                { skills: ['Locale'], quickPick: 5 },
                { skills: ['Perception'], quickPick: 15 },
                { skills: ['Stealth'], quickPick: 15 },
                { skills: ['Willpower'], quickPick: 15 },
                { skills: ['Craft'], quickPick: 10 },
                { skills: ['Musicianship'], quickPick: 5 },
                { skills: ['Streetwise'], quickPick: 10 },
            ];
        }
}