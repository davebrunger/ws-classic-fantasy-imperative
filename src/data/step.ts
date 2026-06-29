import { rollCharacteristics, type Characteristics } from "./characterisic";
import { getSkillOptions as getClassSkillOptions, type Class } from "./class";
import { getSkillOptions as getCulturalSkillOptions, type Culture } from "./culture";
import { areEqual, isSpecialistProfessionalSkill, type Skill, type SkillOption, type Skills } from "./skill";
import { getSkillOptions as getSpeciesSkillOptions, type Species } from "./species";

export const stepNames = ["Species", "Characteristics", "Name and Concept", "Culture", "Cultural Skills", "Class", "Class Skills"] as const;

export type Step = typeof stepNames[number];

export function isStep(value: unknown): value is Step {
    return typeof value === 'string' && stepNames.includes(value as Step);
}

function buildInitialSkills(skills: SkillOption[]): Skills {
    return skills.reduce((acc, option) => {
        let index = 0;
        while (index < option.skills.length && acc.some(s => areEqual(s.skill, option.skills[index]))) {
            const optionSkill = option.skills[index];
            if (isSpecialistProfessionalSkill(optionSkill) && !optionSkill.specialization) {
                break;
            }
            index++;
        }
        acc.push({ skill: option.skills[index], value: option.quickPick });
        return acc;
    }, [] as { readonly skill: Skill, readonly value: number }[]);
}
 
export function next(
    currentStep: Step,
    setStep: (step: Step) => void,
    setSpeciesSkills: (skills?: Skills) => void,
    setCharacteristics: (characteristics?: Characteristics) => void,
    setCulturalSkills: (skills?: Skills) => void,
    setClassSkills: (skills?: Skills) => void,
    species?: Species,
    speciesSkills?: Skills,
    characteristics?: Characteristics,
    culture?: Culture,
    culturalSkills?: Skills,
    characterClass?: Class,
    classSkills?: Skills,
): boolean {
    switch (currentStep) {
        case "Species":
            if (!characteristics) {
                setCharacteristics(rollCharacteristics(species!));
            }
            if (!speciesSkills) {
                setSpeciesSkills(buildInitialSkills(getSpeciesSkillOptions(species!)));
            }
            setStep("Characteristics");
            return true;
        case "Characteristics":
            setStep("Name and Concept");
            return true;
        case "Name and Concept":
            setStep("Culture");
            return true;
        case "Culture":
            if (!culturalSkills) {
                setCulturalSkills(buildInitialSkills(getCulturalSkillOptions(culture!)));
            }
            setStep("Cultural Skills");
            return true;
        case "Cultural Skills":
            setStep("Class");
            return true;
        case "Class":
            if (!classSkills) {
                setClassSkills(buildInitialSkills(getClassSkillOptions(characterClass!)));
            }
            setStep("Class Skills");
            return true;
    }
    return false;
};

export function back(
    currentStep: Step,
    setStep: (step: Step) => void,
    setSpeciesSkills: (skills?: Skills) => void,
    setCharacteristics: (characteristics?: Characteristics) => void,
    setName: (name?: string) => void,
    setConcept: (concept?: string) => void,
    setCulture: (culture?: Culture) => void,
    setCulturalSkills: (skills?: Skills) => void,
    setClass: (characterClass?: Class) => void,
    setClassSkills: (skills?: Skills) => void,
): boolean {
    switch (currentStep) {
        case "Characteristics":
            setSpeciesSkills(undefined);
            setCharacteristics(undefined);
            setStep("Species");
            return true;
        case "Name and Concept":
            setName(undefined);
            setConcept(undefined);
            setStep("Characteristics");
            return true;
        case "Culture":
            setCulture(undefined);
            setStep("Name and Concept");
            return true;
        case "Cultural Skills":
            setCulturalSkills(undefined);
            setStep("Culture");
            return true;
        case "Class":
            setClass(undefined);
            setStep("Cultural Skills");
            return true;
        case "Class Skills":
            setClassSkills(undefined);
            setStep("Class");
            return true;
    }
    return false;
}