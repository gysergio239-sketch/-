import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const base = import.meta.env.BASE_URL;
const projects = [
  { name: '日常，也值得被记录。', category: 'VLOG / 生活影像', file: 'vlog.mp4', cover: 'vlog.jpg', description: '从生活的细节出发，在镜头与节奏之间，留下真实的情绪。' },
  { name: '让每一拍，都有记忆点。', category: 'RHYTHM / 快闪卡点', file: '快闪卡点.mp4', cover: 'rhythm.jpg', description: '画面、音乐、节奏，在短时间内建立鲜明的视觉印象。' },
  { name: '把卖点，讲进需求里。', category: 'COMMERCIAL / 信息流带货', file: '信息流带货.mp4', cover: 'commercial.jpg', description: '围绕产品与使用场景组织内容，让表达清楚，让价值可见。' },
  { name: '探索内容表达的新方式。', category: 'AI CONTENT / 数字人口播', file: 'digital-web.mp4', cover: 'digital.jpg', description: '将数字人融入视频表达，探索更高效的内容制作流程。' },
];
const abilities = [
  ['01', '内容策划', '从选题，到一句有用的表达。', '账号定位 / 选题方向 / 脚本结构'],
  ['02', '影像编导', '把文字里的想法，变成画面。', '分镜设计 / 拍摄执行 / 叙事节奏'],
  ['03', '短视频运营', '让内容发布，成为下一步的起点。', '内容规划 / 数据复盘 / 迭代优化'],
  ['04', '后期与 AI 创作', '让工具，服务于内容本身。', '剪辑包装 / 音画设计 / AI 工作流'],
];

