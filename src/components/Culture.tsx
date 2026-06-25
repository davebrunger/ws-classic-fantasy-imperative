import type { Characteristics } from "../data/characterisic";
import { type Culture } from "../data/culture";
import { getAvailableCultures, type Species } from "../data/species";
import { CharacteristicsTable } from "./CharacteristicsTable";

type Props = {
    readonly name: string;
    readonly concept: string;
    readonly species: Species;
    readonly characteristics: Characteristics;
    readonly culture?: Culture;
    readonly setCulture: (culture?: Culture) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function Culture({ name, concept, species, characteristics, culture, setCulture, back, next }: Props) {

    return (
        <>
            <h3>Step 4: Culture</h3>
            <hr />
            <div className="grid">
                <h4>Name{name ? `: ${name}` : ''}</h4>
                <h4>Concept{concept ? `: ${concept}` : ''}</h4>
            </div>
            <h4>Species{species ? `: ${species}` : ''}</h4>
            <CharacteristicsTable characteristics={characteristics} />
            <select onChange={e => setCulture(e.target.value as Culture)} value={culture}>
                {culture || <option value="">Select a culture</option>}
                {getAvailableCultures(species).map(culture => (
                    <option key={culture} value={culture}>{culture}</option>
                ))}
            </select>
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next} disabled={!culture}>Next</button>
        </>
    );
}