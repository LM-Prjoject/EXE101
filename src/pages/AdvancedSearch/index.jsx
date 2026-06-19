import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { getWorkshops } from "../../api/workshop";
import NotificationBell from "../../components/NotificationBell";
import { useAuth } from "../../context/AuthContext";

function getWorkshopList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.workshops)) return data.workshops;
  if (Array.isArray(data?.result)) return data.result;
  return [];
}

function formatCurrency(value) {
  if (value == null) return "Liên hệ";
  return `${Number(value).toLocaleString("vi-VN")}₫`;
}

function formatDuration(minutes) {
  if (!minutes) return "Đang cập nhật";
  if (minutes < 60) return `${minutes} phút`;
  const hours = minutes / 60;
  return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} giờ`;
}

function toCard(workshop) {
  const price = workshop.price ?? workshop.priceLower ?? workshop.priceUpper;
  return {
    id: workshop.id,
    rating: Number(workshop.rating ?? 0).toFixed(1),
    reviews: workshop.reviewCount ?? 0,
    liked: workshop.liked,
    img: workshop.thumbnailLink || "/img/onlyLogo.png",
    title: workshop.title || "Workshop",
    desc: workshop.description || "Thông tin workshop đang được cập nhật.",
    duration: formatDuration(workshop.duration),
    schedule: workshop.nextSchedule || "Đang cập nhật",
    location: workshop.location || "Đang cập nhật",
    instructorName: workshop.instructorName || "Người hướng dẫn",
    instructorImg: workshop.instructorImgLink,
    instructorInitial: (workshop.instructorName || "HH").slice(0, 2).toUpperCase(),
    price: formatCurrency(price),
    badge: workshop.category || null,
  };
}

const categoriesConfig = [
  { value: "all", label: "Tất cả danh mục" },
  { value: "1", label: "Làm gốm" },
  { value: "2", label: "Hội họa" },
  { value: "3", label: "Trang sức" },
  { value: "4", label: "Dệt may" },
  { value: "5", label: "Khác" },
];

const levelsConfig = [
  { value: 1, label: "Cơ bản" },
  { value: 2, label: "Trung cấp" },
  { value: 3, label: "Nâng cao" },
];

function getWorkshopCategoryId(w) {
  const direct = w.categoryId ?? w.CategoryId ?? w.categoryID ?? w.CategoryID;
  if (direct != null && direct !== "") return Number(direct);
  const cat = w.category ?? w.Category;
  if (typeof cat === "object" && cat !== null) {
    return Number(cat.id ?? cat.Id ?? cat.categoryId);
  }
  const catName = String(w.categoryName ?? w.CategoryName ?? cat?.name ?? cat?.Name ?? cat?.label ?? cat ?? "").trim().toLowerCase();
  if (catName.includes("làm gốm") || catName.includes("gốm") || catName.includes("pottery") || catName.includes("ceramic")) return 1;
  if (catName.includes("hội họa") || catName.includes("họa") || catName.includes("vẽ") || catName.includes("painting") || catName.includes("watercolor")) return 2;
  if (catName.includes("trang sức") || catName.includes("jewelry") || catName.includes("bracelet")) return 3;
  if (catName.includes("dệt may") || catName.includes("dệt") || catName.includes("thêu") || catName.includes("textile") || catName.includes("sew") || catName.includes("weave")) return 4;
  return 5;
}

function getWorkshopLevelId(w) {
  const direct = w.levelId ?? w.LevelId ?? w.levelID ?? w.LevelID;
  if (direct != null && direct !== "") return Number(direct);
  const lvl = w.level ?? w.Level;
  if (typeof lvl === "object" && lvl !== null) {
    return Number(lvl.id ?? lvl.Id ?? lvl.levelId);
  }
  const lvlName = String(lvl?.name ?? lvl?.Name ?? lvl?.label ?? lvl ?? "").trim().toLowerCase();
  if (lvlName.includes("elementary") || lvlName.includes("cơ bản") || lvlName.includes("basic") || lvlName.includes("beginner")) return 1;
  if (lvlName.includes("intermediate") || lvlName.includes("trung cấp")) return 2;
  if (lvlName.includes("advanced") || lvlName.includes("nâng cao")) return 3;
  return 1;
}

export default function AdvancedSearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser, userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get("q") || "");
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(2000000);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Đồng bộ từ khóa tìm kiếm lên URL query parameter ?q=...
  useEffect(() => {
    setSearchParams(
      (prev) => {
        if (searchTerm) {
          prev.set("q", searchTerm);
        } else {
          prev.delete("q");
        }
        return prev;
      },
      { replace: true }
    );
  }, [searchTerm, setSearchParams]);

  useEffect(() => {
    let ignore = false;
    async function loadWorkshops() {
      setLoading(true);
      setError("");

      try {
        const data = await getWorkshops({ page: 1, pageSize: 100, search: searchTerm });
        if (!ignore) setWorkshops(getWorkshopList(data));
      } catch (err) {
        if (!ignore) setError(err?.message || "Không thể tải danh sách workshop.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    const timer = setTimeout(loadWorkshops, 250);
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const resultCards = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return workshops
      .filter((workshop) => {
        // 1. Text Search Filter
        if (keyword) {
          const matchTitle = (workshop.title || "").toLowerCase().includes(keyword);
          const matchDesc = (workshop.description || "").toLowerCase().includes(keyword);
          if (!matchTitle && !matchDesc) return false;
        }

        // 2. Category Filter
        if (selectedCategory !== "all") {
          const wCatId = getWorkshopCategoryId(workshop);
          if (wCatId !== Number(selectedCategory)) return false;
        }

        // 3. Price Filter
        const price = workshop.price ?? workshop.priceLower ?? workshop.priceUpper ?? 0;
        if (price < priceMin || price > priceMax) return false;



        // 5. Level Filter
        if (selectedLevels.length > 0) {
          const wLevelId = getWorkshopLevelId(workshop);
          const matchesLevel = selectedLevels.some((level) => wLevelId === Number(level));
          if (!matchesLevel) return false;
        }

        return true;
      })
      .map(toCard);
  }, [workshops, searchTerm, selectedCategory, priceMin, priceMax, selectedLevels]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setPriceMin(0);
    setPriceMax(2000000);
    setSelectedLevels([]);
    setSearchTerm("");
  };

  const activeTags = useMemo(() => {
    const tags = [];
    if (searchTerm) {
      tags.push({ type: "search", label: `Từ khóa: ${searchTerm}`, value: searchTerm });
    }
    if (selectedCategory !== "all") {
      const catObj = categoriesConfig.find(c => c.value === selectedCategory);
      if (catObj) tags.push({ type: "category", label: catObj.label, value: selectedCategory });
    }
    if (priceMin > 0 || priceMax < 2000000) {
      tags.push({ type: "price", label: `Giá < ${priceMax.toLocaleString("vi-VN")}₫`, value: { priceMin, priceMax } });
    }
    selectedLevels.forEach(lvl => {
      const lvlObj = levelsConfig.find(l => l.value === lvl);
      if (lvlObj) tags.push({ type: "level", label: lvlObj.label, value: lvl });
    });
    return tags;
  }, [searchTerm, selectedCategory, priceMin, priceMax, selectedLevels]);

  // ===== Cards data =====
  const cards = [
    {
      id: 1,
      rating: "4.9",
      reviews: "128",
      liked: true,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAINYD3oeUcID87QDpLNyjVCu6VGFQZFu0dk0gmZ0-JfTlMreQefRBG0rs3tNbU7wyBVdXGOfjoJTrG14GpsCCpF9U5W_AAa5ox8D4QXjY7JZGKQGBU96LZvxgepuJ9HS9YFwP7vCrRU1axqD8TMPn-v8oMi4Pb1DGBKJztTSPtvA81wPwCSe_WTnB3IvbdxFTWh1AxykFjTy2Gmsmx0IUupV95BSeCGs6ciRhOQjgHH27BX9T6MPFYVI6oJ5nXECc3aXw0A2GB-tfJ",
      title: "Nhập môn Xoay gốm trên bàn xoay",
      desc: "Học các kiến thức cơ bản về cách định tâm đất sét và tạo hình trụ trong buổi thực hành này.",
      duration: "2.5 Hours",
      schedule: "Sat, Sun",
      location: "Son Tra District",
      instructorName: "Sarah L.",
      instructorImg:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDjXa8BUo0HLxy1lFSfDmX1YigOqEpbUoAEvgnF-qOGk__eqYApED2SLOWIUNg0eFv1Fv65HMke3bq9HNBkl1Fr2bW-7qpw6HoJF5n31oxfqAqmAAGU92aG72kMEDtZZcE79wckL9M9UVTJOr-FnoK6aGHgZZhJks7dAJSVGDuM_qc6GnLMLFSg_EBB-hu0lWdgb0YMGFT6zfCjFAIwhw5OC6URKD28575TKgkHJ-djwYD6sKmqBvKCS-y2WCutHxUZc9lJeVApRjLu",
      price: "$45",
      badge: null,
    },
    {
      id: 2,
      rating: "4.7",
      reviews: "85",
      liked: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCU-usgWwq5naNuf-MuviO6bZU75XeOmBr3Z1Kkv5J_1SnaUm_fXwqkqePer-8wv8oIef3vXOQYP7Bcxz8WLKi0W848-bI0S7PAxIwrpnKVv4ynKCzXf7LaDLFpoetCsuURC2G-by85s1kJU0_7pb_gz8_-f0da0PCKzJ4FF--WNx6V0iChjkQlaqdZNIsRpczCeUEMoJSL2oux7q1k_9Gt-z1Ciqz82lIKH4orOsOcckoNehii8J9W-a482YkNICjVamZ41OtI25bn",
      title: "Tráng men & Trang trí Gốm sứ",
      desc: "Thể hiện sự sáng tạo của bạn bằng cách vẽ lên các món đồ gốm đã làm sẵn. Hoàn hảo để làm quà tặng.",
      duration: "2 Hours",
      schedule: "Daily",
      location: "Hai Chau District",
      instructorName: "Minh T.",
      instructorImg:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAS1-lJElkZ3QiKVJwqjloidkRN8coVRqaXxgC8eGhlVnbIdlfu2mfCye8ogYChiGA7khaMVYuxe3Hv2s299rXhhh-oBQfcMhJlhvWBip1Tu82z9Dwhal2AQaHy0cESBwwaG_aglRn39MXABaIYYKlCd6jyACSCqumHrhtQqrpcNZGmaY4t5938eIFJhoqKVewHp6Ph2dwSpnUfcgI_Mxzcufn_jcfNbZhLR98JwdHIETU-cRH5O66jqM_NFZcxcMvvzHmOug12RQzy",
      price: "$30",
      badge: "PHỔ BIẾN",
    },
    {
      id: 3,
      rating: "5.0",
      reviews: "42",
      liked: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-F0_Aj_PF2I5SwiTzuGq15Om0TRcu7odvLKDFGNCSvAFA2uQkhAT96gngUUZiSwHGSgjpDCxkP_YFjPiGb5y6kbm0egB8z59Wro_wDZD1eCTJZEaWZLbTguPFy4KvfnkH-vjAUdg5w80QuOX37EPetsTvmLWW4EPq53_XG9qDObHUNC3AZcIGuoSwjwauEgJ5bd3t9O4d175HphVbiRdl33lbH16AuKZLEEb0Qn57ywYqQpw5Imuh6O_VUcz1QM_CuFvtJcU99LWg",
      title: "Nặn tay: Ly & Bát",
      desc: "Không cần bàn xoay! Học kỹ thuật nặn dây và nặn tấm để tạo ra những đồ dùng độc đáo.",
      duration: "3 Hours",
      schedule: "Weekends",
      location: "Ngu Hanh Son",
      instructorName: "The Clay Co.",
      instructorInitial: "TC",
      price: "$55",
      badge: null,
    },
    {
      id: 4,
      rating: "4.8",
      reviews: "210",
      liked: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbj5iioZg0bwITMHYVCSZY4xtLXyo7ief1MZWG34GYrYZyFI1nszBudFw8FYg2byePSO2gTyo9HQNIlfhjfRyrs21u-aUraqFRvs9tsBXaSEwuCorWYJMVzkLC_UXBzQpmyrGcYf55DFsbhKl8ErFlbG_3uAPgonbvhwSKQyIWu7Up9ViuvKBV2ST0NaaEdAP6XU0r0_zcIGSG-Zr07KSUZlU7HsZZch_j9oKuX4z7FkGATMI3_fyZxn7h4XiJFlwAjxcaz_hKGQeH",
      title: "Câu lạc bộ Gốm Trẻ em: Vui chơi Cuối tuần",
      desc: "Một môi trường vui vẻ và sáng tạo cho trẻ từ 6-12 tuổi khám phá nghệ thuật làm gốm.",
      duration: "1.5 Hours",
      schedule: "Sat Morning",
      location: "Hai Chau District",
      instructorName: "Elena R.",
      instructorImg:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB1XFuBiRV3sZo-i2ClJ23OYCntk7bDatiuX5xRay1GA4sTvF1u4YlpqRjpTixUEqg7MzQW5adkLIjNpsyuMEBdwy-Ig-5aEmvQC5Nl2ZDTfqRce3d8LHV1EokiJ4HQLKGgg50pSvfQszlID2Mix_uYKTtk_NdKWHm1rAMsgdfe1hTQPLc-jvgHSTvhh70FiceVsJm7nCIWXmW8Tdii08bWg7ZcILX_hveJoFb7LsEuWu7mRU_oZgz7DsTkJ62mLmgB8wG-4s72YRiP",
      price: "$25",
      badge: null,
    },
    {
      id: 5,
      rating: "4.9",
      reviews: "56",
      liked: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH4Ao9oVzYfQoaDQzptACUwnavJVp8pXsHcA9OX5U0PAHuqC6bkeP8qQZqQ_ctcLYnYweQbKM2giVp86WUSMz0u5DKentPFUJVgOt3vKN6DopYlS0gi-4xljnVb27M28vXwmvJU29LzfE3yXz4HV-H9Z7JFwYhUGQM6CU5agX1dl8EPAEMAIAw4plEeMVu3RM-Pm737hFjCsekclR-gxcnOBTH8eq8ITqv5AK_CoE71EPxvJ7RHH3HBMO85qEn6Ww2ZZrz1Vi8JB9t",
      title: "Lớp học Bậc thầy: Bình gốm lớn",
      desc: "Dành cho những người làm gốm đã có kinh nghiệm muốn nâng cao tay nghề và làm chủ các hình khối lớn.",
      duration: "4 Hours",
      schedule: "Advanced Only",
      location: "Son Tra District",
      instructorName: "James K.",
      instructorImg:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuALYbb15HcJ3GcPVH_PgsH_rmGdPXVRaBPkR7AmMGrz6TunMf0OEvU3fPitEhDK-R3jNdwjG9hIMbxftpsJTUa_-f9vNy8XXZPZusOw_TLSP0XxQSrGn9skLGtIDjik7AOHQuAga_SzZDwTDTujyYW0Wa-R7PAUqcRZQ5IPiaUpAPDZ_ngAEcPRgTShlC3BJD0O_h9kR0e4uW5d2T5cKyPkp5sA8r5qrLJTM1ccHhEDqhXiLrf4O-8iFTjK0t_yujzTpYIoGyhPgdYp",
      price: "$85",
      badge: null,
    },
    {
      id: 6,
      rating: "5.0",
      reviews: "15",
      liked: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvSQSdK81izxFlaCHNL9SowBbjO_wkTOwJIwb6dMaKBJUvJfUxdWihg2GLpXMddSzm_BNGSOXYFRsHr0ZKqasxf2BPziWnhETrPi4aMgZiHIaNWLh5r5iFKbRplzCIZ9yH7i1YJMHlOMSoWyUVXZyW9-MWhPZE_wItzihotWX4fuzPLxujGCeb75AeyWS8L_AlHyGr3KwE5T9lqB5qjDA5gmG8HBMMyRI458VuW1Ay-cgRXAEMkRkZ0PCH3hsOtikeaENkB7SgkcY6",
      title: "Trải nghiệm Nung Raku",
      desc: "Chứng kiến sự kỳ diệu của kỹ thuật nung Raku. Tự tráng men cho tác phẩm của bạn và xem nó biến đổi trong lửa.",
      duration: "3.5 Hours",
      schedule: "Special Event",
      location: "Hoi An (Shuttle incl.)",
      instructorName: "Art Studio",
      instructorInitial: "AS",
      price: "$70",
      badge: null,
    },
  ];

  const CardItem = ({ item }) => {
    return (
      <div
        onClick={() => navigate(`/find-companion/${item.id}`)}
        className="group cursor-pointer rounded-2xl overflow-hidden border border-[#fbc4ae]/55 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm hover:shadow-xl hover:shadow-[#f08a78]/15 transition-all duration-300 flex flex-col h-full"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={item.img}
          />

          {/* Rating pill */}
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/65 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1 border border-[#fbc4ae]/60">
            <span className="material-symbols-outlined text-[14px] text-[#c3996c]">
              star
            </span>
            {item.rating} ({item.reviews})
          </div>

          {/* Like */}
          <button
            type="button"
            className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white backdrop-blur-md rounded-full text-white hover:text-[#f08a78] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              favorite
            </span>
          </button>

          {/* Badge */}
          {item.badge && (
            <div className="absolute bottom-3 left-3 bg-[#f08a78] text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-sm shadow-[#f08a78]/25">
              {item.badge}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-extrabold text-lg leading-tight group-hover:text-[#f08a78] transition-colors mb-2 text-slate-900 dark:text-white">
            {item.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
            {item.desc}
          </p>

          <div className="mt-auto space-y-3">
            {/* meta 1 */}
            <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                schedule
              </span>
              <span className="font-semibold">{item.duration}</span>
              <span className="w-1 h-1 rounded-full bg-[#fbc4ae] mx-1" />
              <span className="font-semibold">{item.schedule}</span>
            </div>

            {/* meta 2 */}
            <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                location_on
              </span>
              <span className="font-semibold">{item.location}</span>
            </div>

            {/* footer */}
            <div className="pt-3 mt-3 border-t border-[#fbc4ae]/55 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.instructorImg ? (
                  <img
                    alt={`Portrait of instructor ${item.instructorName}`}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-[#0f141b] shadow-sm"
                    src={item.instructorImg}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#fbc4ae]/40 flex items-center justify-center text-[#c3996c] font-extrabold text-xs border-2 border-white dark:border-[#0f141b]">
                    {item.instructorInitial || item.instructorName?.slice(0, 2)}
                  </div>
                )}

                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Bởi {item.instructorName}
                </span>
              </div>

              <p className="font-extrabold text-lg text-[#c3996c]">
                {item.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col overflow-x-hidden w-full font-display bg-[#f6f2e9] text-slate-900 dark:bg-[#0b0f14] dark:text-slate-100"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-solid border-[#fbc4ae]/60 dark:border-slate-800 bg-[#FEFEFD] dark:bg-[#151822] px-4 md:px-10 py-3 sticky top-0 z-50">
          <div className="flex items-center gap-3 md:gap-8">
            <Link className="flex items-center gap-4 hover:opacity-90 transition-opacity" to="/home">
              <div className="flex size-10 items-center justify-center overflow-visible">
                <img src="/img/onlyLogo.png" alt="Hands & Hour logo" className="h-8 w-8 object-contain scale-150 origin-center" />
              </div>
              <h2 className="hidden min-[400px]:block text-xl font-black tracking-tight">
                <span className="text-[#c3996c]">Hands</span>{" "}
                <span className="text-[#f08a78]">&amp;</span>{" "}
                <span className="text-[#c3996c]">Hour</span>
              </h2>
            </Link>

            <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                <div className="text-[#c3996c]/70 flex border-none bg-[#fffaf5] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#c3996c] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#f08a78]/40 border-none bg-[#fffaf5] dark:bg-slate-800 h-full placeholder:text-[#c3996c]/60 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal transition-all"
                  placeholder="Tìm kiếm workshop..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </label>
          </div>

          <div className="flex flex-1 justify-end gap-3 md:gap-8 items-center">
            <div className="hidden lg:flex items-center gap-9">
              <Link className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" to="/home">Workshops</Link>
              <Link className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" to="/advanced-search">Khám phá</Link>
            </div>

            {currentUser && (
              <button 
                onClick={() => {
                  if (currentUser?.role === "host") {
                    navigate("/host/dashboard");
                  } else {
                    navigate("/host/verification");
                  }
                }} 
                className="flex min-w-[50px] sm:min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-3 sm:px-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-xs sm:text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#f08a78]/25"
              >
                <span className="sm:inline hidden truncate">
                  {currentUser?.role === "host" ? "Chế độ Host" : "Trở thành Host"}
                </span>
                <span className="inline sm:hidden truncate">
                  {currentUser?.role === "host" ? "Host" : "Lên Host"}
                </span>
              </button>
            )}

            <div className="flex items-center gap-2 sm:gap-4 border-l border-[#fbc4ae]/60 dark:border-slate-700 pl-3 sm:pl-6">
              <NotificationBell />

              {currentUser ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:block text-sm font-semibold text-[#c3996c]">
                    Xin chào, <span className="font-black">{userProfile?.name || currentUser?.name || currentUser?.email?.split("@")[0] || "Khách"}</span>
                  </span>
                  <Link to="/user-profile">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#f08a78] cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundImage: `url("${userProfile?.avatarLink || userProfile?.avatar || userProfile?.avatarUrl || currentUser?.avatarLink || currentUser?.avatar || currentUser?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE"}")` }}
                    />
                  </Link>
                </div>
              ) : (
                <div className="flex gap-2 sm:gap-3">
                  <Link className="text-sm font-semibold hover:text-[#f08a78] transition-colors hidden sm:block" to="/login">Đăng nhập</Link>
                  <Link to="/register" className="bg-[#f08a78] hover:bg-[#f08a78]/90 text-white font-extrabold py-2.5 px-3 sm:px-5 rounded-xl transition-colors shadow-sm shadow-[#f08a78]/25">Đăng ký</Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
            <a className="hover:text-[#f08a78] transition-colors" href="#">
              Trang chủ
            </a>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <a className="hover:text-[#f08a78] transition-colors" href="#">
              Tìm kiếm
            </a>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="text-slate-900 dark:text-white font-semibold">
              {searchTerm || "Tất cả workshop"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showMobileSidebar ? "block fixed inset-0 z-50 bg-[#f6f2e9] dark:bg-[#0b0f14] p-6 overflow-y-auto" : "hidden"} lg:block lg:col-span-3 space-y-8 pr-4`}>
              {showMobileSidebar && (
                <div className="flex justify-end lg:hidden">
                  <button onClick={() => setShowMobileSidebar(false)} className="p-2">
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg">Bộ lọc</h3>
                <button onClick={handleResetFilters} className="text-sm text-[#c3996c] font-semibold hover:underline">
                  Thiết lập lại
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h4 className="font-black text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Danh mục
                </h4>
                <div className="space-y-2">
                  {categoriesConfig.map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        className="sr-only peer"
                        name="category"
                        type="radio"
                        checked={selectedCategory === cat.value}
                        onChange={() => setSelectedCategory(cat.value)}
                      />
                      <div className="w-5 h-5 rounded-full border-2 border-[#fbc4ae]/80 dark:border-white/15 peer-checked:border-[#f08a78] peer-checked:bg-[#f08a78] flex items-center justify-center transition-all">
                        <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                      </div>
                      <span className="text-sm font-semibold group-hover:text-[#f08a78] transition-colors text-slate-700 dark:text-slate-300">
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#fbc4ae]/60 dark:bg-white/10" />

              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="font-black text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Giá
                </h4>
                <div className="relative pt-6 pb-2">
                  <div className="absolute top-0 left-0 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    0₫
                  </div>
                  <div className="absolute top-0 right-0 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    2.000.000₫+
                  </div>
                  <input
                    className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#f08a78] bg-[#fbc4ae]/70 dark:bg-white/10"
                    max="2000000"
                    min="0"
                    step="50000"
                    type="range"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                  />
                  <div className="flex justify-between mt-2 items-center gap-2">
                    <div className="border border-[#fbc4ae]/70 dark:border-white/10 rounded-lg px-2 py-1.5 text-xs bg-white dark:bg-white/5 w-24 text-center font-semibold text-slate-700 dark:text-slate-300">
                      {priceMin.toLocaleString("vi-VN")}₫
                    </div>
                    <div className="text-slate-400">-</div>
                    <div className="border border-[#fbc4ae]/70 dark:border-white/10 rounded-lg px-2 py-1.5 text-xs bg-white dark:bg-white/5 w-24 text-center font-semibold text-slate-700 dark:text-slate-300">
                      {priceMax.toLocaleString("vi-VN")}₫
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#fbc4ae]/60 dark:bg-white/10" />

              {/* Skill Level */}
              <div className="space-y-4">
                <h4 className="font-black text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Trình độ
                </h4>
                <div className="flex flex-wrap gap-2">
                  {levelsConfig.map((lvl) => {
                    const isSelected = selectedLevels.includes(lvl.value);
                    if (isSelected) {
                      return (
                        <button
                          key={lvl.value}
                          onClick={() => setSelectedLevels(selectedLevels.filter((x) => x !== lvl.value))}
                          className="px-3 py-1.5 rounded-lg border border-[#f08a78]/60 bg-[#fbc4ae]/35 text-[#c3996c] text-sm font-bold transition-colors flex items-center gap-1.5"
                          type="button"
                        >
                          {lvl.label}
                          <span className="material-symbols-outlined text-[14px] hover:text-red-500">
                            close
                          </span>
                        </button>
                      );
                    } else {
                      return (
                        <button
                          key={lvl.value}
                          onClick={() => setSelectedLevels([...selectedLevels, lvl.value])}
                          className="px-3 py-1.5 rounded-lg border border-[#fbc4ae]/70 dark:border-white/10 hover:border-[#f08a78]/60 hover:text-[#f08a78] text-slate-700 dark:text-slate-300 text-sm font-semibold transition-colors"
                          type="button"
                        >
                          {lvl.label}
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="lg:col-span-9 flex flex-col gap-6">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                    Kết quả cho{" "}
                    <span className="text-[#f08a78]">"{searchTerm || "Tất cả workshop"}"</span>
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400">
                    <span className="font-black text-[#c3996c]">
                      {resultCards.length} workshop
                    </span>{" "}
                    được tìm thấy phù hợp với tiêu chí của bạn
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto">
                  <button
                    onClick={() => setShowMobileSidebar(true)}
                    type="button"
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#fbc4ae]/30 text-[#f08a78] rounded-lg text-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      tune
                    </span>{" "}
                    Bộ lọc
                  </button>
                </div>
              </div>
 
              {/* Active Filters Tags */}
              <div className="flex flex-wrap gap-2">
                {activeTags.map((tag) => (
                  <div
                    key={tag.label}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#fbc4ae]/35 text-[#c3996c] rounded-full text-xs font-black uppercase tracking-wide border border-[#f08a78]/20"
                  >
                    {tag.label}
                    <button
                      type="button"
                      className="hover:text-red-500"
                      onClick={() => {
                        if (tag.type === "search") setSearchTerm("");
                        else if (tag.type === "category") setSelectedCategory("all");
                        else if (tag.type === "price") {
                          setPriceMin(0);
                          setPriceMax(2000000);
                        }
                        else if (tag.type === "level") setSelectedLevels(selectedLevels.filter(x => x !== tag.value));
                      }}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        close
                      </span>
                    </button>
                  </div>
                ))}
                {activeTags.length > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#c3996c] hover:text-[#f08a78] font-bold underline px-2 py-1"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              {/* Cards Grid (FULL) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                  <div className="col-span-full rounded-2xl border border-[#fbc4ae]/55 bg-white/70 p-8 text-center text-sm font-semibold text-slate-500">
                    Đang tải danh sách workshop...
                  </div>
                ) : error ? (
                  <div className="col-span-full rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm font-semibold text-red-600">
                    {error}
                  </div>
                ) : resultCards.length === 0 ? (
                  <div className="col-span-full rounded-2xl border border-[#fbc4ae]/55 bg-white/70 p-8 text-center text-sm font-semibold text-slate-500">
                    Không tìm thấy workshop phù hợp với "{searchTerm}".
                  </div>
                ) : (
                  resultCards.map((item) => (
                    <CardItem key={item.id} item={item} />
                  ))
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2 rounded-lg border border-[#fbc4ae]/70 dark:border-white/10 hover:border-[#f08a78]/60 text-slate-500 hover:text-[#f08a78] transition-colors disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg bg-[#f08a78] text-white font-black shadow-sm shadow-[#f08a78]/20"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg border border-[#fbc4ae]/70 dark:border-white/10 hover:border-[#f08a78]/60 text-slate-500 hover:text-[#f08a78] transition-colors"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg border border-[#fbc4ae]/70 dark:border-white/10 hover:border-[#f08a78]/60 text-slate-500 hover:text-[#f08a78] transition-colors"
                  >
                    3
                  </button>
                  <span className="text-slate-400">...</span>
                  <button
                    type="button"
                    className="p-2 rounded-lg border border-[#fbc4ae]/70 dark:border-white/10 hover:border-[#f08a78]/60 text-slate-500 hover:text-[#f08a78] transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#fbc4ae]/60 dark:border-white/10 py-10 mt-12 bg-[#FEFEFD] dark:bg-[#0b0f14]">
          <div className="max-w-[1440px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/img/onlyLogo.png"
                alt="Hands & Hour logo"
                className="h-7 w-7 object-contain"
              />
              <span className="font-black text-lg">
                <span className="text-[#c3996c]">Hands</span>{" "}
                <span className="text-[#f08a78]">&amp;</span>{" "}
                <span className="text-[#c3996c]">Hour</span>
              </span>
            </div>

            <div className="text-slate-500 dark:text-slate-400 text-sm">
              © 2024 Hands &amp; Hour. Được tạo ra với tình yêu.
            </div>

            <div className="flex gap-6">
              <a
                className="text-slate-500 hover:text-[#f08a78] transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">dataset</span>
              </a>
              <a
                className="text-slate-500 hover:text-[#f08a78] transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
