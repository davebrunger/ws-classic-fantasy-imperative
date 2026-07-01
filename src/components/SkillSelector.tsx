import React from "react";
import { getDisplayName, getSkillName, isSpecialistProfessionalSkill, type Skill } from "../data/skill";
import { InputWithError } from "./InputWithError";

type Option = {
    readonly skill: Skill;
    readonly index: number;
    readonly value: number;
}

type Props = {
    readonly skillIndex: React.Key
    readonly skill: Skill;
    readonly updateSkill: (skill: Skill) => void;
    readonly updateSpecialization: (specialization: string) => void;
    readonly options: Option[];
}

export function SkillSelector({ skillIndex, skill, updateSkill, updateSpecialization, options }: Props) {

    const error = isSpecialistProfessionalSkill(skill) && !skill.specialization ? "Please enter a specialization." : undefined;
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
                        <InputWithError id={`specialization-${skillIndex}`} value={isSpecialistProfessionalSkill(skill) && skill.specialization || ''}
                            onChange={updateSpecialization} error={error} placeholder="Specialization"
                        />
                    )}
                </div>
            </div>
        </>
    );
}