import { areSkillsEqual, getDisplayName, type Skill, type Skills } from "../data/skill";

type Column = {
    readonly name: string;
    readonly values: Skills;
    readonly setValue?: (skill: Skill, value: number) => void;
}

type Props = {
    readonly skills: Readonly<Skill[]>;
    readonly columns: Readonly<Column[]>;
    readonly skillsInError?: Readonly<Skill[]>;
}

export function SkillTable({ skills: skillNames, columns, skillsInError }: Props) {

    const numRows = Math.ceil(skillNames.length / 2);

    function getValue(skill: Skill, column: Column): number {
        const skillValue = column.values.find(cs => areSkillsEqual(cs.skill, skill));
        return skillValue?.value ?? 0;
    }

    function getDisplayValue(skill: Skill, column: Column): string {
        const value = getValue(skill, column);
        return value > 0 ? `${value}%` : "";
    }

    function getPercentage(skill: Skill): string {
        let total = 0;
        for (const column of columns) {
            total += getValue(skill, column);
        }
        return `${total}%`;
    }

    function clamp(num: number, lower: number, upper: number) {
        return Math.min(Math.max(num, lower), upper);
    }

    function cell(column: Column, skill: Skill, invalid: boolean) {

        var style = invalid ? { color: "var(--pico-del-color)" } : {};

        if (!column.setValue) {
            return (
                <td key={column.name} style={{ ...style, textAlign: 'right' }}>{getDisplayValue(skill, column)}</td>
            );
        }
        return (
            <td key={column.name} style={{ ...style, textAlign: 'right' }}>
                <input
                    style={{ marginBottom: 0 }}
                    type="number"
                    value={getValue(skill, column)}
                    min={0}
                    max={10}
                    onChange={e => column.setValue!(skill, isNaN(parseInt(e.target.value, 10)) ? 0 : clamp(parseInt(e.target.value, 10), 0, 10))}
                    aria-invalid={invalid}
                />
            </td>
        );
    }

    function subRow(skill: Skill) {

        var invalid =  !!skillsInError && skillsInError.some(s => areSkillsEqual(s, skill));
        var style = invalid ? { color: "var(--pico-del-color)" } : {};

        return (
            <>
                <th style={style}>{getDisplayName(skill)}</th>
                {columns.length > 0 && columns.map(column => cell(column, skill, invalid))}
                <td style={{ ...style, textAlign: 'right' }}>{getPercentage(skill)}</td>
            </>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Skill</th>
                    {columns.length > 0 && columns.map(column => (
                        <th key={column.name} style={{ textAlign: 'right' }}>{column.name}</th>
                    ))}
                    <th style={{ textAlign: 'right' }}>Total</th>
                    <th>Skill</th>
                    {columns.length > 0 && columns.map(column => (
                        <th key={column.name} style={{ textAlign: 'right' }}>{column.name}</th>
                    ))}
                    <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(numRows).keys()].map(i => (
                    <tr key={i}>
                        {subRow(skillNames[i])}
                        {i + numRows < skillNames.length
                            ? subRow(skillNames[i + numRows])
                            : (
                                <>
                                    <th></th>
                                    {columns.length > 0 && columns.map(column => (
                                        <td key={column.name}></td>
                                    ))}
                                    <td></td>
                                </>
                            )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}