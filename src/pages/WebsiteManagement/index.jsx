import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getNow,
  forwardTime,
  backwardTime,
  setTimeOffset,
  resetTime,
  getAllConfigurations,
  getConfiguration,
  updateConfiguration,
} from '../../api/staff';

function parseOffsetString(offset) {
  if (!offset) return 0;
  const match = offset.match(/^([+-])?(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?$/);
  if (!match) return 0;
  const [, sign = '+', hours, minutes, seconds, fraction = ''] = match;
  const fractionMs = Number((fraction + '000').slice(0, 3));
  const totalMs = Number(hours) * 3600000 + Number(minutes) * 60000 + Number(seconds) * 1000 + fractionMs;
  return sign === '-' ? -totalMs : totalMs;
}

function formatIso(date) {
  return date ? new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  }).format(date) : '-';
}

export default function StaffSystemConfig() {
  const { currentUser, authToken } = useAuth();
  const navigate = useNavigate();

  const [serverNow, setServerNow] = useState(null);
  const [serverOffset, setServerOffset] = useState('');
  const [clockBasis, setClockBasis] = useState({ serverMs: null, syncedAt: null });
  const [tick, setTick] = useState(0);
  const [timeMessage, setTimeMessage] = useState('');
  const [timeError, setTimeError] = useState('');
  const [duration, setDuration] = useState('');
  const [seconds, setSeconds] = useState('60');
  const [offsetDuration, setOffsetDuration] = useState('');
  const [offsetSeconds, setOffsetSeconds] = useState('0');
  const [configList, setConfigList] = useState([]);
  const [configName, setConfigName] = useState('OTP_RESEND_DELAY_SEC');
  const [configValue, setConfigValue] = useState('30');
  const [configDetail, setConfigDetail] = useState(null);
  const [configMessage, setConfigMessage] = useState('');
  const [configError, setConfigError] = useState('');
  const [loadingTime, setLoadingTime] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(false);

  const localClock = useMemo(() => {
    if (!clockBasis.serverMs || !clockBasis.syncedAt) return null;
    return new Date(clockBasis.serverMs + (Date.now() - clockBasis.syncedAt));
  }, [clockBasis, tick]);

  useEffect(() => {
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
      navigate('/');
      return;
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const interval = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!serverNow) {
      loadNow();
    }
  }, [serverNow]);

  const syncClock = (nowIso, offsetValue) => {
    const serverDate = new Date(nowIso);
    if (Number.isNaN(serverDate.getTime())) return;
    setServerNow(serverDate);
    setServerOffset(offsetValue || '');
    setClockBasis({ serverMs: serverDate.getTime(), syncedAt: Date.now() });
  };

  const loadNow = async () => {
    setLoadingTime(true);
    setTimeError('');
    setTimeMessage('');
    try {
      const data = await getNow(authToken);
      syncClock(data.now, data.offset);
      setTimeMessage('Đã đồng bộ đồng hồ với server.');
    } catch (error) {
      setTimeError(error.message || 'Không thể lấy thời gian hiện tại.');
    } finally {
      setLoadingTime(false);
    }
  };

  const handleForward = async () => {
    setLoadingTime(true);
    setTimeError('');
    setTimeMessage('');
    try {
      const payload = {
        duration: duration || undefined,
        seconds: seconds ? Number(seconds) : undefined,
      };
      const data = await forwardTime(authToken, payload);
      syncClock(data.now, data.offset || serverOffset);
      setTimeMessage(data.message || 'Đã tiến thời gian lên.');
    } catch (error) {
      setTimeError(error.message || 'Fail to forward time.');
    } finally {
      setLoadingTime(false);
    }
  };

  const handleBackward = async () => {
    setLoadingTime(true);
    setTimeError('');
    setTimeMessage('');
    try {
      const payload = {
        duration: duration || undefined,
        seconds: seconds ? Number(seconds) : undefined,
      };
      const data = await backwardTime(authToken, payload);
      syncClock(data.now, data.offset || serverOffset);
      setTimeMessage(data.message || 'Đã lùi thời gian xuống.');
    } catch (error) {
      setTimeError(error.message || 'Fail to backward time.');
    } finally {
      setLoadingTime(false);
    }
  };

  const handleSetOffset = async () => {
    setLoadingTime(true);
    setTimeError('');
    setTimeMessage('');
    try {
      const payload = {
        duration: offsetDuration || undefined,
        seconds: offsetSeconds ? Number(offsetSeconds) : undefined,
      };
      const data = await setTimeOffset(authToken, payload);
      syncClock(data.now, data.offset || serverOffset);
      setTimeMessage(data.message || 'Đã đặt offset thời gian.');
    } catch (error) {
      setTimeError(error.message || 'Không thể cập nhật offset.');
    } finally {
      setLoadingTime(false);
    }
  };

  const handleReset = async () => {
    setLoadingTime(true);
    setTimeError('');
    setTimeMessage('');
    try {
      const data = await resetTime(authToken);
      syncClock(data.now, data.offset || serverOffset);
      setTimeMessage(data.message || 'Đã reset thời gian về hệ thống.');
    } catch (error) {
      setTimeError(error.message || 'Không thể reset thời gian.');
    } finally {
      setLoadingTime(false);
    }
  };

  const loadAllConfigs = async () => {
    setLoadingConfig(true);
    setConfigError('');
    setConfigMessage('');
    try {
      const data = await getAllConfigurations(authToken);
      setConfigList(Array.isArray(data) ? data : []);
      setConfigMessage('Đã tải toàn bộ cấu hình.');
    } catch (error) {
      setConfigError(error.message || 'Không thể tải cấu hình.');
    } finally {
      setLoadingConfig(false);
    }
  };

  const loadConfigByName = async () => {
    if (!configName) {
      setConfigError('Vui lòng nhập tên cấu hình.');
      return;
    }
    setLoadingConfig(true);
    setConfigError('');
    setConfigMessage('');
    try {
      const data = await getConfiguration(configName, authToken);
      setConfigDetail(data);
      setConfigMessage('Đã tải cấu hình.');
    } catch (error) {
      setConfigError(error.message || 'Không thể tải cấu hình.');
      setConfigDetail(null);
    } finally {
      setLoadingConfig(false);
    }
  };

  const handleUpdateConfig = async () => {
    if (!configName) {
      setConfigError('Vui lòng nhập tên cấu hình.');
      return;
    }
    setLoadingConfig(true);
    setConfigError('');
    setConfigMessage('');
    try {
      await updateConfiguration(configName, configValue, authToken);
      setConfigMessage('Đã cập nhật cấu hình thành công.');
      setConfigDetail({ name: configName, type: configDetail?.type || 'String', value: String(configValue) });
      await loadAllConfigs();
    } catch (error) {
      setConfigError(error.message || 'Không thể cập nhật cấu hình.');
    } finally {
      setLoadingConfig(false);
    }
  };

  return (
    <div className="w-full mx-auto max-w-6xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">Quản lý Thời gian & Cấu hình</h1>
          <p className="text-sm text-slate-500 font-medium">Sử dụng các endpoint staff để xem và điều chỉnh clock, cấu hình hệ thống.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
          <span className="material-symbols-outlined text-blue-600">schedule</span>
          Đồng bộ local clock mỗi khi thay đổi thời gian hoặc khi bấm nút
        </div>
      </div>

      {timeError && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{timeError}</div>
      )}
      {configError && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{configError}</div>
      )}
      {timeMessage && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{timeMessage}</div>
      )}
      {configMessage && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{configMessage}</div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Thời gian hệ thống</h2>
                <p className="text-sm text-slate-500">Giám sát và điều chỉnh clock theo endpoint /api/time/*.</p>
              </div>
              <button
                onClick={loadNow}
                disabled={loadingTime}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
              >
                Làm mới giờ hiện tại
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Thời gian dự đoán</p>
              <p className="text-2xl font-semibold text-slate-900">{localClock ? formatIso(localClock) : 'Đang đồng bộ...'}</p>
              <p className="mt-2 text-sm text-slate-500">Local clock cập nhật mỗi giây.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Thời gian server</p>
              <p className="text-2xl font-semibold text-slate-900">{serverNow ? formatIso(serverNow) : 'Chưa có dữ liệu'}</p>
              <p className="mt-2 text-sm text-slate-500">Offset server: <span className="font-semibold text-slate-700">{serverOffset || '-'}</span></p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Tiến / lùi thời gian</h3>
              <label className="text-sm text-slate-500">Số giây</label>
              <input
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                type="number"
                min="0"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              />
              <label className="mt-4 block text-sm text-slate-500">Duration (tùy chọn)</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Ví dụ PT1M hoặc 1m"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={handleForward}
                  disabled={loadingTime}
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  Tiến thời gian
                </button>
                <button
                  onClick={handleBackward}
                  disabled={loadingTime}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  Lùi thời gian
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Đặt offset</h3>
              <label className="text-sm text-slate-500">Duration</label>
              <input
                value={offsetDuration}
                onChange={(e) => setOffsetDuration(e.target.value)}
                placeholder="Ví dụ PT0S hoặc -PT1M"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              />
              <label className="mt-4 block text-sm text-slate-500">Seconds</label>
              <input
                value={offsetSeconds}
                onChange={(e) => setOffsetSeconds(e.target.value)}
                type="number"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={handleSetOffset}
                  disabled={loadingTime}
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  Cập nhật offset
                </button>
                <button
                  onClick={handleReset}
                  disabled={loadingTime}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  Reset time
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Cấu hình hệ thống</h2>
            <p className="text-sm text-slate-500">Xem và cập nhật các giá trị cấu hình từ endpoint /api/configuration.</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={loadAllConfigs}
                disabled={loadingConfig}
                className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                Tải toàn bộ cấu hình
              </button>
              <button
                onClick={loadConfigByName}
                disabled={loadingConfig}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
              >
                Lấy cấu hình theo tên
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Tên cấu hình</span>
                <input
                  value={configName}
                  onChange={(e) => setConfigName(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Giá trị mới</span>
                <input
                  value={configValue}
                  onChange={(e) => setConfigValue(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                />
              </label>
            </div>

            <button
              onClick={handleUpdateConfig}
              disabled={loadingConfig}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              Cập nhật cấu hình
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 text-sm text-slate-700">Dữ liệu cấu hình đã tải</div>
            {configDetail ? (
              <div className="space-y-3 text-sm text-slate-600">
                <div><span className="font-semibold text-slate-800">Tên:</span> {configDetail.name}</div>
                <div><span className="font-semibold text-slate-800">Kiểu:</span> {configDetail.type || 'String'}</div>
                <div><span className="font-semibold text-slate-800">Giá trị:</span> {configDetail.value}</div>
              </div>
            ) : (
              <div className="text-sm text-slate-500">Chưa có cấu hình cụ thể nào được tải.</div>
            )}
          </div>

          {configList.length > 0 && (
            <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-semibold text-slate-700 mb-4">Toàn bộ cấu hình</div>
              <div className="grid gap-4">
                {configList.map((item) => (
                  <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">{item.name}</div>
                    <div className="mt-2 text-base font-semibold text-slate-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
