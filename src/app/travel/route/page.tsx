"use client";

import { useEffect, useRef } from "react";

export default function RoutePage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);

  useEffect(() => {
    // 必须要配置安全密钥，否则高级图层（地形、卫星图）可能因为安全校验被拦截无法加载
    if (typeof window !== "undefined") {
      (window as unknown as { _AMapSecurityConfig: { securityJsCode: string } })._AMapSecurityConfig = {
        securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE || "",
      };
    }

    import("@amap/amap-jsapi-loader").then((AMapLoaderModule) => {
      const AMapLoader = AMapLoaderModule.default || AMapLoaderModule;
      
      AMapLoader.load({
      key: process.env.NEXT_PUBLIC_AMAP_KEY || "", // 从环境变量读取 Web 端开发者 Key
      version: "2.1Beta", // 关键！开启 3D 真实地形图必须使用 2.1Beta 或更高版本
      plugins: ["AMap.ControlBar", "AMap.ToolBar"], // 缩放和旋转插件
    })
      .then((AMap) => {
        if (mapRef.current) {
          // 初始化 3D 地图和真实地貌
          mapInstance.current = new AMap.Map(mapRef.current, {
            viewMode: "3D", // 开启 3D 地图模式
            terrain: true,  // 开启 3D 地形图（地貌效果）
            pitch: 65,      // 俯仰角度大一些，地貌更震撼
            rotation: -15,  // 初始地图顺时针旋转的角度
            zoom: 12,       // 视野拉远一点看群山
            center: [91.132212, 29.660361], // 西藏拉萨周边
            rotateEnable: true,
            pitchEnable: true,
            // 加上卫星图层会让地形展示出真实的雪山和地貌颜色
            layers: [
              new AMap.TileLayer.Satellite(), // 卫星图层
              new AMap.TileLayer.RoadNet()    // 路网图层 (显示道路)
            ]
          });

          // 添加缩放和旋转控制条
          const controlBar = new AMap.ControlBar({
            position: {
              right: "10px",
              top: "10px",
            },
          });
          (mapInstance.current as { addControl: (plugin: unknown) => void }).addControl(controlBar);

          const toolBar = new AMap.ToolBar({
            position: {
              right: "40px",
              top: "110px",
            },
          });
          (mapInstance.current as { addControl: (plugin: unknown) => void }).addControl(toolBar);
        }
      })
      .catch((e) => {
        console.error("加载高德地图失败", e);
      });
    });

    return () => {
      // 组件卸载时销毁地图实例，释放内存
      if (mapInstance.current) {
        (mapInstance.current as { destroy: () => void }).destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4 p-4 min-h-screen">
      <h1 className="text-2xl font-bold border-b pb-2 mb-4 border-[#d9bb79] text-[#1c3c66]">
        线路指南 - 3D地图
      </h1>
      
      {/* 注意：地图容器必须设置高度尺寸 */}
      <div 
        ref={mapRef} 
        className="w-full flex-grow rounded-lg shadow-md border" 
        style={{ minHeight: "600px" }}
      ></div>
    </div>
  );
}

