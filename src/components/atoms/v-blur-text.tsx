import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import type { AnimationSnapshot, BlurTextProps } from '@/types/v-blur-text';

const buildKeyframes = ({
  from,
  steps,
}: {
  from: AnimationSnapshot;
  steps: AnimationSnapshot[];
}): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((step) => Object.keys(step)),
  ]);
  const keyframes: Record<string, Array<string | number>> = {};

  for (const key of keys) {
    const values = [from[key] ?? null, ...steps.map((step) => step[key] ?? null)].filter(
      (value) => value !== null,
    ) as Array<string | number>;

    if (values.length > 0) {
      keyframes[key] = values;
    }
  }

  return keyframes;
};

export const VBlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (value: number) => value,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps): ReactElement => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const completionFiredRef = useRef(false);
  const initializedAnimationRef = useRef(false);
  const [inView, setInView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const [animationKey, setAnimationKey] = useState(0);

  const elements = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : text.split('')),
    [animateBy, text],
  );
  const defaultFrom = useMemo<AnimationSnapshot>(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction],
  );
  const defaultTo = useMemo<AnimationSnapshot[]>(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  );
  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = useMemo(
    () =>
      Array.from({ length: stepCount }, (_, index) =>
        stepCount === 1 ? 0 : index / (stepCount - 1),
      ),
    [stepCount],
  );
  const animateKeyframes = useMemo(
    () => buildKeyframes({ from: fromSnapshot, steps: toSnapshots }),
    [fromSnapshot, toSnapshots],
  );

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(root);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
    };
  }, [reduceMotion, rootMargin, threshold]);

  useEffect(() => {
    if (!initializedAnimationRef.current) {
      initializedAnimationRef.current = true;
      return;
    }

    completionFiredRef.current = false;
    setAnimationKey((currentKey) => currentKey + 1);
  }, [animateBy, animationFrom, animationTo, delay, direction, stepDuration, text]);

  const handleAnimationComplete = (index: number): void => {
    if (index === elements.length - 1 && !completionFiredRef.current && onAnimationComplete) {
      completionFiredRef.current = true;
      onAnimationComplete();
    }
  };
  const rootClassName = ['blur-text', className, 'flex flex-wrap'].filter(Boolean).join(' ');
  const renderSegment = ({ segment, index }: { segment: string; index: number }): string =>
    `${segment === ' ' ? '\u00A0' : segment}${
      animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''
    }`;

  return (
    <span ref={rootRef} className={rootClassName}>
      {!isMounted || reduceMotion
        ? elements.map((segment, index) => (
            <span key={`${animationKey}-static-${index}`} style={{ display: 'inline-block' }}>
              {renderSegment({ segment, index })}
            </span>
          ))
        : elements.map((segment, index) => (
            <motion.span
              key={`${animationKey}-${index}`}
              initial={fromSnapshot}
              animate={inView ? animateKeyframes : fromSnapshot}
              transition={{
                duration: totalDuration,
                times,
                delay: (index * delay) / 1000,
                ease: easing,
              }}
              style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
              onAnimationComplete={() => handleAnimationComplete(index)}
            >
              {renderSegment({ segment, index })}
            </motion.span>
          ))}
    </span>
  );
};

export default VBlurText;
