import type { Characteristics } from "../data/characterisic";
import { type Species } from "../data/species";
import { CharacteristicsTable } from "./CharacteristicsTable";

type Props = {
    readonly species: Species;
    readonly characteristics: Characteristics;
    readonly name?: string;
    readonly setName: (name: string) => void;
    readonly concept?: string;
    readonly setConcept: (concept: string) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function NameAndConcept({ species, characteristics, name, setName, concept, setConcept, back, next }: Props) {

    return (
        <>
            <h3>Step 3: Name and Concept</h3>
            <hr />
            <h4>Species{species ? `: ${species}` : ''}</h4>
            <CharacteristicsTable characteristics={characteristics} />
            <input type="text" placeholder="Name" value={name || ""} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="Concept" value={concept || ""} onChange={e => setConcept(e.target.value)} />
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next} disabled={!name || !concept}>Next</button>
        </>
    );
}