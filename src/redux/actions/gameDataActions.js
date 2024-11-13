export const COMPUTER = "COMPUTER";
export const MULTIPLAYER = "MULTIPLAYER";

export const playComputer = (data) => {
    return {
        type: COMPUTER,
        payload: data
    }
}

export const playMultiplayer = (data) => {
    return {
        type: MULTIPLAYER,
        payload: data
    }
}
