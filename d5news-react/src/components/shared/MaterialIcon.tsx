interface Props {
  name: string;
  className?: string;
  filled?: boolean;
}

export default function MaterialIcon({ name, className = '', filled }: Props) {
  return (
    <span className={`material-symbols-outlined ${filled ? 'fill-icon' : ''} ${className}`}>
      {name}
    </span>
  );
}
