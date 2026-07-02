import type { StartingValue } from "./characterisic";

export const ethicalCodeNames = ["Lawful", "Ethically Neutral", "Chaotic"] as const;

export type EthicalCodeName = (typeof ethicalCodeNames)[number];

export function isEthicalCodeName(value: unknown): value is EthicalCodeName {
    return typeof value === 'string' && ethicalCodeNames.includes(value as EthicalCodeName);
}

export const lawfulDescriptions = [
    "Adherence to tradition", "Calculating", "Closed-Minded", "Hates Chaos", "Ethical", "Honest",
    "Honorable", "Judgmental", "Lack of adaptability", "No sense of humor", "Obedience to legitimate authority", 
    "Organized", "Predictable", "Reliable", "Trusting", "Trustworthy", "Well-mannered"] as const;

export type LawfulDescription = (typeof lawfulDescriptions)[number];

export const ethicallyNeutralDescriptions = [
    "Believes Law and Chaos are prejudices and dangerous extremes", "Cautious", "Conceited", 
    "Does not strongly feel one way or the other when it comes to Law and Chaos", "Flexible", 
    "Freedom of action", "Has no established Ethical Code", "Pragmatic", "Respectful of nature"] as const;

export type EthicallyNeutralDescription = (typeof ethicallyNeutralDescriptions)[number];

export const chaoticDescriptions = [
    "Bad mannered", "Bloodthirsty", "Curious", "Cynicism", "Dishonest", "Dishonorable", "Disorganized",
    "Disregard for legitimate authority", "Egoism", "Freedom", "Hates Law", "Irresponsible", "Lawless", 
    "Megalomaniac", "Prankster", "Quick to anger", "Rampageous", "Reckless", "Suspicious", "Uncontrolled", 
    "Untrustworthy", "Unpredictable", "Unreliable"] as const;

export type ChaoticDescription = (typeof chaoticDescriptions)[number];

export type EthicalCode = {
    readonly code: "Lawful";
    readonly description: LawfulDescription;
} | {
    readonly code: "Ethically Neutral";
    readonly description: EthicallyNeutralDescription;   
} | {
    readonly code: "Chaotic";
    readonly description: ChaoticDescription;
}

export const moralCodeNames = ["Good", "Morally Neutral", "Evil"] as const;

export type MoralCodeName = (typeof moralCodeNames)[number];

export function isMoralCodeName(value: unknown): value is MoralCodeName {
    return typeof value === 'string' && moralCodeNames.includes(value as MoralCodeName);
}

export const goodDescriptions = [
    "Admirable", "Altruistic", "Angelic", "Authoritative", "Charitable", "Compunctions against harming innocents", 
    "Decent", "Forgiving", "Friendly", "Hates Evil", "Helpful", "Kind", "Loves nature", "Merciful", "Optimistic", 
    "Positive", "Vegetarian"] as const;

export type GoodDescription = (typeof goodDescriptions)[number];

export const morallyNeutralDescriptions = [
    "Believes Good and Evil are prejudices and dangerous extremes", "Cautious", 
    "Does not strongly feel one way or the other when it comes to Good and Evil", "Flexible", "Freedom of Action", 
    "Lacks the commitment to make sacrifices to protect or help others", 
    "Committed to others by personal relationships, not a Moral Code", "Has no established Moral Code", 
    "Pragmatic", "Seldom seek out company"] as const;

export type MorallyNeutralDescription = (typeof morallyNeutralDescriptions)[number];

export const evilDescriptions = [
    "Abusive", "Cannibalistic", "Covetous", "Cruel", "Domineering", "Enjoys Harming Innocents", "Greedy", 
    "Hates Good", "Lustful", "Manipulative", "Merciless", "Prideful", "Sadistic", "Self-centered", "Selfish", 
    "Slaver", "Spiteful", "Vain", "Violent"] as const;

export type EvilDescription = (typeof evilDescriptions)[number];

export type MoralCode = {
    readonly code: "Good";
    readonly description: GoodDescription;
} | {
    readonly code: "Morally Neutral";
    readonly description: MorallyNeutralDescription;   
} | {
    readonly code: "Evil";
    readonly description: EvilDescription;
}

export const trueNeutralDescriptions = [
    "Ambivalent", "Cautious", "Committed to others by personal relationships", "Flexible", "Freedom of action", 
    "Open-minded", "Pragmatic", "Respectful of Nature", "Strives for balance"] as const;

export type TrueNeutralDescription = (typeof trueNeutralDescriptions)[number];

export type Alignment = EthicalCode | MoralCode | {
    readonly code: "True Neutral";
    readonly description: TrueNeutralDescription;
}

function isAlignment(value: unknown): value is Alignment {
    return typeof value === 'object' && value !== null && (
        isEthicalCodeName((value as Alignment).code) ||
        isMoralCodeName((value as Alignment).code) ||
        (value as Alignment).code === "True Neutral"
    );
}

export const passionTypes = ["Person", "Group", "Species", "Place", "Thing", "Concept"] as const;

export type PassionType = (typeof passionTypes)[number];

export type Passion = {
    readonly type: PassionType;
    readonly name: string;
    readonly object: string;
} | Alignment;

export type Passions = Readonly<{ readonly passion: Passion, readonly value: number }[]>;

export function getStartingValue(passion: Passion): StartingValue {
    
    if (isAlignment(passion)) {
        return { characteristic1: "Intelligence", characteristic2: "Power", bonus: 30 };
    }
    
    switch (passion.type) {
        case "Person":
            return { characteristic1: "Power", characteristic2: "Charisma" };
        case "Group":
            return { characteristic1: "Power", characteristic2: "Intelligence" };
        case "Species":
            return { characteristic1: "Power", characteristic2: "Power" };
        case "Place":
            return { characteristic1: "Power", characteristic2: "Intelligence" };
        case "Thing":
            return { characteristic1: "Power", characteristic2: "Power" };
        case "Concept": 
            return { characteristic1: "Power", characteristic2: "Charisma" };
    }
}