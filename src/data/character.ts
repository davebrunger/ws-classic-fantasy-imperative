import { rollCharacteristic, type Characteristics } from "./characterisic";
import { getCharacteristicRolls, type Species } from "./species"
import { type ProfessionalSkills, type StandardSkills, getStartingSkills } from "./skill";
import type { Culture } from "./culture";

export type Character = {
    readonly species: Species;
    readonly characteristics: Characteristics;
    readonly standardSkills: StandardSkills;
    readonly culture: Culture;
    readonly professionalSkills: ProfessionalSkills;
}

export function newCharacter(species: Species): Partial<Character> {
    const rolls = getCharacteristicRolls(species);

    const characteristics: Characteristics = {
        Strength: rollCharacteristic(rolls.Strength.dice, rolls.Strength.sides, rolls.Strength.modifier),
        Constitution: rollCharacteristic(rolls.Constitution.dice, rolls.Constitution.sides, rolls.Constitution.modifier),
        Size: rollCharacteristic(rolls.Size.dice, rolls.Size.sides, rolls.Size.modifier),
        Dexterity: rollCharacteristic(rolls.Dexterity.dice, rolls.Dexterity.sides, rolls.Dexterity.modifier),
        Intelligence: rollCharacteristic(rolls.Intelligence.dice, rolls.Intelligence.sides, rolls.Intelligence.modifier),
        Power: rollCharacteristic(rolls.Power.dice, rolls.Power.sides, rolls.Power.modifier),
        Charisma: rollCharacteristic(rolls.Charisma.dice, rolls.Charisma.sides, rolls.Charisma.modifier),
    };

    return {
        species,
        characteristics,
        standardSkills: getStartingSkills(characteristics),
    };
}