function App() {
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);
  const hero = useRef(null);
  const dialog = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hero.current.play().catch(() => setPlaying(false));
    }
  }, []);
  useEffect(() => {
    if (selected === null) return;
    dialog.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);
  function closeVideo() { dialog.current.close(); setSelected(null); }
  function toggleHero() {
    if (hero.current.paused) hero.current.play().catch(() => setPlaying(false));
    else hero.current.pause();
  }
  return <>
    <header className="nav shell">
      <a className="wordmark" href="#home" aria-label="返回首页">FRAME<span>®</span></a>
      <nav aria-label="主导航"><a href="#about">关于我</a><a href="#work">精选作品</a><a href="#expertise">我的优势</a></nav>
      <a className="contact-link" href="#contact">聊聊合作 <span>↗</span></a>
    </header>
    <main>
      <section className="hero" id="home">
        <video ref={hero} className="hero-video" src={`${base}media/hero.mp4`} poster={`${base}media/vlog.jpg`} muted loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <div className="hero-topline"><span className="tiny">INDEPENDENT CREATIVE PORTFOLIO</span><span>短视频编导 · 短视频运营</span></div>
          <div className="hero-intro"><span className="record-dot" /> 用影像讲故事，让内容被看见。</div>
          <h1><span>MAKE IT</span><span className="hero-second">MATTER<span className="accent">.</span></span></h1>
          <div className="hero-bottom"><a href="#work">探索我的作品 <span>↓</span></a><p>从一个想法，到一次共鸣。<br />让每一帧，都有它的意义。</p><button onClick={toggleHero} aria-label={playing ? '暂停背景视频' : '播放背景视频'}>{playing ? 'Ⅱ 暂停影像' : '▷ 播放影像'}</button></div>
        </div>
      </section>
      <div className="index-bar shell"><span>STRATEGY. STORY. IMPACT.</span><span>策划 / 编导 / 剪辑 / 运营</span><span>SCROLL TO EXPLORE ↓</span></div>

      <section className="about section shell" id="about">
        <div className="section-label"><span>01 / ABOUT ME</span><span>内容背后的人</span></div>
        <div className="about-layout">
          <div className="portrait"><img src={`${base}media/portrait-real.png`} alt="个人真人照片" loading="lazy" /><span>BEHIND THE FRAME ↗</span></div>
          <div className="about-copy"><p className="tiny accent">短视频编导 / 短视频运营</p><h2>好的内容，<br />始于观察。<br /><span className="muted">也成于执行。</span></h2><p className="body-copy">我关注内容的表达，也关注内容被看见的方式。<br />从选题策划、脚本分镜到剪辑呈现，连接创意与执行，让想法成为可以被感受到的作品。</p><p className="draft-note">个人简介草稿 · 工作经历与任职时间待补充</p><a className="text-link" href="#contact">进一步认识我 <span>↗</span></a></div>
        </div>
        <div className="stats"><div><strong>04<span> / FILMS</span></strong><p>本次收录作品</p></div><div><strong>—<span> / YEARS</span></strong><p>从业年限 · 待补充</p></div><div><strong>—<span> / VIEWS</span></strong><p>累计播放量 · 待补充</p></div><div><strong>—<span> / CONTACT</span></strong><p>邮箱 / 微信 · 待补充</p></div></div>
      </section>

      <section className="work section shell" id="work">
        <div className="section-label"><span>02 / SELECTED WORK</span><span>精选作品 / 04</span></div>
        <div className="section-heading"><h2>让作品<span className="muted">说话。</span></h2><p>不同形式，相同的认真。<br />点击作品，观看完整视频。</p></div>
        <div className="projects">{projects.map((project, i) => <article className="project" key={project.file}>
          <button className="project-image" onClick={() => setSelected(i)} aria-label={`播放${project.category}`}><img src={`${base}media/${project.cover}`} alt={project.category + '作品画面'} loading="lazy" /><span className="project-index">0{i + 1} / 04</span><span className="play-icon">↗</span><span className="watch-label">WATCH FILM <span>▷</span></span></button>
          <div className="project-meta"><span className="tiny">{project.category}</span><span>0{i + 1}</span></div><h3>{project.name}</h3><p>{project.description}</p>
        </article>)}</div>
      </section>

      <section className="expertise section shell" id="expertise">
        <div className="section-label"><span>03 / WHAT I DO</span><span>我的优势</span></div>
        <div className="section-heading"><h2>有想法。<br /><span className="muted">更有落地的方法。</span></h2><p>把内容拆解成可执行的步骤，<br />再把每个步骤，连成完整的作品。</p></div>
        <div className="abilities">{abilities.map(([id, title, description, tags]) => <article key={id}><div className="ability-top"><span>{id}</span><span>↗</span></div><h3>{title}</h3><p>{description}</p><span className="ability-tags">{tags}</span></article>)}</div>
        <p className="draft-note">能力介绍为首版草稿，可根据实际项目经历调整。</p>
      </section>

      <section className="contact section" id="contact"><div className="shell contact-inner">
        <div className="section-label"><span>04 / LET’S CONNECT</span><span>下一个好作品，从一次交流开始。</span></div>
        <p className="contact-lead">你有想法，<span className="muted">我们就有故事可讲。</span></p>
        <h2>LET’S MAKE<br /><span>SOMETHING</span><br /><em>MATTER.</em><span className="contact-arrow">↗</span></h2>
        <div className="contact-details"><span>合作咨询 / 项目交流</span><div><p>邮箱 <span>待补充</span></p><p>微信 <span>待补充</span></p></div><a href="#home">回到顶部 ↑</a></div>
        <footer><a className="wordmark" href="#home">FRAME<span>®</span></a><span>短视频编导 · 短视频运营</span><span>PERSONAL PORTFOLIO / 2026</span></footer>
      </div></section>
    </main>
    {selected !== null && <dialog ref={dialog} className="video-dialog" onCancel={closeVideo} onClick={event => { if (event.target === dialog.current) closeVideo(); }}><div className="dialog-content"><div className="dialog-heading"><span>{projects[selected].category}</span><button onClick={closeVideo} autoFocus aria-label="关闭视频">关闭 ×</button></div><video src={`${base}media/${projects[selected].file}`} controls autoPlay playsInline /><p>{projects[selected].name}</p></div></dialog>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
