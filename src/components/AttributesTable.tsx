import { getActionPoints, getDamageModifier, getExperienceModifier, getHealingRate, getInitiative, getLuckPoints, getMagicPoints, type Characteristics } from "../data/characterisic";
import { getMovementRate, type Species } from "../data/species";

type Props = {
    readonly characteristics: Characteristics;
    readonly species: Species;
}

export function AttributesTable({ characteristics, species }: Props) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Action Points</th>
                        <th style={{ textAlign: 'center' }}>Damage Modifier</th>
                        <th style={{ textAlign: 'center' }}>Experience Modifier</th>
                        <th style={{ textAlign: 'center' }}>Healing Rate</th>
                        <th style={{ textAlign: 'center' }}>Initiative</th>
                        <th style={{ textAlign: 'center' }}>Movement Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'center' }}>{getActionPoints(characteristics)}</td>
                        <td style={{ textAlign: 'center' }}>{getDamageModifier(characteristics)}</td>
                        <td style={{ textAlign: 'center' }}>{getExperienceModifier(characteristics)}</td>
                        <td style={{ textAlign: 'center' }}>{getHealingRate(characteristics)}</td>
                        <td style={{ textAlign: 'center' }}>{getInitiative(characteristics)}</td>
                        <td style={{ textAlign: 'center' }}>{getMovementRate(species)}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Luck Points</th>
                        <th style={{ textAlign: 'center' }}>Magic Points</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'center' }}>{getLuckPoints(characteristics)}</td>
                        <td style={{ textAlign: 'center' }}>{getMagicPoints(characteristics)}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}