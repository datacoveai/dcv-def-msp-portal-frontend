export type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
};

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="border-b flex gap-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition ${
            active === tab.id
              ? "border-[#0F3A5E] text-[#0F3A5E]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
