import { IDefaultResponse } from './api.interfaces';

const fs = (window as any).require('fs');
const path = (window as any).require('path');

abstract class ApiServer {
    protected deleteFile(filename: string, path: string) : boolean {
        const fileToDelete = path + filename;
        if (!fs.existsSync(fileToDelete)) return true;

        fs.unlinkSync(fileToDelete);

        if (!fs.existsSync(fileToDelete)) return true;
        return false;
    }

    public readDirectory(dir: string) : any[] {
        return fs.readdirSync(dir, {withFileTypes: true})
                    .filter((file: any) => this.isJsonFile(file.name))
                    .map((file: any) => { return this.parseJsonFromFile(dir + file.name) });
    }

    public generateDefaultResponse(status: boolean, data: any = {}) : IDefaultResponse {
        return { status, data }
    }

    public isJsonFile(filename: string) : boolean {
        return path.extname(filename.toLowerCase()) === '.json';
    }

    public isFileById(id: string, filename: string) {
        console.log(id);
        console.log(filename);
        return path.basename(filename, '.json').toLowerCase() === id.toLowerCase();
    }

    public parseJsonFromFile(filepath: string) : any {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
}

export { ApiServer };