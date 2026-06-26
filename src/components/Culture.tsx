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
            <select onChange={e => setCulture(e.target.value as Culture)} value={culture}>
                {!culture && <option value="">Select a culture</option>}
                {getAvailableCultures(species).map(culture => (
                    <option key={culture} value={culture}>{culture}</option>
                ))}
            </select>
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next} disabled={!culture}>Next</button>
        </>
    );
}