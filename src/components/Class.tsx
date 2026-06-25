import type { Characteristics } from "../data/characterisic";
import { type Culture } from "../data/culture";
import { classNames, type Class as ClassType } from "../data/class";
import { type Species } from "../data/species";
import { CharacteristicsTable } from "./CharacteristicsTable";

type Props = {
    readonly name: string;
    readonly concept: string;
    readonly species: Species;
    readonly characteristics: Characteristics;
    readonly culture: Culture;
    readonly characterClass?: ClassType;
    readonly setClass: (characterClass: ClassType) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function Class({ name, concept, species, characteristics, culture, characterClass, setClass, back, next }: Props) {

    return (
        <>
            <h3>Step 6: Class</h3>
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
            <select onChange={e => setClass(e.target.value as ClassType)} value={characterClass}>
                {characterClass || <option value="">Select a class</option>}
                {classNames.map(characterClass => (
                    <option key={characterClass} value={characterClass}>{characterClass}</option>
                ))}
            </select>
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next} disabled={!culture}>Next</button>
        </>
    );
}