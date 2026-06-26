import { speciesNames, type Species as SpeciesType } from "../data/species";

type Props = {
    readonly species?: SpeciesType;
    readonly setSpecies: (species: SpeciesType) => void;
    readonly next: () => void;
}

export function Species({ species, setSpecies, next }: Props) {

    return (
        <>
            <select onChange={e => setSpecies(e.target.value as SpeciesType)} value={species || ""}>
                {!species && <option value="">Select a species</option>}
                {speciesNames.map(species => (
                    <option key={species} value={species}>{species}</option>
                ))}
            </select>
            <button style={{ float: 'right' }} onClick={next} disabled={!species}>Next</button>
        </>
    )
}   