import { areEqual, getDisplayName, type Skill, type SkillOption, type Skills } from "../data/skill";

type Props = {
    readonly skillOptions: SkillOption[];
    readonly skills: Skill[];
    readonly setSkills: (skills: Skill[]) => void;
}

export function SkillSelector({ skillOptions, skills, setSkills }: Props) {

    const selectableOptions = skillOptions.map((option, index) => ({ ...option, index })).filter(option => option.skills.length > 1);

    function getOptions(index: number) {
        const options = skillOptions[index].skills.map((skill, i) => ({ skill, index: i })).filter(skill => skills.findIndex(s => areEqual(s, skill.skill)) === -1 || areEqual(skills[index], skill.skill));
        return options.map(skill => ({ skill: skill.skill, index: skill.index, value: skillOptions[index].quickPick }));
    }

    function updateSkill(index: number, skill: Skill) {
        const newSkills = [...skills];
        newSkills[index] = skill;
        setSkills(newSkills);
    }

    return (
        <>
            {selectableOptions.map(option => {
                const selectedSkill = skills[option.index];
                const selectedOption = option.skills.findIndex(skill => areEqual(skill, selectedSkill));                
                return (
                    <div key={option.index}>
                        <select value={selectedOption} onChange={e => {
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
                    </div>
                );
            })}
        </>
    );
}