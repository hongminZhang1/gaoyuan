import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sql, initDB } from '@/lib/db';
import { signToken, AUTH_COOKIE, USER_COOKIE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = String(body.username ?? '').trim();
    const password = String(body.password ?? '');

    if (!/^[\w\u4e00-\u9fff]{2,20}$/.test(username)) {
      return NextResponse.json(
        { error: '用户名为 2-20 位字符（字母/数字/下划线/中文）' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json({ error: '密码至少 6 位' }, { status: 400 });
    }

    await initDB();

    const existing = await sql`SELECT id FROM users WHERE username = ${username} LIMIT 1`;
    if (existing.length > 0) {
      return NextResponse.json({ error: '用户名已被占用' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const rows = await sql`
      INSERT INTO users (username, password_hash)
      VALUES (${username}, ${passwordHash})
      RETURNING id, username
    `;
    const user = rows[0];

    let token: string;
    try {
      token = await signToken({ userId: Number(user.id), username: String(user.username) });
    } catch (tokenErr) {
      console.error('signToken error:', tokenErr);
      // 用户已创建成功，JWT 签发失败不影响数据，直接返回成功让用户去登录
      return NextResponse.json({ success: true, username: user.username });
    }

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
    console.error('Register error:', msg);
    const detail = process.env.NODE_ENV !== 'production' ? `（${msg}）` : '';
    return NextResponse.json({ error: `注册失败，请稍后重试${detail}` }, { status: 500 });
  }
}
