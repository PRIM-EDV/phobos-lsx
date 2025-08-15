export interface Track {
    play(wav: string): Promise<void>;
    pause(): Promise<void>;
    stop(): Promise<void>;
}