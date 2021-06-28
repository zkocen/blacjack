import { DECKOFCARDS } from './deck-of-cards';
import { addCardsBack, getCardsOffDeck, getHandScore, shuffleDeck } from './helpers';
import { HIT, Actions, GameState, Player, STICK } from './model';
import { START } from './model';

const initialDeck = () => {
    const deck = DECKOFCARDS;
    return deck;
};

const players: Player[] = [
    {
        id: 'p1',
        name: 'Zan',
        playerHand: [],
        playerScore: 0,
        isPlaying: false,
        stickCalled: false,
    },
    {
        id: 'p2',
        name: 'Rick',
        playerHand: [],
        playerScore: 0,
        isPlaying: false,
        stickCalled: false,
    },
]

const initialGameState: GameState = {
        player: players,
        deck: initialDeck(),
    }

export const uiState: any = (
    gameState: GameState = initialGameState,
    action: Actions
) => {
    switch (action.type) {
        case START:

            const fullDeck = addCardsBack(gameState.deck, gameState.player)
            const deck = shuffleDeck(fullDeck);
            const firstPlayer = gameState.player[0];

            return {
                ...gameState,
                player: [...gameState.player.map(p => {
                    const hand = getCardsOffDeck(deck, 2).hand;
                            if (p.id === firstPlayer.id) {
                                return {
                                            ...p,
                                            isPlaying: true,
                                            playerHand: hand,
                                            playerScore: getHandScore(hand),
                                            stickCalled: false
                                        }
                            }
                            return {
                                ...p,
                                isPlaying: false,
                                playerHand: hand,
                                playerScore: getHandScore(hand),
                                stickCalled: false
                            }
                        }),
                ],
                deck: deck,
            };
        case HIT:
            const currentMove = getCardsOffDeck(gameState.deck, 1);
            return {
                ...gameState,
                deck: currentMove.deck,
                player: [
                    ...gameState.player.map((p, i) => {
                        if (p.id === action.player[i].id && action.player[i].isPlaying) {
                                return {
                                    ...p,
                                    playerHand: [...p.playerHand, currentMove.hand].flat(),
                                    playerScore: p.playerScore + getHandScore(currentMove.hand)
                                }
                            }
                            return { ...p }
                        }),
                ],
            };
        case STICK:
            let nextPlayer: Player;

            return {
                ...gameState,
                player: [
                    ...gameState.player.map((p, i) => {
                        if (p.id === action.player[0]?.id) {
                            nextPlayer = gameState.player[i + 1];
                            return {
                                ...p,
                                stickCalled: action.player[0].stickCalled,
                                isPlaying: false
                            }
                        }

                        if (nextPlayer && p.id === nextPlayer.id) {
                            return {
                                ...p,
                                isPlaying: true
                            }
                        }

                        return { ...p };
                    })
                ],
            };
        default:
            return gameState;
    }
};
