import { useState } from "react";
import Icon from "@/components/ui/icon";

const AVATAR_ME = "https://cdn.poehali.dev/projects/cf94beb0-2b6f-4262-92f6-e0bdb9c55c56/files/94709b1e-3fed-4c12-9dd8-aceef6c08143.jpg";
const AVATAR_ALEX = "https://cdn.poehali.dev/projects/cf94beb0-2b6f-4262-92f6-e0bdb9c55c56/files/b8303fb0-9af1-4f9a-af8a-3bf14f27b12d.jpg";
const PHOTO_1 = "https://cdn.poehali.dev/projects/cf94beb0-2b6f-4262-92f6-e0bdb9c55c56/files/f79311a7-ea30-4268-b986-7af909368800.jpg";
const PHOTO_2 = "https://cdn.poehali.dev/projects/cf94beb0-2b6f-4262-92f6-e0bdb9c55c56/files/0e406c82-f1d7-46e9-912a-948182ec6cc9.jpg";
const PHOTO_3 = "https://cdn.poehali.dev/projects/cf94beb0-2b6f-4262-92f6-e0bdb9c55c56/files/be2464fb-bd3f-46e8-93d5-1ffde6153c8e.jpg";

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
  {
    id: 1,
    author: "Анастасия Волкова",
    avatar: AVATAR_ME,
    time: "2 часа назад",
    text: "Отличный день в городе! Поймала этот закат случайно 🌇",
    image: PHOTO_1,
    likes: 47,
    comments: 8,
    liked: false,
  },
  {
    id: 2,
    author: "Анастасия Волкова",
    avatar: AVATAR_ME,
    time: "вчера",
    text: "Уличное искусство — это всегда вдохновение ✨",
    image: PHOTO_2,
    likes: 63,
    comments: 12,
    liked: true,
  },
  {
    id: 3,
    author: "Анастасия Волкова",
    avatar: AVATAR_ME,
    time: "3 дня назад",
    text: "Лучшие вечера в хорошей компании 🎉",
    image: PHOTO_3,
    likes: 91,
    comments: 21,
    liked: false,
  },
];

