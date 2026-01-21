export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
       <h1 className="text-2xl font-bold mb-8 text-[#1c3c66]">登录 / 注册</h1>
       <div className="w-full max-w-sm p-6 bg-gray-50 rounded shadow-md border border-gray-100">
           <form className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700">用户名</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" placeholder="请输入用户名" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">密码</label>
                  <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" placeholder="请输入密码" />
              </div>
              <button disabled className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3c5699] hover:bg-[#2d4278] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                  登录
              </button>
           </form>
       </div>
    </div>
  );
}
