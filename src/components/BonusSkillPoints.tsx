import type { Characteristics } from "../data/characterisic";
import { areSkillsEqual, combineSkills, compareSkills, getDisplayName, getStartingSkills, getStartingSkillValue, getUniqueSkills, isCombatSkill, isProfessionalSkill, standardSkillNames, type Skill, type Skills } from "../data/skill";
import { SkillTable } from "./SkillTable";

type Props = {
    readonly speciesSkills: Skills;
    readonly characteristics: Characteristics;
    readonly culturalSkills: Skills;
    readonly classSkills: Skills;
    readonly hobbyOrInterest?: Skill;
    readonly bonusSkillPoints: Skills;
    readonly setBonusSkillPoints: (bonusSkillPoints: Skills) => void;
    readonly back: () => void;
    readonly next: () => void;
}

export function BonusSkillPoints({ speciesSkills, characteristics, culturalSkills, classSkills, hobbyOrInterest, bonusSkillPoints, setBonusSkillPoints, back, next }: Props) {

    const combinedSkillNames = bonusSkillPoints.map(bsp => bsp.skill).sort((a, b) => compareSkills(a, b));
    const professionalSkillNames = combinedSkillNames.filter(isProfessionalSkill);
    const combatSkillNames = combinedSkillNames.filter(isCombatSkill);

    const combinedModifiers = combineSkills(combineSkills(speciesSkills, culturalSkills), classSkills);

    const bonusSkillPointsSpent = bonusSkillPoints.reduce((total, bsp) => total + bsp.value, 0);
    const bonusSkillPointsRemaining = 100 - bonusSkillPointsSpent;

    const totals = classSkills.map(cs => {
        const startingValue = getStartingSkillValue(cs.skill, characteristics);
        const speciesSkill = speciesSkills.find(ss => areSkillsEqual(ss.skill, cs.skill))?.value ?? 0;
        const culturalSkill = culturalSkills.find(cus => areSkillsEqual(cus.skill, cs.skill))?.value ?? 0;
        const classSkill = cs.value;
        const bonusSkillPoint = bonusSkillPoints.find(bsp => areSkillsEqual(bsp.skill, cs.skill))?.value ?? 0;
        return { skill: cs.skill, value: startingValue + speciesSkill + culturalSkill + classSkill + bonusSkillPoint };
    });

    const classSkillsInvalid = totals.filter(total => total.value >= 40).length < 5;
    const hobbyOrInterestInvalid = !!hobbyOrInterest && bonusSkillPoints.find(total => areSkillsEqual(total.skill, hobbyOrInterest))?.value === 0;
    const bonusSkillPointsInvalid = bonusSkillPointsRemaining !== 0;

    const invalidSkills = [
        ...(classSkillsInvalid ? classSkills.map(cs => cs.skill) : []),
        ...(hobbyOrInterestInvalid ? [hobbyOrInterest!] : [])
    ];

    const bonusSkillPointsStyle = bonusSkillPointsInvalid ? { color: "var(--pico-del-color)" } : { color: "var(--pico-ins-color)" };

    return (
        <>
            <h4>Standard Skills</h4>
            <SkillTable skills={standardSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(standardSkillNames, characteristics) },
                { name: "Modifiers So Far", values: combinedModifiers },
                {
                    name: "Bonus Skill Modifier", values: bonusSkillPoints, setValue: (skill, value) => {
                        const newBonusSkillPoints = bonusSkillPoints.map(bsp => areSkillsEqual(bsp.skill, skill) ? { ...bsp, value } : bsp);
                        setBonusSkillPoints(newBonusSkillPoints);
                    }
                }]}
                skillsInError={invalidSkills} />
            <h4>Professional Skills</h4>
            <SkillTable skills={professionalSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(professionalSkillNames, characteristics) },
                { name: "Modifiers So Far", values: combinedModifiers },
                {
                    name: "Bonus Skill Modifier", values: bonusSkillPoints, setValue: (skill, value) => {
                        const newBonusSkillPoints = bonusSkillPoints.map(bsp => areSkillsEqual(bsp.skill, skill) ? { ...bsp, value } : bsp);
                        setBonusSkillPoints(newBonusSkillPoints);
                    }
                }]}
                skillsInError={invalidSkills} />
            <h4>Combat Skills</h4>
            <SkillTable skills={combatSkillNames} columns={[
                { name: "Starting Value", values: getStartingSkills(combatSkillNames, characteristics) },
                { name: "Modifiers So Far", values: combinedModifiers },
                {
                    name: "Bonus Skill Modifier", values: bonusSkillPoints, setValue: (skill, value) => {
                        const newBonusSkillPoints = bonusSkillPoints.map(bsp => areSkillsEqual(bsp.skill, skill) ? { ...bsp, value } : bsp);
                        setBonusSkillPoints(newBonusSkillPoints);
                    }
                }]}
                skillsInError={invalidSkills} />
            <div style={bonusSkillPointsStyle} className="grid">
                <div>Bonus Skill Points Spent: {bonusSkillPointsSpent}</div>
                <div>Bonus Skill Points Remaining: {bonusSkillPointsRemaining}</div>
            </div>
            {(classSkillsInvalid || hobbyOrInterestInvalid) && (
                <div className="grid" style={{ color: "var(--pico-del-color)" }}>
                    <div>{classSkillsInvalid ? "At least 5 class skills must have a total of 40% or more" : ""}</div>
                    <div>{hobbyOrInterestInvalid ? `Hobby or interest (${getDisplayName(hobbyOrInterest!)}) must have at least 1 bonus point spent on it` : ""}</div>
                </div>
            )}

            <button onClick={back}>Back</button>
            <button style={{ float: 'right' }} onClick={next} disabled={classSkillsInvalid || hobbyOrInterestInvalid || bonusSkillPointsInvalid}>Next</button>
        </>
    );
}