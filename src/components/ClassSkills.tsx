import type { Characteristics } from "../data/characterisic";
import { getStartingSkills, isCombatSkill, isProfessionalSkill, standardSkillNames, type Skill, type Skills } from "../data/skill";
import { CharacteristicsTable } from "./CharacteristicsTable";
import { SkillSelector } from "./SkillSelector";
import { SkillTable } from "./SkillTable";
import { getSkillOptions, type Class as ClassType } from "../data/class";

type Props = {
    readonly characteristics: Characteristics;
    readonly culturalSkills: Skills;
    readonly characterClass: ClassType;
    readonly classSkills: Skills;
    readonly setClassSkills: (classSkills: Skills) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function ClassSkills({ characteristics, culturalSkills, characterClass, classSkills, setClassSkills, back, next }: Props) {

    const skillOptions = getSkillOptions(characterClass);

    const classSkillArray = classSkills.map(skill => skill.skill);

    function setClassSkillsArray(newClassSkillsArray: Skill[]) {
        const newClassSkills = newClassSkillsArray.map((skill, index) => ({ skill, value: skillOptions[index].quickPick }));
        setClassSkills(newClassSkills);
    }

    const combinedSkillNames = [...new Set([...culturalSkills.map(cs => cs.skill), ...classSkills.map(cs => cs.skill)])].sort((a, b) => a.localeCompare(b));

    const professionalSkillNames = combinedSkillNames.filter(isProfessionalSkill);

    const combatSkillNames = combinedSkillNames.filter(isCombatSkill);

    return (
        <>
            <CharacteristicsTable characteristics={characteristics} />
            <SkillSelector skillOptions={skillOptions} skills={classSkillArray} setSkills={setClassSkillsArray} />
            <h4>Standard Skills</h4>
            <SkillTable skillNames={standardSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(standardSkillNames, characteristics) },
                { name: "Cultural Modifier", values: culturalSkills },
                { name: "Class Modifier", values: classSkills }]} />
            <h4>Professional Skills</h4>
            <SkillTable skillNames={professionalSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(professionalSkillNames, characteristics) },
                { name: "Cultural Modifier", values: culturalSkills },
                { name: "Class Modifier", values: classSkills }
            ]} />
            <h4>Combat Skills</h4>
            <SkillTable skillNames={combatSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(combatSkillNames, characteristics) },
                { name: "Cultural Modifier", values: culturalSkills },
                { name: "Class Modifier", values: classSkills }
            ]} />
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next}>Next</button>
        </>
    );
}