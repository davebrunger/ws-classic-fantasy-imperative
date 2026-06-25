import type { Characteristics } from "../data/characterisic";

type Props = {
    readonly characteristics: Characteristics;
}

export function CharacteristicsTable({ characteristics }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    <th style={{ textAlign: 'center' }}>STR</th>
                    <th style={{ textAlign: 'center' }}>CON</th>
                    <th style={{ textAlign: 'center' }}>SIZ</th>
                    <th style={{ textAlign: 'center' }}>DEX</th>
                    <th style={{ textAlign: 'center' }}>INT</th>
                    <th style={{ textAlign: 'center' }}>POW</th>
                    <th style={{ textAlign: 'center' }}>CHA</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ textAlign: 'center' }}>{characteristics.Strength}</td>
                    <td style={{ textAlign: 'center' }}>{characteristics.Constitution}</td>
                    <td style={{ textAlign: 'center' }}>{characteristics.Size}</td>
                    <td style={{ textAlign: 'center' }}>{characteristics.Dexterity}</td>
                    <td style={{ textAlign: 'center' }}>{characteristics.Intelligence}</td>
                    <td style={{ textAlign: 'center' }}>{characteristics.Power}</td>
                    <td style={{ textAlign: 'center' }}>{characteristics.Charisma}</td>
                </tr>
            </tbody>
        </table>
    );
}