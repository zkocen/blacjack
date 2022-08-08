export type PlayingCard = {
    id: string;
    value: CardValues;
    suit: CardSuits;
    face: CardFaces;
    flip: boolean;
    image: string;
}

export type CardValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type CardSuits = 'club' | 'spade' | 'heart' | 'diamond';
export type CardFaces = 'ace' | 'jack' | 'queen' | 'king' | null;

export type GameState = {
    player: Player[];
    deck: PlayingCard[];
}

export type Player = {
    id: string;
    name: string;
    playerHand: PlayingCard[];
    playerScore: number;
    playerTotalScore: number;
    isPlaying: boolean;
    stoppedPlaying: boolean;
    stickCalled: boolean;
}

export const HIT =  '[HIT]';
export const STICK =  '[STICK]';
export const START = '[START]';
export const RESET = '[RESET]';
export const STOP = '[STOP]';

export type Actions = {
    type: typeof START | typeof HIT | typeof STICK | typeof RESET | typeof STOP;
    player: Player[];
}
