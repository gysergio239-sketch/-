import { useEffect, useRef } from 'react';
import { createStructureFlowRenderer, STRUCTURE_FLOW_DEFAULTS } from './structureFlowRenderer';

export function StructureFlowBackground(props) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const optionsRef = useRef({ ...STRUCTURE_FLOW_DEFAULTS, ...props });
  optionsRef.current = { ...STRUCTURE_FLOW_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (!host || !canvas || reduceMotion || isMobile) return undefined;

    const renderer = createStructureFlowRenderer(canvas, () => optionsRef.current);
    let frame = 0;
    let visible = true;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      renderer.resize(bounds.width, bounds.height);
      renderer.render();
    };
    const tick = () => {
      if (!visible || document.hidden) {
        frame = 0;
        return;
      }
      renderer.render();
      frame = requestAnimationFrame(tick);
    };
    const resume = () => {
      if (visible && !document.hidden && !frame) frame = requestAnimationFrame(tick);
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      resume();
    });
    const onVisibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      resume();
    };

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    document.addEventListener('visibilitychange', onVisibility);
    resize();
    resume();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
    };
  }, []);

  const options = optionsRef.current;
  const mask = `linear-gradient(to bottom, transparent ${options.maskStart * 100}%, black ${options.maskSolid * 100}%, black 100%)`;

  return (
    <div
      ref={hostRef}
      className="structure-flow-background"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
