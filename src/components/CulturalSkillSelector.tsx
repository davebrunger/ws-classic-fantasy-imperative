import type { SkillOption } from "../data/culture";
import type { Skill, Skills } from "../data/skill";

type Props = {
    readonly culturalSkillOptions: SkillOption[];
    readonly culturalSkills: Skill[];
    readonly setCulturalSkills: (culturalSkills: Skill[]) => void;
}

export function CulturalSkillSelector({ culturalSkillOptions, culturalSkills, setCulturalSkills }: Props) {

    const selectableOptions = culturalSkillOptions.map((option, index) => ({ ...option, index })).filter(option => option.skills.length > 1);

    function getOptions(index: number): Skills {
        const options = culturalSkillOptions[index].skills.filter(skill => culturalSkills.indexOf(skill) === -1 || culturalSkills[index] === skill);
        return options.map(skill => ({ skill, value: culturalSkillOptions[index].quickPick }));
    }

    function updateCulturalSkill(index: number, skill: Skill) {
        const newCulturalSkills = [...culturalSkills];
        newCulturalSkills[index] = skill;
        setCulturalSkills(newCulturalSkills);
    }

    return (
        <>
            {selectableOptions.map(option => (
                <div key={option.index}>
                    <select value={culturalSkills[option.index]} onChange={e => {
                        const skill = e.target.value as Skill;
                        updateCulturalSkill(option.index, skill);
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