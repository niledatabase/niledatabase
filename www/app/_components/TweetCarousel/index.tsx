"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { TweetCard, type Tweet } from "./TweetCard";
import { NewHeading } from "../common/NewHeading";

const tweets: Tweet[] = [
  {
    id: "1717518173824569471",
    author: {
      name: "Oz Katz",
      handle: "@ozkatz100",
      avatar: "/profiles/ozkatz.jpg"
    },
    content: "This looks INCREDIBLE!\nI've had the \"pleasure\" of designing multi-tenant SaaS applications several times in my career. Nile seems to tackle exactly all the right problems."
  },
  {
    id: "2345678901",
    author: {
      name: "Simon Eskildsen",
      handle: "@sirupsen",
      avatar: "/profiles/sirupsen.jpg"
    },
    content: "fascinating as a primitive. Always wanted this.\n\nMulti Tenancy Engineering is a real thing that's often a massive % of what SaaS companies' infra teams do, without naming it."
  },
  {
    id: "3456789012",
    author: {
      name: "Siva Narayanan",
      handle: "@sivanarayanan",
      avatar: "/profiles/siva.jpg"
    },
    content: "I wish we had all of these things when we started @FyleHQ. This should help startups immensely."
  },
  {
    id: "1836501428631691683",
    author: {
      name: "Tanel Poder",
      handle: "@TanelPoder",
      avatar: "/profiles/tanel.jpg"
    },
    content: "I like how the @niledatabase positions itself. Not a yet another scalable Postgres database, but a SaaS platform with a lot of built-in integrations (yes also AI) for rapid app development *and* shipping!"
  },
  {
    id: "1836457299629498374",
    author: {
      name: "Jay Kreps",
      handle: "@jaykreps",
      avatar: "/profiles/kreps.png"
    },
    content: "Postgres, as a service, done right. Awesome team and an awesome product. Excited to see it launch…"
  },
  {
    id: "1721951479031054364",
    author: {
      name: "Milos Gajdos",
      handle: "@milosgajdos",
      avatar: "/profiles/milos.jpg"
    },
    content: "There are a lot of Postgres startups out there but Nile is one of the more interesting things happening in the PG space. To anyone who has worked on some SaaS product, this must look like a no-brainer: multitenant PG."
  },
  {
    id: "5678901234",
    author: {
      name: "Emma Wilson",
      handle: "@emmaw",
      avatar: "/images/profiles/emma.jpg"
    },
    content: "Security teams love @NileDatabase! The row-level security and tenant isolation are rock solid. Plus, the audit logs and access controls make compliance a breeze. 🔒"
  },
  {
    id: "6789012345",
    author: {
      name: "James Lee",
      handle: "@jamesdev",
      avatar: "/images/profiles/james.jpg"
    },
    content: "Switched to @NileDatabase for our B2B SaaS and couldn't be happier. The database branching feature is amazing for testing, and the migration tools made the switch painless! ⚡"
  },
  {
    id: "7890123456",
    author: {
      name: "Priya Patel",
      handle: "@priyatech",
      avatar: "/images/profiles/priya.jpg"
    },
    content: "Love how @NileDatabase handles global data distribution. Our users across different regions are seeing much better latency, and the automatic failover gives us peace of mind! 🌍"
  },
  {
    id: "8901234567",
    author: {
      name: "Tom Martinez",
      handle: "@tommdev",
      avatar: "/images/profiles/tom.jpg"
    },
    content: "The developer experience with @NileDatabase is top-notch! Great docs, helpful support team, and the CLI tools make development so much faster. Exactly what devs need! 👨‍💻"
  },
  {
    id: "9012345678",
    author: {
      name: "Rachel Brown",
      handle: "@rachelb",
      avatar: "/images/profiles/rachel.jpg"
    },
    content: "Impressed by how @NileDatabase handles schema migrations across tenants. The versioning system is clever, and being able to test changes on specific tenants first is super useful! 🛠️"
  },
  {
    id: "0123456789",
    author: {
      name: "Michael Chang",
      handle: "@michaelc",
      avatar: "/images/profiles/michael.jpg"
    },
    content: "The vector embeddings support in @NileDatabase is exactly what we needed for our AI features. 10x lower cost than other solutions and it's all in the same database! 🤖"
  }
];

// Triple the tweets array to ensure smooth looping
const extendedTweets = [...tweets, ...tweets, ...tweets];

const SCROLL_SPEED = 0.4; // pixels per frame
const CARD_WIDTH = 406; // width + gap
const WHEEL_SCROLL_SPEED = 25; // pixels per wheel event
const TOTAL_WIDTH = tweets.length * CARD_WIDTH;

export default function TweetCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastFrameTime = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const dragStartTranslateX = useRef<number>(0);

  // Handle scroll events with throttling
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let isThrottled = false;
    
    const handleScroll = () => {
      if (isThrottled) return;
      isThrottled = true;
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      
      setTimeout(() => {
        isThrottled = false;
      }, 50);
      
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Helper function to handle looping
  const handleLoop = useCallback((value: number) => {
    const normalizedValue = value % TOTAL_WIDTH;
    
    // If we've scrolled past the end, loop to the beginning
    if (Math.abs(normalizedValue) >= TOTAL_WIDTH) {
      return 0;
    }
    
    // If we've scrolled past the beginning, loop to the end
    if (normalizedValue > 0) {
      return normalizedValue - TOTAL_WIDTH;
    }
    
    return normalizedValue;
  }, []);

  // Animation with time-based movement
  useEffect(() => {
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!lastFrameTime.current) {
        lastFrameTime.current = timestamp;
      }

      const deltaTime = timestamp - lastFrameTime.current;
      lastFrameTime.current = timestamp;

      if (!isPaused && !isScrolling && !isDragging) {
        setTranslateX(prev => {
          const newValue = prev - (SCROLL_SPEED * deltaTime / 16);
          return handleLoop(newValue);
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
      lastFrameTime.current = 0;
    };
  }, [isPaused, isScrolling, isDragging, handleLoop]);

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
    dragStartTranslateX.current = translateX;
    currentX.current = clientX;
  }, [translateX]);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    
    const delta = clientX - currentX.current;
    currentX.current = clientX;
    
    setTranslateX(prev => {
      const newValue = prev + delta;
      // Apply looping during drag
      return handleLoop(newValue);
    });
  }, [isDragging, handleLoop]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging) {
      setIsPaused(false);
    }
  }, [isDragging]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    const delta = e.shiftKey ? e.deltaY : e.deltaX;
    
    if (delta !== 0) {
      setTranslateX(prev => {
        const newValue = prev - (delta * WHEEL_SCROLL_SPEED / 100);
        return handleLoop(newValue);
      });
    }
  }, [handleLoop]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-center mb-12">
        <NewHeading>What People Are Saying</NewHeading>
      </div>

      <div 
        ref={containerRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={(e) => {
          handleMouseLeave();
          handleMouseUp();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div 
          className="flex gap-6"
          style={{ 
            transform: `translateX(${translateX}px)`,
            width: 'fit-content',
            transition: isDragging || isScrolling ? 'none' : 'transform 100ms linear',
            willChange: 'transform'
          }}
        >
          {extendedTweets.map((tweet, index) => (
            <div
              key={`${tweet.id}-${index}`}
              style={{
                minWidth: "400px",
                maxWidth: "400px",
                userSelect: 'none'
              }}
            >
              <TweetCard tweet={tweet} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 