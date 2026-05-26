import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HostHeader from '../../components/HostHeader';
import HostSidebar from '../../components/HostSidebar';
import { getHostReviews, respondToReview } from '../../api/host';

const DEFAULT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuC8ueQ290U45_l4-BzSHl7LqK2UiWmNHL7k6j3G3tVlgoTliJgtpGo-QSsguvy-iDYlX31dv-3gjGF8b_vGPQZCi8X-JqpfUv-yKqteYgzv7hnBThM7kyCs5GoZS2eovukRjfsVdA5IPUbhNvIhZmYERaOeZWiWCBBj8DvzwAkiuHZ9bA0-XOAy-QVobu3cYJYnCxWif-sD5o9iMTn6IjXzfsekjY1m-BhLTb8cPT9s_N424h2oEFviA0-ukylo6QiLXsc6rYUVlHPl";

export default function HostInstructorProfile() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Filtering & Pagination State
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'unreplied', 'highest', 'lowest'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Textarea values for replies, indexed by review ID
  const [draftReplies, setDraftReplies] = useState({});
  const [submittingReply, setSubmittingReply] = useState({});

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getHostReviews(1, 1000);
      const data = res?.data || res?.items || (Array.isArray(res) ? res : []);
      setReviews(data);
    } catch (err) {
      console.error(err);
      setError('Không thể tải danh sách đánh giá. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReplyTextChange = (reviewId, text) => {
    setDraftReplies(prev => ({
      ...prev,
      [reviewId]: text
    }));
  };

  const handleSubmitReply = async (reviewId) => {
    const text = draftReplies[reviewId]?.trim();
    if (!text) return;

    try {
      setSubmittingReply(prev => ({ ...prev, [reviewId]: true }));
      await respondToReview(reviewId, text);
      
      setSuccessMessage('Đã gửi phản hồi thành công!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      await fetchReviews();
      
      setDraftReplies(prev => {
        const copy = { ...prev };
        delete copy[reviewId];
        return copy;
      });
    } catch (err) {
      console.error(err);
      setError('Không thể gửi phản hồi. Vui lòng thử lại.');
      setTimeout(() => setError(null), 4000);
    } finally {
      setSubmittingReply(prev => ({ ...prev, [reviewId]: false }));
    }
  };

  // Compute unreplied count
  const unrepliedCount = reviews.filter(r => !r.response && !r.Response).length;

  // Filter and sort reviews
  let processedReviews = [...reviews];

  if (activeFilter === 'unreplied') {
    processedReviews = processedReviews.filter(r => !r.response && !r.Response);
  }

  if (activeFilter === 'highest') {
    processedReviews.sort((a, b) => (b.rating ?? b.Rating ?? 0) - (a.rating ?? a.Rating ?? 0));
  } else if (activeFilter === 'lowest') {
    processedReviews.sort((a, b) => (a.rating ?? a.Rating ?? 0) - (b.rating ?? b.Rating ?? 0));
  } else {
    // Default: newest first
    processedReviews.sort((a, b) => {
      const dateA = new Date(a.createdOn || a.CreatedOn || 0);
      const dateB = new Date(b.createdOn || b.CreatedOn || 0);
      return dateB - dateA;
    });
  }

  const totalCount = processedReviews.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const validCurrentPage = currentPage > totalPages ? (totalPages > 0 ? totalPages : 1) : currentPage;
  
  const startIndex = (validCurrentPage - 1) * pageSize;
  const displayedReviews = processedReviews.slice(startIndex, startIndex + pageSize);

  const filterClasses = (filterName) => {
    return activeFilter === filterName
      ? "px-4 py-3 text-sm font-bold text-primary border-b-2 border-primary transition-all"
      : "px-4 py-3 text-sm font-medium text-slate-500 hover:text-primary transition-all";
  };

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
        <div className="relative flex min-h-screen w-full">
          {/* Sidebar Navigation */}
          <HostSidebar />
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">
            {/* Header */}
            <HostHeader title="Review" />
            
            {/* Error and Success Notifications */}
            {error && (
              <div className="mx-8 mt-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            )}
            {successMessage && (
              <div className="mx-8 mt-6 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-xl border border-green-200 dark:border-green-800 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Filters */}
            <div className="px-8 mt-6">
              <div className="flex border-b border-primary/10">
                <button 
                  onClick={() => { setActiveFilter('all'); setCurrentPage(1); }} 
                  className={filterClasses('all')}
                >
                  Tất cả đánh giá
                </button>
                <button 
                  onClick={() => { setActiveFilter('unreplied'); setCurrentPage(1); }} 
                  className={filterClasses('unreplied')}
                >
                  Chưa trả lời ({unrepliedCount})
                </button>
                <button 
                  onClick={() => { setActiveFilter('highest'); setCurrentPage(1); }} 
                  className={filterClasses('highest')}
                >
                  Đánh giá cao nhất
                </button>
                <button 
                  onClick={() => { setActiveFilter('lowest'); setCurrentPage(1); }} 
                  className={filterClasses('lowest')}
                >
                  Đánh giá thấp nhất
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <section className="p-8 space-y-6 max-w-5xl">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="mt-4 text-slate-500 text-sm">Đang tải danh sách đánh giá...</p>
                </div>
              ) : displayedReviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">rate_review</span>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">Không có đánh giá nào</h4>
                  <p className="text-slate-500 text-sm mt-1 max-w-sm">
                    {activeFilter === 'unreplied' 
                      ? 'Tất cả các đánh giá của bạn đều đã được trả lời. Tuyệt vời!' 
                      : 'Chưa có đánh giá nào cho các workshop của bạn.'}
                  </p>
                </div>
              ) : (
                displayedReviews.map((review) => {
                  const rating = review.rating ?? review.Rating ?? 0;
                  const reviewerName = review.reviewerName ?? review.ReviewerName ?? 'Khách';
                  const reviewerAvatar = review.reviewerAvatarLink ?? review.ReviewerAvatarLink ?? DEFAULT_AVATAR;
                  const reviewTitle = review.title ?? review.Title ?? '';
                  const reviewDescription = review.description ?? review.Description ?? '';
                  const workshopName = review.workshopName ?? review.WorkshopName ?? 'Workshop';
                  const reviewDate = review.createdOn ?? review.CreatedOn;
                  const formattedDate = reviewDate 
                    ? new Date(reviewDate).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })
                    : 'Không rõ ngày';
                  
                  const responseText = review.response ?? review.Response;
                  const isReplying = submittingReply[review.id];

                  return (
                    <div key={review.id} className="bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                          <img 
                            className="w-full h-full object-cover" 
                            alt={reviewerName} 
                            src={reviewerAvatar} 
                            onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-slate-900 dark:text-slate-100">{reviewerName}</h4>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                <span className="font-medium text-primary">{workshopName}</span>
                                <span>•</span>
                                <span>{formattedDate}</span>
                              </div>
                            </div>
                            <div className="flex text-primary">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span 
                                  key={star} 
                                  className={`material-symbols-outlined text-sm ${star <= rating ? 'material-symbols-filled' : ''}`}
                                >
                                  star
                                </span>
                              ))}
                            </div>
                          </div>
                          {reviewTitle && <h5 className="font-bold text-slate-800 dark:text-slate-200 mt-2 text-sm">{reviewTitle}</h5>}
                          <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{reviewDescription}</p>
                          
                          {/* Response Section */}
                          {responseText ? (
                            <div className="mt-4 pt-4 border-t border-primary/5">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-primary text-sm">reply</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PHẢN HỒI CỦA BẠN</span>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 italic bg-primary/5 p-3 rounded-lg border-l-4 border-primary/30">
                                "{responseText}"
                              </p>
                            </div>
                          ) : (
                            <div className="mt-4 flex flex-col gap-3">
                              <textarea 
                                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:border-primary focus:ring-primary p-3" 
                                placeholder="Nhập phản hồi của bạn..."
                                value={draftReplies[review.id] || ''}
                                onChange={(e) => handleReplyTextChange(review.id, e.target.value)}
                              />
                              <div className="flex justify-end">
                                <button 
                                  onClick={() => handleSubmitReply(review.id)}
                                  disabled={isReplying || !draftReplies[review.id]?.trim()}
                                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white text-xs font-bold py-2 px-6 rounded-lg transition-all shadow-sm shadow-primary/20"
                                >
                                  {isReplying ? 'Đang gửi...' : 'Gửi phản hồi'}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </section>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <footer className="p-8 mt-auto flex justify-center">
                <nav className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={validCurrentPage === 1}
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500 disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${
                        validCurrentPage === p 
                          ? "bg-primary text-white" 
                          : "border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={validCurrentPage === totalPages}
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500 disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </nav>
              </footer>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
