import { areEqual, getSkillName, isSpecialistProfessionalSkill, type Skill, type SkillOption } from "../data/skill";
import { SkillSelector } from "./SkillSelector";

type Props = {
    readonly skillOptions: SkillOption[];
    readonly skills: Skill[];
    readonly setSkills: (skills: Skill[]) => void;
}

export function SkillSelectors({ skillOptions, skills, setSkills }: Props) {

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
            {selectableOptions.map(option => (
                <SkillSelector
                    key={option.index}
                    skill={skills[option.index]}
                    updateSkill={(skill: Skill) => updateSkill(option.index, skill)}
                    updateSpecialization={(specialization: string) => updateSpecialization(option.index, specialization)}
                    options={getOptions(option.index)}
                />
            ))}
        </>
    );
}