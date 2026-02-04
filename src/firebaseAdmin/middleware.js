import admin from "@/firebaseAdmin/adminacc";

export async function verifyFirebaseToken(req) {
  try {
    // 1. Read Authorization header
    const token = req.headers.get("authorization");

    if (!token) {
      throw new Error("Authorization header missing");
    }

    // 2. Verify token
    const decoded = await admin.auth().verifyIdToken(token);

    // 3. Return decoded user
    return decoded;
  } catch (error) {
    console.error("TOKEN VERIFY ERROR:", error.message);
    return null;
  }
}
