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
    readonly required: boolean;
    readonly skill?: Skill;
    readonly setSkill: (skill?: Skill) => void;
    readonly setSpecialization: (specialization: string) => void;
    readonly options: Option[];
}

export function SkillSelector({ skillIndex, skill, setSkill, setSpecialization, options, required }: Props) {

    const error = isSpecialistProfessionalSkill(skill) && !skill.specialization ? "Please enter a specialization." : undefined;
    const selectedOption = skill 
        ? options.find(({ skill: s }) => getSkillName(s) === getSkillName(skill))!
        : undefined;

    return (
        <>
            <div className="grid">
                <div>
                    <select id={`skill-${skillIndex}`} value={selectedOption?.index} onChange={e => {
                        if (e.target.value === "") {
                            setSkill(undefined);
                            return;
                        }
                        const newIndex = parseInt(e.target.value, 10);
                        const skill = options.find(o => o.index === newIndex)?.skill;
                        setSkill(skill);
                    }}>
                        {!required && <option value="">Select a skill (Optional)</option>}
                        {options.map(({ skill, index, value }) => (
                            <option key={getDisplayName(skill)} value={index}>
                                {`${getDisplayName(skill)}${value > 0 ? ` (${value}%)` : ""}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    {isSpecialistProfessionalSkill(selectedOption?.skill) && !selectedOption.skill.specialization && (
                        <InputWithError id={`specialization-${skillIndex}`} value={isSpecialistProfessionalSkill(skill) && skill.specialization || ''}
                            onChange={setSpecialization} error={error} placeholder="Specialization"
                        />
                    )}
                </div>
            </div>
        </>
    );
}