import {Movie} from '~/app/models/Movie';
import {HasId} from '~/app/models/HasId';
import {Observable} from 'rxjs';

export class Store<T extends HasId>  {
    public index: Set<number> = new Set<number>();
    public archive: Map<number, T> = new Map<number, T>();

    * [Symbol.iterator]() {
        return this.index.entries();
    }

    fromArray(arr: T[]): Store<T> {
        arr.map((m: T) => {
            this.put(m.id, m);
        });
        return this;
    }

    len(): number {
        return this.index.size;
    }

    has(key: number): boolean {
        return this.index.has(key);
    }

    put(key: number, val: T): Store<T> {
        console.log('Store put: ', key, val);
        this.archive[key] = val;
        this.index.add(key);
        return this;
    }

    get(key: number): T {
        if (this.has(key)) {
            return this.archive[key];
        }
        return null;
    }

    pop(key: number): T {
        let rval = null;
        if (this.has(key)) {
            rval = this.archive[key];
            this.index.delete(key);
            this.archive.delete(key);
        }
        return rval;
    }

    delete(key: number): boolean {
        return this.pop(key) !== null;
    }

    indexCopy() {
        return new Set<number>(this.index);
    }

    toList(): Array<T> {
        return Array.from(this.archive.values());
    }

}


