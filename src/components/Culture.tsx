import type { Characteristics } from "../data/characterisic";
import { getSkillOptions, type Culture } from "../data/culture";
import { type Skill, type Skills } from "../data/skill";
import { getAvailableCultures, type Species } from "../data/species";
import { CulturalSkillSelector } from "./CulturalSkillSelector";
import { CulturalSkillTable } from "./CulturalSkillTable";

type Props = {
    readonly species: Species;
    readonly characteristics: Characteristics;
    readonly culture?: Culture;
    readonly setCulture: (culture?: Culture) => void;
    readonly culturalSkills?: Skills;
    readonly setCulturalSkills: (culturalSkills?: Skills) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function Culture({ species, characteristics, culture, setCulture, culturalSkills, setCulturalSkills, back, next }: Props) {

    function clear(goBack: boolean) {
        setCulture(undefined);
        setCulturalSkills(undefined);
        if (goBack) {
            back();
        }
    }

    function setCultureAndSkills(culture: Culture) {
        setCulture(culture);

        const culturalSkills = getSkillOptions(culture).reduce((acc, option) => {
            return { ...acc, [option.skills[0]]: option.quickPick };
        }, {} as Skills);

        setCulturalSkills(culturalSkills);
    }

    return (
        <>
            <h3>Step 5: Culture</h3>
            <hr />
            <h4>Species{species ? `: ${species}` : ''}</h4>
            {culture && culturalSkills
                ? (
                    <>
                        <h4>Culture: {culture}</h4>
                        <CulturalSkillSelector culturalSkillOptions={getSkillOptions(culture)} culturalSkills={getSkillOptions(culture).map(option => option.skills[0])} setCulturalSkills={undefined!} />
                        <CulturalSkillTable culturalSkills={culturalSkills} characteristics={characteristics} />
                        <button onClick={() => clear(false)}>Back</button>
                        <button style={{ float: 'right' }} onClick={next}>Next</button>
                    </>)
                : (
                    <>
                        <select onChange={e => setCultureAndSkills(e.target.value as Culture)} value={culture}>
                            {culture || <option value="">Select a culture</option>}
                            {getAvailableCultures(species).map(culture => (
                                <option key={culture} value={culture}>{culture}</option>
                            ))}
                        </select>
                        <button onClick={() => clear(true)}>Back</button>
                    </>)
            }
        </>
    );
}