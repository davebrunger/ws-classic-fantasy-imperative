import type { Characteristics } from "../data/characterisic";
import { getSkillOptions, type Culture } from "../data/culture";
import { getStartingSkills, isProfessionalSkill, standardSkillNames, type Skill, type Skills } from "../data/skill";
import { SkillSelector } from "./SkillSelector";
import { SkillTable } from "./SkillTable";

type Props = {
    readonly characteristics: Characteristics;
    readonly culture: Culture;
    readonly culturalSkills: Skills;
    readonly setCulturalSkills: (culturalSkills: Skills) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function CulturalSkills({ characteristics, culture, culturalSkills, setCulturalSkills, back, next }: Props) {

    const skillOptions = getSkillOptions(culture);

    const culturalSkillArray = culturalSkills.map(skill => skill.skill);

    function setCulturalSkillsArray(newCulturalSkillsArray: Skill[]) {
        const newCulturalSkills = newCulturalSkillsArray.map((skill, index) => ({ skill, value: skillOptions[index].quickPick }));
        setCulturalSkills(newCulturalSkills);
    }

    const professionalSkills = culturalSkills.filter(cs => isProfessionalSkill(cs.skill)).map(cs => cs.skill);
    
    return (
        <>
            <SkillSelector skillOptions={skillOptions} skills={culturalSkillArray} setSkills={setCulturalSkillsArray} />
            <h4>Standard Skills</h4>
            <SkillTable skillNames={standardSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(standardSkillNames, characteristics) },
                { name: "Cultural Modifier", values: culturalSkills }]} />
            <h4>Professional Skills</h4>
            <SkillTable skillNames={professionalSkills} columns={[
                { name: "Starting Value", values: getStartingSkills(professionalSkills, characteristics) },
                { name: "Cultural Modifier", values: culturalSkills }
            ]} />
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next}>Next</button>
        </>
    );
}