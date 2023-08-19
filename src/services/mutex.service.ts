export class Mutex {
    private locked: boolean = false;
    private waiting: any[] = [];

    public async lock() {
        const unlock = () => {
            this.locked = false;
            const next = this.waiting.shift();
            if (next) {
                next();
            }
        };
        if (this.locked) {
            await new Promise(resolve => this.waiting.push(resolve));
        }
        this.locked = true;
        return unlock;
    }
}