import { BRAND, cardStyle } from "../../constants/findCompanionTheme";
import { formatRelativeTime } from "../../utils/findCompanionUtils";

export default function ReviewsSection({
  reviews,
  reviewsLoading,
  reviewsTotal,
  reviewsLoadingMore,
  onLoadMore,
}) {
  return (
    <section
      className="p-6 sm:p-8 rounded-2xl shadow-sm border"
      style={cardStyle}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center border"
            style={{
              background: `${BRAND.soft}22`,
              borderColor: `${BRAND.soft}99`,
              color: BRAND.primary,
            }}
          >
            <span className="material-symbols-outlined text-xl">reviews</span>
          </span>
          Đánh giá
        </h2>

        {reviewsTotal > 0 ? (
          <span className="text-sm font-semibold" style={{ color: "#94a3b8" }}>
            {reviewsTotal} đánh giá
          </span>
        ) : null}
      </div>

      {reviewsLoading ? (
        <ReviewLoading />
      ) : reviews.length === 0 ? (
        <ReviewEmpty />
      ) : (
        <div className="space-y-6">
          {reviews.map((review, idx) => (
            <ReviewItem key={review.id ?? idx} review={review} />
          ))}

          {reviews.length < reviewsTotal ? (
            <div className="pt-2 flex justify-center">
              <button
                onClick={onLoadMore}
                disabled={reviewsLoadingMore}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black border"
                style={{
                  borderColor: `${BRAND.soft}99`,
                  color: BRAND.primary,
                  background: `${BRAND.soft}11`,
                }}
              >
                {reviewsLoadingMore ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">
                      progress_activity
                    </span>
                    Đang tải...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">
                      expand_more
                    </span>
                    Xem thêm đánh giá ({reviewsTotal - reviews.length})
                  </>
                )}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}

function ReviewLoading() {
  return (
    <div
      className="flex items-center justify-center py-10"
      style={{ color: "#94a3b8" }}
    >
      <span className="material-symbols-outlined animate-spin mr-2">
        progress_activity
      </span>
      Đang tải đánh giá...
    </div>
  );
}

function ReviewEmpty() {
  return (
    <div className="text-center py-10">
      <span
        className="material-symbols-outlined text-4xl mb-3 block"
        style={{ color: `${BRAND.soft}99` }}
      >
        rate_review
      </span>
      <p className="text-sm font-semibold" style={{ color: "#94a3b8" }}>
        Chưa có đánh giá nào cho workshop này.
      </p>
    </div>
  );
}

function ReviewItem({ review }) {
  const rating = review.rating ?? review.Rating ?? review.star ?? review.stars ?? 0;
  const fullStars = Math.round(rating);

  const name =
    review.reviewerName ??
    review.ReviewerName ??
    review.userName ??
    review.UserName ??
    review.name ??
    review.Name ??
    review.user?.name ??
    "Người dùng";

  const avatar =
    review.reviewerAvatarLink ??
    review.ReviewerAvatarLink ??
    review.userAvatar ??
    review.UserAvatar ??
    review.avatar ??
    review.Avatar ??
    review.profilePicture ??
    review.user?.avatar ??
    null;

  const title = review.title ?? review.Title ?? "";

  const comment =
    review.description ??
    review.Description ??
    review.comment ??
    review.content ??
    review.body ??
    review.text ??
    "";

  const createdAt =
    review.createdOn ??
    review.CreatedOn ??
    review.createdAt ??
    review.CreatedAt ??
    review.reviewDate ??
    review.date ??
    null;
  const response = review.response ?? review.Response;

  return (
    <div
      className="border-b pb-6 last:border-0 last:pb-0"
      style={{ borderColor: `${BRAND.soft}66` }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-full bg-slate-200 shrink-0 flex items-center justify-center overflow-hidden"
          style={
            avatar
              ? {
                  backgroundImage: `url('${avatar}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { background: `${BRAND.soft}44` }
          }
        >
          {!avatar ? (
            <span
              className="material-symbols-outlined text-xl"
              style={{ color: BRAND.primary }}
            >
              person
            </span>
          ) : null}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-black" style={{ color: "#0f172a" }}>
              {name}
            </span>

            {createdAt ? (
              <span className="text-sm" style={{ color: "#94a3b8" }}>
                • {formatRelativeTime(createdAt)}
              </span>
            ) : null}
          </div>

          <div
            className="flex items-center text-sm mb-2"
            style={{ color: BRAND.primary }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-base"
                style={i >= fullStars ? { color: `${BRAND.primary}44` } : {}}
              >
                star
              </span>
            ))}

            {rating > 0 ? (
              <span
                className="ml-1 font-semibold text-xs"
                style={{ color: "#64748b" }}
              >
                {Number(rating).toFixed(1)}
              </span>
            ) : null}
          </div>

          {title && (
            <h5 className="text-sm font-bold mb-1 text-slate-800 dark:text-slate-200">
              {title}
            </h5>
          )}

          {comment && (
            <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
              {comment}
            </p>
          )}

          {response ? (
            <div
              className="mt-3 p-3 rounded-lg border-l-4 text-xs sm:text-sm italic"
              style={{
                background: `${BRAND.soft}11`,
                borderColor: BRAND.primary,
                color: "#475569",
              }}
            >
              <div
                className="flex items-center gap-1.5 mb-1 text-[11px] font-black tracking-wider uppercase"
                style={{ color: BRAND.primary }}
              >
                <span className="material-symbols-outlined text-sm">reply</span>
                Phản hồi từ Host
              </div>
              <p>{response}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
