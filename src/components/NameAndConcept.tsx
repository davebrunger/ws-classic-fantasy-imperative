import { InputWithError } from "./InputWithError";

type Props = {
    readonly name?: string;
    readonly setName: (name: string) => void;
    readonly concept?: string;
    readonly setConcept: (concept: string) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function NameAndConcept({ name, setName, concept, setConcept, back, next }: Props) {

    const nameError = !name ? "Please enter a name." : undefined;
    const conceptError = !concept ? "Please enter a concept." : undefined;

    return (
        <>
            <InputWithError id="name" value={name || ""} onChange={setName} error={nameError} placeholder="Name" />
            <InputWithError id="concept" value={concept || ""} onChange={setConcept} error={conceptError} placeholder="Concept" />
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next} disabled={!name || !concept}>Next</button>
        </>
    );
}