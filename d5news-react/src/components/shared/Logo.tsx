interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'h-8' }: LogoProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/logo-light.png`}
      alt="D5News"
      className={className}
    />
  );
}
