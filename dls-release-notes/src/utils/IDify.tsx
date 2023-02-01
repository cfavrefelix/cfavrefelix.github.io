function IDify(input: string): string {
    return input.replace(/\W/g, '_');
}

export default IDify;
