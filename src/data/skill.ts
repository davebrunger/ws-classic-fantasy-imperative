import type { Characteristic, Characteristics } from "./characterisic";

export const standardSkillNames = [
    "Athletics",
    "Boating",
    "Brawn",
    "Conceal",
    "Customs",
    "Dance",
    "Deceit",
    "Drive",
    "Endurance",
    "Evade",
    "First Aid",
    "Influence",
    "Insight",
    "Locale",
    "Native Tongue",
    "Perception",
    "Ride",
    "Sing",
    "Stealth",
    "Swim",
    "Unarmed Combat",
    "Willpower"
] as const;

export type StandardSkill = (typeof standardSkillNames)[number];

export type StandardSkills = Readonly<Record<StandardSkill, number>>;

export function isStandardSkill(value: unknown): value is StandardSkill {
    return typeof value === 'string' && standardSkillNames.includes(value as StandardSkill);
}

export const professionalSkillNames = [
    "Acting",
    "Acrobatics",
    "Animal Handling",
    "Arcane Casting",
    "Arcane Knowledge",
    "Art",
    "Bureaucracy",
    "Channel",
    "Commerce",
    "Courtesy",
    "Craft",
    "Culture",
    "Devotion",
    "Disguise",
    "Engineering",
    "Gambling",
    "Healing",
    "Intimidation",
    "Language",
    "Lockpicking",
    "Lore",
    "Mechanisms",
    "Musicianship",
    "Navigation",
    "Oratory",
    "Seamanship",
    "Seduction",
    "Sleight",
    "Streetwise",
    "Survival",
    "Track"
] as const;

export type ProfessionalSkill = (typeof professionalSkillNames)[number];

export type ProfessionalSkills = Partial<Readonly<Record<ProfessionalSkill, number>>>;

export function isProfessionalSkill(value: unknown): value is ProfessionalSkill {
    return typeof value === 'string' && professionalSkillNames.includes(value as ProfessionalSkill);
}

export const combatSkillNames = ["Combat Skill"] as const;

export type CombatSkill = (typeof combatSkillNames)[number];

export type CombatSkills = Partial<Readonly<Record<CombatSkill, number>>>;

export function isCombatSkill(value: unknown): value is CombatSkill {
    return typeof value === 'string' && combatSkillNames.includes(value as CombatSkill);
}

export type Skill = StandardSkill | ProfessionalSkill | CombatSkill;

export const skillNames = [...standardSkillNames, ...professionalSkillNames, ...combatSkillNames] as const;

export type Skills = Readonly<{readonly skill: Skill, readonly value: number}[]>;

export function isSkill(value: unknown): value is Skill {
    return isStandardSkill(value) || isProfessionalSkill(value) || isCombatSkill(value);
}

export type SkillOption = {
    readonly skills: Skill[];
    readonly quickPick: number;
}

type StartingValue = {
    readonly characteristic1: Characteristic;
    readonly characteristic2: Characteristic;
    readonly bonus: number;
}

