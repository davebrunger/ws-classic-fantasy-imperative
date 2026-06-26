import { classNames, type Class as ClassType } from "../data/class";

type Props = {
    readonly characterClass?: ClassType;
    readonly setClass: (characterClass: ClassType) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function Class({ characterClass, setClass, back, next }: Props) {
    return (
        <>
            <select onChange={e => setClass(e.target.value as ClassType)} value={characterClass}>
                {!characterClass && <option value="">Select a class</option>}
                {classNames.map(characterClass => (
                    <option key={characterClass} value={characterClass}>{characterClass}</option>
                ))}
            </select>
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next} disabled={!characterClass}>Next</button>
        </>
    );
}