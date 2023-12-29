import { useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { breakpoints } from '../../utils/breakpoints';

type Scores = {
    player1Score: number;
    player2Score: number;
    player3Score: number;
    player4Score: number;
};

type RemainingCards = {
    player1RemainingCards: number;
    player2RemainingCards: number;
    player3RemainingCards: number;
    player4RemainingCards: number;
};

type Players = {
    player1: string;
    player2: string;
    player3: string;
    player4: string;
};
const styles = stylex.create({
    root: {
        display: 'flex',
        flexDirection: {
            '@media (max-width: 768px)': 'column',
            '@media (min-width: 768px)': 'row',
        },
        gap: '5rem',
        justifyContent: {
            '@media (max-width: 768px)': 'flex-start',
            '@media (min-width: 768px)': 'center',
        },
        alignItems: {
            '@media (max-width: 768px)': 'center',
            '@media (min-width: 768px)': 'flex-start',
        },
        width: '100%',
    },
    mainSectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    mainSectionHeader: {
        textAlign: 'center',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    tableHeadCell: {
        fontSize: '1.5rem',
    },
    tableCell: {
        textAlign: 'center',
        width: '50px',
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    addRowContainer: {
        textAlign: 'center',
    },
    doubleTripleScoreContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '1rem',
    },
});

export const ScoreTracker = () => {
    const [startingDoublingScore, setStartingDoublingScore] = useState(8);
    const [startingTriplingScore, setStartingTriplingScore] = useState(13);
    const [players, setPlayers] = useState<Players>({
        player1: 'A',
        player2: 'B',
        player3: 'C',
        player4: 'D',
    });
    const [remainingCardsList, setRemainingCardsList] = useState<
        RemainingCards[]
    >([
        {
            player1RemainingCards: 0,
            player2RemainingCards: 0,
            player3RemainingCards: 0,
            player4RemainingCards: 0,
        },
    ]);

    const scoresList: Scores[] = [];
    remainingCardsList.forEach((remainingCards, index) => {
        scoresList.push({
            player1Score:
                index === 0
                    ? remainingCards.player1RemainingCards
                    : scoresList[index - 1].player1Score +
                      remainingCards.player1RemainingCards,
            player2Score:
                index === 0
                    ? remainingCards.player2RemainingCards
                    : scoresList[index - 1].player2Score +
                      remainingCards.player2RemainingCards,
            player3Score:
                index === 0
                    ? remainingCards.player3RemainingCards
                    : scoresList[index - 1].player3Score +
                      remainingCards.player3RemainingCards,
            player4Score:
                index === 0
                    ? remainingCards.player4RemainingCards
                    : scoresList[index - 1].player4Score +
                      remainingCards.player4RemainingCards,
        });
    });

    return (
        <div {...stylex.props(styles.root)}>
            <DoubleTripleScore
                startingDoublingScore={startingDoublingScore}
                setStartingDoublingScore={setStartingDoublingScore}
                startingTriplingScore={startingTriplingScore}
                setStartingTriplingScore={setStartingTriplingScore}
            />
            <ScoresTable
                players={players}
                setPlayers={setPlayers}
                scoresList={scoresList}
            />
            <RemainingCardsTable
                players={players}
                setPlayers={setPlayers}
                remainingCardsList={remainingCardsList}
                setRemainingCardsList={setRemainingCardsList}
            />
        </div>
    );
};

const DoubleTripleScore = ({
    startingDoublingScore,
    setStartingDoublingScore,
    startingTriplingScore,
    setStartingTriplingScore,
}: {
    startingDoublingScore: number;
    setStartingDoublingScore: React.Dispatch<React.SetStateAction<number>>;
    startingTriplingScore: number;
    setStartingTriplingScore: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <div {...stylex.props(styles.doubleTripleScoreContainer)}>
            <input
                value={startingDoublingScore}
                onChange={e => {
                    setStartingDoublingScore(prevStartingDoublingScore => {
                        if (isNaN(Number(e.target.value))) {
                            return 14;
                        } else if (Number(e.target.value) > 14) {
                            return 14;
                        } else if (
                            Number(e.target.value) === startingTriplingScore &&
                            Number(e.target.value) !== 14
                        ) {
                            setStartingTriplingScore(
                                Number(e.target.value) + 1,
                            );
                            return Number(e.target.value);
                        } else {
                            return Number(e.target.value);
                        }
                    });
                }}
            />
            <input
                value={startingTriplingScore}
                onChange={e => {
                    setStartingTriplingScore(prevStartingTriplingScore => {
                        if (isNaN(Number(e.target.value))) {
                            return 14;
                        } else if (Number(e.target.value) > 14) {
                            return 14;
                        } else if (
                            Number(e.target.value) === startingDoublingScore &&
                            Number(e.target.value) !== 14
                        ) {
                            setStartingDoublingScore(
                                Number(e.target.value) - 1,
                            );
                            return Number(e.target.value);
                        } else {
                            return Number(e.target.value);
                        }
                    });
                }}
            />
        </div>
    );
};

const ScoresTable = ({
    players,
    setPlayers,
    scoresList,
}: {
    players: Players;
    setPlayers: React.Dispatch<React.SetStateAction<Players>>;
    scoresList: Scores[];
}) => {
    return (
        <div {...stylex.props(styles.mainSectionContainer)}>
            <h1 {...stylex.props(styles.mainSectionHeader)}>Scores</h1>
            <table>
                <tr>
                    {Object.keys(players).map((player, index) => (
                        <th key={index}>
                            <input
                                {...stylex.props(
                                    styles.tableCell,
                                    styles.tableHeadCell,
                                )}
                                type="text"
                                value={players[player as keyof Players]}
                                onChange={e => {
                                    const newPlayers = { ...players };
                                    newPlayers[player as keyof Players] =
                                        e.target.value;
                                    setPlayers(newPlayers);
                                }}
                            />
                        </th>
                    ))}
                </tr>
                {scoresList.map((scores, index) => {
                    return (
                        <tr key={index}>
                            <td {...stylex.props(styles.tableCell)}>
                                {scores.player1Score}
                            </td>
                            <td {...stylex.props(styles.tableCell)}>
                                {scores.player2Score}
                            </td>
                            <td {...stylex.props(styles.tableCell)}>
                                {scores.player3Score}
                            </td>
                            <td {...stylex.props(styles.tableCell)}>
                                {scores.player4Score}
                            </td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};

const RemainingCardsTable = ({
    players,
    setPlayers,
    remainingCardsList,
    setRemainingCardsList,
}: {
    players: Players;
    setPlayers: React.Dispatch<React.SetStateAction<Players>>;
    remainingCardsList: RemainingCards[];
    setRemainingCardsList: React.Dispatch<
        React.SetStateAction<RemainingCards[]>
    >;
}) => {
    const handleRemainingCardsChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        player: number,
        currentRemainingCards: RemainingCards,
        index: number,
    ) => {
        const newRemainingCards: RemainingCards = {
            ...currentRemainingCards,
        };
        newRemainingCards[
            `player${player}RemainingCards` as keyof RemainingCards
        ] = isNaN(Number(event.target.value))
            ? 0
            : Number(event.target.value) > 13
              ? 13
              : Number(event.target.value);
        setRemainingCardsList(prevRemainingCardsList => {
            const newRemainingCardsList = [...prevRemainingCardsList];
            newRemainingCardsList[index] = newRemainingCards;
            return newRemainingCardsList;
        });
    };
    return (
        <div {...stylex.props(styles.mainSectionContainer)}>
            <h1 {...stylex.props(styles.mainSectionHeader)}>Remaining Cards</h1>
            <table>
                <tr {...stylex.props(styles.tableRow)}>
                    {Object.keys(players).map((player, index) => (
                        <th
                            key={index}
                            {...stylex.props(styles.inputContainer)}
                        >
                            <input
                                {...stylex.props(
                                    styles.tableCell,
                                    styles.tableHeadCell,
                                )}
                                type="text"
                                value={players[player as keyof Players]}
                                onChange={e => {
                                    const newPlayers = { ...players };
                                    newPlayers[player as keyof Players] =
                                        e.target.value;
                                    setPlayers(newPlayers);
                                }}
                            />
                        </th>
                    ))}
                </tr>
                {remainingCardsList.map((remainingCards, index) => {
                    return (
                        <tr key={index} {...stylex.props(styles.tableRow)}>
                            <td {...stylex.props(styles.inputContainer)}>
                                <input
                                    {...stylex.props(styles.tableCell)}
                                    value={remainingCards.player1RemainingCards}
                                    onChange={e => {
                                        handleRemainingCardsChange(
                                            e,
                                            1,
                                            remainingCards,
                                            index,
                                        );
                                    }}
                                />
                            </td>
                            <td {...stylex.props(styles.inputContainer)}>
                                <input
                                    {...stylex.props(styles.tableCell)}
                                    value={remainingCards.player2RemainingCards}
                                    onChange={e => {
                                        handleRemainingCardsChange(
                                            e,
                                            2,
                                            remainingCards,
                                            index,
                                        );
                                    }}
                                />
                            </td>
                            <td {...stylex.props(styles.inputContainer)}>
                                <input
                                    {...stylex.props(styles.tableCell)}
                                    value={remainingCards.player3RemainingCards}
                                    onChange={e => {
                                        handleRemainingCardsChange(
                                            e,
                                            3,
                                            remainingCards,
                                            index,
                                        );
                                    }}
                                />
                            </td>
                            <td {...stylex.props(styles.inputContainer)}>
                                <input
                                    {...stylex.props(styles.tableCell)}
                                    value={remainingCards.player4RemainingCards}
                                    onChange={e => {
                                        handleRemainingCardsChange(
                                            e,
                                            4,
                                            remainingCards,
                                            index,
                                        );
                                    }}
                                />
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td {...stylex.props(styles.addRowContainer)} colSpan={4}>
                        <button
                            onClick={() => {
                                setRemainingCardsList([
                                    ...remainingCardsList,
                                    {
                                        player1RemainingCards: 0,
                                        player2RemainingCards: 0,
                                        player3RemainingCards: 0,
                                        player4RemainingCards: 0,
                                    },
                                ]);
                            }}
                        >
                            <FaPlus />
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    );
};
