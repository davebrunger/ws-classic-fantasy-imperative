import type { Characteristics } from "../data/characterisic";
import { getStartingSkills, getStartingSkillValue, isProfessionalSkill, standardSkillNames, type Skill, type Skills } from "../data/skill";

type Props = {
    readonly culturalSkills: Skills;
    readonly characteristics: Characteristics;
}

export function CulturalSkillTable({ culturalSkills, characteristics }: Props) {

    const standardNumRows = Math.ceil(standardSkillNames.length / 2);

    const startingSkills = getStartingSkills(characteristics);

    const standardCulturalSkills = { ...startingSkills };

    for (const skill of standardSkillNames) {
        standardCulturalSkills[skill] = culturalSkills[skill] ?? 0;
    }

    const professionalSkills = Object.keys(culturalSkills).filter(isProfessionalSkill);

    let startingProfessionalSkills: Skills = {};

    for (const skill of professionalSkills) {
        startingProfessionalSkills = { ...startingProfessionalSkills, [skill]: getStartingSkillValue(skill, characteristics) };
    }

    const culturalProfessionalSkills = { ...startingProfessionalSkills };

    for (const skill of professionalSkills) {
        culturalProfessionalSkills[skill] = culturalSkills[skill] ?? 0;
    }

    const professionalNumRows = Math.ceil(professionalSkills.length / 2);

    return (
        <>
            <h4>Standard Skills</h4>
            <table>
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th style={{ textAlign: 'right' }}>Starting Value</th>
                        <th style={{ textAlign: 'right' }}>Cultural Modifier</th>
                        <th style={{ textAlign: 'right' }}>Percentage</th>
                        <th>Skill</th>
                        <th style={{ textAlign: 'right' }}>Starting Value</th>
                        <th style={{ textAlign: 'right' }}>Cultural Modifier</th>
                        <th style={{ textAlign: 'right' }}>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(standardNumRows).keys()].map(i => {
                        const leftSkill = standardSkillNames[i];
                        const rightSkill = standardSkillNames[i + standardNumRows];
                        return (
                            <tr key={i}>
                                <th>{leftSkill}</th>
                                <td style={{ textAlign: 'right' }}>{startingSkills[leftSkill]}%</td>
                                <td style={{ textAlign: 'right' }}>{standardCulturalSkills[leftSkill] ? `${standardCulturalSkills[leftSkill]}%` : ""}</td>
                                <td style={{ textAlign: 'right' }}>{startingSkills[leftSkill] + standardCulturalSkills[leftSkill]}%</td>
                                <th>{rightSkill}</th>
                                <td style={{ textAlign: 'right' }}>{startingSkills[rightSkill]}%</td>
                                <td style={{ textAlign: 'right' }}>{standardCulturalSkills[rightSkill] ? `${standardCulturalSkills[rightSkill]}%` : ""}</td>
                                <td style={{ textAlign: 'right' }}>{startingSkills[rightSkill] + standardCulturalSkills[rightSkill]}%</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h4>Professional Skills</h4>
            <table>
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th style={{ textAlign: 'right' }}>Starting Value</th>
                        <th style={{ textAlign: 'right' }}>Cultural Modifier</th>
                        <th style={{ textAlign: 'right' }}>Percentage</th>
                        <th>Skill</th>
                        <th style={{ textAlign: 'right' }}>Starting Value</th>
                        <th style={{ textAlign: 'right' }}>Cultural Modifier</th>
                        <th style={{ textAlign: 'right' }}>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(professionalNumRows).keys()].map(i => {
                        const leftSkill = professionalSkills[i];
                        const rightSkill = professionalSkills[i + professionalNumRows];
                        return (
                            <tr key={i}>
                                <th>{leftSkill}</th>
                                <td style={{ textAlign: 'right' }}>{startingProfessionalSkills[leftSkill]}%</td>
                                <td style={{ textAlign: 'right' }}>{culturalProfessionalSkills[leftSkill] ? `${culturalProfessionalSkills[leftSkill]}%` : ""}</td>
                                <td style={{ textAlign: 'right' }}>{startingProfessionalSkills[leftSkill]! + culturalProfessionalSkills[leftSkill]!}%</td>
                                {i + professionalNumRows < professionalSkills.length 
                                ? (
                                    <>
                                        <th>{rightSkill}</th>
                                        <td style={{ textAlign: 'right' }}>{startingProfessionalSkills[rightSkill]}%</td>
                                        <td style={{ textAlign: 'right' }}>{culturalProfessionalSkills[rightSkill] ? `${culturalProfessionalSkills[rightSkill]}%` : ""}</td>
                                        <td style={{ textAlign: 'right' }}>{startingProfessionalSkills[rightSkill]! + culturalProfessionalSkills[rightSkill]!}%</td>
                                    </>
                                ) : (
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}