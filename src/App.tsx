import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Clock, Copy, Check, Gift, MailOpen, Music, VolumeX, BookHeart, Image as ImageIcon } from 'lucide-react';

// Data placeholders based on user request
const DATA = {
  bride: {
    nickname: "marisa",
    fullName: "marisa ekawati",
    parents: "anak kedua dr bapak stepanus abol dan ibu Maria satina",
    image: "https://images.unsplash.com/photo-1545696563-af8f6ec36502?q=80&w=600&auto=format&fit=crop"
  },
  groom: {
    nickname: "atek",
    fullName: "suprianto,S.kom",
    parents: "Anak kedua dr bapak lim mou tie dan ibu yo hui khiam",
    image: "https://images.unsplash.com/photo-1627063231435-08e1a7e2b67f?q=80&w=600&auto=format&fit=crop"
  },
  tunangan: {
    date: "jumat, 26.06.2026",
    time: "Waktu menyesuaikan",
    location: "sepok pangkalan",
    mapsLink: "https://maps.app.goo.gl/V24rrbgYzxudkk1b6",
    label: "Tunangan",
  },
  akad: {
    date: "senin, 06.07.2026",
    time: "08.00 WIB",
    location: "sepok pangkalan",
    mapsLink: "https://maps.app.goo.gl/v1TWMcmSqEy7KQx57",
    label: "Akad Nikah",
  },
  resepsi: {
    date: "senin, 06.07.2026",
    time: "14.00 WIB",
    location: "sepok pangkalan",
    mapsLink: "https://maps.app.goo.gl/V24rrbgYzxudkk1b6",
  },
  virtualGift: [
    {
      bankName: "-",
      accountNumber: "-",
      accountName: "-",
    }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543881523-cb8452ef24b8?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop"
  ]
};

const SHUANG_XI = "囍"; // Double Happiness Chinese Character

const Lantern = ({ delay = "0s", duration = "4s", height = "100px", className = "" }) => (
  <div className={`relative origin-top flex flex-col items-center ${className}`}>
    <div 
      className="relative origin-top flex flex-col items-center" 
      style={{ animation: `swing ${duration} ease-in-out ${delay} infinite alternate` }}
    >
      <div className="w-[2px] bg-gradient-to-b from-transparent to-[#E5C270] opacity-80" style={{ height }}></div>
      {/* Lantern Body */}
      <div className="relative flex flex-col items-center drop-shadow-[0_0_15px_rgba(229,194,112,0.4)]">
        <div className="w-8 h-2 bg-gradient-to-b from-[#FFF8DC] to-[#B8860B] rounded-t-sm z-10"></div>
        <div className="w-20 h-24 bg-gradient-to-br from-[#ff3333] via-[#D1111B] to-[#5C0000] rounded-3xl border border-[#E5C270]/60 relative flex items-center justify-center overflow-hidden shadow-inner">
          {/* Ribs */}
          <div className="w-14 h-full border-x border-[#E5C270]/30 rounded-[50%] absolute pointer-events-none"></div>
          <div className="w-6 h-full border-x border-[#E5C270]/20 rounded-[50%] absolute pointer-events-none"></div>
          <span className="text-[#E5C270]/90 font-tc text-opacity-90 text-3xl font-bold">{SHUANG_XI}</span>
        </div>
        <div className="w-8 h-2 bg-gradient-to-b from-[#B8860B] to-[#5C0000] rounded-b-sm z-10"></div>
        {/* Tassel */}
        <div className="w-4 h-16 flex justify-around mt-1 relative">
          <div className="absolute top-0 w-full h-2 bg-[#B8860B] rounded-sm blur-[1px]"></div>
          <div className="w-[1px] h-full bg-[#E5C270] opacity-80"></div>
          <div className="w-[1px] h-full bg-[#D1111B] mix-blend-screen opacity-80"></div>
          <div className="w-[1px] h-full bg-[#E5C270] opacity-80"></div>
        </div>
      </div>
    </div>
  </div>
);

