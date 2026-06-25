import { type Culture } from "../data/culture";
import { getAvailableCultures, type Species } from "../data/species";

type Props = {
    readonly species: Species;
    readonly culture?: Culture;
    readonly setCulture: (culture?: Culture) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function Culture({ species, culture, setCulture, back, next }: Props) {

    return (
        <>
            <h3>Step 3: Culture</h3>
            <hr />
            <h4>Species{species ? `: ${species}` : ''}</h4>
            <select onChange={e => setCulture(e.target.value as Culture)} value={culture}>
                {culture || <option value="">Select a culture</option>}
                {getAvailableCultures(species).map(culture => (
                    <option key={culture} value={culture}>{culture}</option>
                ))}
            </select>
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next}>Next</button>
        </>
    );
}