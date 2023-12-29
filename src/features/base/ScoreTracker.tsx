import { createContext, useContext, useState, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { FaPlus, FaTrophy } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import { useLanguageStore } from '../../App';
import { translations } from '../../utils/translations';


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
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1920px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: {
            '@media (max-width: 768px)': '0rem',
            '@media (min-width: 768px)': '5rem',
        },

    },
    printButton: {
        border: 'none',
        backgroundColor: 'green',
        cursor: 'pointer',
        padding: '1rem',
        width: '100%',
        borderRadius: '5px',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1rem',
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    printWrapper: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
    },
    tablesContainer: {
        display: 'flex',
        flexDirection: {
            '@media (max-width: 768px)': 'column',
            '@media (min-width: 768px)': 'row',
        },
        justifyContent: {
            '@media (max-width: 768px)': 'flex-start',
            '@media (min-width: 768px)': 'center',
        },
        alignItems: {
            '@media (max-width: 768px)': 'center',
            '@media (min-width: 768px)': 'flex-start',
        },
        width: '100%',
        gap: '3rem',
    },
    mainSectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxShadow: {
            default: '0px 0px 10px 0px rgba(0,0,0,0.75)',
            '@media print': 'none',
        },
        borderRadius: '9px',
    },
    mainSectionHeader: {
        textAlign: 'center',
        gridColumn: '2 / 3',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    table: {
        width: '100%',
        border: 'none',
        textAlign: 'center',
        maxWidth: '800px',
        padding: '1rem',
        display: 'flex',
        gap: '0.5rem',
        flexDirection: 'column',
    },
    tableHead: {
        width: '100%',
        borderBottom: '1px solid black',
        paddingBottom: '0.5rem',
        marginBottom: '1rem',
    },
    tableHeadCell: {
        fontSize: {
            '@media (max-width: 768px)': '0.8rem',
            '@media (min-width: 768px)': '1rem',
        },
        width: '100%',
    },
    tableCell: {
        textAlign: 'center',
        width: '100%',
        fontSize: {
            '@media (max-width: 768px)': '1rem',
            '@media (min-width: 768px)': '1.5rem',
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
    },
    addRowContainer: {
        width: '100%',
        textAlign: 'center',
    },
    doubleTripleScoreContainer: {
        display: 'flex',
        flexDirection: {
            '@media (max-width: 768px)': 'column',
            '@media (min-width: 768px)': 'row',
        },
        gap: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '1rem',
    },
    labelInputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        textAlign: 'center',
    },
    input: {
        fontSize: {
            '@media (max-width: 768px)': '1rem',
            '@media (min-width: 768px)': '1.5rem',
        },
        outline: 'none',
        padding: '0.5rem',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.20)',
        borderRadius: '9px',
    },
    addRowButton: {
        border: 'none',
        backgroundColor: 'green',
        cursor: 'pointer',
        padding: '1rem',
        width: '100%',
        borderRadius: '5px',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1rem',
    },
    mainSectionHeaderContainer: {
        display: {
            '@media (max-width: 1000px)': 'flex',
            '@media (min-width: 1000px)': 'grid',
            '@media print': 'grid',
        },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr 1fr',
        width: '100%',
    },
    datePickerGroupContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        textAlign: 'center',
    },
});

