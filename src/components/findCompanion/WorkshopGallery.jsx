import { BRAND } from "../../constants/findCompanionTheme";

export default function WorkshopGallery({ images = [] }) {
  if (images.length === 1) {
    return (
      <div
        className="h-[800px] mb-12 rounded-2xl overflow-hidden border relative group cursor-pointer"
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
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px] mb-12 rounded-2xl overflow-hidden border"
      style={{ borderColor: `${BRAND.soft}66` }}
    >
      <GalleryImage image={images[0]} className="md:col-span-2 md:row-span-2" />

      {images.slice(1, 5).map((img, idx) => {
        const isLastVisible = idx === 3 && images.length >= 5;

        return (
          <GalleryImage key={img + idx} image={img}>
            {isLastVisible ? (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
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
  );
}

function GalleryImage({ image, className = "", children }) {
  return (
    <div className={`${className} relative group cursor-pointer`}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${image}')` }}
      />
      {children}
    </div>
  );
}
