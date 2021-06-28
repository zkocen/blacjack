import React from 'react';
import { GameState, Player, PlayingCard } from '../store/model';
import store from '../store/store';
import { connect } from 'react-redux';

function mapStateToProps(s: GameState) {
    return {
        player: s.player,
    };
}

function Interactions() {
    function startNewGame() {
        store.dispatch({ type: '[START]', player: s.player });
    }

    function hitMe() {
        store.dispatch({ type: '[HIT]', player: s.player });
    }

    function Stick(player: Player) {
        store.dispatch({
            type: '[STICK]', player: [{
                ...player, stickCalled: !player.stickCalled
            }]
        });
    }

    function whoWon(p: Player[]) {
        for (const currentPlayer of p) {
            if (currentPlayer.playerScore > 21) {
                return currentPlayer.name + ' lost :('
            }

            if (currentPlayer.playerScore === 21) {
                return currentPlayer.name + ' has BLACKJACK!!'
            }
        }

        if (p.filter(players => players.stickCalled).length === p.length) {
            const playerScoresArray = p.map(x => x.playerScore);
            const closestNumber = playerScoresArray.reduce(function (a, b) {
                return (Math.abs(b - 21) < Math.abs(a - 21) ? b : a);
            });

            const winners = p.map(x => {
                if (x['playerScore'] === closestNumber) {
                    return x;
                }
                return undefined;
            }).filter(y => y);


            if (winners.length === 1) {
                return winners[0]?.name + ' Wins!!';
            } else {
                return winners.map(w => {
                    return w?.name + ' DRAW!';
                })
            }
        }
        return '';
    }


    const s: GameState = store.getState();

    return (
        <div>
            <div className="hand">
                <div className="interactions">
                    <button onClick={startNewGame}>Start a new game</button>
                    <br />
                    {whoWon(s.player)}
                </div>
                {s.player.map((player: Player, i: number) => {
                    return (
                        <div className="player" key={i}>
                            <div className="results">
                                <span className={player.isPlaying ? "bold" : ""}>Player: {player.name} &nbsp;<br /> Score: {player.playerScore}</span>
                            </div>
                            {player.playerHand && player.playerHand.map((hand: PlayingCard, j: number) =>
                                <div key={j}>
                                    {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
                                    <img src={require('../assets/cards/' + hand.image + '.svg').default} key={hand.id} alt={hand.image} />
                                </div>
                            )}
                            <div className="player-interactions">
                                {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                                {whoWon(s.player) === '' && player.isPlaying && <button onClick={_ => Stick(player)}>Stick</button>}
                                {whoWon(s.player) === '' && player.isPlaying && <button onClick={hitMe}>Hit</button>}
                            </div>
                        </div>)
                })}
            </div>
        </div >
    )
}
export default connect(mapStateToProps)(Interactions);
