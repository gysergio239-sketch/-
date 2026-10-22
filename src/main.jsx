import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StructureFlowBackground } from './StructureFlowBackground';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

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
  const dialog = useRef(null);
  const page = useRef(null);
  const navigation = useRef(null);
  useEffect(() => {
    if (selected === null) return;
    dialog.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const opening = gsap.timeline({ defaults: { ease: 'expo.out' } });
      opening
        .fromTo('.structure-flow-background', { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 1 }, 0)
        .fromTo('.hero-title-line', { y: 80, scale: 1.1, letterSpacing: '0.015em' }, { y: 0, scale: 1, letterSpacing: '-0.065em', duration: 1.35, stagger: 0.15 }, 0.35)
        .fromTo('.hero-intro', { y: 42, autoAlpha: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, autoAlpha: 1, clipPath: 'inset(0% 0 0 0)', duration: 1 }, 0.95)
        .fromTo('.hero-left', { x: -60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.05 }, 1.25)
        .fromTo('.hero-right', { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.05 }, 1.25)
        .fromTo('.hero-center', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9 }, 1.45)
        .fromTo(navigation.current, { y: -80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1 }, 1.75)
        .fromTo('.hero-topline', { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .8 }, 1.9);

      ScrollTrigger.create({
        trigger: '.hero',
        start: 'bottom top+=80',
        onEnter: () => navigation.current?.classList.add('is-scrolled'),
        onLeaveBack: () => navigation.current?.classList.remove('is-scrolled'),
      });

      gsap.utils.toArray('.motion-section').forEach((section) => {
        const label = section.querySelector('.section-label');
        const title = section.querySelector('.motion-title');
        const supporting = section.querySelectorAll('.motion-support');
        const cards = section.querySelectorAll('.motion-card');
        const images = section.querySelectorAll('.image-reveal');
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 74%', once: true },
          defaults: { ease: 'power3.out' },
        });

        if (label) timeline.fromTo(label, { x: -42, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .8 }, 0);
        if (title) timeline.fromTo(title, { y: 135, letterSpacing: '.035em', clipPath: 'inset(0 0 100% 0)' }, { y: 0, letterSpacing: '-.06em', clipPath: 'inset(0 0 0% 0)', duration: 1.15 }, .08);
        if (supporting.length) timeline.fromTo(supporting, { y: 44, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .85, stagger: .1 }, .52);
        if (images.length) {
          timeline.fromTo(images, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.15, stagger: .14 }, .35)
            .fromTo(Array.from(images).map((item) => item.querySelector('img')).filter(Boolean), { scale: 1.16 }, { scale: 1.06, duration: 1.5, stagger: .14, ease: 'power2.out' }, .35);
        }
        if (cards.length) timeline.fromTo(cards, { y: 68, rotateX: isMobile ? 0 : 5, autoAlpha: 0, transformPerspective: 1000 }, { y: 0, rotateX: 0, autoAlpha: 1, duration: 1, stagger: .13 }, .62);
      });

      if (!isMobile) {
        gsap.utils.toArray('.parallax-image img').forEach((image) => {
          gsap.fromTo(image, { yPercent: -5 }, {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
          });
        });

        document.querySelectorAll('.project-image').forEach((card) => {
          const image = card.querySelector('img');
          const onMove = (event) => {
            const bounds = card.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width - .5) * 18;
            const y = ((event.clientY - bounds.top) / bounds.height - .5) * 18;
            gsap.to(image, { x, y, duration: .8, ease: 'power3.out', overwrite: 'auto' });
          };
          const onLeave = () => gsap.to(image, { x: 0, y: 0, duration: 1.1, ease: 'power3.out' });
          card.addEventListener('pointermove', onMove);
          card.addEventListener('pointerleave', onLeave);
          card._motionCleanup = () => { card.removeEventListener('pointermove', onMove); card.removeEventListener('pointerleave', onLeave); };
        });
      }
    }, page);

    const onVisibility = () => {
      if (document.hidden) {
        gsap.globalTimeline.pause();
      } else {
        gsap.globalTimeline.resume();
        ScrollTrigger.refresh();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      document.querySelectorAll('.project-image').forEach((card) => card._motionCleanup?.());
      ctx.revert();
    };
  }, []);
  function closeVideo() { dialog.current.close(); setSelected(null); }
  return <div ref={page} className="page">
    <header ref={navigation} className="nav shell">
      <a className="wordmark" href="#home" aria-label="返回首页">TUTU</a>
      <nav aria-label="主导航"><a href="#about">关于我</a><a href="#work">精选作品</a><a href="#expertise">我的优势</a></nav>
      <a className="contact-link" href="#contact">聊聊合作 <span>↗</span></a>
    </header>
    <main>
      <section className="hero" id="home">
        <StructureFlowBackground speed={1} pointSize={0.08} opacity={0.4} maskStart={0.2} maskSolid={0.5} />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <div className="hero-topline"><span className="tiny">INDEPENDENT CREATIVE PORTFOLIO</span><span>短视频编导 · 短视频运营</span></div>
          <div className="hero-intro"><span className="record-dot" /> 用影像讲故事，让内容被看见。</div>
          <h1><span className="title-mask"><span className="hero-title-line">MAKE IT</span></span><span className="title-mask hero-second"><span className="hero-title-line">MATTER<span className="accent">.</span></span></span></h1>
          <div className="hero-bottom"><a className="hero-left animated-fill" href="#work">探索我的作品 <span>↓</span></a><p className="hero-center">从一个想法，到一次共鸣。<br />让每一帧，都有它的意义。</p></div>
        </div>
      </section>
      <div className="index-bar shell"><span>STRATEGY. STORY. IMPACT.</span><span>策划 / 编导 / 剪辑 / 运营</span><span>SCROLL TO EXPLORE ↓</span></div>

      <section className="about section shell motion-section" id="about">
        <div className="section-label"><span>01 / ABOUT ME</span><span>内容背后的人</span></div>
        <div className="about-layout">
          <div className="portrait image-reveal parallax-image"><img src={`${base}media/portrait-phone.jpg`} alt="打电话的个人卡通形象" loading="lazy" /><span>BEHIND THE FRAME ↗</span></div>
          <div className="about-copy"><p className="tiny accent motion-support">短视频编导 / 短视频运营</p><h2 className="motion-title">好的内容，<br />始于观察。<br /><span className="muted">也成于执行。</span></h2><p className="body-copy motion-support">我关注内容的表达，也关注内容被看见的方式。<br />从选题策划、脚本分镜到剪辑呈现，连接创意与执行，让想法成为可以被感受到的作品。</p><p className="draft-note motion-support">个人简介草稿 · 工作经历与任职时间待补充</p><a className="text-link animated-fill motion-support" href="#contact">进一步认识我 <span>↗</span></a></div>
        </div>
        <div className="stats">{[
          { value: '04', unit: ' / FILMS', label: '本次收录作品' },
          { value: '5', unit: ' / YEARS', label: '从业年限' },
          { value: '100W+', unit: ' / VIEWS', label: '累计播放量' },
          { value: '3079301714@QQ.COM', unit: ' / CONTACT', label: '18064578010', compact: true },
        ].map(({ value, unit, label, compact }) => <div className={`motion-card${compact ? ' stat-contact' : ''}`} key={unit}><strong>{value}<span>{unit}</span></strong><p>{label}</p></div>)}</div>
      </section>

      <section className="work section shell motion-section" id="work">
        <div className="section-label"><span>02 / SELECTED WORK</span><span>精选作品 / 04</span></div>
        <div className="section-heading"><h2 className="motion-title">让作品<span className="muted">说话。</span></h2><p className="motion-support">不同形式，相同的认真。<br />点击作品，观看完整视频。</p></div>
        <div className="projects">{projects.map((project, i) => <article className="project motion-card" key={project.file}>
          <button className="project-image image-reveal parallax-image" onClick={() => setSelected(i)} aria-label={`播放${project.category}`}><img src={`${base}media/${project.cover}`} alt={project.category + '作品画面'} loading="lazy" /><span className="project-index">0{i + 1} / 04</span><span className="play-icon">↗</span><span className="watch-label">WATCH FILM <span>▷</span></span></button>
          <div className="project-meta"><span className="tiny">{project.category}</span><span>0{i + 1}</span></div><h3>{project.name}</h3><p>{project.description}</p>
        </article>)}</div>
      </section>

      <section className="expertise section shell motion-section" id="expertise">
        <div className="section-label"><span>03 / WHAT I DO</span><span>我的优势</span></div>
        <div className="section-heading"><h2 className="motion-title">有想法。<br /><span className="muted">更有落地的方法。</span></h2><p className="motion-support">把内容拆解成可执行的步骤，<br />再把每个步骤，连成完整的作品。</p></div>
        <div className="abilities">{abilities.map(([id, title, description, tags]) => <article className="motion-card" key={id}><div className="ability-top"><span>{id}</span><span>↗</span></div><h3>{title}</h3><p>{description}</p><span className="ability-tags">{tags}</span></article>)}</div>
        <p className="draft-note">能力介绍为首版草稿，可根据实际项目经历调整。</p>
      </section>

      <section className="contact section motion-section" id="contact"><div className="shell contact-inner">
        <div className="section-label"><span>04 / LET’S CONNECT</span><span>下一个好作品，从一次交流开始。</span></div>
        <p className="contact-lead motion-support">你有想法，<span className="muted">我们就有故事可讲。</span></p>
        <h2 className="motion-title">LET’S MAKE<br /><span>SOMETHING</span><br /><em>MATTER.</em><span className="contact-arrow">↗</span></h2>
        <div className="contact-details motion-support"><span>合作咨询 / 项目交流</span><div><p>邮箱 <a href="mailto:3079301714@qq.com">3079301714@qq.com</a></p><p>微信 <span>18064578010</span></p></div><a className="animated-fill" href="#home">回到顶部 ↑</a></div>
        <footer><a className="wordmark" href="#home">TUTU</a><span>短视频编导 · 短视频运营</span><span>PERSONAL PORTFOLIO / 2026</span></footer>
      </div></section>
    </main>
    {selected !== null && <dialog ref={dialog} className="video-dialog" onCancel={closeVideo} onClick={event => { if (event.target === dialog.current) closeVideo(); }}><div className="dialog-content"><div className="dialog-heading"><span>{projects[selected].category}</span><button onClick={closeVideo} autoFocus aria-label="关闭视频">关闭 ×</button></div><video src={`${base}media/${projects[selected].file}`} controls autoPlay playsInline /><p>{projects[selected].name}</p></div></dialog>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