const HangingLanterns = () => {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-between px-2 md:px-12 pointer-events-none z-0 opacity-40 md:opacity-70">
      <div className="flex gap-2 md:gap-8 pl-1 md:pl-2">
        <Lantern height="8vh" delay="0s" duration="3.5s" className="scale-[0.5] md:scale-100" />
        <Lantern height="20vh" delay="1s" duration="4.2s" className="scale-[0.4] md:scale-[0.6] mt-4 md:mt-8 opacity-80 hidden sm:flex" />
      </div>
      <div className="flex gap-2 md:gap-8 pr-1 md:pr-2">
        <Lantern height="15vh" delay="0.5s" duration="3.8s" className="scale-[0.5] md:scale-[0.8] mt-2 md:mt-4 opacity-90 hidden sm:flex" />
        <Lantern height="10vh" delay="1.5s" duration="4s" className="scale-[0.6] md:scale-110" />
      </div>
    </div>
  );
};

const FloatingSkyLanterns = () => {
  const [lanterns] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 15 + 20}s`,
      animationDelay: `${Math.random() * 15}s`,
      scale: Math.random() * 0.4 + 0.3,
      opacity: Math.random() * 0.5 + 0.3,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {lanterns.map(l => (
        <div
          key={l.id}
          className="absolute bottom-[-20%] transform -translate-x-1/2"
          style={{
            left: l.left,
            animation: `floatUp ${l.animationDuration} linear ${l.animationDelay} infinite`
          }}
        >
          <div style={{ transform: `scale(${l.scale})`, opacity: l.opacity }} className="flex justify-center"> 
            <div className="w-16 h-20 bg-gradient-to-t from-[#B8860B] to-[#FFE4B5] rounded-t-[50%] rounded-b-[10%] relative flex justify-center shadow-[0_0_30px_rgba(255,228,181,0.5)] overflow-hidden">
               <div className="absolute inset-0 border-[2px] border-white/20 rounded-t-[50%] rounded-b-[10%]"></div>
               <div className="absolute w-[2px] h-full bg-white/20"></div>
               <div className="absolute w-full h-[2px] top-1/2 bg-white/10"></div>
               <div className="absolute bottom-[-10px] w-8 h-4 bg-[#5C0000] rounded-full blur-[2px]"></div>
               <div className="absolute bottom-1 w-6 h-6 bg-[#FFF] rounded-full blur-[8px] shadow-[0_0_20px_#FFF]"></div>
               <div className="absolute bottom-2 w-3 h-3 bg-[#FFE4B5] rounded-full blur-[2px] shadow-[0_0_10px_#FFF]"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Countdown = ({ targetDate = "2026-07-06T08:00:00" }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-1 xl:gap-2 mt-4 text-[#E5C270]">
      <div className="flex flex-col items-center">
        <div className="text-2xl xl:text-3xl font-serif font-black gold-gradient-text w-10 xl:w-12 text-center">{timeLeft.days}</div>
        <div className="text-[9px] xl:text-[10px] uppercase tracking-widest opacity-80">Hari</div>
      </div>
      <div className="text-2xl xl:text-3xl font-serif gold-gradient-text opacity-50 px-1">:</div>
      <div className="flex flex-col items-center">
        <div className="text-2xl xl:text-3xl font-serif font-black gold-gradient-text w-10 xl:w-12 text-center">{timeLeft.hours}</div>
        <div className="text-[9px] xl:text-[10px] uppercase tracking-widest opacity-80">Jam</div>
      </div>
      <div className="text-2xl xl:text-3xl font-serif gold-gradient-text opacity-50 px-1">:</div>
      <div className="flex flex-col items-center">
        <div className="text-2xl xl:text-3xl font-serif font-black gold-gradient-text w-10 xl:w-12 text-center">{timeLeft.minutes}</div>
        <div className="text-[9px] xl:text-[10px] uppercase tracking-widest opacity-80">Menit</div>
      </div>
      <div className="text-2xl xl:text-3xl font-serif gold-gradient-text opacity-50 px-1">:</div>
      <div className="flex flex-col items-center">
        <div className="text-2xl xl:text-3xl font-serif font-black gold-gradient-text w-10 xl:w-12 text-center">{timeLeft.seconds}</div>
        <div className="text-[9px] xl:text-[10px] uppercase tracking-widest opacity-80">Detik</div>
      </div>
    </div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  
  // Fake audio ref for UI purposes
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
    // In a real app, we would play audio here
    // if (audioRef.current) audioRef.current.play();
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // if (isPlaying) audioRef.current?.pause();
    // else audioRef.current?.play();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(text);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  return (
    <div className="font-sans text-[#E5C270] bg-[#5C0000] min-h-screen relative overflow-x-hidden selection:bg-[#E5C270] selection:text-[#5C0000]">
      {/* Background patterns and animations */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] pattern-chinese z-0"></div>
      <FloatingSkyLanterns />
      
      {/* Floating Audio Button */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-6 right-6 z-50 bg-[#7A0000] text-[#E5C270] p-3 rounded-full shadow-lg border border-[#E5C270]/30"
            onClick={toggleAudio}
          >
            {isPlaying ? <Music size={20} className="animate-spin" style={{ animationDuration: '3s' }} /> : <VolumeX size={20} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cover Page */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent text-center px-4 overflow-hidden"
          >
            <HangingLanterns />
            {/* Elegant Background Circles */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] border border-[#E5C270]/10 rounded-full border-dashed pointer-events-none"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[50vw] md:h-[50vw] border-2 border-[#E5C270]/5 rounded-full pointer-events-none"
             />

            {/* Corner Ornaments */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 0.8, x: 0, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 left-0 p-6 md:p-10 pointer-events-none"
            >
               <div className="w-20 h-20 md:w-32 md:h-32 border-t-[2px] border-l-[2px] border-[#E5C270] rounded-tl-[40px] relative">
                 <div className="absolute top-2 left-2 w-full h-full border-t border-l border-[#E5C270]/40 rounded-tl-[24px]" />
               </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 0.8, x: 0, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
              className="absolute top-0 right-0 p-6 md:p-10 pointer-events-none"
            >
               <div className="w-20 h-20 md:w-32 md:h-32 border-t-[2px] border-r-[2px] border-[#E5C270] rounded-tr-[40px] relative">
                 <div className="absolute top-2 right-2 w-full h-full border-t border-r border-[#E5C270]/40 rounded-tr-[24px]" />
               </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 0.8, x: 0, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="absolute bottom-0 left-0 p-6 md:p-10 pointer-events-none"
            >
               <div className="w-20 h-20 md:w-32 md:h-32 border-b-[2px] border-l-[2px] border-[#E5C270] rounded-bl-[40px] relative">
                 <div className="absolute bottom-2 left-2 w-full h-full border-b border-l border-[#E5C270]/40 rounded-bl-[24px]" />
               </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 0.8, x: 0, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="absolute bottom-0 right-0 p-6 md:p-10 pointer-events-none"
            >
               <div className="w-20 h-20 md:w-32 md:h-32 border-b-[2px] border-r-[2px] border-[#E5C270] rounded-br-[40px] relative">
                 <div className="absolute bottom-2 right-2 w-full h-full border-b border-r border-[#E5C270]/40 rounded-br-[24px]" />
               </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: "backOut" }}
              className="text-[#E5C270] z-10 flex flex-col items-center"
            >
              <h3 className="font-sans tracking-[0.4em] uppercase text-xs md:text-sm mb-6 text-[#E5C270]/80">The Wedding Of</h3>
              
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.15 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                className="text-[12rem] md:text-[20rem] font-tc absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#E5C270] pointer-events-none"
                style={{ animation: "glow 4s ease-in-out infinite alternate" }}
              >
                {SHUANG_XI}
              </motion.div>

              <h1 className="font-script text-7xl md:text-9xl mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center gap-2 md:gap-4 gold-gradient-text">
                <motion.span 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}
                >{DATA.groom.nickname}</motion.span>
                <motion.span 
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}
                  className="text-4xl text-[#E5C270]/60 mx-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                >&</motion.span>
                <motion.span 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
                >{DATA.bride.nickname}</motion.span>
              </h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="flex flex-col items-center"
              >
                <p className="font-serif italic text-lg md:text-xl mb-12 text-[#E5C270]/80">
                  We invite you to celebrate with us
                </p>

                <button
                  onClick={handleOpen}
                  className="group relative px-8 py-3 bg-transparent border border-[#E5C270] text-[#E5C270] font-bold rounded-full overflow-hidden transition-all hover:scale-105"
                >
                  <div className="absolute inset-0 bg-[#E5C270] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <span className="flex items-center gap-2 relative z-10 group-hover:text-[#5C0000] transition-colors duration-500">
                    <MailOpen size={18} />
                    BUKA UNDANGAN
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`relative z-10 ${isOpen ? 'block' : 'hidden md:block md:invisible md:h-screen overflow-hidden'}`}>
        
        {isOpen && <div className="hidden"></div>}

        <div className="min-h-screen bg-transparent text-[#E5C270] p-4 md:p-8 flex flex-col items-center justify-center font-sans overflow-x-hidden relative z-10">
          
          {/* Header Section from Bento */}
          <div className="mb-6 text-center pt-8 md:pt-0">
            <div className="text-6xl mb-2 font-tc animate-pulse">{SHUANG_XI}</div>
            <h1 className="text-sm md:text-xl md:tracking-[0.3em] uppercase font-bold gold-gradient-text">The Wedding Celebration</h1>
          </div>

          {/* Bento Grid Container 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[repeat(9,minmax(0,1fr))] gap-4 w-full max-w-5xl xl:max-w-6xl md:h-[900px] xl:h-[1000px] mb-4">
            
            {/* Groom Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-4 md:row-span-3 lux-card rounded-2xl p-6 flex flex-col justify-center text-center shadow-lg relative overflow-hidden group order-2 md:order-none"
            >
              <div className="absolute -top-4 -left-4 text-4xl opacity-10 font-tc group-hover:scale-110 transition-transform">龍</div>
              <p className="text-xs uppercase tracking-widest text-[#B8860B] mb-2">Mempelai Pria</p>
              <h2 className="text-2xl xl:text-3xl font-serif text-white mb-3">{DATA.groom.fullName}</h2>
              <div className="w-20 h-20 xl:w-24 xl:h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-[#B8860B] shrink-0">
                <img src={DATA.groom.image} alt="Groom" className="w-full h-full object-cover grayscale-[30%] sepia-[20%] group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" />
              </div>
              <div className="w-12 h-[1px] bg-[#B8860B] mx-auto mb-3 shrink-0"></div>
              <p className="text-[11px] xl:text-xs leading-relaxed text-[#E5C270]/90 italic">{DATA.groom.parents}</p>
            </motion.div>

            {/* Bride Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 md:row-span-3 lux-card rounded-2xl p-6 flex flex-col justify-center text-center shadow-lg relative overflow-hidden group order-3 md:order-none"
            >
              <div className="absolute -top-4 -right-4 text-4xl opacity-10 font-tc group-hover:scale-110 transition-transform">鳳</div>
              <p className="text-xs uppercase tracking-widest text-[#B8860B] mb-2">Mempelai Wanita</p>
              <h2 className="text-2xl xl:text-3xl font-serif text-white mb-3">{DATA.bride.fullName}</h2>
              <div className="w-20 h-20 xl:w-24 xl:h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-[#B8860B] shrink-0">
                <img src={DATA.bride.image} alt="Bride" className="w-full h-full object-cover grayscale-[30%] sepia-[20%] group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" />
              </div>
              <div className="w-12 h-[1px] bg-[#B8860B] mx-auto mb-3 shrink-0"></div>
              <p className="text-[11px] xl:text-xs leading-relaxed text-[#E5C270]/90 italic">{DATA.bride.parents}</p>
            </motion.div>

            {/* Main Date Display */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-4 md:row-span-3 gold-gradient-bg text-[#5C0000] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xl order-1 md:order-none relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#5C0000] opacity-10 m-4 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#5C0000] opacity-10 m-4 rounded-bl-3xl"></div>
              
              <p className="text-sm xl:text-base font-bold uppercase tracking-widest mb-1 relative z-10">Save The Date</p>
              <div className="text-6xl xl:text-7xl font-serif font-black mb-1 drop-shadow-md relative z-10">06</div>
              <div className="text-lg xl:text-xl uppercase tracking-[0.2em] font-bold border-y border-[#5C0000] py-1 mb-1 w-full max-w-[80%] mx-auto relative z-10">
                Juli 2026
              </div>
              <p className="text-sm xl:text-base mt-2 font-script relative z-10 font-bold">{DATA.groom.nickname} & {DATA.bride.nickname}</p>
              
              <div className="relative z-10 bg-[#5C0000]/90 rounded-2xl px-4 py-3 mt-4 border border-[#B8860B]/30 shadow-lg backdrop-blur-sm w-full mx-auto">
                <p className="text-[10px] xl:text-xs text-[#E5C270] tracking-widest uppercase mb-1">Menuju Hari Bahagia</p>
                <Countdown targetDate="2026-07-06T08:00:00" />
              </div>
            </motion.div>

            {/* Event 0: Tunangan */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="md:col-span-4 md:row-span-3 lux-card rounded-2xl p-5 xl:p-6 flex flex-col relative overflow-hidden order-4 md:order-none"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C270] to-transparent opacity-50"></div>
              <div className="flex items-center gap-2 mb-3 xl:mb-4">
                <span className="text-lg xl:text-xl">💍</span>
                <h3 className="text-xs xl:text-sm font-bold tracking-widest uppercase text-[#E5C270]">{DATA.tunangan.label}</h3>
              </div>
              <p className="text-xl xl:text-2xl font-serif text-white mb-2">{DATA.tunangan.date}</p>
              <p className="text-[11px] xl:text-xs leading-relaxed opacity-90 text-[#E5C270] mb-4">{DATA.tunangan.location}</p>
              <div className="mt-auto pt-4 border-t border-[#B8860B]/20">
                {DATA.tunangan.mapsLink && (
                  <a href={DATA.tunangan.mapsLink} target="_blank" rel="noreferrer" className="inline-block text-[10px] xl:text-xs gold-gradient-bg text-[#5C0000] px-3 xl:px-4 py-1.5 xl:py-2 rounded-full font-bold uppercase hover:opacity-90 transition-opacity">
                    Google Maps
                  </a>
                )}
              </div>
            </motion.div>

            {/* Event 1: Akad */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 md:row-span-3 lux-card rounded-2xl p-5 xl:p-6 flex flex-col relative overflow-hidden order-5 md:order-none"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C270] to-transparent opacity-50"></div>
              <div className="flex items-center gap-2 mb-3 xl:mb-4">
                <span className="text-lg xl:text-xl">🏮</span>
                <h3 className="text-xs xl:text-sm font-bold tracking-widest uppercase text-[#E5C270]">{DATA.akad.label}</h3>
              </div>
              <p className="text-xl xl:text-2xl font-serif text-white mb-2">{DATA.akad.time}</p>
              <p className="text-[11px] xl:text-xs leading-relaxed opacity-90 text-[#E5C270] mb-4">{DATA.akad.location}</p>
              <div className="mt-auto pt-4 border-t border-[#B8860B]/20">
                {DATA.akad.mapsLink && (
                  <a href={DATA.akad.mapsLink} target="_blank" rel="noreferrer" className="inline-block text-[10px] xl:text-xs gold-gradient-bg text-[#5C0000] px-3 xl:px-4 py-1.5 xl:py-2 rounded-full font-bold uppercase hover:opacity-90 transition-opacity">
                    Google Maps
                  </a>
                )}
              </div>
            </motion.div>

            {/* Event 2: Resepsi */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-4 md:row-span-3 lux-card rounded-2xl p-5 xl:p-6 flex flex-col relative overflow-hidden order-6 md:order-none"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C270] to-transparent opacity-50"></div>
              <div className="flex items-center gap-2 mb-3 xl:mb-4">
                <span className="text-lg xl:text-xl">💮</span>
                <h3 className="text-xs xl:text-sm font-bold tracking-widest uppercase text-[#E5C270]">Resepsi</h3>
              </div>
              <p className="text-xl xl:text-2xl font-serif text-white mb-2">{DATA.resepsi.time}</p>
              <p className="text-[11px] xl:text-xs leading-relaxed opacity-90 text-[#E5C270] mb-4">{DATA.resepsi.location}</p>
              <div className="mt-auto pt-4 border-t border-[#B8860B]/20">
                {DATA.resepsi.mapsLink && (
                  <a href={DATA.resepsi.mapsLink} target="_blank" rel="noreferrer" className="inline-block text-[10px] xl:text-xs gold-gradient-bg text-[#5C0000] px-3 xl:px-4 py-1.5 xl:py-2 rounded-full font-bold uppercase hover:opacity-90 transition-opacity">
                    Google Maps
                  </a>
                )}
              </div>
            </motion.div>

            {/* Virtual Gift Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-8 md:col-start-3 md:row-span-3 lux-card rounded-2xl p-6 xl:p-8 flex flex-col justify-center order-7 md:order-none relative"
            >
              <h3 className="text-xs xl:text-sm font-bold tracking-[0.2em] uppercase text-[#E5C270] mb-3 xl:mb-4 flex items-center gap-2">
                <Gift size={16} /> Digital Wedding Gift
              </h3>
              
              <div className="space-y-3 xl:space-y-4 overflow-y-auto pr-2 max-h-[160px] xl:max-h-[200px] mb-4 
                [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#5C0000] [&::-webkit-scrollbar-thumb]:bg-[#B8860B] [&::-webkit-scrollbar-thumb]:rounded-full"
              >
                {DATA.virtualGift.map((account, index) => (
                  <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#5C0000] p-4 rounded-xl border border-[#B8860B]/20 group gap-4 sm:gap-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 xl:w-12 xl:h-12 bg-white/10 rounded flex items-center justify-center font-bold text-xs xl:text-sm italic shrink-0 group-hover:bg-[#E5C270]/20 transition-colors text-white">
                        BANK
                      </div>
                      <div>
                        <p className="text-sm xl:text-base font-bold text-white">{account.bankName}</p>
                        <p className="text-lg xl:text-xl font-mono tracking-tighter text-[#E5C270]">{account.accountNumber}</p>
                        <p className="text-[10px] xl:text-xs uppercase opacity-70 text-white leading-none">A.N {account.accountName}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(account.accountNumber)}
                      className="gold-gradient-bg text-[#5C0000] text-[10px] xl:text-xs font-bold px-3 py-2 rounded-lg shrink-0 hover:opacity-90 transition-opacity flex items-center gap-1 w-full sm:w-auto justify-center shadow-[0_0_10px_rgba(229,194,112,0.3)]"
                    >
                      {copiedBank === account.accountNumber ? (
                        <><Check size={14} /> TERSALIN</>
                      ) : (
                        <><Copy size={14} /> SALIN NOREK</>
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[10px] xl:text-xs italic opacity-50 text-[#E5C270]">Terima kasih atas doa restu dan perhatian Bapak/Ibu/Saudara/i sekalian.</p>
            </motion.div>

          </div>

          {/* Bento Grid Container 2 (Gallery) */}
          <div className="w-full max-w-5xl xl:max-w-6xl md:h-[400px] xl:h-[450px]">
            
            {/* Gallery Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-full h-full lux-card rounded-2xl p-6 flex flex-col justify-center shadow-xl overflow-hidden"
            >
              <div className="w-full flex items-center justify-between mb-4">
                <h3 className="text-xs xl:text-sm font-bold tracking-[0.2em] uppercase text-[#E5C270] flex items-center gap-2">
                  <ImageIcon size={18} /> Memori Bahagia
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 w-full h-full min-h-[300px]">
                {DATA.gallery.slice(0, 4).map((url, i) => (
                  <div key={i} className="w-full h-full overflow-hidden rounded-xl border border-[#B8860B]/20 relative group bg-[#5C0000]">
                    <div className="absolute inset-0 bg-[#5C0000]/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                    <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale-[20%] sepia-[10%] group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-110" />
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Footer Details */}
          <div className="mt-8 flex flex-col items-center gap-4 border-t border-[#B8860B]/20 pt-6 pb-8 w-full max-w-5xl xl:max-w-6xl">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center opacity-60 text-[9px] xl:text-[10px] tracking-[0.2em] uppercase text-center">
              <span>#{DATA.groom.nickname}{DATA.bride.nickname}WEDDING</span>
              <div className="hidden md:block w-1 h-1 bg-[#E5C270] rounded-full"></div>
              <span>Strict Health Protocols Applied</span>
              <div className="hidden md:block w-1 h-1 bg-[#E5C270] rounded-full"></div>
              <span>RSVP via WhatsApp</span>
            </div>
            
            <div className="pt-2 text-[10px] tracking-widest text-[#E5C270] opacity-80 text-center mt-2 font-mono">
              Dibuat oleh <a href="https://www.instagram.com/uneeddeveloper/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors underline decoration-dotted underline-offset-4">uneeddeveloper</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
