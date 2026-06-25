import type { SkillOption } from "../data/culture";
import type { Skill } from "../data/skill";

type Props = {
    readonly culturalSkillOptions: SkillOption[];
    readonly culturalSkills: Skill[];
    readonly setCulturalSkills: (culturalSkills: Skill[]) => void;
}

export function CulturalSkillSelector({ culturalSkillOptions, culturalSkills, setCulturalSkills }: Props) {
    return (
        <>
            {culturalSkillOptions.map((option, index) =>
                option.skills.length > 1 && (
                    <div key={index}>
                        <select value={culturalSkills[index]} onChange={e => {
                            const [skill, optionIndex] = e.target.value.split(",");
                            const newCulturalSkills = [...culturalSkills];
                            newCulturalSkills[parseInt(optionIndex)] = skill as Skill;
                            setCulturalSkills(newCulturalSkills);
                        }}>
                            {option.skills.filter(skill => !culturalSkills.slice(0, index).includes(skill)).map((skill) => (
                                <option key={skill} value={[skill, index.toString()]}>
                                    {skill}
                                </option>
                            ))}
                        </select>
                    </div>
                )
            )}
        </>
    );
}