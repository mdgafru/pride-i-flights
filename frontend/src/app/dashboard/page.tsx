import { DashboardShell } from "@/components/dashboard/DashboardShell";

const stats = [
  { label: "Total Routes", value: "1,248", change: "+12%" },
  { label: "Active Airlines", value: "86", change: "+4%" },
  { label: "Airports", value: "312", change: "+2%" },
  { label: "On-Time Flights", value: "94%", change: "+3%" },
];

const recentActivity = [
  { action: "New route added", detail: "DEL → DXB", time: "2m ago" },
  { action: "Airline updated", detail: "Emirates status", time: "14m ago" },
  { action: "Excel import", detail: "240 rows processed", time: "1h ago" },
  { action: "SEO page published", detail: "Dubai flights", time: "3h ago" },
];

const latestRoutes = [
  { route: "DEL → LHR", airline: "BA", status: "Active" },
  { route: "BOM → DXB", airline: "EK", status: "Active" },
  { route: "HYD → SIN", airline: "SQ", status: "Draft" },
  { route: "BLR → JFK", airline: "AI", status: "Active" },
];

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard Overview" breadcrumb="Home / Dashboard">
      <div className="space-y-2.5">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article key={item.label} className="dash-stat">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
              <div className="mt-0.5 flex items-end justify-between gap-2">
                <p className="text-lg font-extrabold text-[#0b2f57]">{item.value}</p>
                <span className="text-[10px] font-bold text-emerald-600">{item.change}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-2 lg:grid-cols-[1.4fr_1fr]">
          <article className="dash-card p-2.5">
            <div className="mb-1.5 flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#0b2f57]">Routes Performance</h2>
              <span className="text-[10px] text-slate-500">Last 7 days</span>
            </div>
            <svg viewBox="0 0 520 130" className="h-28 w-full">
              <polyline
                fill="none"
                stroke="#e30613"
                strokeWidth="2.5"
                points="10,95 70,78 130,84 190,58 250,66 310,42 370,50 430,30 490,38"
              />
              <polyline
                fill="none"
                stroke="#0b2f57"
                strokeWidth="2"
                opacity="0.55"
                points="10,108 70,96 130,100 190,82 250,88 310,72 370,78 430,64 490,70"
              />
            </svg>
          </article>

          <article className="dash-card p-2.5">
            <h2 className="mb-1.5 text-xs font-bold text-[#0b2f57]">Traffic Split</h2>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 36 36" className="h-24 w-24">
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#e2e8f0" strokeWidth="3.2" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke="#e30613"
                  strokeWidth="3.2"
                  strokeDasharray="58 100"
                  transform="rotate(-90 18 18)"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke="#0b2f57"
                  strokeWidth="3.2"
                  strokeDasharray="28 100"
                  strokeDashoffset="-58"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <div className="space-y-1 text-[11px]">
                <p><span className="mr-1 inline-block h-2 w-2 rounded-full bg-[#e30613]" /> Direct 58%</p>
                <p><span className="mr-1 inline-block h-2 w-2 rounded-full bg-[#0b2f57]" /> Partner 28%</p>
                <p><span className="mr-1 inline-block h-2 w-2 rounded-full bg-slate-300" /> Other 14%</p>
              </div>
            </div>
          </article>
        </div>

        <div className="grid gap-2 lg:grid-cols-[1fr_1.2fr]">
          <article className="dash-card p-2.5">
            <h2 className="mb-1.5 text-xs font-bold text-[#0b2f57]">Recent Activity</h2>
            <ul className="space-y-1.5">
              {recentActivity.map((item) => (
                <li key={`${item.action}-${item.time}`} className="flex items-start justify-between gap-2 border-b border-slate-100 pb-1.5 last:border-0 last:pb-0">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-700">{item.action}</p>
                    <p className="text-[10px] text-slate-500">{item.detail}</p>
                  </div>
                  <span className="text-[10px] text-slate-400">{item.time}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="dash-card overflow-hidden">
            <div className="border-b border-slate-100 px-2.5 py-2">
              <h2 className="text-xs font-bold text-[#0b2f57]">Latest Routes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="dash-table w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th>Route</th>
                    <th>Airline</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestRoutes.map((row) => (
                    <tr key={row.route} className="border-t border-slate-100">
                      <td className="font-semibold text-slate-700">{row.route}</td>
                      <td>{row.airline}</td>
                      <td>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            row.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>

      </div>
    </DashboardShell>
  );
}
