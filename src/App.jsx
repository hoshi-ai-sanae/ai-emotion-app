import React, { useState, useRef } from 'react';
import { Leaf, Star, Heart, BookOpen, Sparkles, ChevronRight, Check, Sprout, Smile, Mic } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [step1Progress, setStep1Progress] = useState(1);
  const [formData, setFormData] = useState({
    release: '',
    emotionTypes: [],
    emotionName: '',
    emotionWant: '',
    emotionWords: '',
    seed: '',
    action: '',
  });
  const [listeningField, setListeningField] = useState(null);
  const recognitionRef = useRef(null);

  const emotions = ['不安', '焦り', '悲しみ', '怒り', 'モヤモヤ', '寂しさ', '喜び', 'ワクワク', 'その他'];

  const TECHO_COVER_URL = './techo-cover.png';
  const BANNER_URL = './ai-course-banner.jpg';
  const HUG_IMAGE_URL = './hug.png';

  const toggleListening = (field) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('お使いのブラウザは音声入力に対応していません。ChromeやSafariの最新版をご利用ください。');
      return;
    }

    if (listeningField === field) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setListeningField(null);
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListeningField(field);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field] ? prev[field] + ' ' + transcript : transcript,
      }));
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'not-allowed') {
        alert('マイクの使用がブロックされています。ブラウザの設定から許可してください。');
      } else if (event.error === 'network') {
        alert('通信エラーです。GitHub Pages の URL から開くと改善する場合があります。');
      } else {
        alert('音声入力がうまく動作しませんでした。もう一度お試しください。');
      }
      setListeningField(null);
    };

    recognition.onend = () => {
      setListeningField(null);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const MicButton = ({ field, className = 'absolute bottom-3 right-3' }) => {
    const isListening = listeningField === field;
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleListening(field);
        }}
        title="音声で入力"
        className={`${className} p-2.5 rounded-full shadow-sm transition-all z-10 ${
          isListening
            ? 'bg-red-500 text-white animate-pulse shadow-red-500/30'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        <Mic className="w-5 h-5" />
      </button>
    );
  };

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const toggleEmotion = (emotion) => {
    setFormData((prev) => {
      const isSelected = prev.emotionTypes.includes(emotion);
      if (isSelected) {
        return { ...prev, emotionTypes: prev.emotionTypes.filter((e) => e !== emotion) };
      }
      return { ...prev, emotionTypes: [...prev.emotionTypes, emotion] };
    });
  };

  const navigateTo = (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    if (view === 'step1') setStep1Progress(1);
  };

  const nextStep1 = () => {
    setStep1Progress((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep1 = () => {
    setStep1Progress((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

const PromoBanner = () => (
  <div className="mt-12 text-center animate-in fade-in duration-700">
    <p className="text-green-800 font-medium mb-4 flex items-center justify-center gap-2">
      <Sparkles className="w-5 h-5 text-yellow-500" />
      特別なお知らせ
      <Sparkles className="w-5 h-5 text-yellow-500" />
    </p>

    <div className="bg-gradient-to-r from-green-900 to-green-950 rounded-2xl p-8 border border-green-700 text-white flex flex-col items-center shadow-lg">
      <div className="mb-3 text-yellow-400">
        <Sparkles className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-serif mb-3 text-yellow-50">
        このアプリはAIを使って作成しています
      </h3>

      <p className="text-green-100 text-sm mb-6 leading-relaxed">
        あなたもご自身のアイデアを
        AIでこんな風に形にしてみませんか？<br />
        興味のある方は公式LINEからお気軽にご連絡ください
      </p>

      <a
        href="https://lin.ee/3hg9NDN"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-500 text-green-950 px-6 py-3 rounded-full font-bold text-sm inline-flex items-center gap-2 hover:opacity-90 transition"
      >
        公式LINEはこちら
        <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-green-50 text-green-900 font-serif selection:bg-green-200">
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <BookOpen className="w-5 h-5 text-green-700" />
            <h1 className="text-lg font-medium text-green-800 tracking-wider">願いを叶える１年手帳</h1>
          </div>
          <div className="text-xs text-green-600 flex items-center gap-1">
            <Leaf className="w-3 h-3" /> 種まき編
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {currentView === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-1000">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 mb-4 shadow-inner">
                <Star className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-normal text-green-900 leading-relaxed">
                My Personal Year Plan
                <span className="block text-xl md:text-2xl mt-4 text-green-600">〜種まきの３ヶ月〜</span>
              </h2>
            </div>

            <div className="flex justify-center mb-8">
              <img
                src={TECHO_COVER_URL}
                alt="手帳の世界観イラスト"
                className="w-full max-w-sm rounded-2xl shadow-sm opacity-90 object-cover aspect-square"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentElement.innerHTML = `
                    <div class="w-full max-w-sm rounded-2xl shadow-sm bg-green-100 aspect-square flex flex-col items-center justify-center text-green-600 border border-green-200 p-8 text-center">
                      <p>ここに手帳の表紙画像<br/>(techo-cover.png)<br/>が表示されます</p>
                    </div>`;
                }}
              />
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-green-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-green-900">
                <Leaf className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-6 text-green-700 leading-loose text-center md:text-left">
                <p>毎日忙しい中で、ここまで生きてきたあなたは、もう十分がんばってきました。</p>
                <p>それでも「私は変われていない気がする」と、どこかで抱えているかもしれません。</p>
                <p>この場所は、もっとがんばるためのものではありません。周りと比べるのをやめ、あなた自身の成功を、あなたの中に落とし込んでいく。</p>
                <p className="font-medium text-green-900 text-lg mt-8">そのための静かな時間を、ここに用意しました。</p>
                <div className="pt-8 flex justify-center md:justify-start">
                  <button
                    onClick={() => navigateTo('step1')}
                    className="bg-green-800 hover:bg-green-700 text-white px-8 py-4 rounded-full transition-colors flex items-center gap-2 shadow-md"
                  >
                    心の土を整えるワークを始める <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-8 text-green-600 text-sm">
              <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-green-500" /> 比べない</span>
              <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-green-500" /> 焦らない</span>
              <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-green-500" /> 私のペースで</span>
            </div>
          </div>
        )}

        {currentView === 'step1' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 text-green-600 mb-8">
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Step 1</span>
              <span>心の土を整える・浄化 ({step1Progress}/3)</span>
            </div>

            {step1Progress === 1 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <h2 className="text-2xl font-medium text-green-900">今の悩み・気持ちを教えてください</h2>
                <p className="text-green-700 leading-relaxed">
                  ネガティブな感情も、ポジティブな気持ちも、そのまま書き出してみましょう。<br />
                  <span className="text-sm text-green-600">※マイクボタンを押すと音声で入力できます</span>
                </p>

                <div className="relative">
                  <textarea
                    value={formData.release}
                    onChange={(e) => handleInputChange(e, 'release')}
                    placeholder="例：もっと早く結果を出さなきゃと焦っている。周りの人がすごくて落ち込む。少しワクワクもしている..."
                    className="w-full h-40 p-6 pr-14 rounded-2xl bg-white border border-green-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 resize-none text-green-800 leading-relaxed shadow-sm transition-all"
                  />
                  <MicButton field="release" className="absolute bottom-4 right-4" />
                </div>

                <div className="pt-4 space-y-4">
                  <h3 className="text-lg font-medium text-green-900">それはどれが一番近いですか？（複数選択可）</h3>
                  <div className="flex flex-wrap gap-3">
                    {emotions.map((emotion) => {
                      const isSelected = formData.emotionTypes.includes(emotion);
                      return (
                        <button
                          key={emotion}
                          onClick={() => toggleEmotion(emotion)}
                          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-green-700 text-white shadow-md transform scale-105'
                              : 'bg-white border border-green-200 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          {emotion}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-8">
                  <button
                    onClick={nextStep1}
                    disabled={!formData.release || formData.emotionTypes.length === 0}
                    className="bg-green-800 disabled:bg-green-300 disabled:cursor-not-allowed hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors flex items-center gap-2 shadow-md"
                  >
                    次へ進む <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step1Progress === 2 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <h2 className="text-2xl font-medium text-green-900 mb-4">その感情に名前を付けてみましょう</h2>
                  <div className="bg-green-100/50 p-5 rounded-xl border border-green-200">
                    <p className="text-green-800 text-sm leading-relaxed flex items-start gap-3">
                      <Smile className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        感情を擬人化し名前を付けることで、感情と自分を切り離すことができます。<br />
                        感情に飲み込まれず、客観的に見る視点を身につけるための大切なワークです。
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-green-800 font-medium mb-2">名前をつけてあげる（例：ピーちゃん、モヤ君 など）</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.emotionName}
                        onChange={(e) => handleInputChange(e, 'emotionName')}
                        placeholder="感情のお名前"
                        className="w-full p-4 pr-14 rounded-xl bg-white border border-green-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 text-green-800 shadow-sm transition-all"
                      />
                      <MicButton field="emotionName" className="absolute top-1/2 right-2 transform -translate-y-1/2" />
                    </div>
                  </div>

                  {formData.emotionName && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div>
                        <label className="block text-green-800 font-medium mb-2">「{formData.emotionName}」は、どうしてほしいと思っていますか？</label>
                        <div className="relative">
                          <textarea
                            value={formData.emotionWant}
                            onChange={(e) => handleInputChange(e, 'emotionWant')}
                            placeholder="例：少し休ませてほしい、話をただ聞いてほしい..."
                            className="w-full h-24 p-4 pr-14 rounded-xl bg-white border border-green-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 resize-none text-green-800 shadow-sm transition-all"
                          />
                          <MicButton field="emotionWant" className="absolute bottom-3 right-3" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-green-800 font-medium mb-2">どんな声をかけてほしいと思っていますか？</label>
                        <div className="relative">
                          <textarea
                            value={formData.emotionWords}
                            onChange={(e) => handleInputChange(e, 'emotionWords')}
                            placeholder="例：がんばってるね、大丈夫だよ..."
                            className="w-full h-24 p-4 pr-14 rounded-xl bg-white border border-green-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 resize-none text-green-800 shadow-sm transition-all"
                          />
                          <MicButton field="emotionWords" className="absolute bottom-3 right-3" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-8">
                  <button onClick={prevStep1} className="text-green-600 hover:text-green-800 px-4 py-2 transition-colors">戻る</button>
                  <button
                    onClick={nextStep1}
                    disabled={!formData.emotionName}
                    className="bg-green-800 disabled:bg-green-300 disabled:cursor-not-allowed hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors flex items-center gap-2 shadow-md"
                  >
                    声をかけてみる <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step1Progress === 3 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <h2 className="text-2xl font-medium text-green-900 text-center mb-8">{formData.emotionName} に声をかけてみる</h2>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-green-100 text-center space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-green-200"></div>
                  <p className="text-xl md:text-2xl text-green-900 leading-loose font-medium">
                    「そうなんだね。<br />
                    {formData.emotionName}は『{formData.emotionTypes.join('、')}』と感じていたんだね。」
                  </p>

                  {formData.emotionWords && (
                    <p className="text-lg md:text-xl text-green-700 leading-relaxed italic">「{formData.emotionWords}」</p>
                  )}

                  <div className="py-6 flex justify-center">
                    <img
                      src={HUG_IMAGE_URL}
                      alt="感情を抱きしめるイラスト"
                      className="w-full max-w-xs mx-auto rounded-full shadow-md object-cover aspect-square border-4 border-green-50"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = `
                          <div class="w-full max-w-xs mx-auto rounded-full shadow-md bg-green-100 aspect-square flex flex-col items-center justify-center text-green-600 border-4 border-green-50 p-6 text-center">
                            <p class="text-sm">ここに抱きしめるイラスト<br/>が表示されます</p>
                          </div>`;
                      }}
                    />
                  </div>

                  <p className="text-green-800 md:text-lg">あなたの中にある感情を、そっと抱きしめてあげてくださいネ。</p>

                  <div className="mt-8 pt-8 border-t border-green-50 flex items-center justify-center gap-2 text-green-600 font-medium text-lg animate-pulse">
                    <Sprout className="w-6 h-6" />
                    小さな種がまかれました。
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button onClick={prevStep1} className="text-green-600 hover:text-green-800 px-4 py-2 transition-colors">戻る</button>
                  <button
                    onClick={() => navigateTo('step2')}
                    className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors flex items-center gap-2 shadow-md"
                  >
                    次のワークへ進む <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === 'step2' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 text-green-600 mb-8">
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Step 2</span>
              <span>種を選ぶ</span>
            </div>
            <h2 className="text-2xl font-medium text-green-900">1年後のGOALから、今日を創る</h2>
            <p className="text-green-700 leading-relaxed">心が少し軽くなったら、これからの３ヶ月で育てたい「願いの種」を選びましょう。</p>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute top-6 left-6 text-green-400"><Sprout className="w-6 h-6" /></div>
                <textarea
                  value={formData.seed}
                  onChange={(e) => handleInputChange(e, 'seed')}
                  placeholder="例：自分を責めない習慣をつける。月に1冊は好きな本を読む時間を作る..."
                  className="w-full h-40 p-6 pl-16 pr-14 rounded-2xl bg-white border border-green-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 resize-none text-green-800 leading-relaxed shadow-sm transition-all text-lg"
                />
                <MicButton field="seed" className="absolute bottom-4 right-4" />
              </div>
              <div className="flex justify-between items-center pt-4">
                <button onClick={() => navigateTo('step1')} className="text-green-600 hover:text-green-800 px-4 py-2 transition-colors">戻る</button>
                <button
                  onClick={() => navigateTo('step3')}
                  className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors flex items-center gap-2 shadow-md"
                >
                  次へ進む <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'step3' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 text-green-600 mb-8">
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Step 3</span>
              <span>今週のチャレンジ</span>
            </div>
            <h2 className="text-2xl font-medium text-green-900">小さな一歩を決める</h2>
            <p className="text-green-700 leading-relaxed">選んだ種に水をあげるように、今週できる「小さなチャレンジ」を書き出してみましょう。</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-3 pl-5 rounded-xl border border-green-200 shadow-sm focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition-all">
                <Leaf className="w-5 h-5 text-green-500" />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={formData.action}
                    onChange={(e) => handleInputChange(e, 'action')}
                    placeholder="今週の小さなチャレンジを1つ"
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-green-900 py-3 text-lg pr-12"
                  />
                  <MicButton field="action" className="absolute top-1/2 right-1 transform -translate-y-1/2" />
                </div>
              </div>
              <div className="flex justify-between items-center pt-8">
                <button onClick={() => navigateTo('step2')} className="text-green-600 hover:text-green-800 px-4 py-2 transition-colors">戻る</button>
                <button
                  onClick={() => navigateTo('finish')}
                  className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors flex items-center gap-2 shadow-md"
                >
                  完了する <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'finish' && (
          <div className="space-y-12 animate-in zoom-in-95 duration-700">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-green-100 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-600 mb-4">
                <Leaf className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-medium text-green-900">種まき完了</h2>
              <p className="text-green-700 leading-relaxed max-w-lg mx-auto">あなたの願いの種が、しっかりと心の土にまかれました。</p>

              <div className="bg-green-50/50 rounded-2xl p-6 md:p-8 mt-8 text-left border border-green-100/50 max-w-lg mx-auto shadow-sm">
                <h3 className="text-xl font-medium text-green-900 mb-6 flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  今回あなたが決めたこと
                </h3>
                <div className="space-y-6">
                  {(formData.emotionName || formData.emotionTypes.length > 0) && (
                    <div className="border-b border-green-100 pb-4">
                      <p className="text-sm text-green-600 mb-1 flex items-center gap-1"><Smile className="w-4 h-4" /> 見つめた感情</p>
                      <p className="text-green-800 font-medium">「{formData.emotionName || '今の気持ち'}（{formData.emotionTypes.join('、')}）」に寄り添い、受け入れました。</p>
                    </div>
                  )}
                  {formData.seed && (
                    <div className="border-b border-green-100 pb-4">
                      <p className="text-sm text-green-600 mb-1 flex items-center gap-1"><Sprout className="w-4 h-4" /> 育てたい願いの種</p>
                      <p className="text-green-800 font-medium whitespace-pre-wrap leading-relaxed">{formData.seed}</p>
                    </div>
                  )}
                  {formData.action && (
                    <div>
                      <p className="text-sm text-green-600 mb-1 flex items-center gap-1"><Check className="w-4 h-4" /> 今週の小さな一歩</p>
                      <p className="text-green-800 font-medium whitespace-pre-wrap leading-relaxed">{formData.action}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => navigateTo('home')}
                  className="text-green-700 border border-green-300 hover:bg-green-50 px-8 py-3 rounded-full transition-colors"
                >
                  ホームに戻る
                </button>
              </div>
            </div>
            <PromoBanner />
          </div>
        )}
      </main>

      <footer className="bg-green-100/50 py-8 text-center text-green-600 text-sm mt-auto border-t border-green-200">
        <p>© Lumiere夜明けの光</p>
      </footer>
    </div>
  );
};

export default App;
