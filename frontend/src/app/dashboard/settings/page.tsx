import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings" breadcrumb="Home / Dashboard / Settings">
      <div className="dash-card p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#e30613]">Settings</p>
        <h2 className="mt-1 text-lg font-bold text-[#0b2f57]">Dashboard Settings</h2>
        <p className="mt-2 text-sm text-slate-500">More settings will be added here soon.</p>
      </div>
    </DashboardShell>
  );
}
