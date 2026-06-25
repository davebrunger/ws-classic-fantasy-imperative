import { useState } from "react";
import type { Character } from "../data/character";
import { Species } from "./Species";
import { Culture } from "./Culture";
import type { Skills } from "../data/skill";

type Step = "Species" | "Culture";

export function App() {
    
    const [character, setCharacter] = useState<Partial<Character> | undefined>(undefined);
    const [step, setStep] = useState<Step>("Species");
    const [culturalSkills, setCulturalSkills] = useState<Skills | undefined>(undefined);

    
    return (
        <main className="container">
            <h1>Classic Fantasy Imperative Character Creator</h1>
            {step === "Species" && <Species character={character} setCharacter={setCharacter} next={() => setStep("Culture")} />}
            {step === "Culture" && <Culture species={character?.species!} characteristics={character?.characteristics!} culture={character?.culture} setCulture={culture => setCharacter({ ...character, culture })} 
                                            culturalSkills={culturalSkills} setCulturalSkills={setCulturalSkills} 
                                            back={() => setStep("Species")} next={() => alert("Character creation complete!")} />}
        </main>
    )
}
