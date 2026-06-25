import { newCharacter, type Character } from "../data/character";
import { speciesNames, type Species as SpeciesType } from "../data/species";
import { CharacteristicsTable } from "./CharacteristicsTable";
import { AttributesTable } from "./AttributesTable";
import { StartingSkillTable } from "./StartingSkillTable";

type Props = {
    readonly character?: Partial<Character>;
    readonly setCharacter: (character: Partial<Character> | undefined) => void;
    readonly next: () => void;
}

export function Species({ character, setCharacter, next }: Props) {

    function clear() {
        setCharacter(undefined);
    }

    function setSpecies(species: SpeciesType) {
        setCharacter(newCharacter(species)); 
    }

    return (
        <>
            <h3>Steps 2-4: Characteristics, Attributes, and Skills</h3>
            <aside>N.B. Step 1 comes between Step 4 and Step 5.</aside>
            <hr />
            {character?.characteristics && character?.species && character?.standardSkills
                ? (
                    <>
                        <h4>Species: {character.species}</h4>
                        <CharacteristicsTable characteristics={character.characteristics} />
                        <button onClick={() => setSpecies(character.species!)}>Re-Roll</button>
                        <h4>Attributes</h4>
                        <AttributesTable characteristics={character.characteristics} species={character.species} />
                        <h4>Standard Skills</h4>
                        <StartingSkillTable standardSkills={character.standardSkills} />
                        <button onClick={clear}>Back</button>
                        <button style={{ float: 'right' }} onClick={next}>Next</button>
                    </>)
                : (
                    <>
                        <select onChange={e => setSpecies(e.target.value as SpeciesType)} value={character?.species || ""}>
                            {character?.species || <option value="">Select a species</option>}
                            {speciesNames.map(species => (
                                <option key={species} value={species}>{species}</option>
                            ))}
                        </select>
                    </>)
            }
        </>
    )
}   