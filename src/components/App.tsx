import { useState } from "react";
import type { Species as SpeciesType } from "../data/species";
import { rollCharacteristics, type Characteristics as CharacteristicsType } from "../data/characterisic";
import { getSkillOptions, type Culture as CultureType } from "../data/culture";
import type { Skills } from "../data/skill";
import { Species } from "./Species";
import { Characteristics } from "./Characteristics";
import { Culture } from "./Culture";
import { CulturalSkills } from "./CulturalSkills";

type Step = "Species" | "Characteristics" | "Culture" | "Cultural Skills";

export function App() {
    
    const [species, setSpecies] = useState<SpeciesType | undefined>(undefined);
    const [characteristics, setCharacteristics] = useState<CharacteristicsType | undefined>(undefined);
    const [culture, setCulture] = useState<CultureType | undefined>(undefined);
    const [culturalSkills, setCulturalSkills] = useState<Skills | undefined>(undefined);

    const [step, setStep] = useState<Step>("Species");

    function stepToSpecies() {
        setCharacteristics(undefined);
        setStep("Species");
    }

    function stepToCharacteristics() {
        if (!characteristics) {
            setCharacteristics(rollCharacteristics(species!));
        }
        setCulture(undefined);
        setStep("Characteristics");
    }

    function stepToCulture() {
        setCulturalSkills(undefined);
        setStep("Culture");
    }

    function stepToCulturalSkills() {
       const newCulturalSkills = getSkillOptions(culture!).map(option => ({ skill: option.skills[0], value: option.quickPick }));
        setCulturalSkills(newCulturalSkills);
        setStep("Cultural Skills");
    }

    return (
        <main className="container">
            <h1>Classic Fantasy Imperative Character Creator</h1>
            {step === "Species" && 
                <Species species={species} setSpecies={setSpecies} next={stepToCharacteristics} />}
            {step === "Characteristics" && 
                <Characteristics species={species!} characteristics={characteristics!} setCharacteristics={setCharacteristics} 
                                 back={stepToSpecies} next={stepToCulture} />}
            {step === "Culture" && 
                <Culture species={species!} culture={culture} setCulture={setCulture} back={stepToCharacteristics} next={stepToCulturalSkills} />}
            {step === "Cultural Skills" && 
                <CulturalSkills species={species!} characteristics={characteristics!} culture={culture!} culturalSkills={culturalSkills!} 
                                setCulturalSkills={setCulturalSkills} back={stepToCulture} next={() => alert("Character creation complete!")} />}
        </main>
    );
}
