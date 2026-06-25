import type { Skill, SkillOption, Skills } from "../data/skill";

type Props = {
    readonly skillOptions: SkillOption[];
    readonly skills: Skill[];
    readonly setSkills: (skills: Skill[]) => void;
}

export function SkillSelector({ skillOptions, skills, setSkills }: Props) {

    const selectableOptions = skillOptions.map((option, index) => ({ ...option, index })).filter(option => option.skills.length > 1);

    function getOptions(index: number): Skills {
        const options = skillOptions[index].skills.filter(skill => skills.indexOf(skill) === -1 || skills[index] === skill);
        return options.map(skill => ({ skill, value: skillOptions[index].quickPick }));
    }

    function updateSkill(index: number, skill: Skill) {
        const newSkills = [...skills];
        newSkills[index] = skill;
        setSkills(newSkills);
    }

    return (
        <>
            {selectableOptions.map(option => (
                <div key={option.index}>
                    <select value={skills[option.index]} onChange={e => {
                        const skill = e.target.value as Skill;
                        updateSkill(option.index, skill);
                    }}>
                        {getOptions(option.index).map(({ skill, value }) => (
                            <option key={skill} value={skill}>
                                {`${skill} (${value}%)`}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </>
    );
}