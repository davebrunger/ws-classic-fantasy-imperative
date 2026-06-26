type Props = {
    readonly name?: string;
    readonly setName: (name: string) => void;
    readonly concept?: string;
    readonly setConcept: (concept: string) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function NameAndConcept({ name, setName, concept, setConcept, back, next }: Props) {

    return (
        <>
            <input type="text" placeholder="Name" value={name || ""} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="Concept" value={concept || ""} onChange={e => setConcept(e.target.value)} />
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next} disabled={!name || !concept}>Next</button>
        </>
    );
}