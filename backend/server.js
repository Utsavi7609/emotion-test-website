import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { supabase } from "./supabaseClient.js";

const app = express();
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "https://emotion-test-website.vercel.app", // ✅ only your deployed frontend
    methods: ["GET", "POST"],
  })
);

const emotions = ["Happy", "Sad", "Angry", "Fearful", "Calm", "Excited", "Neutral"];
const userProgress = {}; // Temporary memory-based tracker

// ✅ Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received signup:", { name, email });

    if (!name || !email || !password) {
      console.error("Missing fields");
      return res.status(400).json({ error: "All fields required" });
    }

    // Check last assigned emotion
    const { data: users } = await supabase
      .from("users")
      .select("assigned_emotion")
      .order("created_at", { ascending: false })
      .limit(1);

    let nextEmotion = "Happy";
    if (users && users.length > 0) {
      const lastEmotion = users[0].assigned_emotion;
      const lastIndex = emotions.indexOf(lastEmotion);
      nextEmotion = emotions[(lastIndex + 1) % emotions.length];
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password_hash: hashedPassword,
          assigned_emotion: nextEmotion,
        },
      ])
      .select();

    if (error) {
      console.error("Signup DB error:", error);
      return res.status(500).json({ error: "Database insert failed" });
    }

    console.log("Signup success:", data);
    res.json({ message: "Signup successful", user: data[0] });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Unexpected signup error" });
  }
});

// ✅ Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login:", email);

    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error || users.length === 0) {
      console.error("Login error: no such user");
      return res.status(400).json({ error: "User not found" });
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      console.error("Invalid password for:", email);
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log("Login success:", email);
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Unexpected login error" });
  }
});

// // 🟩 Save emotion response route (updated for NULL clip_title support)
// app.post("/save_emotion_response", async (req, res) => {
//   try {
//     const {
//       user_id,
//       clip_title,        // may be null for baseline
//       induced_emotion,
//       induced_valence,
//       induced_arousal,
//       is_baseline
//     } = req.body;

//     console.log("📩 Received emotion response:", req.body);

//     // Basic validation
//     if (!user_id || !induced_emotion) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // 🧠 If clip_title provided, validate that it exists in movie_clips
//     if (clip_title) {
//       const { data: clipCheck, error: clipError } = await supabase
//         .from("movie_clips")
//         .select("title")
//         .eq("title", clip_title)
//         .maybeSingle();

//       if (clipError) {
//         console.error("❌ Clip lookup error:", clipError.message);
//         return res.status(400).json({ error: "Invalid clip title" });
//       }

//       if (!clipCheck) {
//         console.warn(`⚠️ No movie clip found for title: ${clip_title}`);
//         return res.status(400).json({ error: "Clip title not found in database" });
//       }
//     }

//     // 🟢 Build insert payload
//     const insertPayload = {
//       user_id,
//       clip_title: clip_title || null, // ✅ allow NULL for baseline
//       induced_valence,
//       induced_arousal,
//       is_baseline: is_baseline || false,
//     };

//     console.log("🧠 Insert payload:", insertPayload);

//     // 🟢 Insert into DB
//     const { data, error } = await supabase
//       .from("clip_responses")
//       .insert([insertPayload])
//       .select();

//     if (error) {
//       console.error("❌ Supabase insert error:", error.message);
//       return res.status(500).json({ error: error.message });
//     }

//     console.log("✅ Emotion response saved:", data);
//     res.status(201).json({ message: "Emotion response saved successfully", data });
//   } catch (err) {
//     console.error("🔥 Server error:", err);
//     res.status(500).json({ error: "Unexpected server error" });
//   }
// });

