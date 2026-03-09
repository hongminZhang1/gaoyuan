'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Tab = 'login' | 'register';

const inputClass =
  'mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1c3c66] focus:ring-1 focus:ring-[#1c3c66] transition bg-white';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function switchTab(t: Tab) {
    setTab(t);
    setError('');
    setPassword('');
    setConfirm('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (tab === 'register' && password !== confirm) {
      setError('两次密码不一致');
      return;
    }

    setLoading(true);
    try {
      const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? '操作失败');
        return;
      }
      router.push('/');
      router.refresh();
    } catch {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[460px] px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* 顶部装饰条 */}
          <div className="h-[3px] bg-[#1c3c66]" />

          {/* Tab 切换 */}
          <div className="flex border-b border-gray-200">
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => switchTab(t)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                  tab === t
                    ? 'text-[#1c3c66] border-b-2 border-[#1c3c66] -mb-px bg-white'
                    : 'text-gray-400 hover:text-gray-600 bg-gray-50'
                }`}
              >
                {t === 'login' ? '登录' : '注册'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClass}
                placeholder="2-20 位字母/数字/中文"
                required
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder={tab === 'register' ? '至少 6 位' : '请输入密码'}
                required
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              />
            </div>
            {tab === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">确认密码</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={inputClass}
                  placeholder="再次输入密码"
                  required
                  autoComplete="new-password"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded text-sm font-semibold text-white bg-[#1c3c66] hover:bg-[#3c5699] focus:outline-none focus:ring-2 focus:ring-[#3c5699] focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? '处理中…' : tab === 'login' ? '登录' : '注册'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-gray-400">
          {tab === 'login' ? (
            <>还没有账号？{' '}
              <button type="button" onClick={() => switchTab('register')} className="text-[#3c5699] hover:underline">立即注册</button>
            </>
          ) : (
            <>已有账号？{' '}
              <button type="button" onClick={() => switchTab('login')} className="text-[#3c5699] hover:underline">去登录</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
