export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray))
    return hashBase64
}


export async function verifyPassword(
    storedHash: string,
    passwordAttempt: string
): Promise<boolean> {
    const encoder = new TextEncoder();
    const data = encoder.encode(passwordAttempt)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = btoa(String.fromCharCode.apply(null, hashArray))
    return storedHash === hash;
}