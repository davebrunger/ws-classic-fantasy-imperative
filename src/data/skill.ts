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

export function isStandardSkill(value: unknown): value is StandardSkill {
    return typeof value === 'string' && standardSkillNames.includes(value as StandardSkill);
}

export const generalProfessionalSkillNames = [
    "Acting",
    "Acrobatics",
    "Animal Handling",
    "Arcane Casting",
    "Arcane Knowledge",
    "Bureaucracy",
    "Channel",
    "Commerce",
    "Courtesy",
    "Devotion",
    "Disguise",
    "Engineering",
    "Gambling",
    "Healing",
    "Intimidation",
    "Lockpicking",
    "Mechanisms",
    "Oratory",
    "Seamanship",
    "Seduction",
    "Sleight",
    "Streetwise",
    "Survival",
    "Track"
] as const;

export const specialistProfessionalSkillNames = [
    "Art",
    "Craft",
    "Culture",
    "Language",
    "Lore",
    // "Mechanisms",
    "Musicianship",
    "Navigation",
] as const;

export type GeneralProfessionalSkill = (typeof generalProfessionalSkillNames)[number];

export function isGeneralProfessionalSkill(value: unknown): value is GeneralProfessionalSkill {
    return typeof value === 'string' && generalProfessionalSkillNames.includes(value as GeneralProfessionalSkill);
}

export type SpecialistProfessionalSkill = { readonly name: SpecialistProfessionalSkillName, readonly specialization?: string };

export function isSpecialistProfessionalSkill(value: unknown): value is SpecialistProfessionalSkill {
    return typeof value === 'object' && value !== null && 'name' in value && isSpecialistProfessionalSkillName((value as any).name);
}

export type SpecialistProfessionalSkillName = (typeof specialistProfessionalSkillNames)[number];

export function isSpecialistProfessionalSkillName(value: unknown): value is SpecialistProfessionalSkillName {
    return typeof value === 'string' && specialistProfessionalSkillNames.includes(value as SpecialistProfessionalSkillName);
}

export type ProfessionalSkill = GeneralProfessionalSkill | SpecialistProfessionalSkill;

export function isProfessionalSkill(value: unknown): value is ProfessionalSkill {
    return isGeneralProfessionalSkill(value) || isSpecialistProfessionalSkill(value);
}

export const professionalSkillNames = [...generalProfessionalSkillNames, ...specialistProfessionalSkillNames] as const;

export type ProfessionalSkillName = GeneralProfessionalSkill | SpecialistProfessionalSkillName;

export const combatSkillNames = [
    "Combat Skill (Cleric)",
    "Combat Skill (Fighter)",
    "Combat Skill (Mage)",
    "Combat Skill (Rogue)"
] as const;

export type CombatSkill = (typeof combatSkillNames)[number];

export type CombatSkills = Partial<Readonly<Record<CombatSkill, number>>>;

export function isCombatSkill(value: unknown): value is CombatSkill {
    return typeof value === 'string' && combatSkillNames.includes(value as CombatSkill);
}

export type Skill = StandardSkill | ProfessionalSkill | CombatSkill;

export function isSkill(value: unknown): value is Skill {
    return isStandardSkill(value) || isProfessionalSkill(value) || isCombatSkill(value);
}

export const skillNames = [...standardSkillNames, ...professionalSkillNames, ...combatSkillNames] as const;

export type SkillName = StandardSkill | ProfessionalSkillName | CombatSkill;

export function getSkillName(skill: Skill): SkillName {
    if (isSpecialistProfessionalSkill(skill)) {
        return skill.name;
    } else {
        return skill;
    }
}

export function getDisplayName(skill: Skill): string {
    if (isSpecialistProfessionalSkill(skill)) {
        return skill.specialization ? `${skill.name} (${skill.specialization})` : skill.name;
    } else {
        return skill;
    }
}

export type Skills = Readonly<{ readonly skill: Skill, readonly value: number }[]>;

export type SkillOption = {
    readonly skills: Skill[];
    readonly quickPick: number;
}

type StartingValue = {
    readonly characteristic1: Characteristic;
    readonly characteristic2: Characteristic;
}

