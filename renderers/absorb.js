// renderers/absorb.js
// Custom "Absorb" renderer for wallets, keys, coins, *.coinbin, *.kchain files

window.render = async function(payloadBytes, metadata) {
  const filename = metadata.filename || 'absorbed-asset.coinbin';

  // Beautiful branded Absorb UI (appears ONLY after password is entered)
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.height = '100vh';
  document.body.style.display = 'flex';
  document.body.style.alignItems = 'center';
  document.body.style.justifyContent = 'center';
  document.body.style.background = '#111';
  document.body.style.color = '#fff';
  document.body.style.fontFamily = 'system-ui, sans-serif';
  document.body.innerHTML = `
    <div style="text-align: center; max-width: 520px;">
      <h1 style="font-size: 3rem; margin: 0 0 20px; color: #00ff88;">🔑 ABSORB</h1>
      <p style="font-size: 1.3rem; margin-bottom: 10px;">${filename}</p>
      <p style="color: #0f0; margin-bottom: 40px;">Password verified • Ready to absorb</p>

      <button id="absorbBtn"
              style="background: linear-gradient(#00ff88, #00cc66); color: #000; font-size: 28px; font-weight: bold; padding: 24px 56px; border: none; border-radius: 9999px; cursor: pointer; box-shadow: 0 10px 30px rgba(0,255,136,0.4);">
        ABSORB NOW
      </button>

      <p style="margin-top: 60px; font-size: 0.95rem; color: #666;">
        This will securely download the original wallet / key / coin file
      </p>
    </div>
  `;

  document.getElementById('absorbBtn').onclick = () => {
    const blob = new Blob([payloadBytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    // Optional extra: if it's a .json or .coinbin, you can add preview logic here later
    console.log('✅ Absorbed:', filename);
  };
};
