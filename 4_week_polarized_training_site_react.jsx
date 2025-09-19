import React, { useState, useEffect } from "react";

// Single-file React app (Tailwind CSS assumed) that renders 4 weeks -> daily pages
// Default export component for easy preview. Drop into a React/Tailwind project or use CodeSandbox.

const DATA = [
  {
    week: 1,
    days: [
      {
        id: "w1d1",
        title: "Week 1 · Day 1 — Strength A",
        type: "Strength",
        exercises: [
          { name: "Warmup (8-10 min)", what: "3 min easy jog or jumping jacks + dynamic leg swings, world's greatest stretch, 2x30s glute bridges.", muscles: ["Full body"], category: "Warmup" },
          { name: "Bodyweight Squats", what: "3 sets x 10 reps. Stand shoulder-width, descend controlled, drive through heels.", muscles: ["Quads","Glutes"], category: "Strength" },
          { name: "Push-ups (knees or standard)", what: "3 x 8. Keep plank bodyline, lower chest to ~fist distance.", muscles: ["Chest","Triceps","Shoulders"], category: "Strength" },
          { name: "Forward Lunges", what: "3 x 8 each leg. Step forward, knee over ankle, push back to start.", muscles: ["Quads","Glutes","Hamstrings"], category: "Strength" },
          { name: "Glute Bridges", what: "3 x 12. Squeeze glutes at top, hold 1s.", muscles: ["Glutes","Hamstrings"], category: "Strength" },
          { name: "Plank", what: "3 x 30s. Tight core, neutral spine.", muscles: ["Core"], category: "Core" },
          { name: "Suitcase Walk (water bottle)", what: "2 x 40s. Carry weight in one hand, walk steady to load core.", muscles: ["Core","Grip"], category: "Accessory" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 sets x 10 reps (3s hold). Tighten pelvic floor, relax fully between reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Rest 60–90s between sets. Focus on clean form. Finish with cooldown stretches 5–8 min."
      },
      {
        id: "w1d2",
        title: "Week 1 · Day 2 — Zone-2 Cardio",
        type: "Endurance",
        exercises: [
          { name: "Warmup (8-10 min)", what: "Easy mobility + 3 min gentle jog or brisk walk.", muscles: ["Cardio system","Legs"], category: "Warmup" },
          { name: "Zone-2 Steady Aerobic", what: "35 min brisk walk or easy jog. Keep conversation possible (RPE 4–6/10).", muscles: ["Cardiovascular","Legs"], category: "Endurance", sexual: true, sexualNotes: "Improves circulation which supports sexual health." },
          { name: "Core Finish — Plank", what: "3 x 30s. Controlled breathing.", muscles: ["Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 10 (3s hold).", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Keep pace steady. Hydrate during session if hot. Cooldown with walking & stretching."
      },
      {
        id: "w1d3",
        title: "Week 1 · Day 3 — REST & Active Recovery",
        type: "Recovery",
        exercises: [
          { name: "Light walking or mobility", what: "20–30 min easy walk; mobility flow or light yoga.", muscles: ["Full body"], category: "Active Recovery", sexual: true, sexualNotes: "Low-intensity activity supports blood flow and recovery." },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 10 reps (3s hold).", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Focus on sleep and nutrition today."
      },
      {
        id: "w1d4",
        title: "Week 1 · Day 4 — VO₂ Intervals",
        type: "Intervals",
        exercises: [
          { name: "Warmup (10 min)", what: "Easy jog, dynamic leg swings, hip openers.", muscles: ["Full body"], category: "Warmup" },
          { name: "VO₂ Intervals — 8×30s", what: "8 rounds of 30s all-out (sprints on spot or burpees) with 60s easy walk rest.", muscles: ["Cardio","Legs","Full body"], category: "Intervals" },
          { name: "Cooldown 6–8 min", what: "Walk and stretch.", muscles: ["Full body"], category: "Cooldown" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 10 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Make intervals near-maximal. Rest fully between repeats to keep quality." 
      },
      {
        id: "w1d5",
        title: "Week 1 · Day 5 — REST",
        type: "Recovery",
        exercises: [
          { name: "Mobility & Stretching", what: "20 min foam roll or stretching session. Light walking.", muscles: ["Full body"], category: "Recovery" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 10 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Hydrate, sleep, protein."
      },
      {
        id: "w1d6",
        title: "Week 1 · Day 6 — Strength B",
        type: "Strength",
        exercises: [
          { name: "Warmup (8 min)", what: "Light jog + shoulder mobility.", muscles: ["Full body"], category: "Warmup" },
          { name: "Incline/Elevated Push-ups", what: "3 x 10. Hands on elevated surface to target upper chest and shoulders.", muscles: ["Chest","Shoulders","Triceps"], category: "Strength" },
          { name: "Bulgarian Split Squats (chair)", what: "3 x 8 each leg. Rear foot on chair, deep control.", muscles: ["Quads","Glutes"], category: "Strength" },
          { name: "Inverted Rows (table) or Prone Y-T-W", what: "3 x 8. Pull shoulder blades down and together.", muscles: ["Back","Biceps"], category: "Strength" },
          { name: "Calf Raises", what: "3 x 20. Slow eccentric, squeeze top.", muscles: ["Calves"], category: "Accessory" },
          { name: "Side Plank", what: "3 x 25s each side.", muscles: ["Obliques","Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 10 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Control tempo, keep rest 60–90s. Finish with short mobility." 
      },
      {
        id: "w1d7",
        title: "Week 1 · Day 7 — REST",
        type: "Recovery",
        exercises: [
          { name: "Easy walk or rest", what: "Optional 20–30 min walk, focus on sleep and nutrition.", muscles: ["Full body"], category: "Recovery" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 10 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Get quality sleep tonight."
      }
    ]
  },
  // Week 2
  {
    week: 2,
    days: [
      {
        id: "w2d1",
        title: "Week 2 · Day 1 — Strength A (progression)",
        type: "Strength",
        exercises: [
          { name: "Warmup (8-10 min)", what: "Same warmup but add an extra minute of light jogging.", muscles: ["Full body"], category: "Warmup" },
          { name: "Bodyweight Squats", what: "3 x 12. Add a 3s eccentric on last set.", muscles: ["Quads","Glutes"], category: "Strength" },
          { name: "Push-ups (standard)", what: "3 x 10. If standard is easy, try decline push-ups (feet elevated).", muscles: ["Chest","Triceps"], category: "Strength" },
          { name: "Lateral Lunges", what: "3 x 8 each side. Open hips and load glutes.", muscles: ["Adductors","Glutes","Quads"], category: "Strength" },
          { name: "Glute Bridges", what: "3 x 12. Add 1s hold at top.", muscles: ["Glutes"], category: "Strength" },
          { name: "Plank", what: "3 x 45s.", muscles: ["Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 10–12 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Increase intensity moderately. Focus on tempo for hypertrophy." 
      },
      {
        id: "w2d2",
        title: "Week 2 · Day 2 — Zone-2 (40 min)",
        type: "Endurance",
        exercises: [
          { name: "Warmup (8 min)", what: "Mobility + easy jog.", muscles: ["Full body"], category: "Warmup" },
          { name: "Zone-2 Steady Aerobic", what: "40 min brisk walk or easy jog. Maintain conversational pace.", muscles: ["Cardio","Legs"], category: "Endurance", sexual: true, sexualNotes: "Improves circulation and stamina." },
          { name: "Core — Plank", what: "3 x 45s.", muscles: ["Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 12 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Add full-body stretch after session." 
      },
      {
        id: "w2d3",
        title: "Week 2 · Day 3 — REST",
        type: "Recovery",
        exercises: [
          { name: "Light walking or mobility", what: "20–30 min easy walk or mobility practice.", muscles: ["Full body"], category: "Recovery", sexual: true, sexualNotes: "Keeps circulation healthy." },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 12 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Focus on nutrition and sleep."
      },
      {
        id: "w2d4",
        title: "Week 2 · Day 4 — VO₂ Intervals (10×30s)",
        type: "Intervals",
        exercises: [
          { name: "Warmup (10 min)", what: "Easy jog + dynamic mobility.", muscles: ["Full body"], category: "Warmup" },
          { name: "VO₂ Intervals — 10×30s", what: "10 rounds of 30s sprint/all-out + 60s walk rest.", muscles: ["Cardio","Full body"], category: "Intervals" },
          { name: "Cooldown 6–8 min", what: "Walk and stretch.", muscles: ["Full body"], category: "Cooldown" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 12 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Quality over quantity: keep each sprint maximal." 
      },
      {
        id: "w2d5",
        title: "Week 2 · Day 5 — REST",
        type: "Recovery",
        exercises: [
          { name: "Stretch & foam roll", what: "20 min mobility and breathing work.", muscles: ["Full body"], category: "Recovery" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 12 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Keep protein intake high today." 
      },
      {
        id: "w2d6",
        title: "Week 2 · Day 6 — Strength B (progression)",
        type: "Strength",
        exercises: [
          { name: "Warmup (8 min)", what: "Light jog + shoulder mobility.", muscles: ["Full body"], category: "Warmup" },
          { name: "Decline Push-ups (feet elevated)", what: "3 x 10. Increase upper-chest load.", muscles: ["Chest","Shoulders"], category: "Strength" },
          { name: "Bulgarian Split Squats", what: "3 x 10 each leg.", muscles: ["Quads","Glutes"], category: "Strength" },
          { name: "Inverted Rows or Prone Y-T-W", what: "3 x 10. Emphasize scapular retraction.", muscles: ["Back","Biceps"], category: "Strength" },
          { name: "Calf Raises", what: "3 x 20. Slow down eccentrics.", muscles: ["Calves"], category: "Accessory" },
          { name: "Core — Mountain Climbers", what: "3 x 10 each side.", muscles: ["Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 12 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Try to add 1–2 reps vs week 1."
      },
      {
        id: "w2d7",
        title: "Week 2 · Day 7 — REST",
        type: "Recovery",
        exercises: [
          { name: "Easy walk, mobility", what: "Optional 20–30 min walk and light mobility.", muscles: ["Full body"], category: "Recovery" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 12 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Prepare for week 3 progression." 
      }
    ]
  },
  // Week 3
  {
    week: 3,
    days: [
      {
        id: "w3d1",
        title: "Week 3 · Day 1 — Strength A (add set)",
        type: "Strength",
        exercises: [
          { name: "Warmup (8-10 min)", what: "Same warmup; include 2x30s hip activation.", muscles: ["Full body"], category: "Warmup" },
          { name: "Bodyweight Squats", what: "4 x 10 (add 4th set) or progress toward single-leg work.", muscles: ["Quads","Glutes"], category: "Strength" },
          { name: "Decline Push-ups", what: "3 x 10. Or attempt clap push-up progression.", muscles: ["Chest","Triceps"], category: "Strength" },
          { name: "Assisted Single-leg Squat (box/pulse)", what: "3 x 6 each leg.", muscles: ["Quads","Glutes"], category: "Strength" },
          { name: "Glute Bridges (single-leg progression)", what: "3 x 10 each leg.", muscles: ["Glutes","Hamstrings"], category: "Strength" },
          { name: "Plank", what: "3 x 60s.", muscles: ["Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 12 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Add one hard set for key lifts. Maintain clean form." 
      },
      {
        id: "w3d2",
        title: "Week 3 · Day 2 — Zone-2 (45 min)",
        type: "Endurance",
        exercises: [
          { name: "Warmup (8 min)", what: "Mobility plus 3 min easy jog.", muscles: ["Full body"], category: "Warmup" },
          { name: "Zone-2 Steady Aerobic", what: "45 min brisk walk or easy jog. Keep conversation possible.", muscles: ["Cardio","Legs"], category: "Endurance", sexual: true, sexualNotes: "Sustained aerobic work improves circulation and sexual stamina." },
          { name: "Core Circuit after (optional)", what: "3 rounds: 20 bicycle crunches, 10 V-ups, 30s plank.", muscles: ["Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 12–15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Keep fueling before long sessions (small carb snack)." 
      },
      {
        id: "w3d3",
        title: "Week 3 · Day 3 — REST",
        type: "Recovery",
        exercises: [
          { name: "Active recovery", what: "20–30 min walk or yoga; mobility focus.", muscles: ["Full body"], category: "Recovery", sexual: true },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 12–15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Prioritize sleep and protein today." 
      },
      {
        id: "w3d4",
        title: "Week 3 · Day 4 — VO₂ Intervals (12×30s)",
        type: "Intervals",
        exercises: [
          { name: "Warmup (10 min)", what: "Easy jog + dynamic mobility.", muscles: ["Full body"], category: "Warmup" },
          { name: "VO₂ Intervals — 12×30s", what: "12 rounds of 30s near-max effort + 60s easy rest. Aim for consistent power.", muscles: ["Cardio","Legs","Full body"], category: "Intervals" },
          { name: "Burpee finisher (optional)", what: "3 x 5 burpees after intervals.", muscles: ["Full body"], category: "Finisher" },
          { name: "Cooldown & stretch", what: "6–8 min easy walk + stretch.", muscles: ["Full body"], category: "Cooldown" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 12–15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Short rests keep intensity high—maintain quality on each rep." 
      },
      {
        id: "w3d5",
        title: "Week 3 · Day 5 — REST",
        type: "Recovery",
        exercises: [
          { name: "Mobility & sleep focus", what: "20 min mobility; focus on sleep hygiene and nutrition.", muscles: ["Full body"], category: "Recovery" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Refuel and hydrate." 
      },
      {
        id: "w3d6",
        title: "Week 3 · Day 6 — Strength B (single-leg & plyo)",
        type: "Strength",
        exercises: [
          { name: "Warmup (8 min)", what: "Dynamic warmup + light hops.", muscles: ["Full body"], category: "Warmup" },
          { name: "Assisted Pistol Progressions", what: "3 x 6 each leg with a box/chair for support.", muscles: ["Quads","Glutes","Balance"], category: "Strength" },
          { name: "Decline or Clap Push-ups", what: "3 x 8–10. Add plyo if safe.", muscles: ["Chest","Shoulders","Triceps"], category: "Strength" },
          { name: "Bulgarian Split Squat Jumps", what: "3 x 8 each leg (or controlled eccentric if plyo not safe).", muscles: ["Quads","Glutes","Power"], category: "Power" },
          { name: "Core — Bicycle & V-ups", what: "3 x 20 bicycle, 3 x 10 V-ups.", muscles: ["Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Explosive work improves power and sexual vigor via improved circulation and neuromuscular control." 
      },
      {
        id: "w3d7",
        title: "Week 3 · Day 7 — REST",
        type: "Recovery",
        exercises: [
          { name: "Light walk or full rest", what: "Prioritize mental recovery, mobility traces.", muscles: ["Full body"], category: "Recovery" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Week 4 is peak week—recover well." 
      }
    ]
  },
  // Week 4
  {
    week: 4,
    days: [
      {
        id: "w4d1",
        title: "Week 4 · Day 1 — Strength A (time-under-tension)",
        type: "Strength",
        exercises: [
          { name: "Warmup (8-10 min)", what: "Mobility + glute activation.", muscles: ["Full body"], category: "Warmup" },
          { name: "Slow Eccentric Squats", what: "3 x 8 with 3s down, 1s pause, controlled up.", muscles: ["Quads","Glutes"], category: "Strength" },
          { name: "Slow Eccentric Push-ups", what: "3 x 8; slow 3s lowering.", muscles: ["Chest","Triceps"], category: "Strength" },
          { name: "Single-leg Glute Bridges", what: "3 x 10 each leg.", muscles: ["Glutes","Hamstrings"], category: "Strength" },
          { name: "Side Plank 3x45s", what: "3 x 45s each side.", muscles: ["Obliques","Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Controlled reps maximize hypertrophic stimulus without heavy loads." 
      },
      {
        id: "w4d2",
        title: "Week 4 · Day 2 — Zone-2 (45-50 min)",
        type: "Endurance",
        exercises: [
          { name: "Warmup (8 min)", what: "Easy mobility + jog.", muscles: ["Full body"], category: "Warmup" },
          { name: "Zone-2 Long Aerobic", what: "45–50 min steady aerobic session; keep conversational pace.", muscles: ["Cardio","Legs"], category: "Endurance", sexual: true, sexualNotes: "Supports vascular health and overall stamina." },
          { name: "Core — Hollow Holds", what: "3 x 20s.", muscles: ["Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Hydrate and fuel appropriately before long sessions." 
      },
      {
        id: "w4d3",
        title: "Week 4 · Day 3 — REST",
        type: "Recovery",
        exercises: [
          { name: "Active recovery or rest", what: "20–30 min of mobility, walking, light yoga.", muscles: ["Full body"], category: "Recovery" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Prepare mentally for the VO₂ peak session." 
      },
      {
        id: "w4d4",
        title: "Week 4 · Day 4 — VO₂ Peak (15×20s)",
        type: "Intervals",
        exercises: [
          { name: "Warmup (10 min)", what: "Easy jog + dynamic mobility to prime muscles.", muscles: ["Full body"], category: "Warmup" },
          { name: "VO₂ Short Intervals — 15×20s", what: "15 rounds of 20s near-max effort + 40s easy rest. Keep each rep high quality.", muscles: ["Cardio","Full body","Legs"], category: "Intervals" },
          { name: "Finisher — Jump Lunges 3x15", what: "3 x 15 jump lunges after intervals.", muscles: ["Quads","Glutes","Cardio"], category: "Finisher" },
          { name: "Cooldown & stretch", what: "8 min walking + thorough stretch.", muscles: ["Full body"], category: "Cooldown" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "This is a high-quality peak VO₂ day. Rest well after." 
      },
      {
        id: "w4d5",
        title: "Week 4 · Day 5 — REST",
        type: "Recovery",
        exercises: [
          { name: "Full rest or light mobility", what: "Deep stretches, breathing exercises, sleep priority.", muscles: ["Full body"], category: "Recovery" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Consider a small calorie bump if weight hasn't increased during the cycle." 
      },
      {
        id: "w4d6",
        title: "Week 4 · Day 6 — Strength B (peak)",
        type: "Strength",
        exercises: [
          { name: "Warmup (8 min)", what: "Dynamic warmup and light plyos.", muscles: ["Full body"], category: "Warmup" },
          { name: "Pistol squat progressions", what: "3 x 6 each leg (assisted if needed).", muscles: ["Quads","Glutes","Balance"], category: "Strength" },
          { name: "Diamond or Archer Push-ups", what: "3 x 8–10. Focus on triceps and chest inner head.", muscles: ["Chest","Triceps"], category: "Strength" },
          { name: "Bulgarian Split Squat Jumps or Controlled", what: "3 x 10 each leg.", muscles: ["Quads","Glutes"], category: "Power" },
          { name: "Core — V-ups or Leg Raises", what: "3 x 10–15.", muscles: ["Core"], category: "Core" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Peak strength day; push for clean progressions and quality." 
      },
      {
        id: "w4d7",
        title: "Week 4 · Day 7 — REST & Evaluate",
        type: "Recovery",
        exercises: [
          { name: "Rest, photos & tracking", what: "Take progress photos, rest, measure body weight and key lifts (push-ups, plank).", muscles: ["Full body"], category: "Assessment" },
          { name: "Pelvic-floor Kegels (daily)", what: "3 x 15 reps.", muscles: ["Pelvic floor"], category: "Pelvic Floor", sexual: true }
        ],
        notes: "Compare to baseline. Plan next cycle or deload week." 
      }
    ]
  }
];

function formatSetsReps(ex) {
  // attempt to parse common patterns out of 'what' to create a summary (simple)
  return ex.what;
}

export default function App() {
  const [weekIndex, setWeekIndex] = useState(0);
  const [dayIndex, setDayIndex] = useState(0);
  const [marked, setMarked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("doneLog")) || {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("doneLog", JSON.stringify(marked));
  }, [marked]);

  const week = DATA[weekIndex];
  const day = week.days[dayIndex];

  function toggleDone(key) {
    setMarked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-4 md:p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">4-Week Polarized Training — Bodyweight (Mobile Friendly)</h1>
          <div className="text-sm text-gray-600">Use local storage to track completion ✓</div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <aside className="md:col-span-1">
            <div className="mb-4">
              <h2 className="font-semibold">Weeks</h2>
              <div className="mt-2 space-y-2">
                {DATA.map((w, i) => (
                  <button key={w.week} onClick={() => { setWeekIndex(i); setDayIndex(0); }}
                    className={`w-full text-left p-2 rounded ${i===weekIndex? 'bg-indigo-600 text-white':'bg-gray-100 text-gray-800'}`}>
                    Week {w.week}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Quick macros</h3>
              <div className="mt-2 text-sm text-gray-700">
                <div>Calories: ~2,730 kcal/day</div>
                <div>Protein: ~113 g/day</div>
                <div>Carbs: ~399 g/day</div>
                <div>Fat: ~76 g/day</div>
                <div className="mt-2 text-xs text-gray-500">Halal-friendly meals & snacks suggested in notes.</div>
              </div>
            </div>

            <div className="mt-4">
              <button onClick={() => { navigator.clipboard && navigator.clipboard.writeText(JSON.stringify(DATA)); alert('Workout JSON copied to clipboard'); }}
                className="w-full py-2 bg-green-500 text-white rounded">Copy JSON</button>
            </div>
          </aside>

          <main className="md:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{day.title}</h2>
              <div className="space-x-2">
                <button onClick={() => setDayIndex(i => Math.max(0, i-1))} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
                <button onClick={() => setDayIndex(i => Math.min(week.days.length-1, i+1))} className="px-3 py-1 bg-gray-200 rounded">Next</button>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600">Type: <strong>{day.type}</strong></div>
              <div className="text-sm text-gray-600 mt-1">Notes: {day.notes}</div>
            </div>

            <div className="space-y-3">
              {day.exercises.map((ex, idx) => (
                <article key={ex.name+idx} className="p-3 border rounded-md bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{ex.name}</h3>
                      <div className="text-sm text-gray-700 mt-1">{ex.what}</div>
                      <div className="text-xs text-gray-500 mt-2">Muscle groups: {ex.muscles.join(', ')}</div>
                      <div className="text-xs text-gray-500">Category: {ex.category}</div>
                      {ex.sexual && <div className="mt-2 text-xs text-amber-700">Includes sexual-health benefit: {ex.sexualNotes || 'Pelvic floor / circulation benefit'}</div>}
                    </div>

                    <div className="ml-4 text-right">
                      <button onClick={() => toggleDone(day.id + '|' + idx)}
                        className={`px-3 py-1 rounded ${marked[day.id + '|' + idx] ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                        {marked[day.id + '|' + idx] ? 'Done ✓' : 'Mark'}</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded">
              <h4 className="font-semibold">Daily essentials</h4>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                <li>Pelvic-floor Kegels: do them every day as listed.</li>
                <li>Creatine: 5 g daily; take with carb/protein if possible.</li>
                <li>Sleep 7–9 hours. Hydrate 3+ L/day (more on long/hard days).</li>
                <li>After Week 4: measure progress photos, weight, and tests (push-ups, plank, 3km time).</li>
              </ul>
            </div>

            <div className="mt-4 flex gap-3">
              <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded">Print / Save PDF</button>
              <button onClick={() => alert('Exported as CSV feature coming soon (or copy JSON)')} className="px-4 py-2 bg-gray-200 rounded">Export</button>
            </div>
          </main>
        </div>

        <footer className="mt-6 text-xs text-gray-500">
          Built for mobile access via GitHub Pages / Vercel. Tailwind is assumed—drop component in a CRA/Vite + Tailwind project or open in CodeSandbox for instant preview.
        </footer>
      </div>
    </div>
  );
}