export function getStartingValue(skill: Skill): StartingValue {
    switch (skill) {
        case "Athletics":
            return { characteristic1: "Strength", characteristic2: "Dexterity", bonus: 0 };
        case "Boating":
            return { characteristic1: "Strength", characteristic2: "Constitution", bonus: 0 };
        case "Brawn":
            return { characteristic1: "Strength", characteristic2: "Size", bonus: 0 };
        case "Conceal":
            return { characteristic1: "Dexterity", characteristic2: "Power", bonus: 0 };
        case "Customs":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence", bonus: 40 };
        case "Dance":
            return { characteristic1: "Dexterity", characteristic2: "Charisma", bonus: 0 };
        case "Deceit":
            return { characteristic1: "Intelligence", characteristic2: "Charisma", bonus: 0 };
        case "Drive":
            return { characteristic1: "Dexterity", characteristic2: "Power", bonus: 0 };
        case "Endurance":
            return { characteristic1: "Constitution", characteristic2: "Constitution", bonus: 0 };
        case "Evade":
            return { characteristic1: "Dexterity", characteristic2: "Dexterity", bonus: 0 };
        case "First Aid":
            return { characteristic1: "Intelligence", characteristic2: "Dexterity", bonus: 0 };
        case "Influence":
            return { characteristic1: "Charisma", characteristic2: "Charisma", bonus: 0 };
        case "Insight":
            return { characteristic1: "Intelligence", characteristic2: "Power", bonus: 0 };
        case "Locale":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence", bonus: 0 };
        case "Native Tongue":
            return { characteristic1: "Intelligence", characteristic2: "Charisma", bonus: 40 };
        case "Perception":
            return { characteristic1: "Intelligence", characteristic2: "Power", bonus: 0 };
        case "Ride":
            return { characteristic1: "Dexterity", characteristic2: "Power", bonus: 0 };
        case "Sing":
            return { characteristic1: "Charisma", characteristic2: "Power", bonus: 0 };
        case "Stealth":
            return { characteristic1: "Dexterity", characteristic2: "Intelligence", bonus: 0 };
        case "Swim":
            return { characteristic1: "Strength", characteristic2: "Constitution", bonus: 0 };
        case "Unarmed Combat":
            return { characteristic1: "Strength", characteristic2: "Dexterity", bonus: 0 };
        case "Willpower":
            return { characteristic1: "Power", characteristic2: "Power", bonus: 0 };
        case "Acting":
            return { characteristic1: "Charisma", characteristic2: "Charisma", bonus: 0 };
        case "Acrobatics":
            return { characteristic1: "Strength", characteristic2: "Dexterity", bonus: 0 };
        case "Animal Handling":
            return { characteristic1: "Power", characteristic2: "Charisma", bonus: 0 };
        case "Arcane Casting":
            return { characteristic1: "Intelligence", characteristic2: "Power", bonus: 0 };
        case "Arcane Knowledge":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence", bonus: 0 };
        case "Art":
            return { characteristic1: "Power", characteristic2: "Charisma", bonus: 0 };
        case "Bureaucracy":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence", bonus: 0 };
        case "Channel":
            return { characteristic1: "Intelligence", characteristic2: "Charisma", bonus: 0 };
        case "Commerce":
            return { characteristic1: "Intelligence", characteristic2: "Charisma", bonus: 0 };
        case "Courtesy":
            return { characteristic1: "Intelligence", characteristic2: "Charisma", bonus: 0 };
        case "Craft":
            return { characteristic1: "Intelligence", characteristic2: "Dexterity", bonus: 0 };
        case "Culture":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence", bonus: 0 };
        case "Devotion":
            return { characteristic1: "Power", characteristic2: "Charisma", bonus: 0 };
        case "Disguise":
            return { characteristic1: "Intelligence", characteristic2: "Charisma", bonus: 0 };
        case "Engineering":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence", bonus: 0 };
        case "Gambling":
            return { characteristic1: "Intelligence", characteristic2: "Power", bonus: 0 };
        case "Healing":
            return { characteristic1: "Intelligence", characteristic2: "Power", bonus: 0 };
        case "Intimidation":
            return { characteristic1: "Intelligence", characteristic2: "Charisma", bonus: 0 };
        case "Language":
            return { characteristic1: "Intelligence", characteristic2: "Charisma", bonus: 0 };
        case "Lockpicking":
            return { characteristic1: "Dexterity", characteristic2: "Dexterity", bonus: 0 };
        case "Lore":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence", bonus: 0 };
        case "Mechanisms":
            return { characteristic1: "Intelligence", characteristic2: "Dexterity", bonus: 0 };
        case "Musicianship":
            return { characteristic1: "Dexterity", characteristic2: "Charisma", bonus: 0 };
        case "Navigation":
            return { characteristic1: "Intelligence", characteristic2: "Power", bonus: 0 };
        case "Oratory":
            return { characteristic1: "Power", characteristic2: "Charisma", bonus: 0 };
        case "Seamanship":
            return { characteristic1: "Intelligence", characteristic2: "Constitution", bonus: 0 };
        case "Seduction":
            return { characteristic1: "Intelligence", characteristic2: "Charisma", bonus: 0 };
        case "Sleight":
            return { characteristic1: "Dexterity", characteristic2: "Charisma", bonus: 0 };
        case "Streetwise":
            return { characteristic1: "Power", characteristic2: "Charisma", bonus: 0 };
        case "Survival":
            return { characteristic1: "Constitution", characteristic2: "Power", bonus: 0 };
        case "Track":
            return { characteristic1: "Intelligence", characteristic2: "Constitution", bonus: 0 };
        case "Combat Skill":
            return { characteristic1: "Strength", characteristic2: "Dexterity", bonus: 0 };
    }
}

export function getStartingSkillValue(skill: Skill, characteristics: Characteristics): number {
    const startingValue = getStartingValue(skill);
    return characteristics[startingValue.characteristic1] + characteristics[startingValue.characteristic2] + startingValue.bonus;
}

export function getStartingSkills(characteristics: Characteristics): StandardSkills {
    return {
        Athletics: getStartingSkillValue('Athletics', characteristics),
        Boating: getStartingSkillValue('Boating', characteristics),
        Brawn: getStartingSkillValue('Brawn', characteristics),
        Conceal: getStartingSkillValue('Conceal', characteristics),
        Customs: getStartingSkillValue('Customs', characteristics),
        Dance: getStartingSkillValue('Dance', characteristics),
        Deceit: getStartingSkillValue('Deceit', characteristics),
        Drive: getStartingSkillValue('Drive', characteristics),
        Endurance: getStartingSkillValue('Endurance', characteristics),
        Evade: getStartingSkillValue('Evade', characteristics),
        "First Aid": getStartingSkillValue('First Aid', characteristics),
        Influence: getStartingSkillValue('Influence', characteristics),
        Insight: getStartingSkillValue('Insight', characteristics),
        Locale: getStartingSkillValue('Locale', characteristics),
        "Native Tongue": getStartingSkillValue('Native Tongue', characteristics),
        Perception: getStartingSkillValue('Perception', characteristics),
        Ride: getStartingSkillValue('Ride', characteristics),
        Sing: getStartingSkillValue('Sing', characteristics),
        Stealth: getStartingSkillValue('Stealth', characteristics),
        Swim: getStartingSkillValue('Swim', characteristics),
        "Unarmed Combat": getStartingSkillValue('Unarmed Combat', characteristics),
        Willpower: getStartingSkillValue('Willpower', characteristics),
    }
}