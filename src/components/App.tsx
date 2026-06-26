import { useState } from "react";
import type { Species as SpeciesType } from "../data/species";
import { type Characteristics as CharacteristicsType } from "../data/characterisic";
import { type Culture as CultureType } from "../data/culture";
import type { Skills } from "../data/skill";
import { Species } from "./Species";
import { Characteristics } from "./Characteristics";
import { Culture } from "./Culture";
import { CulturalSkills } from "./CulturalSkills";
import { NameAndConcept } from "./NameAndConcept";
import { type Class as ClassType } from "../data/class";
import { Class } from "./Class";
import { ClassSkills } from "./ClassSkills";
import { back, next, type Step } from "../data/step";
import { Header } from "./Header";
import { CharacteristicsTable } from "./CharacteristicsTable";

export function App() {

    const [species, setSpecies] = useState<SpeciesType | undefined>(undefined);
    const [speciesSkills, setSpeciesSkills] = useState<Skills | undefined>(undefined);
    const [characteristics, setCharacteristics] = useState<CharacteristicsType | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [concept, setConcept] = useState<string | undefined>(undefined);
    const [culture, setCulture] = useState<CultureType | undefined>(undefined);
    const [culturalSkills, setCulturalSkills] = useState<Skills | undefined>(undefined);
    const [characterClass, setCharacterClass] = useState<ClassType | undefined>(undefined);
    const [classSkills, setClassSkills] = useState<Skills | undefined>(undefined);

    const [step, setStep] = useState<Step>("Species");

    function previousStep() {
        if (!back(step, setStep, setSpeciesSkills, setCharacteristics, setName, setConcept, setCulture, setCulturalSkills, setCharacterClass, setClassSkills)) {
            throw new Error("Cannot go back from this step.");
        }
    }

    function nextStep() {
        if (!next(step, setStep, setSpeciesSkills, setCharacteristics, setCulturalSkills, setClassSkills, species, speciesSkills, characteristics, culture, culturalSkills, characterClass, classSkills)) {
            alert("Character creation complete!");
        }
    }

    return (
        <main className="container">
            <h1>Classic Fantasy Imperative Character Creator</h1>
            <Header step={step} name={name} concept={concept} species={species} culture={culture} characterClass={characterClass} />
            {characteristics && <CharacteristicsTable characteristics={characteristics} />}
            {step === "Species" &&
                <Species species={species} setSpecies={setSpecies} next={nextStep} />}
            {step === "Characteristics" &&
                <Characteristics species={species!} speciesSkills={speciesSkills!} characteristics={characteristics!} setCharacteristics={setCharacteristics} back={previousStep} next={nextStep} />}
            {step === "Name and Concept" &&
                <NameAndConcept name={name} setName={setName} concept={concept} setConcept={setConcept} back={previousStep} next={nextStep} />}
            {step === "Culture" &&
                <Culture species={species!} culture={culture} setCulture={setCulture} back={previousStep} next={nextStep} />}
            {step === "Cultural Skills" &&
                <CulturalSkills speciesSkills={speciesSkills!} characteristics={characteristics!} culture={culture!} culturalSkills={culturalSkills!} setCulturalSkills={setCulturalSkills}
                    back={previousStep} next={nextStep} />}
            {step === "Class" &&
                <Class characterClass={characterClass} setClass={setCharacterClass} back={previousStep} next={nextStep} />}
            {step === "Class Skills" &&
                <ClassSkills speciesSkills={speciesSkills!} characteristics={characteristics!} culturalSkills={culturalSkills!} characterClass={characterClass!} classSkills={classSkills!}
                    setClassSkills={setClassSkills} back={previousStep} next={nextStep} />}
        </main>
    );
}
