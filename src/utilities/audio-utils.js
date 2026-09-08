export function playLocalSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}