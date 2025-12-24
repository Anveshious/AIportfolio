export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  // PUT YOUR NEW GEMINI KEY HERE (safe on server)
  const GEMINI_API_KEY = "AIzaSyAYp4sduKPj13WwcDzFCCmxtktwWEl-7kw";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: message }] }]
        })
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
}