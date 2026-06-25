import { type Species } from "../data/species";
import { rollCharacteristics, type Characteristics as CharacteristicsType } from "../data/characterisic";
import { CharacteristicsTable } from "./CharacteristicsTable";
import { AttributesTable } from "./AttributesTable";
import { StartingSkillTable } from "./StartingSkillTable";
import { getStartingSkills } from "../data/skill";

type Props = {
    readonly species: Species;
    readonly characteristics: CharacteristicsType;
    readonly setCharacteristics: (characteristics: CharacteristicsType) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function Characteristics({ species, characteristics, setCharacteristics, back, next }: Props) {
   return (
        <>
            <h3>Step 2: Characteristics, Attributes, and Skills</h3>
            <hr />
            <h4>Species: {species}</h4>
            <CharacteristicsTable characteristics={characteristics} />
            <button onClick={() => setCharacteristics(rollCharacteristics(species))}>Re-Roll</button>
            <h4>Attributes</h4>
            <AttributesTable characteristics={characteristics} species={species} />
            <h4>Standard Skills</h4>
            <StartingSkillTable standardSkills={getStartingSkills(characteristics)} />
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next}>Next</button>
        </>
    )
}   