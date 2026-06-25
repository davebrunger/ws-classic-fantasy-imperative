import { speciesNames, type Species as SpeciesType } from "../data/species";

type Props = {
    readonly species?: SpeciesType;
    readonly setSpecies: (species: SpeciesType) => void;
    readonly next: () => void;
}

export function Species({ species, setSpecies, next }: Props) {

    return (
        <>
            <h3>Steps 1: Species</h3>
            <hr />
            <select onChange={e => setSpecies(e.target.value as SpeciesType)} value={species || ""}>
                {!species && <option value="">Select a species</option>}
                {speciesNames.map(species => (
                    <option key={species} value={species}>{species}</option>
                ))}
            </select>
            <button style={{ float: 'right' }} onClick={next}>Next</button>
        </>
    )
}   