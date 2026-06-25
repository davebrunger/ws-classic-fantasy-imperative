import type { Characteristics } from "../data/characterisic";
import { getSkillOptions, type Culture } from "../data/culture";
import { type Skill, type Skills } from "../data/skill";
import { type Species } from "../data/species";
import { CharacteristicsTable } from "./CharacteristicsTable";
import { CulturalSkillSelector } from "./CulturalSkillSelector";
import { CulturalSkillTable } from "./CulturalSkillTable";

type Props = {
    readonly species: Species;
    readonly characteristics: Characteristics;
    readonly culture: Culture;
    readonly culturalSkills: Skills;
    readonly setCulturalSkills: (culturalSkills?: Skills) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function CulturalSkills({ species, characteristics, culture, culturalSkills, setCulturalSkills, back, next }: Props) {

    const skillOptions = getSkillOptions(culture);

    const culturalSkillArray = culturalSkills.map(skill => skill.skill);

    function setCulturalSkillsArray(newCulturalSkillsArray: Skill[]) {
        const newCulturalSkills = newCulturalSkillsArray.map((skill, index) => ({ skill, value: skillOptions[index].quickPick }));
        setCulturalSkills(newCulturalSkills);
    }

    return (
        <>
            <h3>Step 5: Culture</h3>
            <hr />
            <h4>Species{species ? `: ${species}` : ''}</h4>
            <h4>Culture: {culture}</h4>
            <CharacteristicsTable characteristics={characteristics} />
            <CulturalSkillSelector culturalSkillOptions={skillOptions} culturalSkills={culturalSkillArray} setCulturalSkills={setCulturalSkillsArray} />
            <CulturalSkillTable culturalSkills={culturalSkills} characteristics={characteristics} />
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next}>Next</button>
        </>
    );
}