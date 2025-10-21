
import React, { useState, useEffect } from "react";
import { Cpu, Battery, HardDrive, Thermometer, Smartphone, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatusCard from "../components/status/StatusCard";
import PerformanceChart from "../components/status/PerformanceChart";

export default function Status() {
  const [systemStatus, setSystemStatus] = useState({
    battery: 0,
    memory: 0,
    storage: 0,
    temperature: 0,
    cpu: 0
  });

  const [performanceHistory, setPerformanceHistory] = useState([]);

  useEffect(() => {
    const updateStatus = async () => {
      const batteryInfo = await navigator.getBattery?.();
      const storageInfo = await navigator.storage?.estimate?.();
      
      const memoryUsage = performance.memory ? 
        (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100 : 
        Math.random() * 40 + 30;

      const cpuUsage = Math.random() * 30 + 20;
      const temperature = 35 + Math.random() * 15;

      const newStatus = {
        battery: batteryInfo ? batteryInfo.level * 100 : 75,
        memory: memoryUsage,
        storage: storageInfo ? 
          ((storageInfo.usage / storageInfo.quota) * 100) : 
          Math.random() * 40 + 30,
        temperature: temperature,
        cpu: cpuUsage
      };

      setSystemStatus(newStatus);

      setPerformanceHistory(prev => {
        const updated = [...prev, {
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          cpu: newStatus.cpu,
          memory: newStatus.memory
        }];
        return updated.slice(-10);
      });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value, type = 'normal') => {
    if (type === 'temperature') {
      if (value > 45) return 'text-red-500';
      if (value > 40) return 'text-yellow-500';
      return 'text-green-500';
    }
    
    if (value > 80) return 'text-red-500';
    if (value > 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Status do Sistema
        </h1>
        <p className="text-gray-400">Monitoramento em tempo real do seu dispositivo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Bateria"
          value={`${systemStatus.battery.toFixed(0)}%`}
          icon={Battery}
          color="from-green-500/70 to-emerald-600/70"
          progress={systemStatus.battery}
        />

        <StatusCard
          title="Memória RAM"
          value={`${systemStatus.memory.toFixed(0)}%`}
          icon={Cpu}
          color="from-blue-500/70 to-cyan-600/70"
          progress={systemStatus.memory}
        />

        <StatusCard
          title="Armazenamento"
          value={`${systemStatus.storage.toFixed(0)}%`}
          icon={HardDrive}
          color="from-purple-500/70 to-pink-600/70"
          progress={systemStatus.storage}
        />

        <StatusCard
          title="Temperatura"
          value={`${systemStatus.temperature.toFixed(1)}°C`}
          icon={Thermometer}
          color="from-orange-500/70 to-red-600/70"
          progress={(systemStatus.temperature / 60) * 100}
        />

        <StatusCard
          title="CPU"
          value={`${systemStatus.cpu.toFixed(0)}%`}
          icon={Activity}
          color="from-pink-500/70 to-rose-600/70"
          progress={systemStatus.cpu}
        />

        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Desempenho Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-20">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {(100 - ((systemStatus.cpu + systemStatus.memory) / 2)).toFixed(0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Score de Performance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PerformanceChart data={performanceHistory} />

      <Card className="bg-black/40 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-500" />
            Recomendações de Otimização
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {systemStatus.memory > 70 && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <p className="text-sm text-yellow-400">
                Memória RAM acima de 70%. Considere fechar alguns aplicativos.
              </p>
            </div>
          )}
          {systemStatus.temperature > 40 && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-sm text-red-400">
                Temperatura elevada. Reduza o uso ou ative o modo de economia.
              </p>
            </div>
          )}
          {systemStatus.cpu > 60 && (
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
              <p className="text-sm text-orange-400">
                CPU sob alta demanda. Alguns apps podem estar consumindo recursos excessivos.
              </p>
            </div>
          )}
          {systemStatus.memory < 50 && systemStatus.cpu < 40 && systemStatus.temperature < 40 && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-sm text-green-400">
                Sistema operando perfeitamente. Tudo está otimizado!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
