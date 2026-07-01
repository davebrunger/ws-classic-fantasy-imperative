import React from "react";
import { areSkillsEqual, getSkillName, getUniqueSkills, isSpecialistProfessionalSkill, type Skill, type SkillOption } from "../data/skill";
import { SkillSelector } from "./SkillSelector";

type Props = {
    readonly skillOptions: SkillOption[];
    readonly skills: Skill[];
    readonly setSkills: (skills: Skill[]) => void;
    readonly error?: string;
    readonly setError: (error?: string) => void;
}

export function SkillSelectors({ skillOptions, skills, setSkills, error, setError }: Props) {

        React.useEffect(() => {
        const uniqueSkills = getUniqueSkills(skills);
        if (uniqueSkills.length !== skills.length) {
            setError("No selections can match for each step.");
        } else {
            setError(undefined);
        }
    }, [skills]);

    const selectableOptions = skillOptions.map((option, index) => ({ ...option, index })).filter(option =>
        option.skills.length > 1 ||
        (isSpecialistProfessionalSkill(option.skills[0]) && !option.skills[0].specialization)
    );

    function getOptions(index: number) {
        const options = skillOptions[index].skills
            .map((skill, i) => ({ skill, index: i }))
            .filter(skill =>
                skills.findIndex(s => areSkillsEqual(s, skill.skill)) === -1 ||
                getSkillName(skills[index]) === getSkillName(skill.skill) ||
                (isSpecialistProfessionalSkill(skill.skill) && !skill.skill.specialization)
            );
        return options.map(skill => ({ skill: skill.skill, index: skill.index, value: skillOptions[index].quickPick }));
    }

    function setSkill(index: number, skill: Skill) {
        const newSkills = [...skills];
        newSkills[index] = skill;
        setSkills(newSkills);
    }

    function setSpecialization(index: number, specialization: string) {
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
                    skillIndex={option.index}
                    skill={skills[option.index]}
                    required={true}
                    setSkill={(skill?: Skill) => setSkill(option.index, skill!)}
                    setSpecialization={(specialization: string) => setSpecialization(option.index, specialization)}
                    options={getOptions(option.index)}
                />
            ))}
            {error && (
                <div className="grid">
                    <div></div>
                    <div>
                        <small style={{ color: "var(--pico-del-color)" }}>{error}</small>
                    </div>
                </div>
            )}
        </>
    );
}