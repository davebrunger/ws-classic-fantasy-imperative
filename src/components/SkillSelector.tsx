import { getDisplayName, getSkillName, isSpecialistProfessionalSkill, type Skill } from "../data/skill";

type Props = {
    readonly skill: Skill;
    readonly updateSkill: (skill: Skill) => void;
    readonly updateSpecialization: (specialization: string) => void;
    readonly options: Readonly<Readonly<{skill: Skill, index: number, value: number}>[]>
}

export function SkillSelector({ skill, updateSkill, updateSpecialization, options }: Props) {

    const selectedOption = options.find(({ skill: s }) => getSkillName(s) === getSkillName(skill))!;

    return (
        <div className="grid">
            <select value={selectedOption.index} onChange={e => {
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
            <div>
                {isSpecialistProfessionalSkill(selectedOption.skill) && !selectedOption.skill.specialization && (
                    <input type="text" placeholder="Enter specialization" value={isSpecialistProfessionalSkill(skill) && skill.specialization || ''}
                        onChange={e => {
                            updateSpecialization(e.target.value);
                        }}
                    />
                )}
            </div>
        </div>
    );
}