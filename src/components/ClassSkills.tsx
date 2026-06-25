import type { Characteristics } from "../data/characterisic";
import { type Culture } from "../data/culture";
import { getStartingSkills, isCombatSkill, isProfessionalSkill, standardSkillNames, type Skill, type Skills } from "../data/skill";
import { type Species } from "../data/species";
import { CharacteristicsTable } from "./CharacteristicsTable";
import { SkillSelector } from "./SkillSelector";
import { SkillTable } from "./SkillTable";
import { getSkillOptions, type Class as ClassType } from "../data/class";

type Props = {
    readonly name: string;
    readonly concept: string;
    readonly species: Species;
    readonly characteristics: Characteristics;
    readonly culture: Culture;
    readonly culturalSkills: Skills;
    readonly characterClass: ClassType;
    readonly classSkills: Skills;
    readonly setClassSkills: (classSkills: Skills) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function ClassSkills({ name, concept, species, characteristics, culture, culturalSkills, characterClass, classSkills, setClassSkills, back, next }: Props) {

    const skillOptions = getSkillOptions(characterClass);

    const classSkillArray = classSkills.map(skill => skill.skill);

    function setClassSkillsArray(newClassSkillsArray: Skill[]) {
        const newClassSkills = newClassSkillsArray.map((skill, index) => ({ skill, value: skillOptions[index].quickPick }));
        setClassSkills(newClassSkills);
    }

    const combinedSkills = [...new Set([...culturalSkills.map(cs => cs.skill), ...classSkills.map(cs => cs.skill)])].sort((a, b) => a.localeCompare(b));

    const professionalSkills = combinedSkills.filter(isProfessionalSkill);

    const combatSkills = combinedSkills.filter(isCombatSkill);

    return (
        <>
            <h3>Step 7: Class Skills</h3>
            <hr />
            <div className="grid">
                <h4>Name{name ? `: ${name}` : ''}</h4>
                <h4>Concept{concept ? `: ${concept}` : ''}</h4>
            </div>
            <div className="grid">
                <h4>Species{species ? `: ${species}` : ''}</h4>
                <h4>Culture: {culture}</h4>
            </div>
            <h4>Class: {characterClass}</h4>
            <CharacteristicsTable characteristics={characteristics} />
            <SkillSelector skillOptions={skillOptions} skills={classSkillArray} setSkills={setClassSkillsArray} />
            <h4>Standard Skills</h4>
            <SkillTable skillNames={standardSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(standardSkillNames, characteristics) },
                { name: "Cultural Modifier", values: culturalSkills },
                { name: "Class Modifier", values: classSkills }]} />
            <h4>Professional Skills</h4>
            <SkillTable skillNames={professionalSkills} columns={[
                { name: "Starting Value", values: getStartingSkills(professionalSkills, characteristics) },
                { name: "Cultural Modifier", values: culturalSkills },
                { name: "Class Modifier", values: classSkills }
            ]} />
            <h4>Combat Skills</h4>
            <SkillTable skillNames={combatSkills} columns={[
                { name: "Starting Value", values: getStartingSkills(combatSkills, characteristics) },
                { name: "Cultural Modifier", values: culturalSkills },
                { name: "Class Modifier", values: classSkills }
            ]} />
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next}>Next</button>
        </>
    );
}