export default class Assets {
    constructor() {
        this.get = {};
        this.list = {};
        this.type = {};
    }
    async set(name, src) {
        if (this.get[name]) throw new Error ("Asset with name:" + name + " already exists.");
        const res = await fetch(src);
        if (!res.ok) throw new Error("Failed to fetch" + res.status);
        const blob = await res.blob();
        this.get[name] = URL.createObjectURL(blob);
        this.type[name] = res.type;
        this.list = this.get;
    }
}