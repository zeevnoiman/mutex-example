import { DbService } from "./db.service";
import { Mutex } from "./mutex.service";

export class ItemsService {
    private mutex = new Mutex();
    public constructor(private db: DbService) {}

    public async createItem(description: string) {
        this.db.insertOne("items", { 
            description,
            sources: []
         });
    }

    public async getItem(description: string): Promise<any> {
        return this.db.findOne("items", { description });
    }

    public async updateItem(description: string, sourceToAdd) {
        const unlock = await this.mutex.lock();
        const item = await this.getItem(description);
        await delayAndAction(() => {
            console.log("I'm doing a lot of processing here...");
            item.sources.push(sourceToAdd);
            this.db.updateOne("items", { description }, { $set: { sources: item.sources } });
        }, 2000);
        unlock();
        return await this.getItem(description);
    }

    public async deleteAllItems() {
        return this.db.deleteMany("items", {});
    }
}

const delayAndAction = (callback, ms: number) => new Promise<void>(resolve => 
    setTimeout(() => {
        callback();
        resolve();
    }, ms)
);