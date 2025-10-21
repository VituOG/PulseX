
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Bell, Shield, Palette, Zap, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Configuracoes() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    notifications: true,
    autoOptimize: false,
    darkMode: true,
    gameModeAuto: false,
    batteryOptimization: true
  });

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      if (currentUser.settings) {
        setSettings({ ...settings, ...currentUser.settings });
      }
    };
    loadUser();
  }, []);

  const handleSettingChange = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    await base44.auth.updateMe({ settings: newSettings });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Configurações
        </h1>
        <p className="text-gray-400">Personalize o PulseX de acordo com suas preferências</p>
      </div>

      <Card className="bg-black/40 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-pink-500" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="notifications" className="text-white">Notificações do Sistema</Label>
              <p className="text-sm text-gray-400">Receba alertas sobre otimizações e limpezas</p>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(value) => handleSettingChange("notifications", value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            Otimização Automática
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="autoOptimize" className="text-white">Otimização Automática</Label>
              <p className="text-sm text-gray-400">Execute otimização básica diariamente</p>
            </div>
            <Switch
              id="autoOptimize"
              checked={settings.autoOptimize}
              onCheckedChange={(value) => handleSettingChange("autoOptimize", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="batteryOptimization" className="text-white">Otimização de Bateria</Label>
              <p className="text-sm text-gray-400">Ative economia de energia automática</p>
            </div>
            <Switch
              id="batteryOptimization"
              checked={settings.batteryOptimization}
              onCheckedChange={(value) => handleSettingChange("batteryOptimization", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="gameModeAuto" className="text-white">Game Mode Automático</Label>
              <p className="text-sm text-gray-400">Ative automaticamente ao detectar jogos</p>
            </div>
            <Switch
              id="gameModeAuto"
              checked={settings.gameModeAuto}
              onCheckedChange={(value) => handleSettingChange("gameModeAuto", value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-500" />
            Aparência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="darkMode" className="text-white">Modo Escuro</Label>
              <p className="text-sm text-gray-400">Interface otimizada para ambientes com pouca luz</p>
            </div>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={(value) => handleSettingChange("darkMode", value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Sobre
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-400">
          <div className="flex justify-between">
            <span>App</span>
            <span className="text-white">PulseX</span>
          </div>
          <div className="flex justify-between">
            <span>Versão</span>
            <span className="text-white">1.0.0 Pro</span>
          </div>
          <div className="flex justify-between">
            <span>Usuário</span>
            <span className="text-white">{user?.email}</span>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Permissões do Sistema</h3>
        <p className="text-sm text-gray-400 mb-4">
          Para funcionamento completo, o PulseX precisa de permissões especiais do Android.
        </p>
        <Button className="bg-pink-600 hover:bg-pink-700 rounded-xl">
          Conceder Permissões
        </Button>
      </div>
    </div>
  );
}
