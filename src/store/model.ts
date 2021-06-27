export interface IPlayingCard {
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

export interface IGameState {
    player: IPlayer[];
    deck: IPlayingCard[];
}

export interface IPlayer {
    id: string;
    name: string;
    playerHand: IPlayingCard[];
    playerScore: number;
    isPlaying: boolean;
    stickCalled: boolean;
}

export const HIT =  '[HIT]';
export const STICK =  '[STICK]';
export const START = '[START]';

export interface IActions {
    type: typeof START | typeof HIT | typeof STICK;
    player: IPlayer[];
}
