import type { Characteristics } from "../data/characterisic";
import { combineSkills, compare, getStartingSkills, getUniqueSkills, isCombatSkill, isProfessionalSkill, isSpecialistProfessionalSkill, standardSkillNames, type Skill, type Skills } from "../data/skill";
import { SkillSelectors } from "./SkillSelectors";
import { SkillTable } from "./SkillTable";
import { getSkillOptions, type Class as ClassType } from "../data/class";
import React from "react";

type Props = {
    readonly speciesSkills: Skills;
    readonly characteristics: Characteristics;
    readonly culturalSkills: Skills;
    readonly characterClass: ClassType;
    readonly classSkills: Skills;
    readonly setClassSkills: (classSkills: Skills) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function ClassSkills({ speciesSkills, characteristics, culturalSkills, characterClass, classSkills, setClassSkills, back, next }: Props) {

    const [selectorError, setSelectorError] = React.useState<string | undefined>(undefined);

    const skillOptions = getSkillOptions(characterClass);

    const classSkillArray = classSkills.map(skill => skill.skill);

    function setClassSkillsArray(newClassSkillsArray: Skill[]) {
        const newClassSkills = newClassSkillsArray.map((skill, index) => ({ skill, value: skillOptions[index].quickPick }));
        setClassSkills(newClassSkills);
    }

    const combinedSkillNames = getUniqueSkills([...culturalSkills.map(cs => cs.skill), ...classSkills.map(cs => cs.skill)]).sort((a, b) => compare(a, b));

    const professionalSkillNames = combinedSkillNames.filter(isProfessionalSkill);

    const combatSkillNames = combinedSkillNames.filter(isCombatSkill);

    const combinedModifiers = combineSkills(speciesSkills, culturalSkills);

    return (
        <>
            <SkillSelectors skillOptions={skillOptions} skills={classSkillArray} setSkills={setClassSkillsArray} error={selectorError} setError={setSelectorError} />
            <h4>Standard Skills</h4>
            <SkillTable skills={standardSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(standardSkillNames, characteristics) },
                { name: "Modifiers So Far", values: combinedModifiers },
                { name: "Class Modifier", values: classSkills }]} />
            <h4>Professional Skills</h4>
            <SkillTable skills={professionalSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(professionalSkillNames, characteristics) },
                { name: "Modifiers So Far", values: combinedModifiers },
                { name: "Class Modifier", values: classSkills }
            ]} />
            <h4>Combat Skills</h4>
            <SkillTable skills={combatSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(combatSkillNames, characteristics) },
                { name: "Modifiers So Far", values: combinedModifiers },
                { name: "Class Modifier", values: classSkills }
            ]} />
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next} disabled={!!selectorError || classSkills.some(s => isSpecialistProfessionalSkill(s.skill) && !s.skill.specialization)}>Next</button>
        </>
    );
}