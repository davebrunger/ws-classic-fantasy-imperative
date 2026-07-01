type Props = {
    readonly id: string;
    readonly value: string;
    readonly onChange: (value: string) => void;
    readonly placeholder: string;
    readonly error?: string;
}

export function InputWithError({ id, value, onChange, placeholder, error }: Props) {
    return (
        <>
            <input id={id} type="text" placeholder={placeholder} value={value}
                aria-invalid={!!error} aria-describedby={`${id}-error`} onChange={e => onChange(e.target.value)}
            />
            {error && (
                <small id={`${id}-error`}>{error}</small>
            )}
        </>
    );
}