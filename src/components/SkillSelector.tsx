import { getDisplayName, getSkillName, isSpecialistProfessionalSkill, type Skill } from "../data/skill";

type Props = {
    readonly skillIndex: React.Key
    readonly skill: Skill;
    readonly updateSkill: (skill: Skill) => void;
    readonly updateSpecialization: (specialization: string) => void;
    readonly options: Readonly<Readonly<{ skill: Skill, index: number, value: number }>[]>
}

export function SkillSelector({ skillIndex, skill, updateSkill, updateSpecialization, options }: Props) {

    const selectedOption = options.find(({ skill: s }) => getSkillName(s) === getSkillName(skill))!;

    return (
        <>
            <div className="grid">
                <div>
                    <select id={`skill-${skillIndex}`} value={selectedOption.index} onChange={e => {
                        const newIndex = parseInt(e.target.value, 10);
                        const skill = options.find(o => o.index === newIndex)?.skill!;
                        updateSkill(skill);
                    }}>
                        {options.map(({ skill, index, value }) => (
                            <option key={getDisplayName(skill)} value={index}>
                                {`${getDisplayName(skill)} (${value}%)`}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    {isSpecialistProfessionalSkill(selectedOption.skill) && !selectedOption.skill.specialization && (
                        <>
                            <input id={`specialization-${skillIndex}`} type="text" placeholder="Enter specialization" value={isSpecialistProfessionalSkill(skill) && skill.specialization || ''}
                                aria-invalid={isSpecialistProfessionalSkill(skill) && !skill.specialization}
                                aria-describedby={`specialization-error-${skillIndex}`}
                                onChange={e => {
                                    updateSpecialization(e.target.value);
                                }}
                            />
                            {(isSpecialistProfessionalSkill(skill) && !skill.specialization) && (
                                <small style={{ marginTop: "-var(--pico-spacing)" }} id={`specialization-error-${skillIndex}`}>Please enter a specialization</small>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}