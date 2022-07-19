export interface IQuestion {
    id: string,
    text: string,
    type: TQuestionType,
    cratedAt?: string,
    updatedAt: string,
    answers: string[],
    answered: boolean | string[],
    answeredDate: string
}

export type TQuestionType = 'single_choice' | 'multiple_choice' | 'open';

export enum EQuestionTypes {
    single_choice = "Single Choice",
    multiple_choice = 'Multiple Choice',
    open = 'Open'
}