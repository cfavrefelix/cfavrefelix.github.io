const asyncRequestAnimationFrame = () => new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
        resolve();
    })
});

export default asyncRequestAnimationFrame;