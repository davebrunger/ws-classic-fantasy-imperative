import { type Species } from "../data/species";
import { rollCharacteristics, type Characteristics as CharacteristicsType } from "../data/characterisic";
import { AttributesTable } from "./AttributesTable";
import { getStartingSkills, standardSkillNames, type Skills } from "../data/skill";
import { SkillTable } from "./SkillTable";

type Props = {
    readonly species: Species;
    readonly speciesSkills: Skills;
    readonly characteristics: CharacteristicsType;
    readonly setCharacteristics: (characteristics: CharacteristicsType) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function Characteristics({ species, speciesSkills, characteristics, setCharacteristics, back, next }: Props) {
   return (
        <>
            <button onClick={() => setCharacteristics(rollCharacteristics(species))}>Re-Roll</button>
            <h4>Attributes</h4>
            <AttributesTable characteristics={characteristics} species={species} />
            <h4>Standard Skills</h4>
            <SkillTable skills={standardSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(standardSkillNames, characteristics) },
                { name: "Standard Modifier", values: speciesSkills }
                ]} />
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next}>Next</button>
        </>
    )
}   