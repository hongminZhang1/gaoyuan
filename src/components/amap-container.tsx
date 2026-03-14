"use client";

import { useEffect, useRef } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

export default function AmapContainer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    // 1. 在加载 JSAPI 前设置安全密钥
    (window as any)._AMapSecurityConfig = {
      securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE,
    };

    // 2. 加载高德地图 API
    AMapLoader.load({
      key: process.env.NEXT_PUBLIC_AMAP_KEY as string, // 申请好的 Web 端开发者 Key
      version: "2.0", // 指定要加载的 JSAPI 的版本
      plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ControlBar"], // 需要使用的的插件列表
    })
      .then((AMap) => {
        // 如果组件已经被卸载，则不继续初始化
        if (!isMounted || !mapContainer.current) return;

        // 应对 React 18 严格模式下的二次挂载，先销毁旧实例
        if (mapRef.current) {
          mapRef.current.destroy();
        }

        // 3. 初始化地图，配置 3D 视图模式和地形图
        mapRef.current = new AMap.Map(mapContainer.current, {
          viewMode: "3D", // 开启 3D 视图
          terrain: true,  // 开启 3D 地形图（地貌效果）
          zoom: 12, // 可以调近一点看得更加清晰
          pitch: 65, // 俯仰角大一点，地貌更震撼 (0-83 度)
          rotation: -15, // 旋转角度
          center: [91.132212, 29.660361], // 修改中心点位置为：西藏拉萨（布达拉宫附近，群山起伏）
          // 加上卫星图层会让地形展示出真实的雪山和地貌颜色
          layers: [
            new AMap.TileLayer.Satellite(), // 卫星图层
            new AMap.TileLayer.RoadNet()    // 路网图层 (显示道路)
          ]
        });

        // 添加 3D 控件和常用控件
        mapRef.current.addControl(new AMap.Scale());
        mapRef.current.addControl(new AMap.ToolBar());
        mapRef.current.addControl(
          new AMap.ControlBar({
            position: {
              right: "10px",
              top: "10px",
            },
          })
        );
      })
      .catch((e) => {
        console.error("加载高德地图失败: ", e);
      });

    // 4. 组件卸载时清理
    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[500px] border border-gray-200 rounded-lg shadow-sm"
    />
  );
}
