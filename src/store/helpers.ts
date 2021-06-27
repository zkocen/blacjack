import {  IPlayer, IPlayingCard } from './model';

export function addCardsBack(cards: IPlayingCard[], players: IPlayer[]): IPlayingCard[] {
    let deck = Object.values(cards);

    players.map(ph => {
        if (ph.playerHand.length > 0) {
            deck = [...deck, ...ph.playerHand]
            return deck;
        }
        return undefined;
    })

    return deck;
}

export function shuffleDeck(cards: IPlayingCard[]): IPlayingCard[] {
    const deck = Object.values(cards);
    let m = deck.length;
    let i: number;

    //Fisher–Yates shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    while (m) {
        i = Math.floor(Math.random() * m--);

        [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return deck;
}

export function getCardsOffDeck(
    cards: IPlayingCard[],
    numberOfCards: number
): {
    hand: IPlayingCard[];
    deck: IPlayingCard[];
} {
    let h: IPlayingCard[] = [];
    while (numberOfCards > 0) {
        h.push(cards.shift()!);
        numberOfCards--;
    }
    return { hand: h, deck: cards };
}

export function getHandScore(cards: IPlayingCard[]): number {
    return cards.reduce((x, y) => x + y.value, 0);
}
