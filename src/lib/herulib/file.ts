const fs = (window as any).require('fs');
const path = (window as any).require('path');

/* FILES */
export function getFiles(dir: string): any[] {
    return fs.readdirSync(dir, {withFileTypes: true})
        .filter((file: any) => isJsonFile(file.name))
        .map((file: any) => { return getFileJson(dir + file.name) });
}

export function getFileJson(filepath: string): any {
    try {
        const res = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        return res;
    } catch {
        return false
    }
}

export function deleteFile(filepath: string): boolean {
    if (!fs.existsSync(filepath)) return true;
    fs.unlinkSync(filepath);
    if (!fs.existsSync(filepath)) return true;
    return false;
}

export function archiveFile(data: any, filename: string, path: string, push: boolean = false): boolean {
    const fileToArchive = path + filename + '.json';

    if (push) {
        if (fs.existsSync(fileToArchive)) {
            const currentData = JSON.parse(fs.readFileSync(fileToArchive, 'utf8'));
            if (!Array.isArray(currentData)) return false;
            data = [...data, ...currentData];
        } else {
            data = [data];
        }
    }

    try {
        fs.writeFileSync(fileToArchive, JSON.stringify(data));
        return true;
    } catch {
        return false;
    }
}

export function saveFile(data: any, filepath: string): boolean {
    try {
        fs.writeFileSync(filepath, JSON.stringify(data));
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}

export function uploadImages(images: string[], filepath: string): string[] | false {
    let filenames: string[] = [];
    images.forEach(image => {
        const base = path.basename(image);
        const ext = path.extname(base);
        const filename = base + '-' + Date.now() + ext;
        filenames.push(filename);
        fs.copyFileSync(image, filepath + filename);
    });

    if (filenames.length > 0) return filenames;
    return false;
}

/* JSON */
export function isJsonFile(filename: string) : boolean {
    return path.extname(filename.toLowerCase()) === '.json';
}