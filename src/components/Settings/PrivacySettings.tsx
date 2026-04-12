import { ShieldCheck, ShieldOff } from "lucide-react";
import { Card } from "../shared/Card";

export function PrivacySettings({
  sharingEnabled,
  onToggle,
}: {
  sharingEnabled: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className="privacy-card">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">授权设置</span>
          <h3>我的数据边界</h3>
        </div>
      </div>
      <button className="privacy-toggle" type="button" onClick={onToggle}>
        <div className={`privacy-icon ${sharingEnabled ? "privacy-on" : "privacy-off"}`}>
          {sharingEnabled ? <ShieldCheck size={18} /> : <ShieldOff size={18} />}
        </div>
        <div>
          <strong>{sharingEnabled ? "允许共享工作数据" : "已关闭共享"}</strong>
          <p>
            {sharingEnabled
              ? "当前仅同步任务、日程和 AI 使用数据，不采集私聊与非工作时段。"
              : "当前仅保留本地陪伴功能，你可以随时重新授权。"}
          </p>
        </div>
      </button>
    </Card>
  );
}
