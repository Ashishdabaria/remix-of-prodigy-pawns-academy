export interface ParentSummary {
  childName: string;
  rankName: string;
  shardsCollected: number;
  weeklyQuestsCompleted: number;
  puzzlesSolved: number;
  minutesPracticed: number;
  braveHearts: number;
  curriculumDone: string[];
  curriculumInProgress: string[];
}

export const PARENT_VIEW: ParentSummary = {
  childName: "Avery",
  rankName: "Chess Detective",
  shardsCollected: 4,
  weeklyQuestsCompleted: 5,
  puzzlesSolved: 142,
  minutesPracticed: 168,
  braveHearts: 17,
  curriculumDone: [
    "Piece movement & captures",
    "Check, checkmate, stalemate",
    "Castling & promotion",
    "Center control & development",
    "Spotting checks, captures, threats",
  ],
  curriculumInProgress: [
    "Forks & pins",
    "Active rook endings",
    "Intro to Lucena & Philidor",
  ],
};
