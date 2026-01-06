// This service simulates a secure backend for OTP handling.
// In a real app, this logic would live on the server.

const otpStore = new Map(); // email -> { hash, expiresAt, attempts, lastSentAt }
const userStore = new Map(); // email -> { role, isSubscriber, name, passwordHash }

// Mock existing user for testing "Welcome Back" flow
userStore.set('test@example.com', {
    role: 'free',
    isSubscriber: false,
    name: 'Test Entity',
    passwordHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' // 'password' hashed (sha-256)
});

// Simple string hash for demo purposes (in real app use bcrypt/argon2)
const hashOtp = async (otp) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(otp);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const mockAuthService = {
    async sendOtp(email) {
        // 1. Rate Limiting
        const record = otpStore.get(email);
        const now = Date.now();
        if (record && (now - record.lastSentAt < 60000)) {
            throw new Error('Please wait 1 minute before requesting another code.');
        }

        // 2. Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 3. Hash OTP
        const hash = await hashOtp(otp);

        // 4. Store (Expiry 10 mins)
        otpStore.set(email, {
            hash,
            expiresAt: now + 10 * 60 * 1000,
            attempts: 0,
            lastSentAt: now
        });

        // 5. "Send" Email
        if (import.meta.env.DEV) {
            // Development Mode: Log to Console
            console.group('%c [Mock Mail Service]', 'color: #10B981; font-weight: bold;');
            console.log(`To: ${email}`);
            console.log(`Subject: Your Sermnova Verification Code`);
            console.log(`Code: ${otp}`);
            console.groupEnd();
        } else {
            // Production Mode: Integrate Real Email Service (e.g. SendGrid, AWS SES)
            // For now, allow fallback for demo purposes or disable.
            console.warn('Production email service not implemented.');
        }

        return true;
    },

    async verifyOtp(email, code) {
        const record = otpStore.get(email);

        // 1. Check existence
        if (!record) {
            throw new Error('No verification pending. Please request a code.');
        }

        // 2. Check Expiry
        if (Date.now() > record.expiresAt) {
            otpStore.delete(email);
            throw new Error('Code expired. Please request a new one.');
        }

        // 3. Check Attempts
        if (record.attempts >= 5) {
            otpStore.delete(email);
            throw new Error('Too many failed attempts. Request a new code.');
        }

        // 4. Verify Hash
        const inputHash = await hashOtp(code);
        if (inputHash === record.hash) {
            // Success!
            otpStore.delete(email); // Prevent reuse

            // Get or Create User
            let user = userStore.get(email);
            if (!user) {
                user = { role: 'free', isSubscriber: false };
                userStore.set(email, user);
            }

            return { email, ...user };
        } else {
            // Increment attempts
            record.attempts++;
            otpStore.set(email, record);
            throw new Error('Invalid code. Please try again.');
        }
    },

    // Admin Helper
    setSubscriberStatus(email, isSubscriber) {
        const user = userStore.get(email) || { role: 'free' };
        userStore.set(email, { ...user, isSubscriber });
    },

    // --- New Password Auth Methods ---

    async checkUserExists(email) {
        return userStore.has(email);
    },

    async register(email, password, name) {
        if (userStore.has(email)) {
            throw new Error('User already exists.');
        }
        const passwordHash = await hashOtp(password); // Reusing hash function for simplicity
        userStore.set(email, {
            role: 'free',
            isSubscriber: false,
            name,
            passwordHash
        });
        return { email, name, role: 'free' };
    },

    async loginWithPassword(email, password) {
        const user = userStore.get(email);
        if (!user || !user.passwordHash) {
            throw new Error('Invalid credentials.');
        }
        const inputHash = await hashOtp(password);
        if (inputHash === user.passwordHash) {
            return { email, ...user };
        } else {
            throw new Error('Invalid credentials.');
        }
    }
};
