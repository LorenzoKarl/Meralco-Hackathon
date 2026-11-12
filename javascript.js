// --- VERCEL REAL-TIME POLLING ENGINE ---
async function fetchLiveTelemetry() {
  try {
    const response = await fetch('/api/telemetry');
    if (!response.ok) return;
    
    const liveData = await response.json();

    liveData.forEach(uplink => {
      const meter = meterNodes.find(m => m.id === uplink.id);
      if (meter) {
        meter.kw = uplink.kw;
        
        if (meter.marker.isPopupOpen()) {
          meter.marker.setPopupContent(`
            <div class="font-mono text-xs space-y-1 p-0.5">
              <div class="font-bold text-white flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span> ${meter.id}
              </div>
              <div class="text-zinc-400 text-[10px]">${meter.name}</div>
              <div class="text-orange-400 font-bold">Load: ${meter.kw.toFixed(2)} kW</div>
            </div>
          `);
        }
      }
    });

    recalculateMesh();
  } catch (error) {
    console.error("Telemetry fetch failed:", error);
  }
}

setInterval(fetchLiveTelemetry, 3000);