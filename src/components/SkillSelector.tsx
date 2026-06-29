import { areEqual, getDisplayName, getSkillName, isSpecialistProfessionalSkill, type Skill, type SkillOption, type Skills } from "../data/skill";

type Props = {
    readonly skillOptions: SkillOption[];
    readonly skills: Skill[];
    readonly setSkills: (skills: Skill[]) => void;
}

export function SkillSelector({ skillOptions, skills, setSkills }: Props) {

    const selectableOptions = skillOptions.map((option, index) => ({ ...option, index })).filter(option =>
        option.skills.length > 1 ||
        (isSpecialistProfessionalSkill(option.skills[0]) && !option.skills[0].specialization)
    );

    function getOptions(index: number) {
        const options = skillOptions[index].skills
            .map((skill, i) => ({ skill, index: i }))
            .filter(skill =>
                skills.findIndex(s => areEqual(s, skill.skill)) === -1 ||
                getSkillName(skills[index]) === getSkillName(skill.skill) ||
                (isSpecialistProfessionalSkill(skill.skill) && !skill.skill.specialization)
            );
        return options.map(skill => ({ skill: skill.skill, index: skill.index, value: skillOptions[index].quickPick }));
    }

    function updateSkill(index: number, skill: Skill) {
        const newSkills = [...skills];
        newSkills[index] = skill;
        setSkills(newSkills);
    }

    function updateSpecialization(index: number, specialization: string) {
        const newSkills = [...skills];
        const selectedSkill = skills[index];
        if (!isSpecialistProfessionalSkill(selectedSkill)) {
            throw new Error(`Skill at index ${index} is not a specialist professional skill`);
        }
        newSkills[index] = { ...selectedSkill, specialization };
        setSkills(newSkills);
    }

    return (
        <>
            {selectableOptions.map(option => {
                const selectedSkill = skills[option.index];
                const selectedOptionIndex = option.skills.findIndex(skill => getSkillName(skill) === getSkillName(selectedSkill));
                const selectedOption = option.skills[selectedOptionIndex];
                return (
                    <div key={option.index} className="grid">
                        <select value={selectedOptionIndex} onChange={e => {
                            const skillIndex = parseInt(e.target.value, 10);
                            const skill = skillOptions[option.index].skills[skillIndex];
                            updateSkill(option.index, skill);
                        }}>
                            {getOptions(option.index).map(({ skill, index, value }) => (
                                <option key={getDisplayName(skill)} value={index}>
                                    {`${getDisplayName(skill)} (${value}%)`}
                                </option>
                            ))}
                        </select>
                        <div>
                            {isSpecialistProfessionalSkill(selectedOption) && !selectedOption.specialization && (
                                <input type="text" placeholder="Enter specialization" value={isSpecialistProfessionalSkill(selectedSkill) && selectedSkill.specialization || ''}
                                    onChange={e => {
                                        updateSpecialization(option.index, e.target.value);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
}