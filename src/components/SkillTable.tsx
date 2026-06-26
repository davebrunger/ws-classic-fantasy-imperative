import { type Skill, type Skills } from "../data/skill";

type Column = {
    readonly name: string;
    readonly values: Skills;
}

type Props = {
    readonly skillNames: Readonly<Skill[]>;
    readonly columns: Readonly<Column[]>;
}

export function SkillTable({ skillNames, columns }: Props) {

    const numRows = Math.ceil(skillNames.length / 2);

    function getValue(skill: Skill, column: Column): number {
        const skillValue = column.values.find(cs => cs.skill === skill);
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
                        <th>{skillNames[i]}</th>
                        {columns.length > 0 && columns.map(column => (
                            <td key={column.name} style={{ textAlign: 'right' }}>{getDisplayValue(skillNames[i], column)}</td>
                        ))}
                        <td style={{ textAlign: 'right' }}>{getPercentage(skillNames[i])}</td>
                        {i + numRows < skillNames.length
                            ? (
                                <>
                                    <th>{skillNames[i + numRows]}</th>
                                    {columns.length > 0 && columns.map(column => (
                                        <td key={column.name} style={{ textAlign: 'right' }}>{getDisplayValue(skillNames[i + numRows], column)}</td>
                                    ))}
                                    <td style={{ textAlign: 'right' }}>{getPercentage(skillNames[i + numRows])}</td>
                                </>
                            ) : (
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