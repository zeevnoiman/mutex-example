import {beforeAll, describe, expect, test} from '@jest/globals'
import { DbService } from '../services/db.service';
import { ItemsService } from '../services/items.service';

describe('testind adding item with  race condition scenario', () => {
    const mongoUri = "mongodb://localhost:27017/Items";
    const db = new DbService(mongoUri);

    beforeAll(async () => {
        await db.connect();
    })

    test('should run test', async () => {
        const itemsService = new ItemsService(db);
        await itemsService.deleteAllItems();
        const description = "My Item";
        await itemsService.createItem(description);
        await Promise.all([
            itemsService.updateItem(description, {
                address: "added 1",
                city: "New York",
                state: "NY",
                zip: "30001"
            }),
            itemsService.updateItem(description, {
                address: "added 2",
                city: "New York",
                state: "NY",
                zip: "40001"
            })
        ])

       const updatedItem = await itemsService.getItem(description); 
        expect(updatedItem.sources.length).toBe(2);
    })
})