import { useState } from "react";

type Scores = {
    player1Score: number;
    player2Score: number;
    player3Score: number;
    player4Score: number;
};

export const ScoreTracker = () => {
    const [scoresList, setScoresList] = useState<Scores[]>([{ player1Score: 0, player2Score: 0, player3Score: 0, player4Score: 0 }]);

    return (
        <div className="flex flex-col gap-2">
            {scoresList.map((scores) => (
                <div className="flex flex-row gap-3">
                    {scores.player1Score}
                    {scores.player2Score}
                    {scores.player3Score}
                    {scores.player4Score}
                </div>
            ))}
        </div>
    );
};
