import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const AVATAR_ME = "https://cdn.poehali.dev/projects/cf94beb0-2b6f-4262-92f6-e0bdb9c55c56/files/94709b1e-3fed-4c12-9dd8-aceef6c08143.jpg";
const AVATAR_ALEX = "https://cdn.poehali.dev/projects/cf94beb0-2b6f-4262-92f6-e0bdb9c55c56/files/b8303fb0-9af1-4f9a-af8a-3bf14f27b12d.jpg";
const PHOTO_1 = "https://cdn.poehali.dev/projects/cf94beb0-2b6f-4262-92f6-e0bdb9c55c56/files/f79311a7-ea30-4268-b986-7af909368800.jpg";
const PHOTO_2 = "https://cdn.poehali.dev/projects/cf94beb0-2b6f-4262-92f6-e0bdb9c55c56/files/0e406c82-f1d7-46e9-912a-948182ec6cc9.jpg";
const PHOTO_3 = "https://cdn.poehali.dev/projects/cf94beb0-2b6f-4262-92f6-e0bdb9c55c56/files/be2464fb-bd3f-46e8-93d5-1ffde6153c8e.jpg";
const VIDEO_1 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const VIDEO_2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const VIDEO_3 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
const VIDEO_4 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

const FRIENDS = [
  { id: 1, name: "Алекс Морозов", avatar: AVATAR_ALEX, online: true, city: "Москва" },
  { id: 2, name: "Мария К.", avatar: AVATAR_ME, online: false, city: "СПб" },
  { id: 3, name: "Денис В.", avatar: AVATAR_ALEX, online: true, city: "Казань" },
  { id: 4, name: "Юля Т.", avatar: AVATAR_ME, online: true, city: "Москва" },
];
const CHATS = [
  { id: 1, name: "Алекс Морозов", avatar: AVATAR_ALEX, online: true, lastMsg: "Привет! Как дела?", time: "12:34", unread: 2 },
  { id: 2, name: "Мария К.", avatar: AVATAR_ME, online: false, lastMsg: "Увидимся завтра", time: "11:10", unread: 0 },
  { id: 3, name: "Денис В.", avatar: AVATAR_ALEX, online: true, lastMsg: "Отлично, договорились!", time: "вчера", unread: 0 },
];
const STORIES = [
  { id: 0, name: "Моя история", avatar: AVATAR_ME, isMe: true, seen: false, video: VIDEO_3 },
  { id: 1, name: "Алекс", avatar: AVATAR_ALEX, isMe: false, seen: false, video: VIDEO_4 },
  { id: 2, name: "Мария", avatar: AVATAR_ME, isMe: false, seen: true, video: VIDEO_1 },
  { id: 3, name: "Денис", avatar: AVATAR_ALEX, isMe: false, seen: false, video: VIDEO_2 },
  { id: 4, name: "Юля", avatar: AVATAR_ME, isMe: false, seen: true, video: VIDEO_3 },
];
const INITIAL_MESSAGES: Record<number, { id: number; text: string; out: boolean; time: string }[]> = {
  1: [
    { id: 1, text: "Привет! Как дела?", out: false, time: "12:30" },
    { id: 2, text: "Отлично, спасибо! Что новенького?", out: true, time: "12:31" },
    { id: 3, text: "Да вот, работаю над новым проектом 🚀", out: false, time: "12:33" },
    { id: 4, text: "Это интересно! Расскажи подробнее", out: true, time: "12:33" },
    { id: 5, text: "Привет! Как дела?", out: false, time: "12:34" },
  ],
  2: [
    { id: 1, text: "Привет!", out: true, time: "10:50" },
    { id: 2, text: "Привет 😊", out: false, time: "11:00" },
    { id: 3, text: "Увидимся завтра", out: false, time: "11:10" },
  ],
  3: [
    { id: 1, text: "Встреча в 18:00?", out: true, time: "вчера" },
    { id: 2, text: "Отлично, договорились!", out: false, time: "вчера" },
  ],
};
const INITIAL_POSTS = [
  { id: 1, author: "Анастасия Волкова", avatar: AVATAR_ME, time: "1 час назад", text: "Снял таймлапс заката 🎬", image: "", video: VIDEO_1, likes: 84, comments: 12, liked: false, views: 1203 },
  { id: 2, author: "Алекс Морозов", avatar: AVATAR_ALEX, time: "3 часа назад", text: "Отличный день в городе! 🌇", image: PHOTO_1, video: "", likes: 47, comments: 8, liked: false, views: 0 },
  { id: 3, author: "Анастасия Волкова", avatar: AVATAR_ME, time: "вчера", text: "Уличное искусство — вдохновение ✨", image: PHOTO_2, video: "", likes: 63, comments: 12, liked: true, views: 0 },
  { id: 4, author: "Денис В.", avatar: AVATAR_ALEX, time: "2 дня назад", text: "Влог с поездки 😄", image: "", video: VIDEO_2, likes: 112, comments: 19, liked: false, views: 3410 },
];
const PROFILE_VIDEOS = [
  { id: 1, src: VIDEO_3, title: "Горы 2024", views: "12K", duration: "2:14", cover: PHOTO_1 },
  { id: 2, src: VIDEO_4, title: "Закат над городом", views: "8.3K", duration: "1:45", cover: PHOTO_2 },
  { id: 3, src: VIDEO_1, title: "Лето в деревне", views: "5.1K", duration: "3:02", cover: PHOTO_3 },
  { id: 4, src: VIDEO_2, title: "Концерт", views: "21K", duration: "4:30", cover: PHOTO_1 },
];

