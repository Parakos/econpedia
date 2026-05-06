import { categoryColors, categoryIcons } from '../data';

export default function CategoryBadge({ category, size = 'sm' }: { category: string; size?: 'sm' | 'md' }) {
  const color = categoryColors[category] ?? '#6b7280';
  const icon = categoryIcons[category] ?? '📖';
  return (
    <span
      className="cat-badge"
      style={{
        background: `${color}18`,
        color: color,
        border: `1px solid ${color}30`,
        fontSize: size === 'md' ? '12px' : '11px',
        padding: size === 'md' ? '4px 12px' : '3px 10px',
      }}
    >
      <span>{icon}</span>
      {category}
    </span>
  );
}
