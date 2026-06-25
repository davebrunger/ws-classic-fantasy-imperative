import type { Characteristics } from "../data/characterisic";
import { getSkillOptions, type Culture } from "../data/culture";
import { getStartingSkills, isProfessionalSkill, standardSkillNames, type Skill, type Skills } from "../data/skill";
import { type Species } from "../data/species";
import { CharacteristicsTable } from "./CharacteristicsTable";
import { SkillSelector } from "./SkillSelector";
import { SkillTable } from "./SkillTable";

type Props = {
    readonly name: string;
    readonly concept: string;
    readonly species: Species;
    readonly characteristics: Characteristics;
    readonly culture: Culture;
    readonly culturalSkills: Skills;
    readonly setCulturalSkills: (culturalSkills: Skills) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function CulturalSkills({ name, concept, species, characteristics, culture, culturalSkills, setCulturalSkills, back, next }: Props) {

    const skillOptions = getSkillOptions(culture);

    const culturalSkillArray = culturalSkills.map(skill => skill.skill);

    function setCulturalSkillsArray(newCulturalSkillsArray: Skill[]) {
        const newCulturalSkills = newCulturalSkillsArray.map((skill, index) => ({ skill, value: skillOptions[index].quickPick }));
        setCulturalSkills(newCulturalSkills);
    }

    const professionalSkills = culturalSkills.filter(cs => isProfessionalSkill(cs.skill)).map(cs => cs.skill);
    
    return (
        <>
            <h3>Step 5: Cultural Skills</h3>
            <hr />
            <div className="grid">
                <h4>Name{name ? `: ${name}` : ''}</h4>
                <h4>Concept{concept ? `: ${concept}` : ''}</h4>
            </div>
            <div className="grid">
                <h4>Species{species ? `: ${species}` : ''}</h4>
                <h4>Culture: {culture}</h4>
            </div>
            <CharacteristicsTable characteristics={characteristics} />
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