type ScoreTrackerContextType = {
    players: Players;
    setPlayers: React.Dispatch<React.SetStateAction<Players>>;
    remainingCardsList: RemainingCards[];
    setRemainingCardsList: React.Dispatch<
        React.SetStateAction<RemainingCards[]>
    >;
    startingDoublingScore: number;
    setStartingDoublingScore: React.Dispatch<React.SetStateAction<number>>;
    startingTriplingScore: number;
    setStartingTriplingScore: React.Dispatch<React.SetStateAction<number>>;
    scoresList: Scores[];
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const ScoreTrackerContext = createContext<ScoreTrackerContextType>({
    players: {
        player1: 'A',
        player2: 'B',
        player3: 'C',
        player4: 'D',
    },
    setPlayers: () => { },
    remainingCardsList: [
        {
            player1RemainingCards: 0,
            player2RemainingCards: 0,
            player3RemainingCards: 0,
            player4RemainingCards: 0,
        },
    ],
    setRemainingCardsList: () => { },
    startingDoublingScore: 8,
    setStartingDoublingScore: () => { },
    startingTriplingScore: 13,
    setStartingTriplingScore: () => { },
    scoresList: [],
    date: new Date(),
    setDate: () => { },
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
    const [date, setDate] = useState(new Date());
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
        const player1Adjustments = {
            double: false,
            triple: false,
        };
        const player2Adjustments = {
            double: false,
            triple: false,
        };
        const player3Adjustments = {
            double: false,
            triple: false,
        };
        const player4Adjustments = {
            double: false,
            triple: false,
        };
        if (remainingCards.player1RemainingCards >= startingTriplingScore) {
            player1Adjustments.triple = true;
        } else if (
            remainingCards.player1RemainingCards >= startingDoublingScore
        ) {
            player1Adjustments.double = true;
        }
        if (remainingCards.player2RemainingCards >= startingTriplingScore) {
            player2Adjustments.triple = true;
        } else if (
            remainingCards.player2RemainingCards >= startingDoublingScore
        ) {
            player2Adjustments.double = true;
        }
        if (remainingCards.player3RemainingCards >= startingTriplingScore) {
            player3Adjustments.triple = true;
        } else if (
            remainingCards.player3RemainingCards >= startingDoublingScore
        ) {
            player3Adjustments.double = true;
        }
        if (remainingCards.player4RemainingCards >= startingTriplingScore) {
            player4Adjustments.triple = true;
        } else if (
            remainingCards.player4RemainingCards >= startingDoublingScore
        ) {
            player4Adjustments.double = true;
        }

        const player1RemainingCardsAfterAdjustment = player1Adjustments.triple
            ? remainingCards.player1RemainingCards * 3
            : player1Adjustments.double
                ? remainingCards.player1RemainingCards * 2
                : remainingCards.player1RemainingCards;
        const player2RemainingCardsAfterAdjustment = player2Adjustments.triple
            ? remainingCards.player2RemainingCards * 3
            : player2Adjustments.double
                ? remainingCards.player2RemainingCards * 2
                : remainingCards.player2RemainingCards;
        const player3RemainingCardsAfterAdjustment = player3Adjustments.triple
            ? remainingCards.player3RemainingCards * 3
            : player3Adjustments.double
                ? remainingCards.player3RemainingCards * 2
                : remainingCards.player3RemainingCards;
        const player4RemainingCardsAfterAdjustment = player4Adjustments.triple
            ? remainingCards.player4RemainingCards * 3
            : player4Adjustments.double
                ? remainingCards.player4RemainingCards * 2
                : remainingCards.player4RemainingCards;

        scoresList.push({
            player1Score:
                index === 0
                    ? player1RemainingCardsAfterAdjustment
                    : scoresList[index - 1].player1Score +
                    player1RemainingCardsAfterAdjustment,
            player2Score:
                index === 0
                    ? player2RemainingCardsAfterAdjustment
                    : scoresList[index - 1].player2Score +
                    player2RemainingCardsAfterAdjustment,
            player3Score:
                index === 0
                    ? player3RemainingCardsAfterAdjustment
                    : scoresList[index - 1].player3Score +
                    player3RemainingCardsAfterAdjustment,
            player4Score:
                index === 0
                    ? player4RemainingCardsAfterAdjustment
                    : scoresList[index - 1].player4Score +
                    player4RemainingCardsAfterAdjustment,
        });
    });

    return (
        <ScoreTrackerContext.Provider
            value={{
                players,
                setPlayers,
                remainingCardsList,
                setRemainingCardsList,
                startingDoublingScore,
                setStartingDoublingScore,
                startingTriplingScore,
                setStartingTriplingScore,
                scoresList,
                date,
                setDate,
            }}
        >
            <div {...stylex.props(styles.root)}>
                <DoubleTripleScore
                    startingDoublingScore={startingDoublingScore}
                    setStartingDoublingScore={setStartingDoublingScore}
                    startingTriplingScore={startingTriplingScore}
                    setStartingTriplingScore={setStartingTriplingScore}
                />
                <div {...stylex.props(styles.tablesContainer)}>
                    <ScoresTable />
                    <RemainingCardsTable />
                </div>
            </div>
        </ScoreTrackerContext.Provider>
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
            <div {...stylex.props(styles.labelInputGroup)}>
                <label>{translations[useLanguageStore().language].remainingDouble}</label>
                <input
                    {...stylex.props(styles.input)}
                    value={startingDoublingScore}
                    onChange={e => {
                        setStartingDoublingScore(() => {
                            if (
                                isNaN(Number(e.target.value)) ||
                                Number(e.target.value) > 14
                            ) {
                                return 14;
                            } else if (
                                Number(e.target.value) >=
                                startingTriplingScore &&
                                Number(e.target.value) !== 14 &&
                                Number(e.target.value) !== 0
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
            </div>
            <div {...stylex.props(styles.labelInputGroup)}>
                <label>{translations[useLanguageStore().language].remainingTriple}</label>
                <input
                    {...stylex.props(styles.input)}
                    value={startingTriplingScore}
                    onChange={e => {
                        setStartingTriplingScore(() => {
                            if (
                                isNaN(Number(e.target.value)) ||
                                Number(e.target.value) > 14
                            ) {
                                return 14;
                            } else if (
                                Number(e.target.value) <=
                                startingDoublingScore &&
                                Number(e.target.value) !== 14 &&
                                Number(e.target.value) !== 0
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
        </div>
    );
};

const ScoresTable = () => {
    const componentRef = useRef(null);
    const { language, setLanguage } = useLanguageStore();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const { players, scoresList, date } = useContext(ScoreTrackerContext);
    return (
        <div {...stylex.props(styles.printWrapper)}>
            <button onClick={handlePrint} {...stylex.props(styles.printButton)}>
                <FiPrinter /> {translations[language].print}
            </button>
            <div
                {...stylex.props(styles.mainSectionContainer)}
                ref={componentRef}
            >
                <div {...stylex.props(styles.mainSectionHeaderContainer)}>
                    <h1 {...stylex.props(styles.mainSectionHeader)}>{translations[language].score}</h1>
                    <div {...stylex.props(styles.dateContainer)}>
                        {date.toISOString().split('T')[0]}
                    </div>
                </div>

                <table {...stylex.props(styles.table)}>
                    <tr {...stylex.props(styles.tableRow, styles.tableHead)}>
                        {Object.keys(players).map((player, index) => (
                            <th
                                key={index}
                                {...stylex.props(
                                    styles.inputContainer,
                                    styles.tableCell,
                                    styles.tableHeadCell,
                                )}
                            >
                                {players[player as keyof Players]}
                            </th>
                        ))}
                    </tr>
                    {scoresList.map((scores, index) => {
                        let won = 0;
                        if (index === 0) {
                            if (scores.player1Score === 0) won = 1;
                            else if (scores.player2Score === 0) won = 2;
                            else if (scores.player3Score === 0) won = 3;
                            else if (scores.player4Score === 0) won = 4;
                        } else {
                            if (
                                scores.player1Score ===
                                scoresList[index - 1].player1Score
                            )
                                won = 1;
                            else if (
                                scores.player2Score ===
                                scoresList[index - 1].player2Score
                            )
                                won = 2;
                            else if (
                                scores.player3Score ===
                                scoresList[index - 1].player3Score
                            )
                                won = 3;
                            else if (
                                scores.player4Score ===
                                scoresList[index - 1].player4Score
                            )
                                won = 4;
                        }
                        return (
                            <tr key={index} {...stylex.props(styles.tableRow)}>
                                <td {...stylex.props(styles.tableCell)}>
                                    {won === 1 && (
                                        <FaTrophy style={{ color: 'gold' }} />
                                    )}
                                    {scores.player1Score}
                                </td>
                                <td {...stylex.props(styles.tableCell)}>
                                    {won === 2 && (
                                        <FaTrophy style={{ color: 'gold' }} />
                                    )}
                                    {scores.player2Score}
                                </td>
                                <td {...stylex.props(styles.tableCell)}>
                                    {won === 3 && (
                                        <FaTrophy style={{ color: 'gold' }} />
                                    )}
                                    {scores.player3Score}
                                </td>
                                <td {...stylex.props(styles.tableCell)}>
                                    {won === 4 && (
                                        <FaTrophy style={{ color: 'gold' }} />
                                    )}
                                    {scores.player4Score}
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};

const RemainingCardsTable = () => {
    const {
        players,
        setPlayers,
        remainingCardsList,
        setRemainingCardsList,
        date,
        setDate,
    } = useContext(ScoreTrackerContext);
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
            <div {...stylex.props(styles.mainSectionHeaderContainer)}>
                <h1 {...stylex.props(styles.mainSectionHeader)}>
                    {translations[useLanguageStore().language].remainingCards}
                </h1>
                <div {...stylex.props(styles.datePickerGroupContainer)}>
                    <label>{translations[useLanguageStore().language].date}</label>
                    <input
                        type="date"
                        value={date.toISOString().split('T')[0]}
                        onChange={e => {
                            setDate(new Date(e.target.value));
                        }}
                    />
                </div>
            </div>

            <table {...stylex.props(styles.table)}>
                <tr {...stylex.props(styles.tableRow, styles.tableHead)}>
                    {Object.keys(players).map((player, index) => (
                        <th
                            key={index}
                            {...stylex.props(
                                styles.inputContainer,
                                styles.tableHeadCell,
                            )}
                        >
                            <input
                                {...stylex.props(
                                    styles.tableCell,
                                    styles.tableHeadCell,
                                    styles.input,
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
                                    {...stylex.props(
                                        styles.tableCell,
                                        styles.input,
                                    )}
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
                                    {...stylex.props(
                                        styles.tableCell,
                                        styles.input,
                                    )}
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
                                    {...stylex.props(
                                        styles.tableCell,
                                        styles.input,
                                    )}
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
                                    {...stylex.props(
                                        styles.tableCell,
                                        styles.input,
                                    )}
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
                <tr {...stylex.props(styles.tableRow)}>
                    <td colSpan={5} {...stylex.props(styles.addRowContainer)}>
                        <button
                            {...stylex.props(styles.addRowButton)}
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
                            <FaPlus /> <strong>{translations[useLanguageStore().language].addRound}</strong>
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    );
};
