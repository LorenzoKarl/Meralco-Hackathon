import { createClient } from '@supabase/supabase-js';

// This automatically grabs the two keys you just saved in Vercel
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  try {
    // Pulls all your Meralco grid locations from the Supabase cloud database
    const { data, error } = await supabase
      .from('smart_meters')
      .select('*');

    if (error) {
      throw error;
    }

    // Optional: Adds a tiny random fluctuation to the baseline load to simulate live reading
    const liveTelemetry = data.map(meter => ({
      ...meter,
      current_kw: (meter.baseline_kw + (Math.random() * 2 - 1)).toFixed(2)
    }));

    // Sends the live data to your frontend map
    res.status(200).json(liveTelemetry);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}