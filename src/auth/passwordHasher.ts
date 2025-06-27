import crypto from "crypto";

export async function passwordHasher(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (err, derivedKey) => {
        if (err) {
            reject(err);
        } else {
            resolve(derivedKey.toString('hex').normalize());
        }   
    })
});
}


export function createSalt(): string {
    return crypto.randomBytes(512).toString('hex').normalize();
}