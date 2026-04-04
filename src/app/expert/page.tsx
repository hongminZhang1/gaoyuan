import Image from "next/image";

export default function ExpertTeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-6 text-gray-500 text-sm font-medium">
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 flex flex-col md:flex-row items-center md:items-stretch">
          
          {/* Info Section */}
          <div className="flex-1 p-5 md:p-8 flex flex-col justify-center space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left">张家兴</h2>
            
            <div className="space-y-3 text-gray-700 text-base md:text-lg w-full">
              <div className="flex md:items-center flex-col md:flex-row gap-1 md:gap-0">
                <span className="font-semibold md:w-36 text-gray-900">职称：</span>
                <span>教授/博导</span>
              </div>
              <div className="flex md:items-center flex-col md:flex-row gap-1 md:gap-0">
                <span className="font-semibold md:w-36 text-gray-900">学科（专业）：</span>
                <span>生理学和神经生物学</span>
              </div>
              <div className="flex md:items-center flex-col md:flex-row gap-1 md:gap-0">
                <span className="font-semibold md:w-36 text-gray-900">研究方向：</span>
                <span>低氧神经生理</span>
              </div>
              <div className="flex md:items-center flex-col md:flex-row gap-1 md:gap-0">
                <span className="font-semibold md:w-36 text-gray-900">电子邮箱：</span>
                <a href="mailto:zhangjiaxing@xmu.edu.cn" className="text-blue-600 hover:text-blue-800 transition-colors break-all">
                  zhangjiaxing@xmu.edu.cn
                </a>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-[320px] shrink-0 p-5 md:p-8 flex items-center justify-center bg-gray-50/50 border-t md:border-t-0 md:border-l border-gray-100">
            <div className="relative w-[180px] h-[240px] md:w-[220px] md:h-[293px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <Image 
                src="https://med.xmu.edu.cn/virtual_attach_file.vsb?afc=vL8-6PnmWRnlrVU_8UsM87iUzCPM7LFiL4NDn7L8nzQ7L490gihFp2hmCIa0M1h7nSyboSy4o7M2n7lsLmCPnzlZL4AVollDn7nVU8QkUzQFMlLaLlrRU4nFMNMkM1b/v2veo4OepIrNgDTJQty0Lz-4M1y8Mz9DgtA8pU9cc&oid=1501655682&tid=1236&nid=4586&e=.jpg" 
                alt="张家兴教授" 
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Research Areas Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-5">主要研究领域：</h3>
          <p className="text-gray-700 text-sm md:text-[17px] leading-relaxed md:leading-8 text-justify">
            脑是机体利用氧最多和对氧的需求最敏感的器官。我们主要研究低氧及复氧脑的适应与重塑，低氧适应的呼吸和心血管中枢的代偿性调节机制，低氧/复氧对认知功能和情绪影响的神经机制及低氧/复氧基因表达与脑结构和神经细胞活动的关系。我们同时开展人类活体无创研究和动物疾病模型实验，研究手段包括核磁共振、脑电记录、光遗传学技术、分子生物学技术以及认知行为测试。
          </p>
        </div>

      </div>
    </div>
  );
}
