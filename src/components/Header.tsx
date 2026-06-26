import { stepNames, type Step } from "../data/step";

type Props = {
    readonly step: Step;
    readonly name?: string;
    readonly concept?: string;
    readonly species?: string;
    readonly culture?: string;
    readonly characterClass?: string;
};

export function Header({ step, name, concept, species, culture, characterClass }: Props) {
    return (
        <>
            <h3>Step {stepNames.indexOf(step) + 1}: {step}</h3>
            <hr />
            {name && concept && (
                <div className="grid">
                    {name && <h4>Name: {name}</h4>}
                    {concept && <h4>Concept: {concept}</h4>}
                </div>
            )}
            {species && culture && (
                <div className="grid">
                    {species && <h4>Species: {species}</h4>}
                    {culture && <h4>Culture: {culture}</h4>}
                </div>
            )}
            {characterClass && (
                <div className="grid">
                    {characterClass && <h4>Class: {characterClass}</h4>}
                </div>
            )}
        </>
    );
}