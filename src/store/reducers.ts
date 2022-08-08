import { DECKOFCARDS } from './deck-of-cards';
import { addCardsBack, getCardsOffDeck, getHandScore, shuffleDeck } from './helpers';
import { HIT, Actions, GameState, Player, STICK, RESET, STOP } from './model';
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
        playerTotalScore: 0,
        isPlaying: false,
        stoppedPlaying: false,
        stickCalled: false,
    },
    {
        id: 'p2',
        name: 'Rick',
        playerHand: [],
        playerScore: 0,
        playerTotalScore: 0,
        isPlaying: false,
        stoppedPlaying: false,
        stickCalled: false,
    },
]

const initialGameState: GameState = {
        player: players,
        deck: initialDeck(),
    }

export const uiState: (gameState: GameState | undefined, action: Actions) => GameState = (
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
                    const currentHandScore = getHandScore(hand)
                    if (p.id === firstPlayer.id) {
                                const currentHandScore = getHandScore(hand)
                                return {
                                            ...p,
                                            isPlaying: true,
                                            stoppedPlaying: false,
                                            playerHand: hand,
                                            playerScore: currentHandScore,
                                            playerTotalScore: p.playerTotalScore + currentHandScore,
                                            stickCalled: false
                                        }
                            }
                            return {
                                ...p,
                                isPlaying: false,
                                stoppedPlaying: false,
                                playerHand: hand,
                                playerScore: currentHandScore,
                                playerTotalScore: p.playerTotalScore + currentHandScore,
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
                        if (p.id === action?.player[i].id && action.player[i].isPlaying) {
                            const currentHandScore = getHandScore(currentMove.hand)
                                return {
                                    ...p,
                                    playerHand: [...p.playerHand, currentMove.hand].flat(),
                                    playerScore: p.playerScore + currentHandScore,
                                    playerTotalScore: p.playerTotalScore + currentHandScore,
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
        case RESET:
            return initialGameState
        case STOP:
            return {
                ...gameState,
                player: [
                    ...gameState.player.map((p) => {
                        return {
                            ...p,
                            isPlaying: false,
                            stoppedPlaying: true,
                        }
                    })
                ],
            };
        default:
            return gameState;
    }
};
