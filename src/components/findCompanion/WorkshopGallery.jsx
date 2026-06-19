import { useState, useEffect } from "react";
import { BRAND } from "../../constants/findCompanionTheme";

export default function WorkshopGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (activeIndex === null) return;
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <>
        <div
          onClick={() => setActiveIndex(0)}
          className="h-[500px] mb-12 rounded-2xl overflow-hidden border relative group cursor-pointer"
          style={{ borderColor: `${BRAND.soft}66` }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${images[0]}')` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(240,138,120,0.06)" }}
          />
        </div>
        {activeIndex !== null && (
          <LightboxModal
            images={images}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px] mb-12 rounded-2xl overflow-hidden border"
        style={{ borderColor: `${BRAND.soft}66` }}
      >
        <GalleryImage
          image={images[0]}
          className="md:col-span-2 md:row-span-2"
          onClick={() => setActiveIndex(0)}
        />

        {images.slice(1, 5).map((img, idx) => {
          const isLastVisible = idx === 3 && images.length >= 5;

          return (
            <GalleryImage
              key={img + idx}
              image={img}
              onClick={() => setActiveIndex(idx + 1)}
            >
              {isLastVisible ? (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
                  <span className="text-white font-black text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined">grid_view</span>
                    Xem tất cả ảnh
                  </span>
                </div>
              ) : null}
            </GalleryImage>
          );
        })}
      </div>

      {activeIndex !== null && (
        <LightboxModal
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
    </>
  );
}

function GalleryImage({ image, className = "", onClick, children }) {
  return (
    <div className={`${className} relative group cursor-pointer overflow-hidden`} onClick={onClick}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${image}')` }}
      />
      {children}
    </div>
  );
}

function LightboxModal({ images, activeIndex, setActiveIndex }) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      onClick={() => setActiveIndex(null)}
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-[99999] flex flex-col justify-between items-center p-4 animate-fade-in font-display"
    >
      {/* Top Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center text-white z-10 py-2">
        <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
          Ảnh {activeIndex + 1} / {images.length}
        </span>
        <button
          onClick={() => setActiveIndex(null)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center border border-white/20"
        >
          <span className="material-symbols-outlined text-white text-2xl">close</span>
        </button>
      </div>

      {/* Main Image Slider Area */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative flex-1 w-full flex items-center justify-center max-w-6xl"
      >
        {/* Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/15 z-20 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-2xl sm:text-3xl">chevron_left</span>
          </button>
        )}

        {/* Image Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[70vh] w-full flex items-center justify-center p-4"
        >
          <img
            src={images[activeIndex]}
            alt={`Gallery detail ${activeIndex + 1}`}
            className="max-h-[68vh] max-w-[85vw] md:max-w-4xl object-contain rounded-xl shadow-2xl border border-white/10"
          />
        </div>

        {/* Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/15 z-20 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-2xl sm:text-3xl">chevron_right</span>
          </button>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl overflow-x-auto py-4 flex gap-2 justify-center scrollbar-thin scrollbar-thumb-white/20"
        >
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={img + idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative size-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all shrink-0 ${
                  isActive ? "border-[#f08a78] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="Thumbnail preview" className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