app.post("/save_emotion_response", async (req, res) => {
  try {
    const { user_id, clip_title, induced_valence, induced_arousal, is_baseline } = req.body;

    console.log("📩 Received emotion response:", req.body);

    // if (!user_id || !clip_title) {
    //   return res.status(400).json({ error: "Missing required fields" });
    // }
    if (!user_id) {
  return res.status(400).json({ error: "Missing user_id" });
}

    const insertPayload = {
      user_id,
      clip_title: clip_title || null,
      induced_valence: parseInt(induced_valence, 10),
      induced_arousal: parseInt(induced_arousal, 10),
      is_baseline: is_baseline || false,
    };

    console.log("🧠 Insert payload:", insertPayload);

    const { data, error } = await supabase
      .from("clip_responses")
      .insert([insertPayload])
      .select();

    if (error) {
      console.error("❌ Supabase insert error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ Emotion response saved:", data);
    res.status(201).json({ message: "Emotion response saved successfully", data });
  } catch (err) {
    console.error("🔥 Server error:", err);
    res.status(500).json({ error: "Unexpected server error" });
  }
});


// app.post("/save_fatigue", async (req, res) => {
//   try {
//     const { user_id, fatigue1, fatigue2, fatigue3 } = req.body;

//     if (!user_id) return res.status(400).json({ error: "Missing user_id" });

//     const result = await pool.query(
//       `INSERT INTO fatigue_logs (user_id, fatigue1, fatigue2, fatigue3, timestamp)
//        VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
//       [user_id, fatigue1, fatigue2, fatigue3]
//     );

//     res.status(200).json({ message: "Fatigue data saved", data: result.rows[0] });
//   } catch (error) {
//     console.error("Error saving fatigue data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// ✅ Save fatigue data (using Supabase)
app.post("/save_fatigue", async (req, res) => {
  try {
    const { user_id, fatigue1, fatigue2, fatigue3 } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "Missing user_id" });
    }

    const { data, error } = await supabase
      .from("fatigue_logs")
      .insert([
        {
          user_id,
          fatigue1,
          fatigue2,
          fatigue3,
        },
      ])
      .select();

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ Fatigue data saved:", data);
    res.status(200).json({ message: "Fatigue data saved", data });
  } catch (error) {
    console.error("🔥 Error saving fatigue data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Fetch playlist for a user
app.get("/playlist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Get user's assigned emotion
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("assigned_emotion")
      .eq("id", userId)
      .single();

    if (userError || !userData) {
      console.error("❌ Error fetching user emotion:", userError?.message);
      return res.status(400).json({ error: "User not found" });
    }

    const assignedEmotion = userData.assigned_emotion;
    console.log(`🎬 Generating playlist for ${assignedEmotion}`);

    // 2️⃣ Get the playlist template for that emotion
    const { data: playlistData, error: playlistError } = await supabase
      .from("playlist_templates")
      .select("clip_order")
      .eq("assigned_emotion", assignedEmotion)
      .single();

    if (playlistError || !playlistData) {
      console.error("❌ Playlist fetch error:", playlistError?.message);
      return res.status(404).json({ error: "Playlist not found" });
    }

    // const clipOrder = JSON.parse(playlistData.clip_order);
    const clipOrder =
  typeof playlistData.clip_order === "string"
    ? JSON.parse(playlistData.clip_order)
    : playlistData.clip_order;


    // 3️⃣ Fetch clips using prev_id (not id)
    const { data: clipsData, error: clipsError } = await supabase
      .from("movie_clips")
      .select("*")
      .in("prev_id", clipOrder);

    if (clipsError) {
      console.error("❌ Error fetching clips:", clipsError.message);
      return res.status(500).json({ error: "Failed to fetch movie clips" });
    }

    // 4️⃣ Reorder clips based on clip_order sequence
    const orderedClips = clipOrder
      .map((pid) => clipsData.find((clip) => clip.prev_id === pid))
      .filter(Boolean);

    // console.log(`✅ Sending ${orderedClips.length} clips to user ${userId}`);

    // res.status(200).json({ clips: orderedClips });
    // 🟢 Add these lines:
const lastIndex = userProgress[userId] || 0;
const remainingClips = orderedClips.slice(lastIndex);
console.log(`✅ Sending ${remainingClips.length} clips to user ${userId}, starting from index ${lastIndex}`);

res.status(200).json({ clips: remainingClips });
  } catch (err) {
    console.error("🔥 Error fetching playlist:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/progress", (req, res) => {
  const { userId, currentIndex } = req.body;

  if (!userId || currentIndex === undefined) {
    return res.status(400).json({ error: "Missing userId or currentIndex" });
  }

  userProgress[userId] = currentIndex;
  console.log(`🧭 Updated progress: user ${userId} now at clip ${currentIndex}`);
  res.sendStatus(200);
});

// // 🧠 Drift calculation route
// app.get("/get_drift/:user_id", async (req, res) => {
//   const { user_id } = req.params;

//   try {
//     // Fetch all emotion responses for the user
//     const result = await pool.query(
//       "SELECT induced_valence, induced_arousal FROM emotion_responses WHERE user_id = $1",
//       [user_id]
//     );

//     const responses = result.rows;

//     if (responses.length === 0) {
//       return res.status(404).json({ error: "No data found for this user" });
//     }

//     // Default baseline values (neutral mood)
//     const baselineValence = 5;
//     const baselineArousal = 5;

//     // Calculate Euclidean drift for each clip
//     const driftValues = responses.map((r) => {
//       const val = parseFloat(r.induced_valence);
//       const aro = parseFloat(r.induced_arousal);
//       const drift = Math.sqrt(
//         Math.pow(val - baselineValence, 2) + Math.pow(aro - baselineArousal, 2)
//       );
//       return drift;
//     });

//     // Compute average drift
//     const avgDrift =
//       driftValues.reduce((sum, d) => sum + d, 0) / driftValues.length;

//     res.json({ average_drift: Number(avgDrift.toFixed(2)) });
//   } catch (err) {
//     console.error("❌ Error computing drift:", err);
//     res.status(500).json({ error: "Failed to compute drift" });
//   }
// });


// 🧠 Drift calculation route (using Supabase)
app.get("/get_drift/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    // 1️⃣ Fetch all emotion responses for the user
    const { data: responses, error } = await supabase
      .from("clip_responses")
      .select("induced_valence, induced_arousal")
      .eq("user_id", user_id);

    if (error) throw error;

    if (!responses || responses.length === 0) {
      return res.status(404).json({ error: "No data found for this user" });
    }

    // 2️⃣ Filter out null entries (baseline clips etc.)
    const validResponses = responses.filter(
      (r) => r.induced_valence !== null && r.induced_arousal !== null
    );

    if (validResponses.length === 0) {
      return res.status(404).json({ error: "No valid responses for this user" });
    }

    // 3️⃣ Calculate drift values
    const baselineValence = 5;
    const baselineArousal = 5;

    const driftValues = validResponses.map((r) => {
      const val = parseFloat(r.induced_valence);
      const aro = parseFloat(r.induced_arousal);
      return Math.sqrt(
        Math.pow(val - baselineValence, 2) + Math.pow(aro - baselineArousal, 2)
      );
    });

    const avgDrift =
      driftValues.reduce((sum, d) => sum + d, 0) / driftValues.length;

    console.log(`✅ Drift for user ${user_id}: ${avgDrift.toFixed(2)}`);

    // 4️⃣ Return JSON result
    res.json({ average_drift: Number(avgDrift.toFixed(2)) });
  } catch (err) {
    console.error("❌ Error computing drift:", err);
    res.status(500).json({ error: "Failed to compute drift" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});