type Tab = "feed" | "messages" | "profile";
type ProfileTab = "photos" | "videos";

// ── Ripple button ──────────────────────────────────────────────
function Ripple({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples((r) => r.filter((rr) => rr.id !== id)), 600);
    onClick?.();
  };
  return (
    <div className={`relative overflow-hidden select-none ${className}`} onClick={handleClick}>
      {children}
      {ripples.map((r) => (
        <span key={r.id} className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
          style={{ left: r.x - 40, top: r.y - 40, width: 80, height: 80 }} />
      ))}
    </div>
  );
}

// ── Video Player ───────────────────────────────────────────────
function VideoPlayer({ src, className = "" }: { src: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const ref = useRef<HTMLVideoElement>(null);
  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  };
  return (
    <div className={`relative bg-black overflow-hidden group ${className}`}>
      <video ref={ref} src={src} muted={muted} loop playsInline className="w-full h-full object-cover" onClick={toggle} />
      {!playing && (
        <div onClick={toggle} className="absolute inset-0 flex items-center justify-center bg-black/25 cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl" style={{ boxShadow: "0 4px 24px rgba(124,58,237,0.4)" }}>
            <Icon name="Play" size={26} className="text-purple-600 ml-1" />
          </div>
        </div>
      )}
      <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {playing && (
          <button onClick={toggle} className="w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white">
            <Icon name="Pause" size={14} />
          </button>
        )}
        <button onClick={() => { setMuted(m => !m); if (ref.current) ref.current.muted = !muted; }}
          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white">
          <Icon name={muted ? "VolumeX" : "Volume2"} size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Stories Viewer ─────────────────────────────────────────────
function StoriesViewer({ story, onClose, onNext, onPrev, total, current }: {
  story: typeof STORIES[0]; onClose: () => void; onNext: () => void; onPrev: () => void; total: number; current: number;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full h-full max-w-sm mx-auto" onClick={e => e.stopPropagation()}>
        <div className="absolute top-0 left-0 right-0 z-10 pt-safe px-3 pt-3">
          <div className="flex gap-1 mb-3">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className="h-0.5 flex-1 rounded-full overflow-hidden bg-white/30">
                <div className="h-full bg-white rounded-full"
                  style={i === current ? { animation: "story-progress 5s linear forwards" } : { width: i < current ? "100%" : "0%" }} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <img src={story.avatar} className="w-9 h-9 rounded-full object-cover ring-2 ring-white" />
            <span className="text-white font-medium text-sm">{story.name}</span>
            <span className="text-white/50 text-xs">сейчас</span>
            <button onClick={onClose} className="ml-auto w-8 h-8 flex items-center justify-center text-white">
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
        <video src={story.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        <button onClick={onPrev} className="absolute left-0 top-0 w-1/3 h-full z-10" />
        <button onClick={onNext} className="absolute right-0 top-0 w-1/3 h-full z-10" />
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-safe px-4 pb-6 flex items-center gap-2"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
          <input placeholder="Ответить..." className="flex-1 bg-white/15 backdrop-blur text-white placeholder-white/50 text-sm rounded-full px-4 py-2.5 outline-none border border-white/20" />
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/20">
            <Icon name="Send" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Video Call ─────────────────────────────────────────────────
function VideoCall({ caller, onEnd }: { caller: typeof CHATS[0]; onEnd: () => void }) {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sec, setSec] = useState(0);
  useState(() => { const t = setInterval(() => setSec(s => s + 1), 1000); return () => clearInterval(t); });
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return (
    <div className="fixed inset-0 z-[90] flex flex-col items-center justify-between pb-safe pt-safe py-12"
      style={{ background: "linear-gradient(160deg, #1a0533 0%, #0f1a3a 100%)" }}>
      <div className="text-center mt-8">
        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-500/40 mx-auto mb-4 shadow-2xl animate-pulse-ring">
          <img src={caller.avatar} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-1">{caller.name}</h2>
        <p className="text-purple-300 text-sm">{fmt(sec)}</p>
      </div>
      <div className="absolute top-4 right-4 w-24 h-36 rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-gray-800">
        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
          {camOn ? <img src={AVATAR_ME} className="w-12 h-12 rounded-full object-cover" /> : <Icon name="VideoOff" size={20} className="text-white/40" />}
        </div>
      </div>
      <div className="flex items-center gap-6 mb-4">
        <button onClick={() => setMicOn(m => !m)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${micOn ? "bg-white/15 text-white" : "bg-red-500 text-white"}`}>
          <Icon name={micOn ? "Mic" : "MicOff"} size={22} />
        </button>
        <button onClick={onEnd} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-xl">
          <Icon name="PhoneOff" size={26} />
        </button>
        <button onClick={() => setCamOn(c => !c)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${camOn ? "bg-white/15 text-white" : "bg-red-500 text-white"}`}>
          <Icon name={camOn ? "Video" : "VideoOff"} size={22} />
        </button>
      </div>
    </div>
  );
}

// ── FAB ───────────────────────────────────────────────────────
function FAB({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-2xl gradient-primary text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      style={{ boxShadow: "0 4px 20px rgba(124,58,237,0.45)" }}>
      <Icon name="Plus" size={24} />
    </button>
  );
}

// ── Main ───────────────────────────────────────────────────────
export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [profileTab, setProfileTab] = useState<ProfileTab>("photos");
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPost, setNewPost] = useState("");
  const [storyIdx, setStoryIdx] = useState<number | null>(null);
  const [videoCallChat, setVideoCallChat] = useState<typeof CHATS[0] | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);

  const activeChat = CHATS.find(c => c.id === activeChatId);
  const chatMessages = activeChatId ? (messages[activeChatId] || []) : [];

  const sendMessage = () => {
    if (!inputText.trim() || !activeChatId) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages(prev => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), { id: Date.now(), text: inputText.trim(), out: true, time }] }));
    setInputText("");
  };
  const toggleLike = (postId: number) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };
  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts(prev => [{ id: Date.now(), author: "Анастасия Волкова", avatar: AVATAR_ME, time: "только что", text: newPost.trim(), image: "", video: "", likes: 0, comments: 0, liked: false, views: 0 }, ...prev]);
    setNewPost(""); setShowNewPost(false);
  };

  const NAV = [
    { id: "feed" as Tab, icon: "Home", label: "Лента" },
    { id: "messages" as Tab, icon: "MessageCircle", label: "Чаты", badge: 2 },
    { id: "profile" as Tab, icon: "User", label: "Профиль" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f2ff] font-['Golos_Text',sans-serif]">
      {videoCallChat && <VideoCall caller={videoCallChat} onEnd={() => setVideoCallChat(null)} />}
      {storyIdx !== null && (
        <StoriesViewer story={STORIES[storyIdx]} current={storyIdx} total={STORIES.length}
          onClose={() => setStoryIdx(null)}
          onNext={() => storyIdx < STORIES.length - 1 ? setStoryIdx(storyIdx + 1) : setStoryIdx(null)}
          onPrev={() => storyIdx > 0 ? setStoryIdx(storyIdx - 1) : null} />
      )}

      {/* ── New post sheet ── */}
      {showNewPost && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end" onClick={() => setShowNewPost(false)}>
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <div className="flex items-center gap-3 mb-4">
              <img src={AVATAR_ME} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-sm text-gray-800">Анастасия Волкова</div>
                <div className="text-xs text-purple-500">Все друзья</div>
              </div>
            </div>
            <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Что у тебя нового?"
              className="w-full bg-transparent resize-none outline-none text-gray-800 placeholder-gray-400 min-h-[100px] text-[15px] leading-relaxed" autoFocus />
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
              <div className="flex gap-3">
                <button className="flex items-center gap-1.5 text-sm text-gray-400 active:text-purple-500">
                  <Icon name="Image" size={20} />
                </button>
                <button className="flex items-center gap-1.5 text-sm text-gray-400 active:text-purple-500">
                  <Icon name="Video" size={20} />
                </button>
                <button className="flex items-center gap-1.5 text-sm text-gray-400 active:text-purple-500">
                  <Icon name="MapPin" size={20} />
                </button>
              </div>
              <button onClick={addPost} disabled={!newPost.trim()}
                className="px-5 py-2 gradient-primary text-white text-sm font-semibold rounded-full disabled:opacity-40 active:opacity-80 transition-opacity">
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Top app bar ── */}
      {!activeChatId && (
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100"
          style={{ paddingTop: "env(safe-area-inset-top)" }}>
          <div className="flex items-center justify-between px-4 h-14">
            <span className="font-['Caveat'] text-2xl font-bold gradient-text">Волна</span>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-600">
                <Icon name="Search" size={20} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors relative text-gray-600">
                <Icon name="Bell" size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <img src={AVATAR_ME} className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-300" />
            </div>
          </div>
        </header>
      )}

      {/* ── Chat header ── */}
      {activeChatId && activeChat && (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100"
          style={{ paddingTop: "env(safe-area-inset-top)" }}>
          <div className="flex items-center gap-3 px-2 h-14">
            <button onClick={() => setActiveChatId(null)} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 text-gray-700">
              <Icon name="ArrowLeft" size={22} />
            </button>
            <div className="relative">
              <img src={activeChat.avatar} className="w-9 h-9 rounded-full object-cover" />
              {activeChat.online && <span className="online-dot absolute -bottom-0.5 -right-0.5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-900 leading-tight">{activeChat.name}</div>
              <div className={`text-xs ${activeChat.online ? "text-green-500" : "text-gray-400"}`}>
                {activeChat.online ? "в сети" : "не в сети"}
              </div>
            </div>
            <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 text-gray-600">
              <Icon name="Phone" size={20} />
            </button>
            <button onClick={() => setVideoCallChat(activeChat)} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 text-purple-600">
              <Icon name="Video" size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 text-gray-600">
              <Icon name="MoreVertical" size={20} />
            </button>
          </div>
        </header>
      )}

      {/* ── Content ── */}
      <main className="pb-20" style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom))" }}>

        {/* FEED */}
        {activeTab === "feed" && (
          <div className="animate-fade-in">
            {/* Stories */}
            <div className="bg-white border-b border-gray-100 px-3 py-3">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {STORIES.map((s, i) => (
                  <button key={s.id} onClick={() => setStoryIdx(i)} className="flex flex-col items-center gap-1.5 flex-shrink-0 active:scale-95 transition-transform">
                    <div className={`w-16 h-16 rounded-2xl overflow-hidden relative ${!s.seen ? "p-[2px] bg-gradient-to-br from-purple-500 to-pink-500" : "p-[2px] bg-gray-200"}`}>
                      <div className="w-full h-full rounded-[14px] overflow-hidden bg-white">
                        <img src={s.avatar} className="w-full h-full object-cover" />
                      </div>
                      {s.isMe && (
                        <div className="absolute bottom-0 right-0 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center border-2 border-white">
                          <Icon name="Plus" size={10} className="text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-600 truncate w-16 text-center font-medium">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div>
              {posts.map((post, i) => (
                <div key={post.id} className="bg-white mb-2 animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <img src={post.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold text-[14px] text-gray-900">{post.author}</div>
                      <div className="text-xs text-gray-400">{post.time}</div>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400">
                      <Icon name="MoreVertical" size={18} />
                    </button>
                  </div>
                  {post.text && <p className="px-4 pb-3 text-[14px] text-gray-800 leading-relaxed">{post.text}</p>}
                  {post.image && !post.video && (
                    <img src={post.image} className="w-full" style={{ maxHeight: 340, objectFit: "cover" }} />
                  )}
                  {post.video && (
                    <div className="relative">
                      <VideoPlayer src={post.video} className="w-full" style={{ maxHeight: 280 } as React.CSSProperties} />
                      {post.views > 0 && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-0.5">
                          <Icon name="Eye" size={11} className="text-white" />
                          <span className="text-white text-xs">{post.views.toLocaleString("ru")}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center px-2 py-1">
                    <Ripple onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium ${post.liked ? "text-pink-500" : "text-gray-500"}`}>
                      <Icon name="Heart" size={20} />
                      <span>{post.likes}</span>
                    </Ripple>
                    <Ripple className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-gray-500">
                      <Icon name="MessageCircle" size={20} />
                      <span>{post.comments}</span>
                    </Ripple>
                    <Ripple className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-gray-500 ml-auto">
                      <Icon name="Share2" size={20} />
                    </Ripple>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {activeTab === "messages" && !activeChatId && (
          <div className="animate-fade-in">
            <div className="px-4 py-3 bg-white mb-2">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
                <Icon name="Search" size={16} className="text-gray-400" />
                <span className="text-sm text-gray-400">Поиск по чатам</span>
              </div>
            </div>
            {CHATS.map((chat, i) => (
              <Ripple key={chat.id} onClick={() => setActiveChatId(chat.id)}
                className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-50 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.07}s` } as React.CSSProperties}>
                <div className="relative flex-shrink-0">
                  <img src={chat.avatar} className="w-13 h-13 rounded-full object-cover" style={{ width: 52, height: 52 }} />
                  {chat.online && <span className="online-dot absolute bottom-0 right-0" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-semibold text-[15px] text-gray-900">{chat.name}</span>
                    <span className={`text-xs ${chat.unread > 0 ? "text-purple-600 font-medium" : "text-gray-400"}`}>{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="flex-shrink-0 w-5 h-5 gradient-primary text-white text-xs rounded-full flex items-center justify-center font-bold">{chat.unread}</span>
                )}
              </Ripple>
            ))}
          </div>
        )}

        {/* CHAT WINDOW */}
        {activeTab === "messages" && activeChatId && (
          <div className="flex flex-col animate-fade-in" style={{ height: "calc(100dvh - 112px)" }}>
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              {chatMessages.map((msg, i) => (
                <div key={msg.id} className={`flex items-end gap-2 animate-fade-in ${msg.out ? "flex-row-reverse" : ""}`}
                  style={{ animationDelay: `${i * 0.03}s` }}>
                  {!msg.out && <img src={activeChat?.avatar} className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1" />}
                  <div className={`max-w-[75%] px-4 py-2.5 text-[14px] leading-relaxed ${msg.out ? "bubble-out" : "bubble-in"}`}>
                    {msg.text}
                    <div className={`text-[11px] mt-0.5 ${msg.out ? "text-white/60 text-right" : "text-gray-400"}`}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Chat input */}
            <div className="flex-shrink-0 bg-white border-t border-gray-100 px-3 py-2 flex items-center gap-2"
              style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}>
              <button className="w-10 h-10 flex items-center justify-center text-gray-400 flex-shrink-0">
                <Icon name="Smile" size={22} />
              </button>
              <input value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Сообщение..." className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-[14px] text-gray-800 placeholder-gray-400 outline-none" />
              {inputText.trim() ? (
                <button onClick={sendMessage} className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white flex-shrink-0 active:scale-95 transition-transform">
                  <Icon name="Send" size={18} />
                </button>
              ) : (
                <>
                  <button className="w-10 h-10 flex items-center justify-center text-gray-400 flex-shrink-0">
                    <Icon name="Paperclip" size={22} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center text-gray-400 flex-shrink-0">
                    <Icon name="Camera" size={22} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="animate-fade-in">
            {/* Cover */}
            <div className="relative">
              <div className="h-40 gradient-primary" />
              <div className="px-4 pb-4 bg-white">
                <div className="flex items-end gap-4 -mt-12 mb-3">
                  <div className="relative">
                    <img src={AVATAR_ME} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg" />
                    <span className="online-dot absolute -bottom-1 -right-1 w-4 h-4" />
                  </div>
                  <div className="pb-1 flex-1">
                    <h1 className="text-lg font-bold text-gray-900 leading-tight">Анастасия Волкова</h1>
                    <p className="text-sm text-gray-500">@nastya_v</p>
                  </div>
                  <button className="mb-1 px-4 py-2 border-2 border-purple-400 text-purple-600 rounded-full text-sm font-semibold active:bg-purple-50 transition-colors">
                    Изменить
                  </button>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-1 mb-3">
                  {[{ v: "142", l: "Записи" }, { v: "891", l: "Друзья" }, { v: "3.2K", l: "Подписчики" }].map(s => (
                    <div key={s.l} className="text-center py-2 rounded-xl active:bg-gray-50 cursor-pointer">
                      <div className="text-xl font-bold gradient-text">{s.v}</div>
                      <div className="text-xs text-gray-500">{s.l}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-3">Дизайнер интерфейсов 🌍 Люблю кофе и закаты над городом ✨</p>
                <div className="flex gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Icon name="MapPin" size={12} className="text-purple-400" /> Москва</span>
                  <span className="flex items-center gap-1"><Icon name="Briefcase" size={12} className="text-purple-400" /> UX Designer</span>
                </div>
              </div>
            </div>

            {/* Friends strip */}
            <div className="bg-white mt-2 px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-[15px] text-gray-800">Друзья · 891</span>
                <button className="text-sm text-purple-600 font-medium">Все</button>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                {FRIENDS.map(f => (
                  <div key={f.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 active:scale-95 transition-transform cursor-pointer">
                    <div className="relative">
                      <img src={f.avatar} className="w-14 h-14 rounded-2xl object-cover" />
                      {f.online && <span className="online-dot absolute -bottom-0.5 -right-0.5" />}
                    </div>
                    <span className="text-[11px] text-gray-600 w-14 text-center truncate font-medium">{f.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Media tabs */}
            <div className="bg-white mt-2">
              <div className="flex border-b border-gray-100">
                {(["photos", "videos"] as ProfileTab[]).map(t => (
                  <button key={t} onClick={() => setProfileTab(t)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold border-b-2 transition-colors ${profileTab === t ? "border-purple-600 text-purple-600" : "border-transparent text-gray-400"}`}>
                    <Icon name={t === "photos" ? "Image" : "Film"} size={16} />
                    {t === "photos" ? "Фото" : "Видео"}
                  </button>
                ))}
              </div>
              <div className="p-2">
                {profileTab === "photos" && (
                  <div className="grid grid-cols-3 gap-0.5">
                    {[PHOTO_1, PHOTO_2, PHOTO_3, PHOTO_1, PHOTO_2, PHOTO_3].map((img, i) => (
                      <div key={i} className="aspect-square overflow-hidden cursor-pointer active:opacity-80">
                        <img src={img} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                {profileTab === "videos" && (
                  <div className="grid grid-cols-2 gap-0.5">
                    {PROFILE_VIDEOS.map(v => (
                      <div key={v.id} className="relative aspect-video overflow-hidden cursor-pointer active:opacity-80">
                        <img src={v.cover} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-2">
                          <span className="self-end text-xs text-white bg-black/50 rounded px-1.5 py-0.5">{v.duration}</span>
                          <div>
                            <p className="text-white text-xs font-semibold truncate">{v.title}</p>
                            <p className="text-white/70 text-xs">{v.views}</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center">
                            <Icon name="Play" size={16} className="text-purple-600 ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FAB — only on feed tab, not in chat */}
      {activeTab === "feed" && <FAB onClick={() => setShowNewPost(true)} />}

      {/* ── Bottom Navigation Bar (Android style) ── */}
      {!activeChatId && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100"
          style={{ paddingBottom: "env(safe-area-inset-bottom)", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)" }}>
          <div className="flex">
            {NAV.map(item => {
              const active = activeTab === item.id;
              return (
                <Ripple key={item.id} onClick={() => { setActiveTab(item.id); setActiveChatId(null); }}
                  className="flex-1 flex flex-col items-center justify-center py-2 cursor-pointer relative">
                  <div className={`relative flex items-center justify-center w-12 h-7 rounded-full transition-all duration-200 ${active ? "gradient-primary" : ""}`}>
                    <Icon name={item.icon} size={22} className={active ? "text-white" : "text-gray-400"} />
                    {item.badge && !active && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{item.badge}</span>
                    )}
                  </div>
                  <span className={`text-[11px] mt-0.5 font-medium transition-colors ${active ? "text-purple-600" : "text-gray-400"}`}>{item.label}</span>
                </Ripple>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
