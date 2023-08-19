import { MongoClient } from "mongodb";

export class DbService {
    private mongoClient: MongoClient;

    public constructor(uri: string) {
        this.mongoClient = new MongoClient(uri)
    }

    public async connect() {
        await this.mongoClient.connect();
    }

    public async insertOne(collection: string, data: any) {
        await this.mongoClient.db().collection(collection).insertOne(data);
    }

    public async findOne(collection: string, query: any) {
        return await this.mongoClient.db().collection(collection).findOne(query);
    }

    public async updateOne(collection: string, query: any, data: any) {
        return await this.mongoClient.db().collection(collection).updateOne(query, data);
    }

    public async deleteMany(collection: string, query: any) {
        return await this.mongoClient.db().collection(collection).deleteMany(query);
    }

}