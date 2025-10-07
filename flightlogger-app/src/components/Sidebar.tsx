import Link from "next/link";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Equipment", href: "/dashboard/equipment" },
  { name: "Logs", href: "/dashboard/logs" },
  { name: "Start New Flight", href: "/dashboard/new-flight" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <h2 className="text-xl font-bold mb-8">FlightLogger</h2>
      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item.name} className="mb-4">
              <Link href={item.href} className="text-gray-700 hover:text-blue-600 font-medium">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
