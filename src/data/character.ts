import { type Characteristics } from "./characterisic";
import { getCharacteristicRolls, type Species } from "./species"
import { getStartingStandardSkills, type Skills } from "./skill";
import type { Culture } from "./culture";
import { roll } from "./common";

export type Character = {
    readonly species: Species;
    readonly characteristics: Characteristics;
    readonly standardSkills: Skills;
    readonly culture: Culture;
    readonly professionalSkills: Skills;
}

export function newCharacter(species: Species): Partial<Character> {
    const rolls = getCharacteristicRolls(species);

    const characteristics: Characteristics = {
        Strength: roll(rolls.Strength),
        Constitution: roll(rolls.Constitution),
        Size: roll(rolls.Size),
        Dexterity: roll(rolls.Dexterity),
        Intelligence: roll(rolls.Intelligence),
        Power: roll(rolls.Power),
        Charisma: roll(rolls.Charisma),
    };

    return {
        species,
        characteristics,
        standardSkills: getStartingStandardSkills(characteristics),
    };
}
