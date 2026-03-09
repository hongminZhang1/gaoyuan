import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSql, initDB } from '@/lib/db';
import { signToken, AUTH_COOKIE, USER_COOKIE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = String(body.username ?? '').trim();
    const password = String(body.password ?? '');

    if (!username || !password) {
      return NextResponse.json({ error: '请填写用户名和密码' }, { status: 400 });
    }

    await initDB();
    const sql = getSql();

    const rows = await sql`
      SELECT id, username, password_hash FROM users WHERE username = ${username} LIMIT 1
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: '该用户不存在' }, { status: 404 });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: '密码错误' }, { status: 401 });
    }

    const token = await signToken({ userId: Number(user.id), username: String(user.username) });

    const res = NextResponse.json({ success: true, username: String(user.username) });
    const cookieOpts = {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    };
    res.cookies.set(AUTH_COOKIE, token, { ...cookieOpts, httpOnly: true });
    res.cookies.set(USER_COOKIE, String(user.username), { ...cookieOpts, httpOnly: false });
    return res;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Login error:', msg);
    return NextResponse.json({ error: `登录失败：${msg}` }, { status: 500 });
  }
}
