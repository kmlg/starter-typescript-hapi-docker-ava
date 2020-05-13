import Repository from '../common/base-repository';

export default class CrudResolver<T> {
    constructor(protected repository: Repository<T>) {}

    public async save(data: T): Promise<T> {
        return this.repository.save(data);
    }

    public async getOneById(id: string): Promise<T> {
        return this.repository.getById(id);
    }

    public async updateOneById(id: string, update: any): Promise<T> {
        return this.repository.updateById(id, update);
    }

    public async deleteOneById(id: string): Promise<any> {
        return this.repository.deleteById(id);
    }

    public async getAll(): Promise<readonly T[]> {
        return this.repository.getAll();
    }

    public async bulkUpdate(
        ids: readonly string[],
        field: string,
        value: string
    ): Promise<readonly T[]> {
        return Promise.all(
            ids.map(async id => this.updateOneById(id, { [field]: value }))
        );
    }

    public async bulkDelete(ids: readonly string[]): Promise<readonly T[]> {
        return Promise.all(ids.map(async id => this.deleteOneById(id)));
    }
}
