/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CA = "8tX4ZoxhnuaQrK2H59omSEQXCHTNwFn9vZUg1psh3W5Z";

const VIBE_PROMPTS: Record<string, string> = {
  war: "cartoon orange ant soldiers with smiley face antennae in epic medieval battle against ugly green goblins, dark fiery orange sky, dramatic lighting, meme art style, vibrant colors, highly detailed illustration, ANTROPIANS VS GOBLINS banner text",
  build: "cute orange cartoon ants with smiley face antennae building a giant anthill fortress together, coins and gold piles, warm sunset lighting, teamwork, inspirational meme art, THE COLONY BUILDS text, orange and brown earth tones",
  hangout: "cute orange cartoon ants with smiley face antennae chilling at a beach sunset, some holding drinks, relaxed wholesome vibe, warm orange sky, WAGMI ANTROPIANS text, fun meme illustration style"
};

type VibeType = 'war' | 'build' | 'hangout';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'buy' | 'story' | 'vibes' | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<VibeType>('war');
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CA);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const generateMeme = () => {
    const seed = Math.floor(Math.random() * 99999);
    const prompt = VIBE_PROMPTS[selectedVibe];
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${seed}`;
    setIsLoading(true);
    setHasGenerated(true);
    setImgSrc(url);
  };

  const handleDownload = async () => {
    if (!imgSrc) return;
    try {
      const response = await fetch(imgSrc);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `antropians-${selectedVibe}-meme.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };

  const panelsRef = useRef<HTMLDivElement>(null);

  const scrollToPanels = () => {
    panelsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const togglePanel = (panel: 'buy' | 'story' | 'vibes') => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="min-h-screen bg-[#0D0400] text-[#FFF5E4] font-mono-space selection:bg-[#E8620A] selection:text-white">
      {/* Overlay Effects */}
      <div className="scanline" />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-[#E8620A] text-white px-6 py-3 rounded-md font-bangers text-xl shadow-2xl flex items-center gap-2"
          >
            <Check size={20} />
            ✅ Copied!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col overflow-hidden animate-flicker">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/dytuvjodo/video/upload/v1778830343/20260515_1357_video_cjugby.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        </div>

        {/* Navigation */}
        <nav className="relative z-20 max-w-7xl mx-auto w-full px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group">
            <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(232,98,10,0.5)]">🐜</span>
            <span 
              className="font-bangers text-3xl text-[#FFF5E4] tracking-tight text-shadow-nav"
            >
              $ANTROPIANS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Manifesto', 'Tokenomics', 'Colony', 'FAQ'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-cream/60 hover:text-cream transition-colors duration-200 text-sm tracking-widest uppercase font-bold"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-[#E8620A]/30 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] font-bold tracking-tighter">● LIVE ON SOLANA</span>
            </div>
            
            <button 
              className="md:hidden text-cream"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-24 left-8 right-8 z-50 md:hidden bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl p-8 flex flex-col gap-6"
            >
              {['Manifesto', 'Tokenomics', 'Colony', 'FAQ'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-cream hover:text-orange-light transition-colors text-2xl font-bangers tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 -mt-10">
          <div className="animate-fade-up border border-[#F5850A]/20 bg-[#F5850A]/5 px-3 py-1 rounded" style={{ animationDelay: '0.2s' }}>
            <span className="text-[#F5850A] text-xs font-bold tracking-[0.3em] uppercase block">
              🐜 THE COLONY HAS SPOKEN 🐜
            </span>
          </div>

          <h1 className="flex flex-col items-center mt-6">
            <span 
              className="font-bangers text-7xl md:text-8xl lg:text-[110px] leading-[0.85] tracking-tighter text-[#FFF5E4] animate-fade-up text-shadow-hero uppercase"
              style={{ 
                animationDelay: '0.35s'
              }}
            >
              WE ARE
            </span>
            <span 
              className="font-bangers text-7xl md:text-8xl lg:text-[110px] leading-[0.85] tracking-tighter text-[#F5850A] -mt-4 animate-fade-up text-shadow-accent uppercase"
              style={{ 
                animationDelay: '0.4s'
              }}
            >
              ANTROPIANS
            </span>
          </h1>

          <p 
            className="max-w-xl mt-8 text-cream/70 text-sm md:text-base leading-relaxed animate-fade-up"
            style={{ 
              animationDelay: '0.5s'
            }}
          >
            The Anthropic community token. No roadmap. No promises. Just ants assembling on-chain for the long term.
          </p>

          <div 
            className="flex flex-wrap justify-center gap-6 mt-10 animate-fade-up"
            style={{ animationDelay: '0.65s' }}
          >
            <button 
              onClick={scrollToPanels}
              className="px-8 py-4 bg-[#E8620A] text-white font-bangers text-2xl tracking-wider rounded-md transition-all active:translate-y-[2px] shadow-[0_4px_0_#9C3A03,0_8px_24px_rgba(232,98,10,0.4)] hover:shadow-[0_6px_0_#9C3A03,0_12px_28px_rgba(232,98,10,0.5)] hover:-translate-y-[2px]"
            >
              💰 APE IN NOW
            </button>
            <a 
              href="https://x.com/i/communities/1880384357921354068"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-[#E8620A]/50 text-[#F5850A] font-bangers text-2xl tracking-wider rounded-md hover:bg-[#E8620A]/10 hover:border-[#E8620A] transition-all flex items-center justify-center"
            >
              ☠ JOIN THE CULT
            </a>
          </div>

          <div 
            className="mt-12 group cursor-pointer animate-fade-up flex flex-col items-center gap-1"
            style={{ animationDelay: '0.8s' }}
            onClick={copyToClipboard}
          >
            <span className="text-[9px] uppercase tracking-widest text-cream/40 block">Contract Address</span>
            <div className="flex items-center gap-3 bg-black/30 px-4 py-2 border border-white/10 rounded-lg">
              <span className="text-[10px] text-cream/50 tracking-tighter break-all">
                {CA}
              </span>
              <Copy size={12} className="text-[#F5850A] shrink-0" />
            </div>
          </div>
        </div>

        {/* Scroll Ticker */}
        <div className="absolute bottom-0 left-0 w-full bg-[#E8620A] h-[28px] flex items-center overflow-hidden z-30">
          <div className="ticker-content flex items-center">
             {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center shrink-0">
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">🟢 $ANTROPIANS LIVE</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">·</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">🐜 ANTS ASSEMBLING</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">·</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">🔥 NO DEV WALLET</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">·</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">💎 COMMUNITY ONLY</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">·</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">⚔️ GOBLINS BEWARE</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">·</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">🚀 WAGMI</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">·</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">🐜 SOLANA</span>
                  <span className="px-4 text-[11px] font-bold text-black tracking-wider whitespace-nowrap">·</span>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Wooden Buttons & Panels Section */}
      <section ref={panelsRef} className="bg-[#0D0400] py-20 px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {/* Wooden Buttons Container */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { id: 'buy', label: '💰 BUY' },
              { id: 'story', label: '📜 STORY' },
              { id: 'vibes', label: '🎨 VIBES' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => togglePanel(btn.id as any)}
                className={`
                  relative min-w-[140px] px-8 py-3 font-bangers text-2xl tracking-wide text-[#FFE0A0]
                  border-[3px] border-[#2a0e00] rounded-sm transition-all duration-300
                  wooden-button-shadow hover:animate-[float_2s_infinite]
                  ${activePanel === btn.id 
                    ? 'wooden-button-active bg-gradient-to-br from-[#3D1A04] via-[#2D1A01] to-[#1D0A00]' 
                    : 'wood-gradient opacity-90 hover:opacity-100'
                  }
                `}
                style={{ textShadow: '1px 1px 0 #2a0e00' }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Panels */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {activePanel === 'buy' && (
                <motion.div
                  key="buy"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[rgba(20,8,0,0.95)] border-t-3 border-[#9C3A03] p-10 rounded-b-xl text-center flex flex-col items-center gap-8 shadow-2xl"
                >
                  <h2 className="font-bangers text-5xl text-[#F5850A]">🐜 APE INTO THE COLONY</h2>
                  
                  <div className="w-full max-w-xl">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F5850A]/70 mb-2 block">Contract Address (Solana)</span>
                    <div 
                      onClick={copyToClipboard}
                      className="group relative cursor-pointer bg-[#F5850A]/10 border border-[#F5850A]/40 p-5 rounded-lg break-all font-mono text-sm group-hover:bg-[#F5850A]/15 transition-all"
                    >
                      {CA}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy size={16} className="text-[#F5850A]" />
                      </div>
                    </div>
                    <span className="text-[10px] text-cream/30 mt-2 block">👆 Click to copy CA</span>
                  </div>

                  <a 
                    href="https://dexscreener.com/solana/8tX4ZoxhnuaQrK2H59omSEQXCHTNwFn9vZUg1psh3W5Z"
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 bg-[#E8620A] text-white font-bangers text-2xl tracking-wide rounded-md transition-all shadow-[0_4px_0_#9C3A03,0_8px_24px_rgba(232,98,10,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_0_#9C3A03,0_12px_28px_rgba(232,98,10,0.5)] active:translate-y-0.5"
                  >
                    🦎 View on DexScreener →
                  </a>
                </motion.div>
              )}

              {activePanel === 'story' && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[rgba(20,8,0,0.95)] border-t-3 border-[#9C3A03] p-10 rounded-b-xl shadow-2xl"
                >
                  <h2 className="font-bangers text-5xl text-[#F5850A] text-center mb-8">📜 THE ORIGIN STORY</h2>
                  <div className="space-y-6 text-cream/85 text-sm leading-8 max-w-3xl mx-auto">
                    <p>
                      Look. OpenAI raised <span className="text-[#F5850A] font-bold">$GOBLIN</span> to 12 million based on feelings alone. It's useless. No team. It was just a cult that believed strongly enough. Anthropic had nothing. For years. That's just a fact.
                    </p>
                    <p>
                      But that changed yesterday. Just one tweet. A guy said: "OpenAI has $GOBLIN at 12M. Where's the Anthropic one?"
                    </p>
                    <p>
                      Then the call: <span className="text-[#F5850A] font-bold">"Ants assemble. We're here for the long term."</span> That's it.
                    </p>
                    <p>
                      There is no roadmap. There is no dev wallet. I'm not making any promises. This is just a signal. <span className="text-[#F5850A] font-bold">$ANTROPIANS</span> was launched right there.
                    </p>
                    <p>
                      This is a community coin made for the people who believe in Anthropic. Why ants? The name "Anthropic" comes from the word "ant" because ants are a major focus of the company's research. We are the ant colony. We will build together, slowly but surely. That's the whole meme.
                    </p>
                    <p>
                      There's no fake whitepaper, no investors who are just in it for the money, and no nonsense. This is not a strategy related to infrastructure. It's a tribe. A flag.
                    </p>
                    <p>
                      The Anthropic community is huge, loyal, and has been ignored while other AI cults are being printed. $ANTROPIANS lets them say, "We're here."
                    </p>
                    <p>
                      Do the math. This is the floor. You're buying the cult when it first starts. You either understand it or you deal with it.
                    </p>
                    <p className="font-bangers text-3xl text-[#F5850A] text-center pt-8">
                      🐜 Ants are assembling. WAGMI. 🐜
                    </p>
                  </div>
                </motion.div>
              )}

              {activePanel === 'vibes' && (
                <motion.div
                  key="vibes"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[rgba(20,8,0,0.95)] border-t-3 border-[#9C3A03] p-10 rounded-b-xl shadow-2xl flex flex-col items-center"
                >
                  <h2 className="font-bangers text-5xl text-[#F5850A] text-center mb-2">🎨 GENERATE YOUR VIBE</h2>
                  <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-cream/40 mb-10">CHOOSE YOUR SCENE — GET A CUSTOM $ANTROPIANS MEME</p>
                  
                  {/* Vibe Selection */}
                  <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {[
                      { id: 'war', icon: '⚔️', title: 'WAR WITH GOBLINS', sub: 'Ants vs OpenAI goblins' },
                      { id: 'build', icon: '🏗️', title: 'BUILDING TOGETHER', sub: 'Colony assembling' },
                      { id: 'hangout', icon: '🌅', title: 'HANGOUT VIBES', sub: 'Chill ant life' }
                    ].map((vibe) => (
                      <button
                        key={vibe.id}
                        onClick={() => setSelectedVibe(vibe.id as VibeType)}
                        className={`
                          min-w-[200px] p-6 rounded-xl border-2 transition-all group text-center
                          ${selectedVibe === vibe.id 
                            ? 'border-[#F5850A] bg-[#F5850A]/15 -translate-y-1' 
                            : 'border-[#F5850A]/30 bg-[#F5850A]/5 hover:border-[#F5850A]/70 hover:-translate-y-1'
                          }
                        `}
                      >
                        <span className="text-4xl block mb-3">{vibe.icon}</span>
                        <span className="font-bangers text-xl text-[#FFF5E4] block mb-1">{vibe.title}</span>
                        <span className="text-[10px] uppercase font-bold text-cream/40">{vibe.sub}</span>
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={generateMeme}
                    disabled={isLoading}
                    className="px-10 py-5 bg-[#E8620A] text-white font-bangers text-3xl tracking-wide rounded-md transition-all shadow-[0_4px_0_#9C3A03,0_8px_24px_rgba(232,98,10,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_0_#9C3A03,0_12px_28px_rgba(232,98,10,0.5)] active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "ASSEMBLING ANTS..." : "🐜 GENERATE MEME"}
                  </button>

                  {/* Generation Result */}
                  {hasGenerated && (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-12 w-full flex flex-col items-center"
                    >
                      <div className="relative w-full max-w-[480px] aspect-square rounded-xl border-2 border-[#E8620A]/40 overflow-hidden shadow-2xl bg-black">
                        {isLoading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-full h-full bg-[#F5850A]/5 animate-pulse rounded-lg relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                            </div>
                            <p className="absolute bottom-10 font-bold text-xs uppercase tracking-widest text-[#F5850A] animate-pulse">🐜 Assembling your ant...</p>
                          </div>
                        )}
                        <img
                          src={imgSrc}
                          onLoad={() => setIsLoading(false)}
                          onError={() => setIsLoading(false)}
                          className={`w-full h-full object-cover transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                          alt="Generated Antropian Meme"
                        />
                      </div>

                      {!isLoading && (
                        <div className="flex gap-4 mt-6">
                          <button 
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#F5850A]/40 text-[#F5850A] text-xs font-bold uppercase tracking-widest hover:bg-[#F5850A]/10 transition-colors"
                          >
                            ⬇️ SAVE MEME
                          </button>
                          <button 
                            onClick={generateMeme}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#F5850A]/40 text-[#F5850A] text-xs font-bold uppercase tracking-widest hover:bg-[#F5850A]/10 transition-colors"
                          >
                            🔄 REGENERATE
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0400] border-t border-[#E8620A]/20 py-10 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bangers text-2xl text-[#E8620A] flex items-center gap-2">
            <span>🐜</span> $ANTROPIANS
          </div>
          <div className="text-[10px] text-cream/30 uppercase tracking-[0.2em] font-bold text-center">
            NOT FINANCIAL ADVICE. JUST ANT VIBES. © 2026 THE COLONY.
          </div>
          <div className="text-[10px] text-cream/40 uppercase tracking-widest font-bold flex items-center gap-2">
            POWERED BY <span className="text-[#E8620A]">SOLANA</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