type Tab = "profile" | "messages" | "feed";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPost, setNewPost] = useState("");

  const activeChat = CHATS.find((c) => c.id === activeChatId);
  const chatMessages = activeChatId ? (messages[activeChatId] || []) : [];

  const sendMessage = () => {
    if (!inputText.trim() || !activeChatId) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), { id: Date.now(), text: inputText.trim(), out: true, time }],
    }));
    setInputText("");
  };

  const toggleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts((prev) => [
      {
        id: Date.now(),
        author: "Анастасия Волкова",
        avatar: AVATAR_ME,
        time: "только что",
        text: newPost.trim(),
        image: "",
        likes: 0,
        comments: 0,
        liked: false,
      },
      ...prev,
    ]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0ebff 0%, #fce7f3 50%, #e0f2fe 100%)" }}>
      {/* Top nav */}
      <nav className="sticky top-0 z-50 glass-dark shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-['Caveat'] text-2xl font-semibold gradient-text">Волна</span>
          <div className="flex items-center gap-1">
            {(["feed", "profile", "messages"] as Tab[]).map((tab) => {
              const icons: Record<Tab, string> = { feed: "LayoutList", profile: "User", messages: "MessageCircle" };
              const labels: Record<Tab, string> = { feed: "Лента", profile: "Профиль", messages: "Сообщения" };
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setActiveChatId(null); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "gradient-primary text-white shadow-md"
                      : "text-gray-500 hover:bg-white/60"
                  }`}
                >
                  <Icon name={icons[tab]} size={16} />
                  <span className="hidden sm:inline">{labels[tab]}</span>
                </button>
              );
            })}
          </div>
          <div className="relative cursor-pointer">
            <img src={AVATAR_ME} className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-400 hover:scale-105 transition-transform" />
            <span className="online-dot absolute -bottom-0.5 -right-0.5" />
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* ─── PROFILE ─── */}
        {activeTab === "profile" && (
          <div className="animate-fade-in space-y-5">
            {/* Cover + avatar */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="h-52 gradient-primary relative">
                <div className="absolute inset-0 cover-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end gap-4">
                  <div className="relative">
                    <img src={AVATAR_ME} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg" />
                    <span className="online-dot absolute -bottom-1 -right-1 w-4 h-4" />
                  </div>
                  <div className="text-white mb-1">
                    <h1 className="text-2xl font-bold">Анастасия Волкова</h1>
                    <p className="text-white/80 text-sm">@nastya_v · Москва</p>
                  </div>
                  <button className="ml-auto mb-1 px-4 py-1.5 bg-white/20 backdrop-blur text-white rounded-full text-sm font-medium border border-white/40 hover:bg-white/30 transition-all">
                    Редактировать
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 animate-fade-in delay-100">
              {[
                { label: "Записи", value: "142" },
                { label: "Друзья", value: "891" },
                { label: "Подписчики", value: "3.2K" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 text-center hover-scale cursor-pointer">
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* About */}
            <div className="glass rounded-2xl p-5 animate-fade-in delay-200">
              <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Icon name="Info" size={16} className="text-purple-500" /> О себе
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Дизайнер интерфейсов и любитель путешествий 🌍 Работаю в IT, обожаю кофе и закаты над городом.
                Ищу вдохновение в каждом дне ✨
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Дизайн", "Путешествия", "Фото", "Музыка", "Кино"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: "linear-gradient(135deg, #ede9fe, #fce7f3)", color: "#7c3aed" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-2"><Icon name="MapPin" size={14} className="text-purple-400" /> Москва, Россия</div>
                <div className="flex items-center gap-2"><Icon name="Briefcase" size={14} className="text-purple-400" /> UX Designer</div>
                <div className="flex items-center gap-2"><Icon name="GraduationCap" size={14} className="text-purple-400" /> МГУ, 2019</div>
                <div className="flex items-center gap-2"><Icon name="Calendar" size={14} className="text-purple-400" /> На Волне с 2024</div>
              </div>
            </div>

            {/* Friends */}
            <div className="glass rounded-2xl p-5 animate-fade-in delay-300">
              <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Icon name="Users" size={16} className="text-purple-500" /> Друзья
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FRIENDS.map((f) => (
                  <div key={f.id} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer">
                    <div className="relative">
                      <img src={f.avatar} className="w-14 h-14 rounded-xl object-cover" />
                      {f.online && <span className="online-dot absolute -bottom-0.5 -right-0.5" />}
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-gray-700 leading-tight">{f.name}</div>
                      <div className="text-xs text-gray-400">{f.city}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="glass rounded-2xl p-5 animate-fade-in delay-400">
              <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Icon name="Image" size={16} className="text-purple-500" /> Фотографии
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {[PHOTO_1, PHOTO_2, PHOTO_3, PHOTO_1, PHOTO_2, PHOTO_3].map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden hover-scale cursor-pointer">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── FEED ─── */}
        {activeTab === "feed" && (
          <div className="max-w-xl mx-auto space-y-4 animate-fade-in">
            {/* New post */}
            <div className="glass rounded-2xl p-4">
              <div className="flex gap-3">
                <img src={AVATAR_ME} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Что у тебя нового?"
                    className="w-full bg-transparent resize-none outline-none text-sm text-gray-700 placeholder-gray-400 min-h-[60px]"
                  />
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-500 transition-colors px-2 py-1 rounded-lg hover:bg-purple-50">
                        <Icon name="Image" size={14} /> Фото
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-500 transition-colors px-2 py-1 rounded-lg hover:bg-purple-50">
                        <Icon name="Smile" size={14} /> Эмоция
                      </button>
                    </div>
                    <button
                      onClick={addPost}
                      className="px-4 py-1.5 gradient-primary text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                    >
                      Опубликовать
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post, i) => (
              <div key={post.id} className="glass rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={post.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-800">{post.author}</div>
                      <div className="text-xs text-gray-400">{post.time}</div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <Icon name="MoreHorizontal" size={18} />
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{post.text}</p>
                </div>
                {post.image && (
                  <img src={post.image} className="w-full max-h-72 object-cover cursor-pointer hover:opacity-95 transition-opacity" />
                )}
                <div className="p-3 flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-all px-3 py-1.5 rounded-full ${
                      post.liked ? "text-pink-500 bg-pink-50" : "text-gray-400 hover:text-pink-400 hover:bg-pink-50"
                    }`}
                  >
                    <Icon name="Heart" size={16} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-500 transition-colors px-3 py-1.5 rounded-full hover:bg-purple-50">
                    <Icon name="MessageCircle" size={16} />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-500 transition-colors px-3 py-1.5 rounded-full hover:bg-blue-50 ml-auto">
                    <Icon name="Share2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── MESSAGES ─── */}
        {activeTab === "messages" && (
          <div className="animate-fade-in">
            {!activeChatId ? (
              <div className="max-w-xl mx-auto">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} className="text-purple-500" /> Сообщения
                </h2>
                <div className="space-y-2">
                  {CHATS.map((chat, i) => (
                    <div
                      key={chat.id}
                      onClick={() => setActiveChatId(chat.id)}
                      className="glass rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 animate-fade-in"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="relative flex-shrink-0">
                        <img src={chat.avatar} className="w-12 h-12 rounded-full object-cover" />
                        {chat.online && <span className="online-dot absolute -bottom-0.5 -right-0.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <span className="font-semibold text-sm text-gray-800">{chat.name}</span>
                          <span className="text-xs text-gray-400">{chat.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{chat.lastMsg}</p>
                      </div>
                      {chat.unread > 0 && (
                        <span className="flex-shrink-0 w-5 h-5 gradient-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-xl mx-auto flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
                {/* Chat header */}
                <div className="glass rounded-2xl p-3 flex items-center gap-3 mb-3 flex-shrink-0">
                  <button
                    onClick={() => setActiveChatId(null)}
                    className="text-gray-400 hover:text-purple-500 transition-colors p-1"
                  >
                    <Icon name="ArrowLeft" size={20} />
                  </button>
                  <div className="relative">
                    <img src={activeChat?.avatar} className="w-10 h-10 rounded-full object-cover" />
                    {activeChat?.online && <span className="online-dot absolute -bottom-0.5 -right-0.5" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-800">{activeChat?.name}</div>
                    <div className={`text-xs ${activeChat?.online ? "text-green-500" : "text-gray-400"}`}>
                      {activeChat?.online ? "В сети" : "Не в сети"}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-purple-500 transition-colors p-1">
                    <Icon name="Phone" size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-purple-500 transition-colors p-1">
                    <Icon name="Video" size={18} />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 px-1 pb-3">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 animate-fade-in ${msg.out ? "flex-row-reverse" : ""}`}
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      {!msg.out && (
                        <img src={activeChat?.avatar} className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1" />
                      )}
                      <div className={`max-w-[72%] px-4 py-2.5 text-sm leading-relaxed ${msg.out ? "bubble-out" : "bubble-in"}`}>
                        {msg.text}
                        <div className={`text-xs mt-1 ${msg.out ? "text-white/60 text-right" : "text-gray-400"}`}>{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="glass rounded-2xl p-2 flex items-center gap-2 flex-shrink-0">
                  <button className="text-gray-400 hover:text-purple-500 transition-colors p-2">
                    <Icon name="Smile" size={20} />
                  </button>
                  <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Написать сообщение..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                  <button className="text-gray-400 hover:text-purple-500 transition-colors p-2">
                    <Icon name="Paperclip" size={18} />
                  </button>
                  <button
                    onClick={sendMessage}
                    className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity flex-shrink-0"
                  >
                    <Icon name="Send" size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
