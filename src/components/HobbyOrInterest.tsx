import { areEqual, compare, generalProfessionalSkillNames, getUniqueSkills, isSpecialistProfessionalSkill, specialistProfessionalSkillNames, type Skill, type Skills } from "../data/skill";
import { SkillSelector } from "./SkillSelector";

type Props = {
    readonly culturalSkills: Skills;
    readonly classSkills: Skills;
    readonly hobbyOrInterest?: Skill;
    readonly setHobbyOrInterest: (hobbyOrInterest?: Skill) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function HobbyOrInterest({ culturalSkills, classSkills, hobbyOrInterest, setHobbyOrInterest, back, next }: Props) {

    const combinedSkills = getUniqueSkills([...culturalSkills.map(cs => cs.skill), ...classSkills.map(cs => cs.skill)]);
    const availableGeneralProfessionalSkills = generalProfessionalSkillNames.filter(skill => !combinedSkills.some(s => areEqual(skill, s)));
    const specialistProfessionalSkills = specialistProfessionalSkillNames.map(name => ({ name }));
    const availableProfessionalSkills = [...availableGeneralProfessionalSkills, ...specialistProfessionalSkills]
        .sort((a, b) => compare(a, b))
        .map((skill, index) => ({ skill, index, value: 0 }));
    const error = !!hobbyOrInterest && combinedSkills.some(s => areEqual(s, hobbyOrInterest)) ? "Hobby or Interest cannot match any previously selected skills." : undefined;

    function setSpecialization(specialization?: string) {
        if (!isSpecialistProfessionalSkill(hobbyOrInterest)) {
            throw new Error(`Skill is not a specialist professional skill`);
        }
        setHobbyOrInterest({ ...hobbyOrInterest, specialization });
    }

    return (
        <>
            <SkillSelector skillIndex={0} skill={hobbyOrInterest} setSkill={setHobbyOrInterest} options={availableProfessionalSkills} required={false} setSpecialization={setSpecialization} />
            {error && (
                <div className="grid">
                    <div></div>
                    <div>
                        <small style={{ color: "var(--pico-del-color)" }}>{error}</small>
                    </div>
                </div>
            )}
            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next} disabled={!!error || (isSpecialistProfessionalSkill(hobbyOrInterest) && !hobbyOrInterest.specialization)}>Next</button>
        </>
    );
}