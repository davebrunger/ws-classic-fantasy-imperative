import { standardSkillNames, type StandardSkills } from "../data/skill";

type Props = {
    readonly standardSkills: StandardSkills;
}

export function StartingSkillTable({ standardSkills }: Props) {
    
    const numRows = Math.ceil(standardSkillNames.length / 2);
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Skill</th>
                    <th style={{ textAlign: 'right' }}>Percentage</th>
                    <th>Skill</th>
                    <th style={{ textAlign: 'right' }}>Percentage</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(numRows).keys()].map(i => (
                    <tr key={i}>
                        <th>{standardSkillNames[i]}</th>
                        <td style={{ textAlign: 'right' }}>{standardSkills[standardSkillNames[i]]}%</td>
                        <th>{standardSkillNames[i + numRows]}</th>
                        <td style={{ textAlign: 'right' }}>{standardSkills[standardSkillNames[i + numRows]]}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}