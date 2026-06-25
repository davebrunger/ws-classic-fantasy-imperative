import { useState } from "react";
import type { Species as SpeciesType } from "../data/species";
import { rollCharacteristics, type Characteristics as CharacteristicsType } from "../data/characterisic";
import { getSkillOptions as getCulturalSkillOptions, type Culture as CultureType } from "../data/culture";
import type { Skills } from "../data/skill";
import { Species } from "./Species";
import { Characteristics } from "./Characteristics";
import { Culture } from "./Culture";
import { CulturalSkills } from "./CulturalSkills";
import { NameAndConcept } from "./NameAndConcept";
import { getSkillOptions as getClassSkillOptions, type Class as ClassType } from "../data/class";
import { Class } from "./Class";
import { ClassSkills } from "./ClassSkills";

type Step = "Species" | "Characteristics" | "Name and Concept" | "Culture" | "Cultural Skills" | "Class" | "Class Skills";

export function App() {

    const [species, setSpecies] = useState<SpeciesType | undefined>(undefined);
    const [characteristics, setCharacteristics] = useState<CharacteristicsType | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [concept, setConcept] = useState<string | undefined>(undefined);
    const [culture, setCulture] = useState<CultureType | undefined>(undefined);
    const [culturalSkills, setCulturalSkills] = useState<Skills | undefined>(undefined);
    const [characterClass, setCharacterClass] = useState<ClassType | undefined>(undefined);
    const [classSkills, setClassSkills] = useState<Skills | undefined>(undefined);

    const [step, setStep] = useState<Step>("Species");

    function stepToSpecies() {
        setCharacteristics(undefined);
        setStep("Species");
    }

    function stepToCharacteristics() {
        if (!characteristics) {
            setCharacteristics(rollCharacteristics(species!));
        }
        setStep("Characteristics");
    }

    function stepToNameAndConcept() {
        setStep("Name and Concept");
    }

    function stepToCulture() {
        setCulturalSkills(undefined);
        setStep("Culture");
    }

    function stepToCulturalSkills() {
        if (!culturalSkills) {
            const newCulturalSkills = getCulturalSkillOptions(culture!).map(option => ({ skill: option.skills[0], value: option.quickPick }));
            setCulturalSkills(newCulturalSkills);
        }
        setCharacterClass(undefined);
        setStep("Cultural Skills");
    }

    function stepToClass() {
        setClassSkills(undefined);
        setStep("Class");
    }

    function stepToClassSkills() {
        if (!classSkills) {
            const newClassSkills = getClassSkillOptions(characterClass!).map(option => ({ skill: option.skills[0], value: option.quickPick }));
            setClassSkills(newClassSkills);
        }
        setStep("Class Skills");
    }

    return (
        <main className="container">
            <h1>Classic Fantasy Imperative Character Creator</h1>
            {step === "Species" &&
                <Species species={species} setSpecies={setSpecies} next={stepToCharacteristics} />}
            {step === "Characteristics" &&
                <Characteristics species={species!} characteristics={characteristics!} setCharacteristics={setCharacteristics}
                    back={stepToSpecies} next={stepToNameAndConcept} />}
            {step === "Name and Concept" &&
                <NameAndConcept species={species!} characteristics={characteristics!} name={name} setName={setName} concept={concept} setConcept={setConcept}
                    back={stepToCharacteristics} next={stepToCulture} />}
            {step === "Culture" &&
                <Culture name={name!} concept={concept!} species={species!} characteristics={characteristics!} culture={culture} setCulture={setCulture}
                    back={stepToNameAndConcept} next={stepToCulturalSkills} />}
            {step === "Cultural Skills" &&
                <CulturalSkills name={name!} concept={concept!} species={species!} characteristics={characteristics!} culture={culture!}
                    culturalSkills={culturalSkills!} setCulturalSkills={setCulturalSkills} back={stepToCulture} next={stepToClass} />}
            {step === "Class" &&
                <Class name={name!} concept={concept!} species={species!} characteristics={characteristics!} culture={culture!} characterClass={characterClass}
                    setClass={setCharacterClass} back={stepToCulturalSkills} next={stepToClassSkills} />}
            {step === "Class Skills" &&
                <ClassSkills name={name!} concept={concept!} species={species!} characteristics={characteristics!} culture={culture!} culturalSkills={culturalSkills!} 
                    characterClass={characterClass!} classSkills={classSkills!} setClassSkills={setClassSkills} back={stepToClass} next={() => alert("Character creation complete!")} />}
        </main>
    );
}