export function getStartingValue(skill: Skill): StartingValue {
    switch (getSkillName(skill)) {
        case "Athletics":
            return { characteristic1: "Strength", characteristic2: "Dexterity" };
        case "Boating":
            return { characteristic1: "Strength", characteristic2: "Constitution" };
        case "Brawn":
            return { characteristic1: "Strength", characteristic2: "Size" };
        case "Conceal":
            return { characteristic1: "Dexterity", characteristic2: "Power" };
        case "Customs":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence" };
        case "Dance":
            return { characteristic1: "Dexterity", characteristic2: "Charisma" };
        case "Deceit":
            return { characteristic1: "Intelligence", characteristic2: "Charisma" };
        case "Drive":
            return { characteristic1: "Dexterity", characteristic2: "Power" };
        case "Endurance":
            return { characteristic1: "Constitution", characteristic2: "Constitution" };
        case "Evade":
            return { characteristic1: "Dexterity", characteristic2: "Dexterity" };
        case "First Aid":
            return { characteristic1: "Intelligence", characteristic2: "Dexterity" };
        case "Influence":
            return { characteristic1: "Charisma", characteristic2: "Charisma" };
        case "Insight":
            return { characteristic1: "Intelligence", characteristic2: "Power" };
        case "Locale":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence" };
        case "Native Tongue":
            return { characteristic1: "Intelligence", characteristic2: "Charisma" };
        case "Perception":
            return { characteristic1: "Intelligence", characteristic2: "Power" };
        case "Ride":
            return { characteristic1: "Dexterity", characteristic2: "Power" };
        case "Sing":
            return { characteristic1: "Charisma", characteristic2: "Power" };
        case "Stealth":
            return { characteristic1: "Dexterity", characteristic2: "Intelligence" };
        case "Swim":
            return { characteristic1: "Strength", characteristic2: "Constitution" };
        case "Unarmed Combat":
            return { characteristic1: "Strength", characteristic2: "Dexterity" };
        case "Willpower":
            return { characteristic1: "Power", characteristic2: "Power" };
        case "Acting":
            return { characteristic1: "Charisma", characteristic2: "Charisma" };
        case "Acrobatics":
            return { characteristic1: "Strength", characteristic2: "Dexterity" };
        case "Animal Handling":
            return { characteristic1: "Power", characteristic2: "Charisma" };
        case "Arcane Casting":
            return { characteristic1: "Intelligence", characteristic2: "Power" };
        case "Arcane Knowledge":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence" };
        case "Art":
            return { characteristic1: "Power", characteristic2: "Charisma" };
        case "Bureaucracy":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence" };
        case "Channel":
            return { characteristic1: "Intelligence", characteristic2: "Charisma" };
        case "Commerce":
            return { characteristic1: "Intelligence", characteristic2: "Charisma" };
        case "Courtesy":
            return { characteristic1: "Intelligence", characteristic2: "Charisma" };
        case "Craft":
            return { characteristic1: "Intelligence", characteristic2: "Dexterity" };
        case "Culture":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence" };
        case "Devotion":
            return { characteristic1: "Power", characteristic2: "Charisma" };
        case "Disguise":
            return { characteristic1: "Intelligence", characteristic2: "Charisma" };
        case "Engineering":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence" };
        case "Gambling":
            return { characteristic1: "Intelligence", characteristic2: "Power" };
        case "Healing":
            return { characteristic1: "Intelligence", characteristic2: "Power" };
        case "Intimidation":
            return { characteristic1: "Intelligence", characteristic2: "Charisma" };
        case "Language":
            return { characteristic1: "Intelligence", characteristic2: "Charisma" };
        case "Lockpicking":
            return { characteristic1: "Dexterity", characteristic2: "Dexterity" };
        case "Lore":
            return { characteristic1: "Intelligence", characteristic2: "Intelligence" };
        case "Mechanisms":
            return { characteristic1: "Intelligence", characteristic2: "Dexterity" };
        case "Musicianship":
            return { characteristic1: "Dexterity", characteristic2: "Charisma" };
        case "Navigation":
            return { characteristic1: "Intelligence", characteristic2: "Power" };
        case "Oratory":
            return { characteristic1: "Power", characteristic2: "Charisma" };
        case "Seamanship":
            return { characteristic1: "Intelligence", characteristic2: "Constitution" };
        case "Seduction":
            return { characteristic1: "Intelligence", characteristic2: "Charisma" };
        case "Sleight":
            return { characteristic1: "Dexterity", characteristic2: "Charisma" };
        case "Streetwise":
            return { characteristic1: "Power", characteristic2: "Charisma" };
        case "Survival":
            return { characteristic1: "Constitution", characteristic2: "Power" };
        case "Track":
            return { characteristic1: "Intelligence", characteristic2: "Constitution" };
        case "Combat Skill (Cleric)":
        case "Combat Skill (Fighter)":
        case "Combat Skill (Mage)":
        case "Combat Skill (Rogue)":
            return { characteristic1: "Strength", characteristic2: "Dexterity" };
    }
}

export function getStartingSkillValue(skill: Skill, characteristics: Characteristics): number {
    const startingValue = getStartingValue(skill);
    return characteristics[startingValue.characteristic1] + characteristics[startingValue.characteristic2];
}

export function getStartingSkills(skills: Readonly<Skill[]>, characteristics: Characteristics): Skills {
    return skills.map(skill => ({ skill, value: getStartingSkillValue(skill, characteristics) }));
}

export function getStartingStandardSkills(characteristics: Characteristics): Skills {
    return getStartingSkills(standardSkillNames, characteristics);
}

export function areSkillsEqual(skill1: Skill, skill2: Skill): boolean {
    return isStandardSkill(skill1) && isStandardSkill(skill2) && skill1 === skill2
        || isGeneralProfessionalSkill(skill1) && isGeneralProfessionalSkill(skill2) && skill1 === skill2
        || isCombatSkill(skill1) && isCombatSkill(skill2) && skill1 === skill2
        || !isStandardSkill(skill1) && !isStandardSkill(skill2)
        && !isGeneralProfessionalSkill(skill1) && !isGeneralProfessionalSkill(skill2)
        && !isCombatSkill(skill1) && !isCombatSkill(skill2)
        && skill1.name === skill2.name
        && skill1.specialization === skill2.specialization;
}

export function combineSkills(skills: Skills, extraSkills: Skills): Skills {
    let combinedSkills = [...skills];
    for (const extraSkill of extraSkills) {
        const existingSkill = combinedSkills.find(s => areSkillsEqual(s.skill, extraSkill.skill));
        if (existingSkill) {
            combinedSkills = combinedSkills.map(s => areSkillsEqual(s.skill, extraSkill.skill) ? { skill: s.skill, value: s.value + extraSkill.value } : s);
        } else {
            combinedSkills.push(extraSkill);
        }
    }
    return combinedSkills;
}

export function compareSkills(skill1: Skill, skill2: Skill): number {
    const name1 = getDisplayName(skill1);
    const name2 = getDisplayName(skill2);
    return name1.localeCompare(name2);
}

export function getUniqueSkills(skills: Skill[]): Skill[] {
    return [...new Map(skills.map(s => [getDisplayName(s), s])).values()];
}