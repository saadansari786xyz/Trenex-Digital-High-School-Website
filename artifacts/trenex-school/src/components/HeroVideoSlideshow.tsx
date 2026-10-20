import { useEffect, useRef, useState, type RefObject } from 'react';

type HeroClip = {
  scene: string;
  desktopSrc: string;
  mobileSrc: string;
  poster: string;
};

type VideoSlot = 'a' | 'b';

// Replace local URLs here when refreshing the hero footage. Source pages,
// creators, and license notes are kept in public/videos/SOURCES.txt.
const HERO_CLIPS: HeroClip[] = [
  {
    scene: 'Teacher teaching in a classroom',
    desktopSrc: '/videos/classroom-hero.mp4',
    mobileSrc: '/videos/scenes/mobile/teacher-lesson.mp4',
    poster: '/videos/scenes/posters/teacher-lesson.jpg',
  },
  {
    scene: 'Children learning together',
    desktopSrc: '/videos/scenes/desktop/children-learning.mp4',
    mobileSrc: '/videos/scenes/mobile/children-learning.mp4',
    poster: '/videos/scenes/posters/children-learning.jpg',
  },
  {
    scene: 'Hands-on science activities',
    desktopSrc: '/videos/scenes/desktop/science-exploration.mp4',
    mobileSrc: '/videos/scenes/mobile/science-exploration.mp4',
    poster: '/videos/scenes/posters/science-exploration.jpg',
  },
  {
    scene: 'A student choosing a book in the library',
    desktopSrc: '/videos/scenes/desktop/library-visit.mp4',
    mobileSrc: '/videos/scenes/mobile/library-visit.mp4',
    poster: '/videos/scenes/posters/library-visit.jpg',
  },
  {
    scene: 'Students learning with computers',
    desktopSrc: '/videos/scenes/desktop/computer-coding.mp4',
    mobileSrc: '/videos/scenes/mobile/computer-coding.mp4',
    poster: '/videos/scenes/posters/computer-coding.jpg',
  },
  {
    scene: 'Video editing on a computer',
    desktopSrc: '/videos/scenes/desktop/video-editing.mp4',
    mobileSrc: '/videos/scenes/mobile/video-editing.mp4',
    poster: '/videos/scenes/posters/video-editing.jpg',
  },
  {
    scene: 'Digital graphic design',
    desktopSrc: '/videos/scenes/desktop/graphic-design.mp4',
    mobileSrc: '/videos/scenes/mobile/graphic-design.mp4',
    poster: '/videos/scenes/posters/graphic-design.jpg',
  },
  {
    scene: 'A teacher helping students with their work',
    desktopSrc: '/videos/scenes/desktop/teacher-support.mp4',
    mobileSrc: '/videos/scenes/mobile/teacher-support.mp4',
    poster: '/videos/scenes/posters/teacher-support.jpg',
  },
  {
    scene: 'Students walking through a school campus',
    desktopSrc: '/videos/scenes/desktop/campus-life.mp4',
    mobileSrc: '/videos/scenes/mobile/campus-life.mp4',
    poster: '/videos/scenes/posters/campus-life.jpg',
  },
];

const CLIP_HOLD_MS = 5600;
const CROSSFADE_MS = 1250;
const RECHECK_READY_MS = 250;

function nextAvailableIndex(from: number, unavailable: Set<number>) {
  for (let step = 1; step <= HERO_CLIPS.length; step += 1) {
    const index = (from + step) % HERO_CLIPS.length;
    if (!unavailable.has(index)) return index;
  }
  return null;
}

function readLowBandwidthPreference() {
  if (typeof window === 'undefined') return false;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  return (
    window.matchMedia('(max-width: 700px)').matches ||
    connection?.saveData === true ||
    ['slow-2g', '2g', '3g'].includes(connection?.effectiveType ?? '')
  );
}

function HeroVideoSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlot, setActiveSlot] = useState<VideoSlot>('a');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lowBandwidth, setLowBandwidth] = useState(readLowBandwidthPreference);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [playbackUnavailable, setPlaybackUnavailable] = useState(false);
  const [unavailableClips, setUnavailableClips] = useState<Set<number>>(
    () => new Set(),
  );
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const incomingIndex = nextAvailableIndex(activeIndex, unavailableClips);
  const videoAIndex = activeSlot === 'a' ? activeIndex : incomingIndex;
  const videoBIndex = activeSlot === 'b' ? activeIndex : incomingIndex;
  const activeVideoRef = activeSlot === 'a' ? videoARef : videoBRef;
  const incomingVideoRef = activeSlot === 'a' ? videoBRef : videoARef;

  useEffect(() => {
    const bandwidthQuery = window.matchMedia('(max-width: 700px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreferences = () => {
      setLowBandwidth(readLowBandwidthPreference());
      setReducedMotion(motionQuery.matches);
    };

    bandwidthQuery.addEventListener('change', updatePreferences);
    motionQuery.addEventListener('change', updatePreferences);
    return () => {
      bandwidthQuery.removeEventListener('change', updatePreferences);
      motionQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  useEffect(() => {
    if (
      reducedMotion ||
      playbackUnavailable ||
      unavailableClips.has(activeIndex)
    ) {
      return;
    }

    const activeVideo = activeVideoRef.current;
    if (!activeVideo) return;

    void activeVideo.play().catch(() => setPlaybackUnavailable(true));
  }, [
    activeIndex,
    activeSlot,
    activeVideoRef,
    lowBandwidth,
    playbackUnavailable,
    reducedMotion,
    unavailableClips,
  ]);

  useEffect(() => {
    if (!unavailableClips.has(activeIndex)) return;
    const replacementIndex = nextAvailableIndex(activeIndex, unavailableClips);
    if (replacementIndex === null) return;
    setActiveIndex(replacementIndex);
    setActiveSlot((slot) => (slot === 'a' ? 'b' : 'a'));
    setIsTransitioning(false);
  }, [activeIndex, unavailableClips]);

  useEffect(() => {
    if (
      reducedMotion ||
      playbackUnavailable ||
      incomingIndex === null ||
      unavailableClips.has(activeIndex)
    ) {
      return;
    }

    let cancelled = false;
    let startTimer = 0;
    let readyTimer = 0;
    let finishTimer = 0;

    const beginTransition = () => {
      if (cancelled) return;
      const incomingVideo = incomingVideoRef.current;
      const activeVideo = activeVideoRef.current;
      if (!incomingVideo || !activeVideo) return;

      if (incomingVideo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        readyTimer = window.setTimeout(beginTransition, RECHECK_READY_MS);
        return;
      }

      incomingVideo.currentTime = 0;
      void incomingVideo
        .play()
        .then(() => {
          if (cancelled) {
            incomingVideo.pause();
            return;
          }
          setIsTransitioning(true);
          finishTimer = window.setTimeout(() => {
            activeVideo.pause();
            setActiveIndex(incomingIndex);
            setActiveSlot((slot) => (slot === 'a' ? 'b' : 'a'));
            setIsTransitioning(false);
          }, CROSSFADE_MS);
        })
        .catch(() => setPlaybackUnavailable(true));
    };

    startTimer = window.setTimeout(beginTransition, CLIP_HOLD_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(readyTimer);
      window.clearTimeout(finishTimer);
    };
  }, [
    activeIndex,
    activeSlot,
    activeVideoRef,
    incomingIndex,
    incomingVideoRef,
    playbackUnavailable,
    reducedMotion,
    unavailableClips,
  ]);

  const handleVideoError = (index: number) => {
    setUnavailableClips((previous) => new Set(previous).add(index));
  };

  const renderVideo = (
    slot: VideoSlot,
    index: number | null,
    videoRef: RefObject<HTMLVideoElement | null>,
  ) => {
    if (index === null || reducedMotion || playbackUnavailable) return null;
    const clip = HERO_CLIPS[index];
    const isActive = slot === activeSlot && index === activeIndex;
    const isAvailable = !unavailableClips.has(index);
    const classes = [
      'hero-video',
      isActive && isAvailable ? 'is-active' : 'is-incoming',
      isTransitioning ? 'is-transitioning' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <video
        key={`${slot}-${index}-${lowBandwidth ? 'mobile' : 'desktop'}`}
        ref={videoRef}
        className={classes}
        src={lowBandwidth ? clip.mobileSrc : clip.desktopSrc}
        poster={clip.poster}
        autoPlay={isActive && isAvailable}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        data-testid={`hero-video-${slot}`}
        onError={() => handleVideoError(index)}
      />
    );
  };

  return (
    <div className="hero-video-slideshow" aria-hidden="true">
      {renderVideo('a', videoAIndex, videoARef)}
      {renderVideo('b', videoBIndex, videoBRef)}
    </div>
  );
}

export default HeroVideoSlideshow;
